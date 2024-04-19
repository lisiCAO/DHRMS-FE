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
import { useRouter as useWebRouter } from "next/router";
import { useRouter } from "next/navigation";

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
    required: true,
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

const steps = [
  ["type", "description", "numberOfRooms", "amenities", "status"],
  ["image"],
];

const StepForm = () => {
  // const router = typeof window === "undefined" ? useRouter() : useWebRouter();
  // const propertyId = router.query.propertyId; // Access the propertyId from the query parameter

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (event, name) => {
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
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
      // handleUpdatePropertyDetails();
      setMessage("Simulated property details update"); // only for testing
      setOpenSnackbar(true);
      setCurrentStep(0); // Reset currentStep to 0 after completing all steps
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleUpdatePropertyDetails = async () => {
  //   if (!propertyId) {
  //     console.error("Property ID not available for update.");
  //     return;
  //   }

  //   const formDataForUpdate = { ...formData };
  //   if (imageFile) {
  //     const formDataWithImage = new FormData();
  //     formDataWithImage.append("image", imageFile);
  //     try {
  //       const response = await fetch("/api/files", {
  //         method: "POST",
  //         body: formDataWithImage,
  //       });

  //       if (!response.ok) {
  //         throw new Error(`API request failed with status ${response.status}`);
  //       }

  //       const data = await response.json();
  //       formDataForUpdate.imageUrl = data.url; // Assuming the response contains the image URL
  //     } catch (error) {
  //       setMessage(error.message);
  //       setOpenSnackbar(true);
  //       return;
  //     }
  //   }

  //   try {
  //     const response = await fetch(`/api/properties/${propertyId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formDataForUpdate),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`API request failed with status ${response.status}`);
  //     }

  //     setMessage("Property details updated successfully!");
  //     setOpenSnackbar(true);

  // };

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="create-property">
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      <Typography variant="h1" sx={{ mb: 4 }}>
        Update Property
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
      {steps[currentStep].map((fieldName) => {
  const field = propertyFormConfig.find((f) => f.name === fieldName);
  if (!field) {
    return null;
  }

  return (
    <FormControl key={field.name} fullWidth sx={{ mb: 2 }}>
     {field.type === "select" ? (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel id={field.name + "-label"}>{field.label}</InputLabel>
    <Select
      labelId={field.name + "-label"}
      value={formData[fieldName] || ""}
      onChange={(event) => handleInputChange(event, fieldName)}
      sx={{ width: "100%" }}
    >
      {field.options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
) : field.type === "file" ? (
  <input
    type="file"
    accept="image/*"
    onChange={(event) => handleInputChange(event, fieldName)}
    name={fieldName}
  />
) : (
  <TextField
    value={formData[fieldName] || ""}
    onChange={(event) => handleInputChange(event, fieldName)}
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
        <Button
          variant="contained"
          type="button"
          disabled={currentStep === 0}
          onClick={handlePreviousStep}
          sx={{ mr: 1 }}
        >
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