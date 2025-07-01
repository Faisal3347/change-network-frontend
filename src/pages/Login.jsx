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
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Cookies from 'js-cookie';
import { loginUser } from '../api';

const Login = () => {
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const data = await loginUser(email, password);
      Cookies.set('token', data.token, { expires: 1 });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>

        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label='Email'
            name="email"
            placeholder='Enter email'
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 2 }}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label='Password'
            name="password"
            placeholder='Enter password'
            type='password'
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 2 }}
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type='submit'
            color='primary'
            variant="contained"
            fullWidth
            style={btnStyle}
          >
            Sign in
          </Button>
        </form>

        <Typography sx={{ mt: 1 }}>
          Don’t have an account?
          <Link to="/register" style={{ marginLeft: 4 }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
