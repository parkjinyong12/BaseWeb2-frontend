import axios from 'axios';

export type HealthResponse = {
  status?: string;
  message?: string;
};

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await axios.get<HealthResponse>('/api/health');
  return response.data;
}
