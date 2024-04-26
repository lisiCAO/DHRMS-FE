import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 3,
        px: 2,
        bottom: 0, // Position at the bottom
        width: '100%', // Take up full width
        position: 'relative', 
        zIndex: 1, // Ensure footer is above other elements
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">DHRMS Renting</Typography>
          <Typography variant="body2">
            © {new Date().getFullYear()} DHRMS Renting. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Resources</Typography>
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          <br />
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow us</Typography>
          <Box>
            <Link href="https://facebook.com" color="inherit">
              <Facebook />
            </Link>
            <Link href="https://twitter.com" color="inherit">
              <Twitter />
            </Link>
            <Link href="https://instagram.com" color="inherit">
              <Instagram />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
