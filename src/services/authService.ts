import { type UserSignInDTO, type UserSignUpDTO } from '../types/user';
import { apiClient } from './config/axiosConfig';

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
