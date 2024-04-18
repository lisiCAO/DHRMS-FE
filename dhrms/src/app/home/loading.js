import Box from '@mui/material/Box';
import LinearProgressWithLabel from '@mui/material/LinearProgress';

const Loading = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <LinearProgressWithLabel />
      </Box>
    );
  };
  
  export default Loading;