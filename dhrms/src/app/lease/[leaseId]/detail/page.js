"use client";

import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const LeaseDetails = () => {
  const [lease, setLease] = useState(null);
  const params = useParams();
  const router = useRouter();
  const leaseId = params.leaseId;

  useEffect(() => {
    // Fetch the lease details from the API when the component mounts
    axios.get(`/api/leases/${leaseId}`).then((response) => {
      setLease(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, [leaseId]);

  const handlePrint = () => {
    window.print();
  };

  const handleApprove = () => {
    // Update the lease status to "approved"
    axios.put(`/api/leases/${leaseId}`, { status: 'approved' }).then(() => {
      router.push('/lease-list');
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleDeny = () => {
    // Update the lease status to "denied"
    axios.put(`/api/leases/${leaseId}`, { status: 'denied' }).catch((error) => {
      console.error(error);
    });
  };

  const handleCancel = () => {
    router.back();
  };

  if (!lease) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align='center'>
        Lease Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">
            THIS AGREEMENT is made and entered into this 18th day of April, 2024, by and between ___________(hereinafter &quot;Owner&quot;) and ___________(hereinafter &quot;Renter&quot;).
          </Typography>
          <Typography variant="body1">
            1. **TERM:** This lease shall commence on 
          </Typography>
          <TextField
            required
            label="Start Date"
            value={lease.startDate}
            fullWidth
            disabled
          />
          <Typography variant="body1">
            and continue (unless sooner terminated) until 
          </Typography>
          <TextField
            required
            label="End Date"
            value={lease.endDate}
            fullWidth
            disabled
          />
          <Typography variant="body1">
            2. **RENT:** Renter agrees to pay Owner the rent of 
          </Typography>
          <TextField
            required
            label="Monthly Rent"
            value={lease.monthlyRent}
            fullWidth
            disabled
          />
          <Typography variant="body1">
            per month, due and payable monthly on the 1st day of each month.
          </Typography>
          <Typography variant="body1">
            3. **SECURITY DEPOSIT:** Upon the due execution of this Agreement, Renter will deposit with Owner the sum of 
          </Typography>
          <TextField
            required
            label="Deposit"
            value={lease.deposit}
            fullWidth
            disabled
          />
          <Typography variant="body1">
            receipt of which is hereby acknowledged by Owner, as security for any damage caused to the Premises during the term hereof.
          </Typography>
          <Typography variant="body1">
            4. **TERMS:** The terms of this agreement will last for 
          </Typography>
          <TextField
            required
            label="Terms"
            value={lease.terms}
            fullWidth
            disabled
          />
          <Typography variant="body1">
            5. **USE OF PREMISES:** The premises shall be used as a residence for the Renter only. The Renter will comply with all laws and rules affecting the Premises.
          </Typography>
          <Typography variant="body1">
            **Renter:**
            Name: ___________
            Signature: ___________ Date: ___________
            **Owner:**
            Name: ___________
            Signature: ___________ Date: ___________
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleApprove}>
            Sign
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeny}>
            Deny
          </Button>
          <Button variant="outlined">
            Cancel
          </Button>
          <Button onClick={handlePrint} fullWidth margin="normal">Print</Button>
        </Grid>
      </Grid>
    </Container>
    </Paper>
    </LocalizationProvider>
  );
};

export default LeaseDetails;