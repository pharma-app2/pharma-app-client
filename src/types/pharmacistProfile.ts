import type { AppointmentModalityValue } from './appointment';

// export interface HealthPlan {
//   id: string;
//   planName: string;
//   ansRegistrationCode: string;
//   contractType: string;
//   coverageScope: string;
//   planType: string;
//   operatorName: string;
// }

export interface PharmacistLocation {
  ibgeApiCity: string;
  ibgeApiState: string;
  ibgeApiIdentifierCity: number;
  phone1: string;
  phone2: string | null;
  phone3: string | null;
  address: string;
}

export interface PharmacistProfile {
  crf: string;
  fullName: string;
  email: string;
  acceptsRemote: boolean;
  modalities: AppointmentModalityValue;
  healthPlanNames: string[];
  pharmacistLocations: PharmacistLocation[];
}

export interface PharmacistProfileState {
  profile: PharmacistProfile | null;
  allHealthPlans: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
