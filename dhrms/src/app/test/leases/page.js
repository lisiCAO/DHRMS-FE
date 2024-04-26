'use client';
import React, { useEffect, useState } from 'react';
import { fetchLeasesList } from '@/services/leaseService';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const LeaseList = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeases = async () => {
      setLoading(true);
      try {

        const data = await fetchLeasesList(false);
        setLeases(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leases');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLeases();
  }, []);

  return (
    <Paper style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h4" style={{ marginBottom: '16px' }}>Lease List</Typography>
      {loading ? (
        <Typography>Loading leases...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <List>
          {leases.map(lease => (
            <ListItem key={lease.id}>
              <ListItemText
                primary={`Lease ID: ${lease.id} - Tenant ID: ${lease.tenantUserId}`}
                secondary={`Start Date: ${lease.startDate} - End Date: ${lease.endDate} - Status: ${lease.leaseStatus}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default LeaseList;
