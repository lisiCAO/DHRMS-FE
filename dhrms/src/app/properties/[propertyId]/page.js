'use client'
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPropertyDetails } from '@/services/propertyService';
import { getFilesByEntity } from '@/services/fileService';


const PropertyDetailPage = ({ params }) => {

  const { propertyId } = params.propertyId; // Retrieve the propertyId from the URL
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const propertyData = await getPropertyDetails(propertyId);
        const fileData = await getFilesByEntity(propertyId, 'Property');
        const integratedData = processPropertyData(propertyData, fileData);
        setPropertyDetails(integratedData);
        setImages(propertyImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [propertyId]);

  // Function to handle the Check Availability action
  const checkAvailability = () => {
    console.log('Checking availability for property ID:', propertyId);
    // Add your logic for checking availability here
  };

  // Function to handle the Apply action
  const applyForProperty = () => {
    console.log('Applying for property ID:', propertyId);
    // Add your logic for applying here
  };

  

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h1" gutterBottom>Property Details</Typography>
      <Typography variant="subtitle1" gutterBottom>{propertyDetails.address}</Typography>
      <Typography variant="h3" color="primary" gutterBottom>${propertyDetails.price} / month</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={checkAvailability}>Check Availability</Button>
        </Grid>
      </Grid>

      <Box>
        {/* Image gallery */}
        {propertyDetails.images.map((img, index) => (
          <Card key={index}>
            <CardMedia>
              <Image src={img} alt={`Property image ${index + 1}`} layout="responsive" width="100%" height="100%" />
            </CardMedia>
          </Card>
        ))}
      </Box>

      <Box>
        <Typography paragraph>{propertyDetails.description}</Typography>
        {/* Show more section */}
        <Button>Show more</Button>
      </Box>

      <Grid container spacing={2}>
        {/* Icons for amenities */}
        {propertyDetails.amenities.map((amenity, index) => (
          <Grid item key={index} xs={6} sm={3}>
            <Typography>{amenity}</Typography>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="secondary" onClick={applyForProperty}>Apply</Button>
    </Box>
  );
};

export default PropertyDetailPage;


  