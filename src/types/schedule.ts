import type { AppointmentStatusValue } from './appointment';

export const EventType = {
  APPOINTMENT: 'APPOINTMENT',
  AVAILABILITY: 'AVAILABILITY',
} as const;

export type EventTypeEnum = keyof typeof EventType;
export type EventTypeValue = (typeof EventType)[keyof typeof EventType];

// Um evento genérico no calendário
export interface CalendarEvent {
  id: string;
  startTime: string; // Formato ISO 8601: "2025-07-21T10:00:00Z"
  durationMinutes: number;
  type: EventTypeValue;
  // Detalhes específicos
  patientName?: string; // Se for um APPOINTMENT
  status?: AppointmentStatusValue; // Se for um APPOINTMENT
}

// O estado para o slice do Redux
export interface ScheduleState {
  events: CalendarEvent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
