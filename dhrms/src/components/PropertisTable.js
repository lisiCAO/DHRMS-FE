import { Box } from '@mui/material';
import DataGrid, { GridToolbar } from '@mui/x-data-grid';

const PropertiesTable = ({ properties }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={[
          { field: 'id', hide: true },
          { field: 'name', headerName: 'Property Name', width: 200 },
          { field: 'address', headerName: 'Address', width: 200 },
          { field: 'image', headerName: 'Image', width: 130, renderCell: (params) => (<img src={params.value} alt="Property" width="50" />) },
          { field: 'status', headerName: 'Status', width: 130 },
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

export default PropertiesTable;