import { api } from './api.js';

export async function simulateRevision(data) {
  const response = await api.post(
    '/memory-simulator',
    data,
  );

  return response.data;
}