import { http } from './http';

export type HealthResponse = {
  status?: string;
  message?: string;
};

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await http.get<HealthResponse>('/api/health');
  return response.data;
}
