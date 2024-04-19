import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert, Container, Typography } from "@mui/material";

import { styled } from "@mui/system";

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage("Password does not meet complexity requirements.");
      return;
    }

    try {
      // Create user data object
      const userData = {
        email: formData.email,
        password: formData.password,
        username: formData.firstName + " " + formData.lastName, // Combine first and last name
      };

      // Send user data to API
      const response = await ApiService.register(userData);
      setSuccess("Account created successfully: " + response.username);
      setMessage(null);
      router.push("/login"); // Redirect to login page
    } catch (error) {
      setMessage(error.message || "Failed to register.");
      setSuccess(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <FormContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Create an Account
      </Typography>
      {message && <Alert severity="error">{message}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          label="First Name"
        />
        <TextField
          fullWidth
          margin="normal"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          label="Last Name"
        />
        <TextField
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email Address"
        />
        <TextField
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          type="password"
        />
        <TextField
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </form>
    </FormContainer>
  );
};

export default Registration;