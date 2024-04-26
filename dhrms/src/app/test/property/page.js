"use client";

import React, { useEffect, useState } from 'react';
import { fetchPropertyList } from '@/services/propertyService'; 
import { useRouter } from 'next/navigation';
import { deleteProperty, deleteMultipleProperties } from '@/services/propertyService';

const PropertiesComponent = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await fetchPropertyList(false);
      setProperties(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setError('Failed to fetch properties');
      setIsLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await deleteProperty(propertyId, false);
      loadProperties(); // Reload the list after deletion
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await deleteMultipleProperties(selectedProperties, false);
      loadProperties(); // Reload the list after deletion
    } catch (error) {
      console.error('Error deleting properties:', error);
    }
  };

  const handleSelectProperty = (id) => {
    setSelectedProperties(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const navigateToDetail = (propertyId) => {
    // 使用 router.push 来编程方式导航
    router.push(`property/${propertyId}`);
  };

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Properties List</h1>
      {properties.length > 0 && (
        <button onClick={handleBulkDelete}>Delete Selected</button>
      )}
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <input
              type="checkbox"
              checked={selectedProperties.includes(property.id)}
              onChange={() => handleSelectProperty(property.id)}
            />
            <h2>{property.address}</h2>
            <p>Postcode: {property.postcode}</p>
            <p>Type: {property.propertytype}</p>
            <p>Description: {property.propertydescription}</p>
            <p>Status: {property.status}</p>
            <button onClick={() => navigateToDetail(property.id)}>View Details</button>
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
            <button onClick={() => handleDelete(property.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesComponent;
