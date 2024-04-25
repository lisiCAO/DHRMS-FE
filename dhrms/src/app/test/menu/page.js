"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

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
      <Drawer
        anchor="left"
        open={checked}
        onClose={handleChange}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // This makes the paper half-transparent
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button onClick={() => {}}>Login</Button>
          <Button onClick={() => {}}>About Us</Button>
          {/* Add more buttons as needed */}
          <Grow in={checked}>{icon}</Grow>
          {/* Conditionally applies the timeout prop to change the entry speed. */}
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            {icon}
          </Grow>
        </Box>
      </Drawer>
    </Box>
  );
}