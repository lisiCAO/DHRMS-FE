"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyDetails, updatePropertyDetails } from '@/services/propertyService';

const UpdatePropertyPage = () => {
  const [form, setForm] = useState({
    ownerUserId: '',
    address: '',
    postcode: '',
    propertytype: '',
    propertydescription: '',
    amenities: {
      parking: false,
      kitchen: false,
      pool: false,
      bedrooms: 0,
      bathrooms: 0,
      livingArea: 0
    },
    status: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()
  const router = useRouter();
  const propertyId = params.propertyId;

  useEffect(() => {
    if (!propertyId) return;
// Before setting form data, ensure all fields are initialized properly
const loadPropertyDetails = async () => {
  try {
    const data = await getPropertyDetails(propertyId, false);
    console.log(data);
    setForm(data);
    setIsLoading(false);
  } catch (err) {
    console.error('Failed to fetch property details:', err);
    setError('Failed to fetch property details');
    setIsLoading(false);
  }
};


    loadPropertyDetails();
  }, [propertyId]);

  const handleInputChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenitiesChange = (field, value) => {
    const numValue = Number(value); 
    setForm(prev => ({
      ...prev,
      amenities: { ...prev.amenities, [field]: isNaN(numValue) ? 0 : numValue }
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await updatePropertyDetails(propertyId, form, false);
      router.push('/test/property'); // Redirect back to the list after update
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };
 
  if (isLoading) return <div>Loading property details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Property Details</h1>
      <div>
        <label>Postcode:
          <input type="text" value={form.postcode} onChange={(e) => handleInputChange('postcode', e.target.value)} />
        </label>
      </div>
      <div>
        <label>Property Type:
          <select value={form.propertytype} onChange={(e) => handleInputChange('propertytype', e.target.value)}>
            <option value="">Select a property type</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="CONDO">Condo</option>
            <option value="TOWNHOUSE">Townhouse</option>
          </select>
        </label>
      </div>
      <div>
        <label>Description:
          <textarea value={form.propertydescription} onChange={(e) => handleInputChange('description', e.target.value)} />
        </label>
      </div>
      <div>
        <label>Status:
          <select value={form.status} onChange={(e) => handleInputChange('status', e.target.value)}>
            <option value="">Select Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="NOTAVAILABLE">Not Available</option>
          </select>
        </label>
      </div>
      <div>
        <h3>Amenities:</h3>
        <label>Parking:
          <input type="checkbox" checked={form.amenities.parking} onChange={(e) => handleAmenitiesChange('parking', e.target.checked)} />
        </label>
        <label>Kitchen:
          <input type="checkbox" checked={form.amenities.kitchen} onChange={(e) => handleAmenitiesChange('kitchen', e.target.checked)} />
        </label>
        <label>Pool:
          <input type="checkbox" checked={form.amenities.pool} onChange={(e) => handleAmenitiesChange('pool', e.target.checked)} />
        </label>
        <label>Bedrooms:
          <input type="number" value={form.amenities.bedrooms} onChange={(e) => handleAmenitiesChange('bedrooms', parseInt(e.target.value))} />
        </label>
        <label>Bathrooms:
          <input type="number" value={form.amenities.bathrooms} onChange={(e) => handleAmenitiesChange('bathrooms', parseInt(e.target.value))} />
        </label>
        <label>Living Area (sqm):
          <input type="number" value={form.amenities.livingArea} onChange={(e) => handleAmenitiesChange('livingArea', parseFloat(e.target.value))} />
        </label>
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => router.back()}>Cancel</button>
    </form>
  );
};

export default UpdatePropertyPage;
