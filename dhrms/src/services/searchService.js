import apiClient from '@/utils/apiClient';  

export const fetchSearchResults = async (searchTerm) => {
  if (!searchTerm.trim()) return [];  
  try {
    const response = await apiClient.get(`/search`, { params: { query: searchTerm } });
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    throw error;  
  }
};
