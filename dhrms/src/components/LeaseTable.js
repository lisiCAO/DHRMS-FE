import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

const LeaseTable = ({ leases }) => {
  const router = useRouter();

  const handleViewDetail = (leaseId) => {
    router.push(`/lease-details/${leaseId}`);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={leases}
        columns={[
          { field: 'dateCreated', headerName: 'Date Created', width: 150 },
          { field: 'id', hide: true },
          { field: 'startDate', headerName: 'Start Date', width: 150 },
          { field: 'endDate', headerName: 'End Date', width: 150 },
          { field: 'monthlyRent', headerName: 'Monthly Rent', width: 150 },
          { field: 'deposit', headerName: 'Deposit', width: 150 },
          { field: 'terms', headerName: 'Terms', width: 150 },
          { field: 'status', headerName: 'Status', width: 130 },
          {
            field: 'viewDetail',
            headerName: 'View Detail',
            width: 150,
            renderCell: (params) => (
              <Button variant="contained" color="primary" onClick={() => handleViewDetail(params.row.id)}>
                View Detail
              </Button>
            ),
          },
          // Add other lease fields as needed...
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

export default LeaseTable;