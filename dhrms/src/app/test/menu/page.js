"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grow from '@mui/material/Grow';
import Button from '@mui/material/Button';

export default function SimpleGrow() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <IconButton onClick={handleChange}>
        <MenuIcon />
      </IconButton>
      <Grow in={checked} timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            transformOrigin: '0 0 0',
            transform: checked ? 'scale(1)' : 'scale(0)',
          }}
        >
          <Button onClick={() => {}}>Login</Button>
          <Button onClick={() => {}}>About Us</Button>
          {/* Add more buttons as needed */}
        </Box>
      </Grow>
    </Box>
  );
}