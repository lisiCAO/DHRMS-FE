"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import React, { Suspense ,useEffect} from "react";
import Head from "next/head";
import { Container, Box, } from "@mui/material";
import Footer from "@/components/Footer";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Loading from "./loading";
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
      <AppRouterCacheProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <NavBar />
              <Container component="main" sx={{ flexGrow: 1, mt: 8, mb: 2, pt: 5 }}>
                <Suspense fallback={<Loading />}>
                {children}
                </Suspense>
              </Container>
              <Footer />
              </Box>
          </LanguageProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
