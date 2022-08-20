import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regexUtil } from '../util/regex';
import API from '../api/api';

interface IEmailExistResponse {
  exist: boolean;
}

const RegisterPage: React.FC = () => {
  const navigation = useNavigate();

  const [formValue, setformValue] = React.useState({
    email: '',
    name: '',
    password: '',
    passwordCheck: ''
  });

  const [emailValidState, setEmailValidState] = useState(true);
  const [emailExistState, setEmailExistState] = useState(false);
  const [passwordValidState, setPasswordValidState] = useState(true);
  const [passwordCheckValidState, setPasswordCheckValidState] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });

    if (!regexUtil.isValidEmail(formValue.email)) {
      return setEmailValidState(false);
    }

    setEmailValidState(true);

    if (!regexUtil.isValidPassword(formValue.password)) return setPasswordValidState(false);
    setPasswordValidState(true);

    if (formValue.password !== formValue.passwordCheck) return setPasswordCheckValidState(false);
    setPasswordCheckValidState(true);
  };

  const isEmailError = (): boolean => {
    if (!emailValidState) return true;
    if (emailExistState) return true;
    return false;
  };

  const emailErrorMessage = (): string => {
    if (!emailValidState) return '잘못된 이메일 형식입니다.';
    if (emailExistState) return '이미 가입된 이메일입니다.';
    return '';
  };

  const handleEmailBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    if (!emailValidState || !event.target.value) return;
    const response = (await API.get(
      `/auth/emailExist?email=${event.target.value}`
    )) as IEmailExistResponse;
    setEmailExistState(response.exist);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await API.post('/auth/signup', formValue);
    //리다이렉트 시키기에는 로그인 api도 로그인 페이지도 없음 .. 공용 에러처리 어케할지 고민 필요..
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
              error={isEmailError()}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              helperText={emailErrorMessage()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              error={!passwordValidState}
              onChange={handleChange}
              helperText={passwordValidState ? '' : '잘못된 비밀번호 형식입니다.'}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="passwordCheck"
              label="Password Check"
              name="passwordCheck"
              type="password"
              error={!passwordCheckValidState}
              onChange={handleChange}
              helperText={passwordCheckValidState ? '' : '비밀번호가 일치하지 않습니다.'}
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
  padding: '20px',
  maxWidth: '400px',
  margin: 'auto'
};

export default RegisterPage;
