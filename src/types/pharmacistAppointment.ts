import { type AppointmentStatusValue } from './appointment';

// Interface para um agendamento na visão do farmacêutico
export interface PharmacistAppointment {
  id: string;
  patientName: string;
  date: string; // Formato ISO 8601
  status: AppointmentStatusValue;
}

// O estado para o slice do Redux
export interface PharmacistAppointmentState {
  appointments: PharmacistAppointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
