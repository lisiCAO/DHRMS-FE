"use client";
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Paper, TextField, Button, DatePicker, Container } from '@mui/material';

const ApplyForm = () => {
  // const router = useRouter();
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
    // router.push('/next-page');
  };

  const handleCancel = () => {
    // router.back();
  };

  return (
    <Container>
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        <TextField required name="name" label="Name" onChange={handleChange} />
        <DatePicker
          label="Date of Birth"
          value={form.dob}
          onChange={handleDateChange('dob')}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField required type="number" name="age" label="Age" onChange={handleChange} />
        <TextField required type="email" name="email" label="Email" onChange={handleChange} />
        <TextField required type="number" name="phoneNumber" label="Phone Number" onChange={handleChange} />
        <TextField required type="number" name="occupants" label="Occupants" onChange={handleChange} />
        <DatePicker
          label="Lease Start Date"
          value={form.leaseStart}
          onChange={handleDateChange('leaseStart')}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Lease End Date"
          value={form.leaseEnd}
          onChange={handleDateChange('leaseEnd')}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button type="submit">Apply</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </form>
    </Paper>
    </Container>
  );
}

export default ApplyForm;