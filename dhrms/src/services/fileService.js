import apiClient from '@apiClient/utils/apiClient';

export const uploadFile = (fileData, associatedEntityId, associatedEntityType) => {
  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('associatedEntityId', associatedEntityId);
  formData.append('associatedEntityType', associatedEntityType);

  return apiClient.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const listFiles = (associatedEntityId, associatedEntityType) => {
    return apiClient.get('/files', {
      params: { associatedEntityId, associatedEntityType }
    }).then(response => response.data);
  };
  
export const getFileDetails = (fileId) => {
return apiClient.get(`/files/${fileId}`)
    .then(response => response.data);
};
