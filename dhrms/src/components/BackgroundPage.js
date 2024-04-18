import Image from 'next/image';
import Box from '@mui/material/Box';

const BackgroundPage = ({ children, backgroundImage }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover', // Adjust background size as needed
        backgroundRepeat: 'no-repeat', // Prevent image tiling
        backgroundPosition: 'center', // Center the image
        backgroundImage: backgroundImage ? `url(/background.jpg)` : 'none', 
      }}
    >
      {children} {/* Your page content goes here */}
    </Box>
  );
};

export default BackgroundPage;