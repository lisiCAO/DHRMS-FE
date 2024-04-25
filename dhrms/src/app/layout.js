"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import React from "react";
import Head from "next/head";
import { Container, Box, } from "@mui/material";
import Footer from "@/components/Footer";

import NavBar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <title>DHRMS</title>
        <meta name='description' content='TODO' />
      </Head>
      <body className={inter.className}>

            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <NavBar />
              <Container component="main" sx={{ flexGrow: 1, mt: 8, mb: 2, pt: 5 }}>
                {children}
]
              </Container>
              <Footer />
              </Box>
      </body>
    </html>
  );
}
