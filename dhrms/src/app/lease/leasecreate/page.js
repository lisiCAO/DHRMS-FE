import React from 'react';
import { Button, TextField, Container, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/lab';
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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Rental Agreement
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1">
              THIS AGREEMENT is made and entered into this 18th day of April, 2024, by and between ___________(hereinafter "Owner") and ___________(hereinafter "Renter").
            </Typography>
            <Typography variant="body1">
              1. **TERM:** This lease shall commence on 
            </Typography>
            <DatePicker
              label="Start Date"
              value={formik.values.startDate}
              onChange={(value) => formik.setFieldValue('startDate', value)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <Typography variant="body1">
              and continue (unless sooner terminated) until 
            </Typography>
            <DatePicker
              label="End Date"
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue('endDate', value)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <Typography variant="body1">
              2. **RENT:** Renter agrees to pay Owner the rent of 
            </Typography>
            <TextField
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
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
            <Button variant="contained" color="secondary" type="reset">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LeaseCreate;
