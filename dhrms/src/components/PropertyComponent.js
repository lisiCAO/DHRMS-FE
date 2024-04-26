import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Image from 'next/image';
import { deleteProperty, deleteMultipleProperties } from '@/services/propertyService';
import { useRouter } from 'next/navigation';



const PropertyComponent = ({ properties, onDelete, onBulkDelete, onSelectProperty, onViewDetail }) => {

  const router = useRouter();
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

  const handleViewDetail = (propertyId) => {
    // 使用 router.push 来编程方式导航
    router.push(`properties/${propertyId}`);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={[
          { field: 'id', hide: true },
          { field: 'address', headerName: 'Address', width: 200 },
          { field: 'postcode', headerName: 'Postcode', width: 130 },
          { field: 'propertytype', headerName: 'Type', width: 130 },
          { field: 'propertydescription', headerName: 'Description', width: 200 },
          { field: 'status', headerName: 'Status', width: 130 },
          {
            field: 'viewDetail',
            headerName: 'View Detail',
            width: 150,
            renderCell: (params) => (
              <Button variant="contained" color="primary" onClick={() => handleViewDetail(params.row.id)}>
                View Details
              </Button>
            ),
          },
          {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => (
              <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
                Delete
              </Button>
            ),
          },
          {
            field: 'select',
            headerName: 'Select',
            width: 150,
            renderCell: (params) => (
              <input
                type="checkbox"
                onChange={() => handleSelectProperty(params.row.id)}
              />
            ),
          },
          // Add other property fields as needed...
        ]}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};

export default PropertyComponent;