"use client"; // This file is a client-side script
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert, Container, Typography, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    role: "",
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage("Password does not meet complexity requirements.");
      return;
    }

    try {
      // Create user data object
      const userData = {
        role: formData.role,
        username: formData.username,
        password: formData.password,
        email: formData.email,
      };

      // Send user data to API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      setSuccess("Account created successfully: " + data.username);
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
        Register a User
      </Typography>
      {message && <Alert severity="error">{message}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <Select
          fullWidth
          margin="normal"
          name="role"
          value={formData.role}
          onChange={handleChange}
          label="Role"
        >
          <MenuItem value="landlord">Landlord</MenuItem>
          <MenuItem value="tenant">Tenant</MenuItem>
        </Select>
        <TextField
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          label="Username"
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email Address"
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

export default AdminRegistration;