import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authThunk';
import type { User } from '../../../types/user';

interface AuthState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  loading: false,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Ações síncronas
    clearError(state) {
      state.error = null;
    },
    resetRegistrationStatus(state) {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Quando a requisição está pendente
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      // Quando a requisição é bem-sucedida
      // .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // state.userInfo = action.payload;
        state.registrationSuccess = true;
      })
      // Quando a requisição falha
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
          state.registrationSuccess = false;
        } else {
          state.error = action.error.message || 'Falha ao registrar usuário';
          state.registrationSuccess = false;
        }
      });
  },
});

export const { clearError, resetRegistrationStatus } = authSlice.actions;
export default authSlice.reducer;
