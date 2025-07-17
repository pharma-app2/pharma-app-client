import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  PharmacistProfile,
  PharmacistProfileState,
} from '../../../types/pharmacistProfile';
import {
  getPharmacistProfileApi,
  updatePharmacistProfileApi,
} from '../../../services/pharmacistService';
import type { AxiosError } from 'axios';
import { getHealthPlansApi } from '../../../services/healthPlanService';

export const fetchPharmacistProfile = createAsyncThunk<
  PharmacistProfile,
  void,
  { rejectValue: string }
>('pharmacists/profile/me', async (_, { rejectWithValue }) => {
  try {
    const response = await getPharmacistProfileApi();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao buscar perfil.',
    );
  }
});

export const updatePharmacistProfile = createAsyncThunk<
  PharmacistProfile,
  Partial<PharmacistProfile>,
  { rejectValue: string }
>('pharmacists/profile/me/update', async (data, { rejectWithValue }) => {
  try {
    const response = await updatePharmacistProfileApi(data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao atualizar perfil.',
    );
  }
});

export const fetchHealthPlans = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('health_plans', async (_, { rejectWithValue }) => {
  try {
    const response = await getHealthPlansApi();
    return response.data.map(({ planName }) => planName);
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Erro ao buscar planos.',
    );
  }
});

const pharmacistProfileInitialState: PharmacistProfileState = {
  profile: null,
  allHealthPlans: [],
  status: 'idle',
  updateStatus: 'idle',
  error: null,
};

const pharmacistProfileSlice = createSlice({
  name: 'pharmacistProfile',
  initialState: pharmacistProfileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Profile reducers
    builder
      .addCase(fetchPharmacistProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPharmacistProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchPharmacistProfile.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });

    // update pharmacist profiles
    builder
      .addCase(updatePharmacistProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePharmacistProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updatePharmacistProfile.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });

    // health plans reducers
    builder
      .addCase(fetchHealthPlans.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHealthPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allHealthPlans = action.payload;
      })
      .addCase(fetchHealthPlans.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export default pharmacistProfileSlice.reducer;
