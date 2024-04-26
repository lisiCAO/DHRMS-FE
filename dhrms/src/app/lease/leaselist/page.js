"use client";
import { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import axios from 'axios';
import LeaseTable from '@/components/LeaseTable';


const mockLeases = [
  { id: 1, startDate: '2022-01-01', endDate: '2022-12-31', monthlyRent: '1000', deposit: '2000', terms: '1 year', status: 'Active' },
  { id: 2, startDate: '2022-02-01', endDate: '2023-01-31', monthlyRent: '1200', deposit: '2400', terms: '1 year', status: 'Pending' },
  // Add more leases as needed...
];

const LeaseList = () => {
  const [leases, setLeases] = useState([]);
  const [selectedLease, setSelectedLease] = useState(null);

  useEffect(() => {
    // Fetch leases from the API when the component mounts
    setTimeout(() => {
      setLeases(mockLeases);
    }, 1000); // Simulate network delay
  }, []);

  //   useEffect(() => {
//     
//     axios.get('/api/leases').then((response) => {
//       setLeases(response.data);
//     }).catch((error) => {
//       setError(error.message);
//     });
//     
//   }, []);

const handleViewDetail = (leaseId) => {
    router.push(`/lease-details/${leaseId}`);
  };
  


  return (
    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
      <Box sx={{ width: '100%' }}>
        <LeaseTable leases={leases} onViewDetail={handleViewDetail} />
        
      </Box>
    </Paper>
  );
};

export default LeaseList;