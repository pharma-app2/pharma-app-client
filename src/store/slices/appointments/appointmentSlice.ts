import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { Appointment, AppointmentState } from '../../../types/appointment';
import { fetchFutureAppointmentsApi } from '../../../services/appointmentService';

export const fetchFutureAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>('appointments/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchFutureAppointmentsApi();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao buscar agendamentos.',
    );
  }
});

const initialState: AppointmentState = {
  appointments: [],
  // TODO: mudar para enum
  status: 'idle',
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFutureAppointments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFutureAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchFutureAppointments.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export default appointmentSlice.reducer;
