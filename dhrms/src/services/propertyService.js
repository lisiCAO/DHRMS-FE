import apiClient from '@/utils/apiClient';

/**
 * Fetches property details with or without token based on the provided parameter.
 * @param {string} propertyId - The ID of the property.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the property details.
 */
export const getPropertyDetails = async (propertyId, includeToken = true) => {
  const config = {};
  if (!includeToken) {
    config.headers = { Authorization: '' }; // Ensures no Authorization header is sent
  }

  try {
    const response = await apiClient.get(`/properties/${propertyId}`, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch property details:', error);
    throw error;
  }
};

/**
 * Fetches all properties, optionally without the Authorization token.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of properties.
 */
export const fetchProperties = async (includeToken = true) => {
  const config = {};

  try {
    const response = await apiClient.get('/files', {
      params: { associatedEntityId, associatedEntityType },
      headers: { 'Authorization': '' } // 明确不发送 Authorization 头
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};