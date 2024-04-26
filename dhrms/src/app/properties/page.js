"use client";
import React, { useEffect, useState } from 'react';
import { Paper, Box } from '@mui/material';
import { fetchPropertyList } from '@/services/propertyService'; 
import { useRouter } from 'next/navigation';
import { deleteProperty, deleteMultipleProperties } from '@/services/propertyService';
import  PropertyComponent  from '@/components/PropertyComponent';

const PropertiesList = () => {
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
    router.push(`property/${propertyId}`);
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
      <Box sx={{ width: '100%' }}>
        <PropertyComponent properties={properties} onDelete={handleDelete} onBulkDelete={handleBulkDelete} onSelectProperty={handleSelectProperty} onViewDetail={navigateToDetail} />
      </Box>
    </Paper>
  );
};

export default PropertiesList;
