import axios from 'axios';
import { type User } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RegisterData = Omit<User, 'id'>;

export const registerApi = (userData: RegisterData) => {
  return axios.post(`${API_BASE_URL}/auth/signup/patient`, userData);
};
