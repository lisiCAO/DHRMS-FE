import apiClient from '@apiClient/utils/apiClient';

// Lists all files associated with a given entity (e.g., property)
export const getFilesByEntity = async (associatedEntityId, associatedEntityType) => {
  try {
    const response = await apiClient.get('/api/files', {
      params: { associatedEntityId, associatedEntityType },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to list files:', error);
    throw error;
  }
};

export const uploadFile = async (fileData, associatedEntityId, associatedEntityType) => {
  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('associatedEntityId', associatedEntityId);
  formData.append('associatedEntityType', associatedEntityType);

  try {
    const response = await apiClient.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};

// Retrieves the details of a specific file by its ID
export const getFileDetails = async (fileId) => {
  try {
    const response = await apiClient.get(`/api/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch file details:', error);
    throw error;
  }
};