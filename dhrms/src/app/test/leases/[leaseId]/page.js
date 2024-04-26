'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // or next/router if you're using Next.js
import { Button, Box, Typography, CircularProgress, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { getLeaseDetails, deleteLease } from '@/services/leaseService';

const LeaseDetail = () => {
    const params = useParams()
  const leaseId = params.leaseId;
  const [lease, setLease] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const loadLeaseDetails = async () => {
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

    loadLeaseDetails();
  }, [leaseId]);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteLease = async () => {
    try {
      await deleteLease(leaseId);
      setOpenDeleteDialog(false);
      // Optionally navigate back or to another page
      console.log('Lease deleted successfully');
    } catch (err) {
      setError('Failed to delete lease');
      console.error(err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Lease Details</Typography>
      {lease ? (
        <Box sx={{ m: 2 }}>
          <Typography variant="h6">Property ID: {lease.propertyId}</Typography>
          <Typography variant="h6">Tenant User ID: {lease.tenantUserId}</Typography>
          <Typography variant="h6">Start Date: {lease.startDate}</Typography>
          <Typography variant="h6">End Date: {lease.endDate}</Typography>
          <Typography variant="h6">Monthly Rent: {lease.monthlyRent}</Typography>
          <Typography variant="h6">Deposit: {lease.deposit}</Typography>
          <Typography variant="h6">Lease Status: {lease.leaseStatus}</Typography>
          <Typography variant="h6">Terms: {lease.terms}</Typography>
          <Button variant="contained" color="secondary" onClick={handleOpenDeleteDialog}>
            Delete Lease
          </Button>
        </Box>
      ) : (
        <Typography>No lease details available</Typography>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this lease? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteLease} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaseDetail;
