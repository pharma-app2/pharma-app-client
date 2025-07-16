export interface Availability {
  id: string;
  pharmacistName: string;
  city: string;
  neighborhood: string;
  nextAvailableSlot: string;
}

export interface AvailabilitySearchState {
  availabilities: Availability[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
