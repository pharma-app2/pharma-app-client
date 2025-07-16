import type { Appointment } from '../types/appointment';
import { apiClient } from './config/axiosConfig';

export const fetchFutureAppointmentsApi = () => {
  return apiClient.get<Appointment[]>('/appointments/patient/future');
};
