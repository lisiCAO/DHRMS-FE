'use client'
import React, { useState } from 'react';
import { uploadFile } from '@/services/fileService'; 

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [associatedEntityId, setAssociatedEntityId] = useState('');
  const [associatedEntityType, setAssociatedEntityType] = useState('property');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file && fileType && associatedEntityId && associatedEntityType && userId) {
      try {
        const uploadedData = await uploadFile(
          file,
          fileType,
          associatedEntityId,
          associatedEntityType,
          userId,
          false // assuming authentication is required
        );
        console.log('File uploaded successfully:', uploadedData);
        // Handle the successful upload here (e.g., display a message, redirect, etc.)
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle the error case here
      }
    } else {
      console.error('All fields are required.');
      // Notify the user that all fields are required
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <input
          type="text"
          placeholder="File type"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Associated Entity ID"
          value={associatedEntityId}
          onChange={(e) => setAssociatedEntityId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Associated Entity Type"
          value={associatedEntityType}
          onChange={(e) => setAssociatedEntityType(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadPage;
