"use client";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Paper, TextField, Button, Container, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from 'next/navigation';

const ApplyForm = () => {
  const router = useRouter();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    dob: Yup.date().required('Date of Birth is required').nullable(),
    age: Yup.number().required('Age is required').positive().integer(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    occupants: Yup.number().required('Number of occupants is required').positive().integer(),
    leaseStart: Yup.date().required('Lease Start Date is required').nullable(),
    leaseEnd: Yup.date().required('Lease End Date is required').nullable(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      dob: null,
      age: '',
      email: '',
      phoneNumber: '',
      occupants: '',
      leaseStart: null,
      leaseEnd: null,
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: Send form data to API
      alert('Application submitted successfully!');
      router.push('/next-page');
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Paper elevation={3}>
          <Typography variant="h4" align="center">Rental Application Form</Typography>
          <Typography variant="subtitle1" align="center">Please fill out the form below to apply.</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
            />
            <DatePicker
              label="Date of Birth"
              value={formik.values.dob}
              onChange={(value) => formik.setFieldValue('dob', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <TextField
              required
              type="number"
              name="age"
              label="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type="string"
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              type="number"
              name="occupants"
              label="Occupants"
              value={formik.values.occupants}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.occupants && Boolean(formik.errors.occupants)}
              helperText={formik.touched.occupants && formik.errors.occupants}
              fullWidth
              margin="normal"
            />
            <DatePicker
              label="Lease Start Date"
              value={formik.values.leaseStart}
              onChange={(value) => formik.setFieldValue('leaseStart', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.leaseStart && Boolean(formik.errors.leaseStart)}
                  helperText={formik.touched.leaseStart && formik.errors.leaseStart}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <DatePicker
              label="Lease End Date"
              value={formik.values.leaseEnd}
              onChange={(value) => formik.setFieldValue('leaseEnd', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.leaseEnd && Boolean(formik.errors.leaseEnd)}
                  helperText={formik.touched.leaseEnd && formik.errors.leaseEnd}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth margin="normal">
              Apply
            </Button>
            <Button onClick={() => router.back()} color="secondary" fullWidth margin="normal">
              Cancel
            </Button>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default ApplyForm;