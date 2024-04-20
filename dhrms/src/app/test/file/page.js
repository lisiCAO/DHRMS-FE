'use client'
import React, { useEffect, useState } from 'react';
import { getFilesByEntityWithoutAuth } from '@/services/fileService'; // 确保路径正确

const FilesComponent = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await getFilesByEntityWithoutAuth(1); 
        setFiles(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch files:', err);
        setError('Failed to fetch files');
        setIsLoading(false);
      }
    };

    loadFiles();
  }, []);

  if (isLoading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Files List</h1>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <h2>{file.fileName}</h2>
            <p>Upload Date: {new Date(file.uploadDate).toLocaleString()}</p>
            <img src={file.publicUrl} alt={file.fileName} style={{ width: '200px', height: 'auto' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesComponent;
