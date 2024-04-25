"use client";
import "./page.css";
import React from 'react';
import { Button, TextField, Container, Grid, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import axios from 'axios';

const LeaseCreate = () => {
  const formik = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
      monthlyRent: '',
      deposit: '',
      terms: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/leases', {
          ...values,
          status: 'pending',
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align='center'>
        Rental Agreement
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1">
              THIS AGREEMENT is made and entered into this 18th day of April, 2024, by and between ___________(hereinafter &quot;Owner&quot;) and ___________(hereinafter &quot;Renter&quot;).
            </Typography>
            <Typography variant="body1">
              1. **TERM:** This lease shall commence on 
            </Typography>
            <DatePicker
              required
              label="Start Date"
              value={formik.values.startDate}
              onChange={(value) => formik.setFieldValue('startDate', value)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <Typography variant="body1">
              and continue (unless sooner terminated) until 
            </Typography>
            <DatePicker
              required
              label="End Date"
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue('endDate', value)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <Typography variant="body1">
              2. **RENT:** Renter agrees to pay Owner the rent of 
            </Typography>
            <TextField
              required
              label="Monthly Rent"
              value={formik.values.monthlyRent}
              onChange={formik.handleChange}
              name="monthlyRent"
              fullWidth
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
              value={formik.values.deposit}
              onChange={formik.handleChange}
              name="deposit"
              fullWidth
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
              value={formik.values.terms}
              onChange={formik.handleChange}
              name="terms"
              fullWidth
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
            <Button className="no-print" variant="contained" color="primary" type="submit">
              Send
            </Button>
            <Button className="no-print" variant="contained" color="secondary" type="reset">
              Cancel
            </Button>
            <Button onClick={handlePrint} fullWidth margin="normal">Print</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Paper>
    </LocalizationProvider>
  );
};

export default LeaseCreate;
