import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/auth/registerPatientSlice';
import signInPatientReducer from './slices/auth/signInPatientSlice';
import appointmentReducer from './slices/appointments/appointmentSlice';
import availabilitySearchReducer from './slices/availabilities/availabilitySearchSlice';
import pharmacistProfileReducer from './slices/pharmacistProfiles/pharmacistProfileSlice';
import pharmacistAppointmentReducer from './slices/appointments/pharmacistAppointmentSlice';
import scheduleReducer from './slices/schedules/scheduleSlice';

export const store = configureStore({
  reducer: {
    // A chave 'register' aqui define como o estado será chamado no seletor global
    // Ex: useSelector((state) => state.register.loading)
    register: registerReducer,
    signIn: signInPatientReducer,
    appointments: appointmentReducer,
    availabilitySearch: availabilitySearchReducer,
    pharmacistProfile: pharmacistProfileReducer,
    pharmacistAppointments: pharmacistAppointmentReducer,
    schedule: scheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
