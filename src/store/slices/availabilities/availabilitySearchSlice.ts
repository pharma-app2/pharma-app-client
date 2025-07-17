import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  searchAvailabilitiesApi,
  type SearchParams,
} from '../../../services/availabilityService';
import type {
  Availability,
  AvailabilitySearchState,
} from '../../../types/availability';

// O AsyncThunk para realizar a busca
export const searchAvailabilities = createAsyncThunk<
  Availability[],
  SearchParams,
  { rejectValue: string }
>('profiles/search', async (params, { rejectWithValue }) => {
  try {
    const response = await searchAvailabilitiesApi(params);
    // O backend já deve retornar a lista ordenada
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao buscar farmacêuticos.',
    );
  }
});

const initialState: AvailabilitySearchState = {
  availabilities: [],
  status: 'idle',
  error: null,
};

const availabilitySearchSlice = createSlice({
  name: 'availabilitySearch',
  initialState,
  reducers: {
    // Ação para limpar os resultados ao sair da página, por exemplo
    clearSearchResults: (state) => {
      state.availabilities = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAvailabilities.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchAvailabilities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availabilities = action.payload;
      })
      .addCase(searchAvailabilities.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { clearSearchResults } = availabilitySearchSlice.actions;
export default availabilitySearchSlice.reducer;
