import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Image from 'next/image';

const PropertyComponent = ({ properties, onDelete, onBulkDelete, onSelectProperty, onViewDetail }) => {
  const handleDelete = (propertyId) => {
    onDelete(propertyId);
  };

  const handleSelect = (propertyId) => {
    onSelectProperty(propertyId);
  };

  const handleViewDetail = (propertyId) => {
    onViewDetail(propertyId);
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
                onChange={() => handleSelect(params.row.id)}
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