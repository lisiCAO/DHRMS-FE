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
 * Fetch the property list without an authentication token.
 * @returns {Promise} Promise object represents the response data of property list
 */
export const fetchPropertyList = async (includeToken = true) => {
  const config = {};
  if (!includeToken) {
    config.headers = { Authorization: '' }; // Ensures no Authorization header is sent
  }
  try {
    const response = await apiClient.get('/properties', config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch property list:', error);
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
  const config = {};
  if (!includeToken) {
    config.headers = { Authorization: '' }; 
  }

  try {
    // The endpoint '/api/properties' is assumed to be the correct URL for posting property data.
    const response = await apiClient.post('/properties/only-address', propertyData, config);
    // Check if the HTTP status code is in the range 200-299
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Assuming the server returns the created or updated property data
    } else {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
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
    const url = `/properties/${propertyId}`;
    
    // Execute the PUT request with the updated property data
    const response = await apiClient.put(url, propertyData, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    } // Assuming the server returns the updated property data
  } catch (error) {
    console.error('Failed to update property details:', error);
    throw error;
  }
};

/**
 * Deletes a property by its ID, with the option to include or exclude the Authorization token.
 * @param {string | string[]} propertyId - The ID of the property or an array of IDs for bulk deletion.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 */
export const deleteProperty = async (propertyId, includeToken = true) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(includeToken ? {} : { Authorization: '' }) // Conditionally adds Authorization header
    }
  };

  try {
    const url = Array.isArray(propertyId)
      ? `/properties?ids=${propertyId.join(',')}` // For bulk deletion
      : `/properties/${propertyId}`; // For single deletion
    const response = await apiClient.delete(url, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete property:', error);
    throw error;
  }
};

/**
 * Deletes multiple properties one by one by their IDs.
 * @param {string[]} propertyIds - An array of property IDs to be deleted.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in each request.
 * @returns {Promise} - A promise that resolves when all deletions have been processed.
 */
export const deleteMultipleProperties = async (propertyIds, includeToken = true) => {
  try {
    const deletePromises = propertyIds.map(id => deleteProperty(id, includeToken));
    await Promise.all(deletePromises);
    return { message: "Properties deleted successfully" };
  } catch (error) {
    console.error('Failed to delete properties:', error);
    throw error;
  }
};

