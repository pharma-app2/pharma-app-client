import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { checkAuthStatus, signInPatient, signOutUser } from './authThunk';
import type { AuthenticatedUser } from '../../../types/user';
import { AuthStatus, type AuthStatusValue } from './authStatus';

interface AuthState {
  userInfo: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  signInSuccess: boolean;
  authStatus: AuthStatusValue;
}

const initialState: AuthState = {
  userInfo: null,
  loading: false,
  error: null,
  signInSuccess: false,
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
        state.signInSuccess = false;
      })
      .addCase(
        signInPatient.fulfilled,
        (state, action: PayloadAction<AuthenticatedUser>) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.signInSuccess = true;
        },
      )
      .addCase(signInPatient.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
          state.signInSuccess = false;
        } else {
          state.error = action.error.message || 'Falha ao autenticar usuário';
          state.signInSuccess = false;
        }
      });

    // Signout user
    builder
      .addCase(signOutUser.pending, (state) => {
        state.authStatus = AuthStatus.LOADING;
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.authStatus = AuthStatus.IDLE;
        state.userInfo = null; // this is what makes user sign out?
        state.signInSuccess = false;
        state.loading = false;
      })
      .addCase(signOutUser.rejected, (state) => {
        state.authStatus = AuthStatus.IDLE;
        state.loading = false;
      });

    // Check auth status reducers
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.authStatus = AuthStatus.LOADING;
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.SUCCEEDED;
        state.userInfo = action.payload; // Restaura a sessão do usuário
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authStatus = AuthStatus.FAILED;
        state.userInfo = null;
        state.loading = false;
      });
  },
});

export const { clearError } = signInPatientSlice.actions;
export default signInPatientSlice.reducer;
