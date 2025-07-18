import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  createAvailabilityApi,
  deleteAvailabilityApi,
  fetchScheduleApi,
} from '../../../services/pharmacistService';
import type { CalendarEvent, ScheduleState } from '../../../types/schedule';
import dayjs from 'dayjs';

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

export const deleteAvailability = createAsyncThunk<
  string, // Tipo do retorno em caso de sucesso (o ID do item deletado)
  string, // Tipo do argumento de entrada (o ID do item a ser deletado)
  { rejectValue: string }
>('schedule/delete', async (availabilityId, { rejectWithValue }) => {
  try {
    await deleteAvailabilityApi(availabilityId);
    return availabilityId; // Retorna o ID para o reducer poder remover do estado
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
export interface StartLocalDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export const convertFromIsoString = (isoString: string): StartLocalDateTime => {
  // 1. O dayjs parseia a string e a converte para o fuso horário local do navegador.
  const d = dayjs(isoString);

  // 2. Extrai cada componente.
  const year = d.year();
  const month = d.month() + 1; // IMPORTANTE: .month() é 0-indexado (0 = Janeiro), então somamos 1.
  const day = d.date(); // .date() retorna o dia do mês.
  const hour = d.hour();
  const minute = d.minute();

  // 3. Retorna o novo objeto.
  return {
    year,
    month,
    day,
    hour,
    minute,
  };
};

export const createAvailability = createAsyncThunk<
  CalendarEvent, // Retorna o novo evento criado em caso de sucesso
  { startTime: string; durationMinutes: number }, // Argumentos para a criação
  { rejectValue: string }
>('schedule/create', async (availabilityData, { rejectWithValue }) => {
  try {
    const startLocalDateTime = convertFromIsoString(availabilityData.startTime);

    const response = await createAvailabilityApi({
      startLocalDateTime,
      durationMinutes: availabilityData.durationMinutes,
    });
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
      })
      .addCase(deleteAvailability.fulfilled, (state, action) => {
        // Remove o evento do estado local sem precisar de um refetch
        state.events = state.events.filter(
          (event) => event.id !== action.payload,
        );
      })
      .addCase(deleteAvailability.rejected, (state, action) => {
        state.error = action.payload ?? 'Falha ao deletar horário.';
      });
  },
});

export const { clearSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
