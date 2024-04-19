"use client"; // This file is a client-side script
import { useState, useEffect } from "react";
import {Paper, Button, Container, Box, Typography } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import Registration from "@/components/Registration";
import ForgotPassword from "@/components/ForgotPassword";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

// Dynamically import Modal to ensure it's not server-side rendered
const Modal = dynamic(() => import('@mui/material').then((mod) => mod.Modal), {
  ssr: false,
});


const AuthPage = () => {
  const router = useRouter();
  const view = router && router.query ? router.query.view : null;
  const [activeView, setActiveView] = useState(view || "default");


  useEffect(() => {
    setActiveView(view || "default");
  }, [view]);

  const renderAuthComponent = () => {
    switch (activeView) {
      case "login":
        return <LoginForm />;
      case "register":
        return <Registration />;
      case "forgot-password":
        return <ForgotPassword />;
      default:
        return (
          <FormContainer>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              To continue, log in to QLMS
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => router.push("/auth/google")}
            >
              Continue with Google
            </Button>
            <Box sx={{ textAlign: "center", mt: 3 }}>or</Box>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setActiveView("login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setActiveView("register")}
            >
              Register
            </Button>
          </FormContainer>
        );
    }
  };

  return (
    <Container>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h5" align="center">
            QLSM
          </Typography>
          {renderAuthComponent()}
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Copyright © QLMS, Inc. 2024
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;