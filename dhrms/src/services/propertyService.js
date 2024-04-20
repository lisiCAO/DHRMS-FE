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
export const fetchProperties = async (includeToken = true, associatedEntityId, associatedEntityType) => {
  const config = {};
  if (!includeToken) {
    config.headers = { 'Authorization': '' };
  }
  try {
    const response = await apiClient.get('/files', {
      params: { associatedEntityId, associatedEntityType },
      headers: config.headers
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};


/**
 * Posts or updates property details, with the option to include or exclude the Authorization token.
 * @param {Object} propertyData - The property data to be posted.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
 */
export const postPropertyDetails = async (propertyData, includeToken = true) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(includeToken ? {} : { Authorization: '' }) // Conditionally adds Authorization header
    }
  };

  try {
    // The endpoint '/api/properties' is assumed to be the correct URL for posting property data.
    const response = await apiClient.post('/api/properties', propertyData, config);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
    return response.data; // Assuming the server returns the created or updated property data
  } catch (error) {
    console.error('Failed to post property details:', error);
    throw error;
  }
};

/**
 * Updates property details for a given property ID, with the option to include or exclude the Authorization token.
 * @param {string} propertyId - The ID of the property to update.
 * @param {Object} propertyData - The updated property data to be sent.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
 */
export const updatePropertyDetails = async (propertyId, propertyData, includeToken = true) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(includeToken ? {} : { Authorization: '' }) // Conditionally adds Authorization header
    }
  };

  try {
    // Construct the URL with the property ID
    const url = `/api/properties/${propertyId}`;
    
    // Execute the PUT request with the updated property data
    const response = await apiClient.put(url, propertyData, config);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
    return response.data; // Assuming the server returns the updated property data
  } catch (error) {
    console.error('Failed to update property details:', error);
    throw error;
  }
};
