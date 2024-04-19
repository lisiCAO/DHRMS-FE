
import { useState } from "react";
import { TextField, Button, Alert, Container, Typography } from "@mui/material";

import { styled } from "@mui/system";

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.forgotPassword({ email });
  
      if (response.success === false) {
        setMessage(response.message);
        setSuccess(false);
        return;
      }
        setSuccess(response.message);
        setMessage(null);
    } catch (error) {
      setMessage("Error resetting password");
      setSuccess(false);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleResetPassword}>
        <TextField
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Reset Password
        </Button>
      </form>
      {message && <Alert severity="error">{message}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </FormContainer>
  );
};

export default ForgotPassword;