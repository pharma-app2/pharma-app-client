// src/store/slices/pharmacistAppointmentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type {
  PharmacistAppointment,
  PharmacistAppointmentState,
} from '../../../types/pharmacistAppointment';
import { fetchPharmacistAppointmentsApi } from '../../../services/appointmentService';

export const fetchPharmacistAppointments = createAsyncThunk<
  PharmacistAppointment[],
  void,
  { rejectValue: string }
>('pharmacistAppointments/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchPharmacistAppointmentsApi();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.log({ error });
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao buscar agendamentos.',
    );
  }
});

const initialState: PharmacistAppointmentState = {
  appointments: [],
  status: 'idle',
  error: null,
};

const pharmacistAppointmentSlice = createSlice({
  name: 'pharmacistAppointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacistAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPharmacistAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchPharmacistAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? null;
      });
  },
});

export default pharmacistAppointmentSlice.reducer;
