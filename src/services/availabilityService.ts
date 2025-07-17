import type { Availability } from '../types/availability';
import { apiClient } from './config/axiosConfig';

// Define os parâmetros de busca que podem ser enviados
export interface SearchParams {
  pharmacistName?: string;
  ibgeApiCity?: string;
  ibgeApiState?: string;
  acceptsRemote?: boolean;
}

export const searchAvailabilitiesApi = (params: SearchParams) => {
  const queryParams = new URLSearchParams();

  if (params.pharmacistName) {
    queryParams.append('pharmacistName', params.pharmacistName);
  }
  if (params.ibgeApiCity) {
    queryParams.append('ibgeApiCity', params.ibgeApiCity);
  }

  if (params.ibgeApiState) {
    queryParams.append('ibgeApiState', params.ibgeApiState);
  }

  if (params.acceptsRemote) {
    queryParams.append('acceptsRemote', 'true');
  }

  return apiClient.get<Availability[]>(
    `/profiles/search?${queryParams.toString()}`,
  );
};
