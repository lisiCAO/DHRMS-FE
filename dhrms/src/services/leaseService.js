import apiClient from '@/utils/apiClient';

  /**
 * Fetches all leases from the server.
 * @returns {Promise<Object[]>} A promise that resolves to an array of lease data.
 */
export const fetchLeasesList = async (includeToken = true) => {
    const config = {};
    if (!includeToken) {
      config.headers = { Authorization: '' };
    }

    try {
      const response = await apiClient.get('/leases', config);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch leases:', error);
      throw error;
    }
  };

/**
 * Fetches lease details by lease ID.
 * @param {number} leaseId - The ID of the lease.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the lease details.
 */
export const getLeaseDetails = async (leaseId, includeToken = true) => {
  const config = includeToken ? {} : { headers: { Authorization: '' } };

  try {
    const response = await apiClient.get(`/leases/${leaseId}`, config);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch lease details:', error);
    throw error;
  }
};

/**
 * Creates a new lease.
 * @param {Object} leaseData - The lease data to be created.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the created lease details.
 */
export const createLease = async (leaseData, includeToken = true) => {
  const config = includeToken ? {} : { headers: { Authorization: '' } };

  try {
    const response = await apiClient.post('/leases', leaseData, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to create lease:', error);
    throw error;
  }
};

/**
 * Updates lease details for a given lease ID.
 * @param {number} leaseId - The ID of the lease to update.
 * @param {Object} leaseData - The updated lease data to be sent.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the updated lease details.
 */
export const updateLeaseDetails = async (leaseId, leaseData, includeToken = true) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(includeToken ? {} : { Authorization: '' })
    }
  };

  try {
    const response = await apiClient.put(`/leases/${leaseId}`, leaseData, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to update lease details:', error);
    throw error;
  }
};

/**
 * Deletes a lease by its ID.
 * @param {number} leaseId - The ID of the lease to be deleted.
 * @param {boolean} includeToken - Specifies whether to include the Authorization token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 */
export const deleteLease = async (leaseId, includeToken = true) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(includeToken ? {} : { Authorization: '' })
    }
  };

  try {
    const response = await apiClient.delete(`/leases/${leaseId}`, config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete lease:', error);
    throw error;
  }
};
