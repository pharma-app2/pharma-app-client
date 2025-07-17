export interface Availability {
  id: string;
  pharmacistName: string;
  ibgeApiCity: string;
  ibgeApiState: string;
  acceptsRemote: string;
}

export interface AvailabilitySearchState {
  availabilities: Availability[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
