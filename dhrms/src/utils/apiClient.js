import axios from 'axios';

const API_GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL; 

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json' 
  }
});

const getToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post(`${API_GATEWAY_BASE_URL}/api/auth/login`, new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: 'your-client-id',  
        refresh_token: refreshToken,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);

    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

apiClient.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const newToken = await getToken();
    config.headers.Authorization = `Bearer ${newToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(response => response, async error => {
  if (error.response && error.response.status === 401) {
    try {
      const newToken = await getToken();
      error.config.headers['Authorization'] = `Bearer ${newToken}`;
      return apiClient.request(error.config);
    } catch (refreshError) {
        console.error('Unable to refresh token:', refreshError);
        // Redirect to login or show an error message
        // You might need to add logout logic here or redirect to login page
        window.location.href = '/login'; // Assuming you have a login route
        return Promise.reject(refreshError);
      }
    }
    // For other errors, just pass them along
    return Promise.reject(error);
  });
  
  export default apiClient;