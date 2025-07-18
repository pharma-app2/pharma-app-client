import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  createAvailabilityApi,
  fetchScheduleApi,
} from '../../../services/pharmacistService';
import type { CalendarEvent, ScheduleState } from '../../../types/schedule';

// Importe os tipos e as funções de serviço que definimos

// --- ASYNC THUNKS ---

/**
 * Thunk para buscar os eventos (consultas e disponibilidades) de uma semana.
 */
export const fetchSchedule = createAsyncThunk<
  CalendarEvent[], // Tipo do retorno em caso de sucesso
  { startDate: string; endDate: string }, // Tipo do argumento de entrada
  { rejectValue: string } // Tipo do retorno em caso de falha
>('schedule/fetch', async ({ startDate, endDate }, { rejectWithValue }) => {
  try {
    const response = await fetchScheduleApi(startDate, endDate);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao buscar a agenda.',
    );
  }
});

/**
 * Thunk para criar um novo horário de disponibilidade.
 */
export const createAvailability = createAsyncThunk<
  CalendarEvent, // Retorna o novo evento criado em caso de sucesso
  { startTime: string; durationMinutes: number }, // Argumentos para a criação
  { rejectValue: string }
>('schedule/create', async (availabilityData, { rejectWithValue }) => {
  try {
    const response = await createAvailabilityApi(availabilityData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao criar disponibilidade.',
    );
  }
});

// --- ESTADO INICIAL ---

const initialState: ScheduleState = {
  events: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- O SLICE ---

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    // Reducers síncronos podem ser adicionados aqui se necessário
    // Ex: para limpar o estado ao fazer logout
    clearSchedule: (state) => {
      state.events = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para fetchSchedule
      .addCase(fetchSchedule.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchSchedule.fulfilled,
        (state, action: PayloadAction<CalendarEvent[]>) => {
          state.status = 'succeeded';
          state.events = action.payload;
        },
      )
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Ocorreu um erro desconhecido.';
      })
      .addCase(
        createAvailability.fulfilled,
        (state, action: PayloadAction<CalendarEvent>) => {
          // Adiciona o novo evento à lista existente para feedback imediato na UI,
          // sem a necessidade de um refetch completo.
          state.events.push(action.payload);
        },
      )
      .addCase(createAvailability.rejected, (state, action) => {
        // Apenas armazena o erro. Um toast de erro pode ser exibido na UI.
        state.error = action.payload ?? 'Falha ao criar horário.';
      });
  },
});

export const { clearSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
