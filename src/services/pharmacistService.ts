import type { PharmacistProfile } from '../types/pharmacistProfile';
import { apiClient } from './config/axiosConfig';

export const getPharmacistProfileApi = () => {
  return apiClient.get<PharmacistProfile>('/pharmacists/me');
};

export const updatePharmacistProfileApi = (
  profileData: Partial<PharmacistProfile>,
) => {
  return apiClient.put<PharmacistProfile>('/pharmacists/me', profileData);
};
