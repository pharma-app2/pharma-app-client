import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    // A chave 'auth' aqui define como o estado será chamado no seletor global
    // Ex: useSelector((state) => state.auth.loading)
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
