import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { registerUser } from '../api'; 

const Register = () => {
  const paperStyle = { padding: 20, height: 'auto', width: 300, margin: "20px auto" };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser(name, email, password); 
      setSuccess('Registration successful');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonAddAlt1Icon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 1 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label='Name'
            name="name"
            placeholder='Enter your name'
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label='Email'
            name="email"
            type="email"
            placeholder='Enter your email'
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label='Password'
            name="password"
            type="password"
            placeholder='Create a password'
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label='Confirm Password'
            name="confirmPassword"
            type="password"
            placeholder='Confirm your password'
            variant="outlined"
            fullWidth
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <Button
            type='submit'
            color='primary'
            variant="contained"
            fullWidth
            style={btnStyle}
          >
            Register
          </Button>
        </form>
        <Typography sx={{ mt: 1 }}>
          Already have an account?
          <RouterLink to="/login" style={{ marginLeft: 4, textDecoration: 'none', color: '#1976d2' }}>
            Sign In
          </RouterLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
