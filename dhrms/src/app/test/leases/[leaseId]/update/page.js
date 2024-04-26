'use client';

import React, { useEffect, useState } from 'react';
import { useRouter , useParams } from 'next/navigation';
import { getLeaseDetails, updateLeaseDetails } from '@/services/leaseService';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';

const UpdateLease = () => {
  const router = useRouter();
  const { leaseId } = useParams();
  const [lease, setLease] = useState({
    propertyId: '',
    tenantUserId: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    leaseStatus: '',
    terms: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (leaseId) {
      const fetchLease = async () => {
        setLoading(true);
        try {
          const data = await getLeaseDetails(leaseId, false);
          setLease(data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch lease details');
          setLoading(false);
        }
      };

      fetchLease();
    }
  }, [leaseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLease(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateLeaseDetails(leaseId, lease, false);
      router.push('/test/leases');
    } catch (err) {
      setError(err.message || 'Failed to update lease');
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: '20px auto' }}>
      <Typography variant="h6">Update Lease</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {Object.keys(lease).map(key => (
          <TextField
            key={key}
            margin="normal"
            required
            fullWidth
            id={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            name={key}
            value={lease[key]}
            onChange={handleChange}
          />
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Lease
        </Button>
      </Box>
    </Paper>
  );
};

export default UpdateLease;
