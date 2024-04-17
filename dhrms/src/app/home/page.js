'use client';
import React, { useState } from 'react';
import { InputBase, Button, Box, Modal, Typography, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import styles from '@/styles/Home.module.css'; // 确保样式路径正确

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Modal for Menu */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className={styles.modalBox}>
          {/* Modal content such as navigation links or menu items */}
        </Box>
      </Modal>

      <Box className={styles.mainContainer}>
        <Typography variant="h5" gutterBottom className={styles.introText}>
          This is paragraph. Find your perfect place to stay.
        </Typography>
        <Paper component="form" className={styles.searchBar}>
          <InputBase
            className={styles.input}
            placeholder="City, Zip, Address"
            startAdornment={<SearchIcon className={styles.searchIcon} />}
          />
          <Button variant="contained" color="primary" className={styles.searchButton}>
            Search
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default HomePage;
