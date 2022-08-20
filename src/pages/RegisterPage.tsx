import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigation = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerData = new FormData(event.currentTarget);
    console.log(registerData.get('email'));
    console.log(registerData.get('name'));
    console.log(registerData.get('password'));
    console.log(registerData.get('passwordCheck'));
  };

  return (
    <Grid2 container justifyContent={'center'}>
      <Grid2 xs={6}>
        <Card style={CardStyle}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component={'form'} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="passwordCheck"
              label="Password Check"
              name="passwordCheck"
              type="password"
              autoFocus
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
          </Box>
        </Card>
      </Grid2>
    </Grid2>
  );
};

const CardStyle = {
  padding: '20px'
};

export default RegisterPage;
