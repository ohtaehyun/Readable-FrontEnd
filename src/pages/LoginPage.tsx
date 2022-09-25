import { Box, Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const RegisterPage: React.FC = () => {
  useNavigate();

  const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
  });

  const [emailValidState, setEmailValidState] = useState(true);
  const [passwordValidState, setPasswordValidState] = useState(true);
  const [loginFailedState, setLoginFailedState] = useState(false);
  type IInputType = 'email' | 'password' | 'passwordCheck' | 'name';

  const handleChange = (event: React.BaseSyntheticEvent) => {
    const inputType = event.target.name as IInputType;
    const inputValue = event.target.value;
    setformValue({
      ...formValue,
      [inputType]: inputValue
    });

    switch (inputType) {
        case 'email':
            if(inputValue.length>0)
                setEmailValidState(true);
            break;
        case 'password':
            if(inputValue.length>0)
                setPasswordValidState(true);
          break;
        default:
          break;
      }
  };

  const emailErrorMessage = (): string => {
    if (!emailValidState) 
    return '이메일을 입력해주세요';
    return '';
  };

  const passwordErrorMessage = (): string =>{
    if(!passwordValidState)
        return "패스워드를 입력해주세요.";
    return '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(formValue.email.length <= 0){
        setEmailValidState(false);
        return;
    }
    if(formValue.password.length <= 0){
        setPasswordValidState(false);
        return;
    }
    setLoginFailedState(true);
    await API.post('/auth/login', formValue);
  };

  return (
    <Grid2 container justifyContent={'center'}>
      <Grid2 xs={6}>
        <Box style={maxWidth}>
          <Typography component="h1" variant="h5">
            Readable
          </Typography>
          <Box component={'form'} onSubmit={handleSubmit} onChange={handleChange}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!emailValidState}
              helperText={emailErrorMessage()}
              variant="standard"
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              error={!passwordValidState}
              helperText={passwordErrorMessage()}
              variant="standard"
            />
            <Box display="flex" justifyContent="flex-end">
                {loginFailedState ? 
                <span style={{color:"red",fontSize:"13px"}}>
                    이메일또는 비밀번호가 일치하지 않습니다.
                </span>:
                <></>
                }
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

const maxWidth = {
  padding: '20px',
  maxWidth: '400px',
  margin: 'auto'
};

export default RegisterPage;
