import type { StartLocalDateTime } from '../store/slices/schedules/scheduleSlice';
import type { PharmacistProfile } from '../types/pharmacistProfile';
import type { CalendarEvent } from '../types/schedule';
import { apiClient } from './config/axiosConfig';

export const getPharmacistProfileApi = () => {
  return apiClient.get<PharmacistProfile>('/pharmacists/me');
};

export const updatePharmacistProfileApi = (
  profileData: Partial<PharmacistProfile>,
) => {
  return apiClient.put<PharmacistProfile>('/pharmacists/me', profileData);
};

export const fetchScheduleApi = (startDate: string, endDate: string) => {
  const params = new URLSearchParams({ startDate, endDate });
  return apiClient.get<CalendarEvent[]>(
    `/pharmacists/me/availabilities?${params.toString()}`,
  );
};

export const createAvailabilityApi = (data: {
  startLocalDateTime: StartLocalDateTime;
  durationMinutes: number;
}) => {
  return apiClient.post<CalendarEvent>('/pharmacists/me/availabilities', data);
};

export const deleteAvailabilityApi = (availabilityId: string) => {
  return apiClient.delete(`/pharmacists/me/availabilities/${availabilityId}`);
};
