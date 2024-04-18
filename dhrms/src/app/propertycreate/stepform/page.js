"use client"; // This file is a client-side script
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
} from "@mui/material";


const propertyFormConfig = [
  {
    name: "type",
    label: "Type",
    type: "select",
    options: ["Apartment", "House", "Condo"],
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    name: "numberOfRooms",
    label: "Number of Rooms",
    type: "number",
    required: true,
  },
  {
    name: "amenities",
    label: "Amenities",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Available", "Not Available"],
    required: true,
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
];

const steps = [["type", "description", "numberOfRooms"], ["amenities", "status", "image"]];

const StepForm = ({ router }) => { // Receive router as a prop
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({}); // State for property details
    const [propertyId, setPropertyId] = useState(null); // Property ID retrieved after creation
    const [imageFile, setImageFile] = useState(null); // State for the uploaded image file
    const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "image") {
        setImageFile(event.target.files[0]);
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
    const handleNextStep = async () => {
      if (currentStep === 0 && !formData.type) {
        setMessage("Please select a property type.");
        setOpenSnackbar(true);
        return;
      }
  
      if (currentStep === steps.length - 1 && !imageFile) {
        setMessage("Please upload an image.");
        setOpenSnackbar(true);
        return;
      }
  
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Update property details with image upload upon reaching the last step
        handleUpdatePropertyDetails();
      }
    };
  
    const handlePreviousStep = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };
  
    const handleUpdatePropertyDetails = async () => {
      if (!propertyId) {
        console.error("Property ID not available for update.");
        return;
      }
  
      const formDataWithImage = new FormData();
      formDataWithImage.append("propertyId", propertyId);
      // Append other form data fields
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      if (imageFile) {
        formDataWithImage.append("image", imageFile);
      }
  
      try {
        const response = await fetch("/api/files", {
          method: "POST",
          body: formDataWithImage,
        });
  
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
  
        const data = await response.json();
        setMessage("Property details updated successfully!");
        setOpenSnackbar(true);
        // Redirect to step form page after successful update
        router.push("/step-form"); // Replace "/step-form" with your actual step form route
      } catch (error) {
        setMessage(error.message);
        setOpenSnackbar(true);
      }
    };
  
    useEffect(() => {
      // Simulate retrieving property ID after successful creation (replace with actual logic)
      if (!propertyId && message.includes("Property created successfully")) {
        // Extract property ID from success message (replace with actual logic)
        const propertyIdMatch = message.match(/\d+/);
        if (propertyIdMatch) {
          setPropertyId(propertyIdMatch[0]);
        }
        setMessage(""); // Clear success message after property ID retrieval
      }
    }, [propertyId, message]);
  
    const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  
    const handleSnackbarClose = () => {
      setOpenSnackbar(false);
    };
  
    return (
      <Container className="create-property">
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        <Typography variant="h1" sx={{ mb: 4 }}>
        Create Property
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        {steps[currentStep].map((fieldName) => {
          const field = propertyFormConfig.find((f) => f.name === fieldName);
          if (!field) {
            return null;
          }

          return (
            <FormControl key={field.name} fullWidth sx={{ mb: 2 }}>
              {field.label && <InputLabel>{field.label}</InputLabel>}
              {field.type === "select" ? (
                <Select
                  value={formData[fieldName] || ""}
                  onChange={handleInputChange}
                  label={field.label}
                  sx={{ width: "100%" }}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : field.type === "file" ? (
                <input type="file" accept="image/*" onChange={handleInputChange} name={fieldName} />
              ) : (
                <TextField
                  value={formData[fieldName] || ""}
                  onChange={handleInputChange}
                  label={field.label}
                  type={field.type}
                  multiline={field.type === "textarea"}
                  fullWidth
                  required={field.required}
                />
              )}
            </FormControl>
          );
        })}
        <Button variant="contained" type="button" disabled={currentStep === 0} onClick={handlePreviousStep} sx={{ mr: 1 }}>
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button variant="contained" type="submit">
            Update Property
          </Button>
        ) : (
          <Button variant="contained" type="button" onClick={handleNextStep}>
            Next
          </Button>
        )}
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={message ? (message.includes("success") ? "success" : "error") : "info"}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StepForm;