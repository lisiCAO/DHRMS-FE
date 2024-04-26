'use client';

import { Box, Typography, Button, Card, CardMedia, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPropertyDetails } from '@/services/propertyService';
import { getFilesByEntityWithoutAuth } from '@/services/fileService';
import { useParams } from 'next/navigation';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PoolIcon from '@mui/icons-material/Pool';
import HouseIcon from '@mui/icons-material/House';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PropertyDetailPage = () => {
  const params = useParams();
  const propertyId = params.propertyId;
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getPropertyDetails(propertyId, false);
        const fileData = await getFilesByEntityWithoutAuth(propertyId, 'property');
        setProperty(propertyData);
        setImages(fileData.map(file => file.publicUrl));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [propertyId]);

  if (!property) {
    return <Box>Loading property details...</Box>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Property Details</Typography>
      <Typography variant="h6" gutterBottom>Address: {property.address}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardMedia component={HouseIcon} />
          <Typography>Type: {property.propertyType}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia component={CheckCircleOutlineIcon} />
          <Typography>Status: {property.status}</Typography>
        </Grid>
      </Grid>
      <Box>
        <Typography paragraph>Description: {property.propertyDescription}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          {property.amenities.parking && <LocalParkingIcon />}
          {property.amenities.kitchen && <KitchenIcon />}
          {property.amenities.pool && <PoolIcon />}
        </Grid>
        <Grid item>
          <Typography>{property.amenities.bedrooms} Bedrooms</Typography>
          <Typography>{property.amenities.bathrooms} Bathrooms</Typography>
          <Typography>{property.amenities.livingArea} sqm Living Area</Typography>
        </Grid>
      </Grid>
      <Box sx={{ marginY: 4 }}>
        {images.map((img, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardMedia component="img" image={img} alt={`Property image ${index + 1}`} />
          </Card>
        ))}
      </Box>
      <Button variant="contained" color="primary" startIcon={<VisibilityIcon />}>Show More</Button>
    </Box>
  );
};

export default PropertyDetailPage;

