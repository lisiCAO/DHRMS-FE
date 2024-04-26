import apiClient from '@/utils/apiClient'; 

/**
 * Fetches search results for properties based on the search query.
 * @param {string} query - The search query.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of search results.
 */
export const fetchSearchResults = async (query, includeToken = true) => {
  if (!query.trim()) {
    return [];
  }

  const config = {
    params: { query: query },
    headers: {}
  };

  if (!includeToken) {
    config.headers.Authorization = '';
  }

  try {
    const response = await apiClient.get('/search', config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    throw error;
  }
};
