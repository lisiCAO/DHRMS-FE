"use client"
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { updatePropertyDetails } from '@/services/propertyService'; 
import { uploadFile } from '@/services/fileService';
import { Container,Checkbox, FormControlLabel, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField, Snackbar, Alert, LinearProgress } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

const StepForm = (propertyId) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (event, name) => {
    const { type, checked, value } = event.target;
    setFormData({...formData, [name]: type === 'checkbox' ? checked : value});
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const handleNext = async () => {
      // Validate current step fields before proceeding
      if (!validateCurrentStep()) {
        setMessage('Please fill in all required fields.');
        setOpenSnackbar(true);
        return;
      }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        await updatePropertyDetails(propertyId, formData);
        await uploadImages();
        setMessage("Property updated and images uploaded successfully!");
      } catch (error) {
        setMessage("Failed to update property and upload images: " + error.message);
      }
      setOpenSnackbar(true);
    }
  };
  // Validates that all required fields in the current step have values
  const validateCurrentStep = () => {
    return steps[currentStep].every(fieldName => {
      const field = propertyFormConfig.find(f => f.name === fieldName);
      if (field.required) {
        return formData[fieldName]; // Check that the field has a value
      }
      return true;
    });
  };


  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      // Create object URLs for the accepted files
      const mappedFiles = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      
      // Update your state with the new files
      setImageFiles(prevFiles => [...prevFiles, ...mappedFiles]);
    }
  });

  const renderDropzoneField = () => {
    return (
      <div {...getRootProps()} className="dropzone bg-gray-100 p-4 rounded-lg border-dashed border-2 border-gray-300 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      imageFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [imageFiles]);

  const uploadImages = async () => {
    const uploads = imageFiles.map(file =>
      uploadFile(file, 'image', propertyId, 'property', '1', false) 
    );
    await Promise.all(uploads);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const renderFormFields = () => {
    const isLastStep = currentStep === steps.length - 1;
    const canGoNext = isLastStep || Object.keys(formData).length === steps[currentStep].length;
  
    return (
      <div className="space-y-6">
        {steps[currentStep].map(fieldName => {
          const field = propertyFormConfig.find(f => f.name === fieldName);
  
          if (field.type === 'checkbox') {
            return (
              <FormGroup key={field.name} className="flex items-center space-x-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[fieldName] || false}
                      onChange={e => handleInputChange(e, fieldName)}
                      name={fieldName}
                      color="primary"
                    />
                  }
                  label={field.label}
                />
              </FormGroup>
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
                      <img src={file.preview} alt={`Preview ${index}`} className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm" />
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
              value={formData[fieldName] || ''}
              onChange={e => handleInputChange(e, fieldName)}
              className="bg-white shadow-sm border-gray-300"
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <Container component="main" maxWidth="md" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Typography component="h1" variant="h5" className="text-xl font-bold mb-4">Update Property</Typography>
      <LinearProgress variant="determinate" value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
      <form onSubmit={e => e.preventDefault()} className="space-y-4">
        {renderFormFields()}

        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-black font-bold py-2 px-4 rounded"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
          >
            {currentStep === steps.length - 1 ? "Submit All" : "Next"}
          </Button>
        </div>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
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
