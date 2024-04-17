'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Language } from '@mui/icons-material';
import Footer from '../components/Footer';

import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';

import '../styles/globals.css'; 

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light'); 
  const [modalOpen, setModalOpen] = useState(false); 

  return (
    <>
      <Head>
        <title>您的网站标题</title>
        <meta name="description" content="您的网站描述" />

      </Head>
      <ThemeProvider>
        <LanguageProvider>
          <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
            <AppBar position="static" color="default" elevation={0} className="shadow-none">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setModalOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="flex-grow">
                  QLMS
                </Typography>
                <IconButton color="inherit" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                  <Brightness4 />
                </IconButton>
                <IconButton color="inherit">
                  <Language />
                </IconButton>
              </Toolbar>
            </AppBar>
            <main>{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
