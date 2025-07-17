import { apiClient } from './config/axiosConfig';

export interface HealthPlan {
  id: string;
  planName: string;
  ansRegistrationCode: string;
  contractType: string;
  coverageScope: string;
  planType: string;
  operatorName: string;
}

export const getHealthPlansApi = () => {
  return apiClient.get<HealthPlan[]>('/health_plans');
};
