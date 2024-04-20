"use client"; 
import React, { useState, useEffect } from "react";
// import BackgroundPage from "@/components/BackgroundPage";
import { Paper, Box, Button, TextField, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";

const PropertyCreate = () => {
  // const backgroundImage = "/background.jpg"; 
  const [address, setAddress] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const router = useRouter();

  const handleRegisterProperty = async () => {
    if (!address) {
      setSnackbarMessage("Please enter an address.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error("Failed to register property.");
      }

      const data = await response.json();
      const propertyId = data.id;

      setOpenSnackbar(true);
      setSnackbarMessage("Property registered successfully!");
      setSeverity("success");
      setAddress(""); 
      router.push(`/stepform?propertyId=${propertyId}`);
    } catch (error) {
      console.error("Error registering property:", error);
      setSnackbarMessage(error.message || "Error occurred.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    // <BackgroundPage backgroundImage={backgroundImage}>
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
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
        <Alert severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </>
    // </BackgroundPage>
  );
};

export default PropertyCreate;
