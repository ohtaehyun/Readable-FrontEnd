import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_PORT, API_URL } from '../constants/apiConfig';

const API_CONFIG = {
  baseURL: API_URL + ':' + API_PORT,
  timeout: 1000
};

const API = axios.create(API_CONFIG);

const ErrorHandler = (error: AxiosError) => {
  console.log('error :', error);
  return Promise.reject(error);
};

API.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log('Request Intercepor', config);
  return config;
}, ErrorHandler);

API.interceptors.response.use((res: AxiosResponse) => {
  console.log('Response Interceptor', res);
  return res.data;
}, ErrorHandler);

export default API;
