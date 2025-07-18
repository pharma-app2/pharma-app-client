import type { Appointment } from '../types/appointment';
import type { PharmacistAppointment } from '../types/pharmacistAppointment';
import { apiClient } from './config/axiosConfig';

export const fetchFutureAppointmentsApi = () => {
  return apiClient.get<Appointment[]>('/appointments/patient/future');
};

export const fetchPharmacistAppointmentsApi = () => {
  return apiClient.get<PharmacistAppointment[]>('/pharmacists/me/appointments');
};
