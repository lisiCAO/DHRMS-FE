"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { getPropertyDetails } from '@/services/propertyService'; 
import { deleteProperty } from '@/services/propertyService'; 
const PropertyDetailPage = () => {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()
  const propertyId = params.propertyId;

  useEffect(() => {
    if (!propertyId) return; 
    const loadPropertyDetails = async () => {
      try {
        const data = await getPropertyDetails(propertyId, false); 
        setProperty(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch property details:', err);
        setError('Failed to fetch property details');
        setIsLoading(false);
      }
    };

    loadPropertyDetails();
  }, [propertyId]); 

  const handleDelete = async () => {
    try {
      await deleteProperty(propertyId, true);
      router.push('test/property'); 
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (isLoading) {
    return <div>Loading property details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>No property details available.</div>;
  }

  return (
    <div>
      <h1>Property Details</h1>
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
      <button onClick={handleDelete}>Delete This Property</button>
    </div>
  );
};

export default PropertyDetailPage;