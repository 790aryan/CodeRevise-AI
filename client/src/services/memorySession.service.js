import { api } from './api.js';

export async function processMemorySession(payload) {
  const response = await api.post(
    '/memory-session',
    payload,
  );

  return response.data;
}