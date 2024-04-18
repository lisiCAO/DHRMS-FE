import apiClient from '@/utils/apiClient';

export const fetchSearchResults = (searchTerm) => {
  return apiClient.get(`/search?query=${encodeURIComponent(searchTerm)}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
