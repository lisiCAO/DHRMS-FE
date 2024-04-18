"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import React, { useState } from "react";
import Head from "next/head";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon, Brightness4, Language } from "@mui/icons-material";
import Footer from "@/components/Footer";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <html lang="en">
      <Head>
        <title>DHRMS</title>
        <meta name='description' content='TODO' />
      </Head>
      <body className={inter.className}>
      <ThemeProvider>
        <LanguageProvider>
          <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
            <AppBar
              position="fixed"
              color='default'
              elevation={0}
              className='shadow-none'>
              <Toolbar
                style={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => setModalOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant='h6'
                  style={{ textAlign: "center", flexGrow: 1 }}>
                  QLMS
                </Typography>
                <div>
                  <IconButton
                    color='inherit'
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }>
                    <Brightness4 />
                  </IconButton>
                  <IconButton color='inherit'>
                    <Language />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>

            <main>{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
        </body>
    </html>
  );
}
