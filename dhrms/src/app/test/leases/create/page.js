'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, Autocomplete } from '@mui/material';
import { createLease } from '@/services/leaseService'; 
import { fetchPropertyList } from '@/services/propertyService';

const CreateLeaseForm = () => {
    const [leaseData, setLeaseData] = useState({
        propertyId: '',
        tenantUserId: '',
        startDate: '',
        endDate: '',
        monthlyRent: '',
        deposit: '',
        leaseStatus: '',
        terms: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLeaseData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            const createdLease = await createLease(leaseData,false);
            console.log('Lease created successfully:', createdLease);
            // Reset form after successful submission
            setLeaseData({
                propertyId: '',
                tenantUserId: '',
                startDate: '',
                endDate: '',
                monthlyRent: '',
                deposit: '',
                leaseStatus: '',
                terms: ''
            });
            setError(''); // Clear any errors
        } catch (err) {
            console.error('Error creating lease:', err);
            setError(err.message || 'Failed to create lease');
        }
        setSubmitting(false);
    };    
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const data = await fetchPropertyList(false);
                setProperties(data);
            } catch (error) {
                console.error("Error loading properties:", error);
            }
        };

        loadProperties();
    }, []);

    const handlePropertySelect = (event, value) => {
        setLeaseData(prev => ({ ...prev, propertyId: value ? value.id : '' }));
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 600, margin: '20px auto' }}>
            <Typography variant="h6">Create New Lease</Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Autocomplete
                    options={properties}
                    getOptionLabel={(option) => `${option.address} (${option.id})`}
                    onChange={handlePropertySelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Property"
                            error={!!errors.propertyId}
                            helperText={errors.propertyId}
                        />
                    )}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="tenantUserId"
                    label="Tenant User ID"
                    name="tenantUserId"
                    value={leaseData.tenantUserId}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="datetime-local"
                    id="startDate"
                    label="Start Date"
                    name="startDate"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={leaseData.startDate}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="datetime-local"
                    id="endDate"
                    label="End Date"
                    name="endDate"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={leaseData.endDate}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="monthlyRent"
                    label="Monthly Rent"
                    name="monthlyRent"
                    value={leaseData.monthlyRent}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="deposit"
                    label="Deposit"
                    name="deposit"
                    value={leaseData.deposit}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="leaseStatus"
                    label="Lease Status"
                    name="leaseStatus"
                    value={leaseData.leaseStatus}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="terms"
                    label="Terms"
                    name="terms"
                    value={leaseData.terms}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={submitting}
                >
                    {submitting ? 'Creating...' : 'Create Lease'}
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateLeaseForm;
