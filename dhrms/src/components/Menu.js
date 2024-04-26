
import React from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Menu = ({ checked }) => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <Grow
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}>
      <Box
        sx={{
          position: 'absolute',
          top: '64px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 64px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          zIndex: 1200,
        }}>
        {/* Left top */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mb: 3 }}>
          <Button onClick={() => navigate('/')} sx={{ mb: 1 }}>Home</Button>
          <Button onClick={() => navigate('/about')} sx={{ mb: 1 }}>About Us</Button>
          <Button onClick={() => navigate('/contact')} sx={{ mb: 1 }}>Get In Touch</Button>
        </Box>
        {/* Grid */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/home')}>Search Properties</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/properties')}>Properties List</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/properties/create')}>Register Property</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/lease/applicationlist')}>Application List</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/test')}>Test</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/login')}>Login</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/register')}>Register</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={() => navigate('/lease/payment')}>payment</Button>
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
};

export default Menu;
