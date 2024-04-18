import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import LinearProgressWithLabel from './LinearProgress';  

const Loading = ({ value }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
};

Loading.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Loading;
