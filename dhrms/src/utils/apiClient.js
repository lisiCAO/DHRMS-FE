import axios from 'axios';

/* Define base URL from environment variables for the API requests */
const API_GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL; 

/* Create an axios instance configured with the base URL and default headers */
const apiClient = axios.create({
  baseURL: API_GATEWAY_BASE_URL,  
  headers: {
    'Content-Type': 'application/json'
  }
});

/* Function to get a new access token using a refresh token */
const getToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    // Request a new token using the refresh token
    const response = await axios.post(`${API_GATEWAY_BASE_URL}/auth/login`, new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: 'your-client-id',  
        refresh_token: refreshToken,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    // Store the new tokens in local storage
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);

    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

/* Add a request interceptor to include the authorization token in every request */
apiClient.interceptors.request.use(async config => {
  // 检查是否明确要求不发送令牌
  if (config.headers.Authorization === '') {
    delete config.headers.Authorization;  // 移除 Authorization 头
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 仅当需要令牌而本地不存在时，尝试获取新令牌
      const newToken = await getToken();
      config.headers.Authorization = `Bearer ${newToken}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});


/* Add a response interceptor to handle automatic token refresh on 401 errors */
apiClient.interceptors.response.use(response => response, async error => {
  if (error.response && error.response.status === 401) {
    // Attempt to refresh the token if a 401 Unauthorized response is received
    try {
      const newToken = await getToken();
      error.config.headers['Authorization'] = `Bearer ${newToken}`;
      return apiClient.request(error.config);  // Retry the request with the new token
    } catch (refreshError) {
      console.error('Unable to refresh token:', refreshError);
      // Redirect to login or show an error message
      window.location.href = '/login';  // Redirect to the login route on failure
      return Promise.reject(refreshError);
    }
  }
  // For other errors, just pass them along
  return Promise.reject(error);
});

export default apiClient;
