import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert, Container, Typography } from "@mui/material";

import { styled } from "@mui/system";

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const { login, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      await login(credentials);
      setSuccess("Logged in successfully");
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setMessage("Credentials are incorrect. Please try again!");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <FormContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <TextField
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        {message && <Alert severity="error">{message}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Sign in
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;