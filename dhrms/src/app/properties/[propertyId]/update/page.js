"use client";
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { updatePropertyDetails } from '@/services/propertyService'; 
import { uploadFile } from '@/services/fileService';
import { Container, Checkbox, FormControl, FormControlLabel, Typography, Button, TextField, Snackbar, Alert, InputLabel, Select, MenuItem, LinearProgress, Box, FormGroup, FormHelperText } from '@mui/material';
import Image from 'next/image';

const StepForm = ({ propertyId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const newFiles = acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }));
      setImageFiles(currentFiles => [...currentFiles, ...newFiles]);
    }
  });

  useEffect(() => {
    return () => {
      imageFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [imageFiles]);

  const formik = useFormik({
    initialValues: {
      address: '',
      postcode: '',
      propertyType: '',
      propertyDescription: '',
      status: '',
      parking: false,
      kitchen: false,
      pool: false,
      bedrooms: '',
      bathrooms: '',
      livingArea: '',
      // Add other initial values here
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Address is required'),
      postcode: Yup.string().required('Postcode is required'),
      propertyType: Yup.string().required('Property type is required'),
      propertyDescription: Yup.string().required('Property description is required'),
      status: Yup.string().required('Status is required'),
      bedrooms: Yup.number().positive('Bedrooms must be a positive number').required('Number of bedrooms is required'),
      bathrooms: Yup.number().positive('Bathrooms must be a positive number').required('Number of bathrooms is required'),
      livingArea: Yup.number().positive('Living area must be a positive number').required('Living area is required'),
      // Add other validations here
    }),
    onSubmit: async (values) => {
      try {
        await updatePropertyDetails(propertyId, values);
        await uploadImages();
        setMessage("Property updated and images uploaded successfully!");
        setOpenSnackbar(true);
      } catch (error) {
        setMessage("Failed to update property and upload images: " + error.message);
        setOpenSnackbar(true);
      }
    },
  });

  const uploadImages = async () => {
    const uploads = imageFiles.map(file =>
      uploadFile(file, 'image', propertyId, 'property', '1', false) 
    );
    await Promise.all(uploads);
  };

  const renderDropzoneField = () => {
    return (
      <div {...getRootProps()} className="dropzone bg-gray-100 p-4 rounded-lg border-dashed border-2 border-gray-300 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag &quot;n&quot; drop some files here, or click to select files</p>
      </div>
    );
  };

  const renderFormFields = () => {
    return steps[currentStep].map(fieldName => {
      const field = propertyFormConfig.find(f => f.name === fieldName);

      if (field.type === 'checkbox') {
        return (
          <FormGroup key={field.name} className="flex items-center space-x-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values[fieldName] || false}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name={fieldName}
                  color="primary"
                />
              }
              label={field.label}
            />
          </FormGroup>
        );
      }
  
      if (field.type === 'select') {
        return (
          <FormControl key={field.name} fullWidth className="mt-4">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formik.values[fieldName] || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={field.label}
              error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
              helperText={formik.touched[fieldName] && formik.errors[fieldName]}
            >
              {field.options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      if (field.type === 'file') {
        return (
          <Box key={field.name} className="mt-4">
            <FormHelperText>{field.label}</FormHelperText>
            {renderDropzoneField()}
            <Box className="flex flex-wrap mt-2 gap-4 justify-center">
              {imageFiles.map((file, index) => (
                <Box key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
                  <Image src={file.preview} alt={`Preview ${index}`} className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm" />
                </Box>
              ))}
            </Box>
          </Box>
        );
      }

      return (
        <TextField
          key={field.name}
          type={field.type}
          label={field.label}
          variant="outlined"
          fullWidth
          required={field.required}
          multiline={field.type === 'textarea'}
          rows={field.type === 'textarea' ? 3 : 1}
          value={formik.values[fieldName]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
          helperText={formik.touched[fieldName] && formik.errors[fieldName]}
          className="bg-white shadow-sm border-gray-300"
        />
      );
    });
  };

  return (
    <Container component="main" maxWidth="md" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Typography component="h1" variant="h5" className="text-xl font-bold mb-4">Update Property</Typography>
      <LinearProgress variant="determinate" value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {renderFormFields()}
        <div className="flex justify-between mt-4">
          <Button onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0} className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-black font-bold py-2 px-4 rounded">
            Previous
          </Button>
          <Button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {currentStep === steps.length - 1 ? "Submit All" : "Next"}
          </Button>
        </div>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};


// Configuration for the property form to define input types, labels, and requirements
const propertyFormConfig = [
  { name: "address", label: "Address", type: "text", required: true },
  { name: "postcode", label: "Postcode", type: "text", required: true },
  { name: "propertyType", label: "Property Type", type: "select", options: ["Apartment", "House", "Condo"], required: true },
  { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
  { name: "status", label: "Status", type: "select", options: ["Available", "Not Available"], required: true },
  { name: "parking", label: "Parking", type: "checkbox" },
  { name: "kitchen", label: "Kitchen", type: "checkbox" },
  { name: "pool", label: "Pool", type: "checkbox" },
  { name: "bedrooms", label: "Bedrooms", type: "number" },
  { name: "bathrooms", label: "Bathrooms", type: "number" },
  { name: "livingArea", label: "Living Area (sq meters)", type: "number" },
  { name: "image", label: "Image", type: "file"}
];

// Defines the steps in the form. Each array represents fields for one step of the form.
const steps = [
  ["address", "postcode", "propertyType", "propertyDescription", "status"],
  ["parking", "kitchen", "pool", "bedrooms", "bathrooms", "livingArea"],
  ["image"]
];

export default StepForm;
