import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { checkAuthStatus, signInPatient } from './authThunk';
import type { AuthenticatedUser } from '../../../types/user';
import { AuthStatus, type AuthStatusValue } from './AuthStatus';

interface AuthState {
  userInfo: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
  authStatus: AuthStatusValue;
}

const initialState: AuthState = {
  userInfo: null,
  loading: false,
  error: null,
  registrationSuccess: false,
  authStatus: AuthStatus.IDLE,
};

const signInPatientSlice = createSlice({
  name: 'signInPatient',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign In reducers
    builder
      .addCase(signInPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(
        signInPatient.fulfilled,
        (state, action: PayloadAction<AuthenticatedUser>) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.registrationSuccess = true;
        },
      )
      .addCase(signInPatient.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
          state.registrationSuccess = false;
        } else {
          state.error = action.error.message || 'Falha ao autenticar usuário';
          state.registrationSuccess = false;
        }
      });

    // Check auth status reducers
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.authStatus = AuthStatus.LOADING;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.SUCCEEDED;
        state.userInfo = action.payload; // Restaura a sessão do usuário
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authStatus = AuthStatus.FAILED;
        state.userInfo = null;
      });
  },
});

export const { clearError } = signInPatientSlice.actions;
export default signInPatientSlice.reducer;
