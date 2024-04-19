import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const MapCard = ({ image, data }) => {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 400, width: '100%', boxSizing: 'border-box' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Image description"
      />
      <CardContent>
        {Object.entries(data).map(([key, value]) => (
          <Typography variant="body2" color="text.secondary" key={key}>
            {`${key}: ${value}`}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default MapCard;
