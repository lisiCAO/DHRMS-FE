"use client"; // This file is a client-side script
import React, { useState } from "react";
import BackgroundPage from "@/components/BackgroundPage";
import { Paper, Box, Button, TextField, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { useRouter as useWebRouter } from "next/router";
import { useRouter } from "next/navigation";

const PropertyCreate = () => {
  // Assuming the image path is stored in a variable named 'backgroundImage'
  const backgroundImage = "/background.jpg"; // Adjust the path

  const [address, setAddress] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const router = typeof window === "undefined" ? useRouter() : useWebRouter();

  const handleRegisterProperty = async () => {
    if (!address) {
      return; // Handle empty address case (optional: display error message)
    }

    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      // Handle API call errors (optional: display error message)
      console.error("Error registering property:", response.statusText);
      return;
    }

    const data = await response.json();
    const propertyId = data.id; // Assuming the response contains the created property ID

    setOpenSnackbar(true); // Open success message pop-up
    setAddress(""); // Clear address input after successful registration

    // Redirect to StepForm page with the property ID as a query parameter
    router.push(`/stepform?propertyId=${propertyId}`);
  };

  return (
    <BackgroundPage backgroundImage={backgroundImage}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Register Your Property</h1>
        <p className="text-gray-600 mb-4">
          Please type your address to register your property.
        </p>
        <Paper
          component="form"
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            py: 0.5,
            width: "40%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, minWidth: 300 }}
            placeholder="Enter your address..."
            inputProps={{ "aria-label": "search" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Divider sx={{ height: 28, mx: 0.5 }} orientation="vertical" />
          <Button variant="contained" color="primary" onClick={handleRegisterProperty}>
            Register
          </Button>
        </Paper>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Message duration in milliseconds
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Property registered successfully!
        </Alert>
      </Snackbar>
    </BackgroundPage>
  );
};

export default PropertyCreate;
