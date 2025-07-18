export const AppointmentStatus = {
  AGENDADO: 'AGENDADO',
  CONFIRMADO: 'CONFIRMADO',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO',
  NAO_COMPARECEU: 'NAO_COMPARECEU',
} as const;

export type AppointmentStatusEnum = keyof typeof AppointmentStatus;
export type AppointmentStatusValue =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const AppointmentModality = {
  PRESENCIAL: 'PRESENCIAL',
  TELECONSULTA: 'TELECONSULTA',
} as const;

export type AppointmentModalityEnum = keyof typeof AppointmentModality;
export type AppointmentModalityValue =
  (typeof AppointmentModality)[keyof typeof AppointmentModality];

export interface Appointment {
  id: string;
  pharmacistName: string;
  modality: AppointmentModalityEnum;
  durationMinutes: number;
  startTime: Date;
  status: AppointmentStatusEnum;
}

export interface AppointmentState {
  appointments: Appointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
