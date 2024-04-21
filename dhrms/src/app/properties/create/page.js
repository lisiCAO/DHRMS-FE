"use client"; 
import React, { useState, useEffect, useRef } from "react";
import { Paper, Box, Button, InputBase, Snackbar, Alert, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { postPropertyDetails } from "@/services/propertyService";

const libraries = ["places"];

const PropertyCreate = () => {
  const [address, setAddress] = useState("");
  const [propertyId, setPropertyId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const autocompleteRef = useRef(null);
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };
  
  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setAddress(place.formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleRegisterProperty = async () => {
    if (!address) {
      setSnackbarMessage("Please enter an address.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const propertyData = {
        address,
        ownerUserId: 1  
      };
  
      const data = await postPropertyDetails(propertyData, false);
  
      setPropertyId(data.id); 
      setDialogOpen(true);
      setOpenSnackbar(true);
      setSnackbarMessage("Property registered successfully!");
      setSeverity("success");
    } catch (error) {
      console.error("Error registering property:", error);
      setSnackbarMessage(error.message || "Error occurred.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDialogClose = (agree) => {
    setDialogOpen(false);
    if (agree && propertyId) { 
      router.push(`/properties/${propertyId}/update`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          width: "100%",
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
            flexDirection: { xs: 'column', sm: 'row' }, 
            px: 1, 
            py: 0.5,
            width: "40%",
            minWidth: { xs: 330, sm: 450},
            m: 2, 
            backgroundColor: 'background.paper' 
          }}
        >
          {isLoaded ? (
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  minWidth: 300,
                  fontSize: '1rem', 
                  padding: '10px 15px', 
                  backgroundColor: '#fff', 
                  borderRadius: '4px', 
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)', 
                  '& .MuiInputBase-input': {
                    transition: 'border-color 0.3s, box-shadow 0.3s', 
                    borderColor: 'rgba(0, 0, 0, 0.23)', 
                    '&:focus': {
                      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.25)', 
                      borderColor: '#1976d2' 
                    }
                  }
                }}
                placeholder="Enter your address..."
                inputProps={{ "aria-label": "search" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Autocomplete>
          ) : <div>Loading...</div>}
          <Divider sx={{ height: 28, mx: 0.5}}  orientation={{ xs: "horizontal", sm: "vertical" }} />
          <Button variant="contained" color="primary" onClick={handleRegisterProperty}>
            Register
          </Button>
        </Paper>
        <Dialog
          open={dialogOpen}
          onClose={() => handleDialogClose(false)}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                borderRadius: 2, 
                padding: '20px', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
              }
            }
          }}
        >
          <DialogTitle>{"Complete Property Information"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to complete the property information now?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Adjusted to bottom center
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PropertyCreate;
