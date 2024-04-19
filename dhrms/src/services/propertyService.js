import apiClient from '@/utils/apiClient';

export const getPropertyDetails = async (propertyId) => {
    try {
      const response = await apiClient.get(`/api/properties/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch property details:', error);
      throw error;
    }
  };