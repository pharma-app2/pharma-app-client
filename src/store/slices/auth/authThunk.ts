import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User, UserWithoutId } from '../../../types/user';
import { registerApi } from '../../../services/authService';
import axios from 'axios';

type Options = {
  // Because "rejectWithValue" receives a string
  rejectValue: string;
};

interface BackendError {
  message: string;
}

export const registerUser = createAsyncThunk<User, UserWithoutId, Options>(
  'auth/registerUser',
  async (userData: UserWithoutId, thunkAPI) => {
    try {
      const response = await registerApi(userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as BackendError;

        if (serverError && serverError.message) {
          return thunkAPI.rejectWithValue(serverError.message);
        }
      }

      return thunkAPI.rejectWithValue('An unexpected error was thrown');
    }
  },
);
