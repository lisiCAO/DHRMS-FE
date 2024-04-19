"use client"; // This file is a client-side script
import { useState, useEffect } from "react";
import { Button, Modal, Container, Box, Typography } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import Registration from "@/components/Registration";
import ForgotPassword from "@/components/ForgotPassword";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

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
      <Modal open={true}>
        <Modal.Header>
          <Modal.Title>QLSM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderAuthComponent()}
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center w-100">
            <p>Copyright © QLMS, Inc. 2024</p>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AuthPage;