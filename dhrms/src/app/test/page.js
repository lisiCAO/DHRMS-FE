"use client";

import React, { useEffect, useState } from 'react';
import { fetchProperties } from '@/services/propertyService'; // 确保路径正确

const PropertiesComponent = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties(false);
        setProperties(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError('Failed to fetch properties');
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Properties List</h1>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <h2>{property.address}</h2>
            <p>Postcode: {property.postcode}</p>
            <p>Type: {property.propertytype}</p>
            <p>Description: {property.propertydescription}</p>
            <p>Status: {property.status}</p>
            <div>
              <h3>Amenities:</h3>
              <ul>
                <li>Parking: {property.amenities.parking ? 'Yes' : 'No'}</li>
                <li>Kitchen: {property.amenities.kitchen ? 'Yes' : 'No'}</li>
                <li>Pool: {property.amenities.pool ? 'Yes' : 'No'}</li>
                <li>Bedrooms: {property.amenities.bedrooms}</li>
                <li>Bathrooms: {property.amenities.bathrooms}</li>
                <li>Living Area: {property.amenities.livingArea} sqm</li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesComponent;
