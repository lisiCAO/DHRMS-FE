import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; // Corrected the import path
import { debounce } from 'lodash';

/*
Component to display individual property details in a card format.
Includes an image of the property, various data points about the property,
and navigation to the property's detail page when clicked.
*/
const MapCard = ({ image, data, propertyId }) => {
  const router = useRouter(); // Use the correct Next.js useRouter hook for routing

  // Debounced function to handle navigation, preventing rapid accidental clicks
  // Executes at the beginning of the delay period
  const navigateToDetail = debounce(() => {
    router.push(`/properties/${propertyId}`); // Navigate to the detail page of the property
  }, 300, {
    'leading': true,
    'trailing': false
  });

  return (
    <Card
      sx={{ maxWidth: 345, maxHeight: 400, width: '100%', boxSizing: 'border-box' }}
      onClick={navigateToDetail} // Adds click handler to the Card that triggers navigation
    >
      <CardMedia
        component="img"
        height="140"
        image={image || 'default-property-image.jpg'} // Provide a default image if none is available
        alt="Property Image"
      />
      <CardContent>
        {Object.entries(data).map(([key, value]) => (
          <Typography variant="body2" color="text.secondary" key={key}>
            {`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`}  
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default MapCard;
