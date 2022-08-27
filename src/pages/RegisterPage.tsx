import { Box, Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regexUtil } from '../util/regex';
import API from '../api/api';

interface IEmailExistResponse {
  exist: boolean;
}

const RegisterPage: React.FC = () => {
  useNavigate();

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
        setEmailValidState(regexUtil.isValidEmail(inputValue));
        break;
      case 'password':
        setPasswordValidState(regexUtil.isValidPassword(inputValue));
        setPasswordCheckValidState(inputValue === formValue.passwordCheck);
        break;
      case 'passwordCheck':
        setPasswordCheckValidState(formValue.password === inputValue);
        break;
      case 'name':
        break;
      default:
        break;
    }
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
        <Box style={maxWidth}>
          <Typography component="h1" variant="h5">
            Readable
          </Typography>
          <Box component={'form'} onSubmit={handleSubmit} onChange={handleChange}>
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
              error={!emailValidState || emailExistState}
              onBlur={handleEmailBlur}
              helperText={emailErrorMessage()}
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              variant="standard"
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
              helperText={
                passwordValidState
                  ? ''
                  : '비밀번호는 영문 대문자, 소문자, 숫자를 포함하여 8 ~ 20 자리로 설정해주세요.'
              }
              variant="standard"
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
              helperText={passwordCheckValidState ? '' : '비밀번호가 일치하지 않습니다.'}
              variant="standard"
            />
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                Register
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
