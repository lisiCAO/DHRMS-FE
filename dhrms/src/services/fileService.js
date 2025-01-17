import apiClient from '@/utils/apiClient'; 

/**
 * Fetches all files associated with a specific entity.
 * @param {string} associatedEntityId - The ID of the associated entity.
 * @param {string} associatedEntityType - The type of the associated entity (e.g., 'property', 'house').
 * @returns {Promise<Object[]>} - A promise that resolves to an array of file objects.
 */
export const getFilesByEntity = async (associatedEntityId, associatedEntityType, includeToken=true) => {
  const config = {};
  if (!includeToken) {
    config.headers = { Authorization: '' }; // Ensures no Authorization header is sent
  }
  try {
    const response = await apiClient.get('/files', {
      params: { associatedEntityId, associatedEntityType }
    }, config);
    return response.data;
  } catch (error) {
    console.error('Failed to list files:', error);
    throw error;
  }
};

/**
 * Uploads a file and associates it with an entity, with or without authentication.
 * @param {File} fileData - The file to be uploaded.
 * @param {string} fileType - The type of the file (e.g., 'image').
 * @param {string} associatedEntityId - The ID of the entity to which the file will be associated.
 * @param {string} associatedEntityType - The type of the entity (e.g., 'property', 'house').
 * @param {number} userId - The ID of the user uploading the file.
 * @param {boolean} useAuth - Determines whether to include authentication token in the request.
 * @returns {Promise<Object>} - A promise that resolves to the uploaded file's data.
 */
export const uploadFile = async (fileData, fileType, associatedEntityId, associatedEntityType, userId, useAuth = true) => {
  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('fileType', fileType);
  formData.append('associatedEntityId', associatedEntityId);
  formData.append('associatedEntityType', associatedEntityType);
  formData.append('userId', userId);

  try {
    const headers = useAuth ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'multipart/form-data', 'Authorization': '' };
    const response = await apiClient.post('/files', formData, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};

/**
 * Retrieves the details of a specific file by its ID.
 * @param {string} fileId - The ID of the file.
 * @returns {Promise<Object>} - A promise that resolves to the details of the file.
 */
export const getFileDetails = async (fileId) => {
  try {
    const response = await apiClient.get(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch file details:', error);
    throw error;
  }
};

/**
 * Uploads a file without authentication and associates it with an entity.
 * @param {File} fileData - The file to be uploaded.
 * @param {string} associatedEntityId - The ID of the entity to which the file will be associated.
 * @param {string} associatedEntityType - The type of the entity (e.g., 'property', 'house').
 * @returns {Promise<Object>} - A promise that resolves to the uploaded file's data.
 */
export const uploadFileWithoutAuth = async (fileData, associatedEntityId, associatedEntityType) => {
  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('associatedEntityId', associatedEntityId);
  formData.append('associatedEntityType', associatedEntityType);

  try {
    const response = await apiClient.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': '' // 明确不发送 Authorization 头
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload file without auth:', error);
    throw error;
  }
};

/**
 * Fetches all files associated with a specific entity without authentication.
 * @param {string} associatedEntityId - The ID of the associated entity.
 * @param {string} associatedEntityType - The type of the associated entity (e.g., 'property', 'house').
 * @returns {Promise<Object[]>} - A promise that resolves to an array of file objects.
 */
export const getFilesByEntityWithoutAuth = async (associatedEntityId, associatedEntityType) => {
  try {
    const response = await apiClient.get('/files', {
      params: { associatedEntityId, associatedEntityType },
      headers: { 'Authorization': '' } // 明确不发送 Authorization 头
    });
    return response.data;
  } catch (error) {
    console.error('Failed to list files without auth:', error);
    throw error;
  }
};
