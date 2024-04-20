"use client";
import React, { useState } from 'react';
import { fetchSearchResults } from '@/services/searchService';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const data = await fetchSearchResults(query, false);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
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
      <ul>
        {results.map(result => (
          <li key={result.propertyId}>
            <h2>{result.property.address}</h2>
            <p>ID: {result.propertyId}</p> {/* 渲染 property ID */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;