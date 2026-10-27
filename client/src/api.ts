import type { Plan, CreatePlanInput } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });

  const json = await res.json().catch(() => ({ error: 'Invalid response from server.' }));

  if (!res.ok) {
    const message =
      typeof json?.error === 'string'
        ? json.error
        : `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return (json as { data: T }).data;
}

export const api = {
  generatePlan: (input: CreatePlanInput): Promise<Plan> =>
    request<Plan>('/api/plans', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  getPlans: (): Promise<Plan[]> => request<Plan[]>('/api/plans'),

  getPlan: (id: string): Promise<Plan> => request<Plan>(`/api/plans/${id}`),

  deletePlan: (id: string): Promise<void> =>
    request<void>(`/api/plans/${id}`, { method: 'DELETE' }),
};
