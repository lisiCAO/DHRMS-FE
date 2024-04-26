"use client";
import React, { useState } from 'react';
import { fetchSearchResults } from '@/services/searchService';
import { getFilesByEntityWithoutAuth } from '@/services/fileService';
import Image from 'next/image';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const searchResults = await fetchSearchResults(query, false);
      const filesPromises = searchResults.map(result =>
        getFilesByEntityWithoutAuth(result.propertyId)
          .then(files => ({
            ...result,
            files: files
          }))
          .catch(error => {
            console.error('Failed to fetch files for property:', result.propertyId, error);
            return { ...result, files: [] };
          })
      );
      const propertiesWithFiles = await Promise.all(filesPromises);
      setResults(propertiesWithFiles);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term..."
      />
      <button onClick={handleSearch}>Search</button>
      {isLoading ? <p>Loading...</p> : null}
      <ul>
        {results.map(result => (
          <li key={result.propertyId}>
            <h2>{result.property.address}</h2>
            {result.files.map(file => (
              <Image key={file.id} src={file.publicUrl} alt={file.fileName} style={{ width: '100px', height: 'auto' }} />
            ))}
            <p>ID: {result.propertyId}</p>
            <p>Postcode: {result.property.postcode}</p>
            <p>Status: {result.property.status}</p>
            <p>Bedrooms: {result.property.amenities.bedrooms}</p>
            <p>Bathrooms: {result.property.amenities.bathrooms}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
