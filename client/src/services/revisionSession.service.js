import { api } from './api.js';

export async function getRevisionSessions() {
  const response = await api.get('/revision-sessions');

  return response.data.data.items;
}

export async function createRevisionSession(payload) {
  const response = await api.post(
    '/revision-sessions',
    payload,
  );

  return response.data.data;
}