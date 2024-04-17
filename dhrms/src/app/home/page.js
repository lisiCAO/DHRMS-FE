'use client';
import React, { useState } from 'react';
import { InputBase, Button, Box, Modal, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import styles from '@/styles/Home.module.css';
const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Modal for Menu */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className={styles.modalBox}>
          {/* Modal content here */}
        </Box>
      </Modal>

      <Box className="p-4 text-center">
        <Typography variant="subtitle1" className="mb-4">
          This is paragraph. Find your perfect place to stay.
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" className="mb-4">
          <InputBase
            className="border p-2 rounded-l-lg"
            placeholder="Enter address or condition"
            startAdornment={<SearchIcon />}
          />
          <Button variant="contained" color="primary" className="rounded-r-lg">
            Search
          </Button>
        </Box>
      </Box>
      </>
  );
};

export default HomePage;
