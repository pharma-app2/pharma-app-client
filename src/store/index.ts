import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/auth/registerPatientSlice';
import signInPatientReducer from './slices/auth/signInPatientSlice';

export const store = configureStore({
  reducer: {
    // A chave 'register' aqui define como o estado será chamado no seletor global
    // Ex: useSelector((state) => state.register.loading)
    register: registerReducer,
    signIn: signInPatientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
