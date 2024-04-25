import React from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";

const Menu = ({ checked }) => {
  return (
    <Grow
      in={checked}
      style={{ transformOrigin: "0 0 0" }}
      {...(checked ? { timeout: 1000 } : {})}>
      <Box
        sx={{
          position: "absolute",
          top: "64px", // Adjust this value to match the height of your navbar
          left: 0,
          width: "100%", // Cover the whole width
          height: "calc(100vh - 64px)", // Adjust this value to match the height of your navbar
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjusted for better readability
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          zIndex: 1200, // Ensure it's above other elements
        }}>
        {/* Other buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start", // Align to start
            "& > *": {
              m: 1.1, // Margin for each button
            },
          }}>
          <Button onClick={() => {}}>Home</Button>
          <Button onClick={() => {}}>About Us</Button>
          <Button onClick={() => {}}>Get In Touch</Button>
        </Box>

        {/* Central box with buttons */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            height: "60%", // Cover the whole height
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            "& > *": {
              m: 5, // Margin for each button
              width: "150px", // Cover the whole width
            },
          }}>
          <Button variant='contained' onClick={() => {}}>
            Login
          </Button>
          <Button variant='contained' onClick={() => {}}>
            Register
          </Button>

          {/* // set different menu for different user roles
          <Button variant='contained' onClick={() => {}}>
            Create Property
          </Button>
          <Button variant='contained' onClick={() => {}}>
            Properties List
          </Button>
          <Button variant='contained' onClick={() => {}}>
            Application List
          </Button>
          <Button variant='contained' onClick={() => {}}>
            Lease List
          </Button> */}

        </Box>
      </Box>
    </Grow>
  );
};

export default Menu;
