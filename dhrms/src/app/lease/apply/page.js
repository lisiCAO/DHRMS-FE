"use client";
import { useState } from 'react';
import { Paper, TextField, Button, Container, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from 'next/navigation';

const ApplyForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    dob: null,
    age: '',
    email: '',
    phoneNumber: '',
    occupants: '',
    leaseStart: null,
    leaseEnd: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name) => (newValue) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send form data to API
    alert('Application submitted successfully!');
    router.push('/next-page');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Paper elevation={3}>
          <Typography variant="h4" align="center">Rental Application Form</Typography>
          <Typography variant="subtitle1" align="center">Please fill out the form below to apply.</Typography>
          <form onSubmit={handleSubmit}>
            <TextField required name="name" label="Name" onChange={handleChange} fullWidth margin="normal" />
            <DatePicker
              label="Date of Birth"
              value={form.dob}
              onChange={handleDateChange('dob')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <TextField required type="number" name="age" label="Age" onChange={handleChange} fullWidth margin="normal" />
            <TextField required type="email" name="email" label="Email" onChange={handleChange} fullWidth margin="normal" />
            <TextField required type="string" name="phoneNumber" label="Phone Number" onChange={handleChange} fullWidth margin="normal" />
            <TextField required type="number" name="occupants" label="Occupants" onChange={handleChange} fullWidth margin="normal" />
            <DatePicker
              label="Lease Start Date"
              value={form.leaseStart}
              onChange={handleDateChange('leaseStart')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="Lease End Date"
              value={form.leaseEnd}
              onChange={handleDateChange('leaseEnd')}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <Button type="submit" fullWidth margin="normal">Apply</Button>
            <Button onClick={handleCancel} fullWidth margin="normal">Cancel</Button>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}

export default ApplyForm;