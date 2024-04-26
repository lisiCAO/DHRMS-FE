import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Drawer, Button } from '@mui/material';
import ApplicationCard from '@/components/ApplicationCard';
import Image from 'next/image';

const PropertiesTable = ({ properties, selectedApplication }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleViewDetail = (property) => {
    setSelectedProperty(property);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={[
          { field: 'id', hide: true },
          { field: 'name', headerName: 'Property Name', width: 200 },
          { field: 'address', headerName: 'Address', width: 200 },
          { field: 'image', headerName: 'Image', width: 130, renderCell: (params) => (<Image src={params.value} alt="Property" width="50" />) },
          { field: 'status', headerName: 'Status', width: 130 },
          {
            field: 'viewDetail',
            headerName: 'View Detail',
            width: 150,
            renderCell: (params) => (
              <Button variant="contained" color="primary" onClick={() => handleViewDetail(params.row)}>
                View Detail
              </Button>
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
      <Drawer anchor="right" open={selectedProperty !== null} onClose={() => setSelectedProperty(null)}>
        {selectedProperty && <ApplicationCard property={selectedProperty} />}
      </Drawer>
    </Box>
  );
};

export default PropertiesTable;