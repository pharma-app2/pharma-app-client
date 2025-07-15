import axios from 'axios';
import { type UserSignInDTO, type UserSignUpDTO } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const registerApi = (userData: UserSignUpDTO) => {
  return apiClient.post('/auth/signup/patient', userData);
};

export const signInApi = (userData: UserSignInDTO) => {
  return apiClient.post('/auth/signin/patient', userData);
};

export const signOutApi = () => {
  return apiClient.post('/signout');
};

export const checkAuthApi = () => {
  return apiClient.get('/me');
};
