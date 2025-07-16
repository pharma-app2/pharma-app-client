import type { Availability } from '../types/availability';
import { apiClient } from './config/axiosConfig';

// Define os parâmetros de busca que podem ser enviados
export interface SearchParams {
  pharmacistName?: string;
  city?: string;
  state?: string;
  remote?: boolean;
}

export const searchAvailabilitiesApi = (params: SearchParams) => {
  const queryParams = new URLSearchParams();

  if (params.pharmacistName) {
    queryParams.append('pharmacistName', params.pharmacistName);
  }
  if (params.city) {
    queryParams.append('city', params.city);
  }

  if (params.state) {
    queryParams.append('state', params.state);
  }

  if (params.remote) {
    queryParams.append('remote', 'true');
  }

  return apiClient.get<Availability[]>(
    `/availabilities/search?${queryParams.toString()}`,
  );
};
