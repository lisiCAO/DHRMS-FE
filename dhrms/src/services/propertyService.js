import apiClient from '@/utils/apiClient';

export const getPropertyDetails = async (propertyId) => {
    try {
      const response = await apiClient.get(`/properties/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch property details:', error);
      throw error;
    }
  };


export const fetchProperties = async (includeToken = true) => {
  try {
    const config = {};

    if (!includeToken) {
      config.headers = { Authorization: '' };
    }

    const response = await apiClient.get('/properties', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}
