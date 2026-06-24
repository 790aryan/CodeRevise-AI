import { api } from './api.js';

export async function getRevisionSchedules() {
  const response = await api.get('/revision-schedules');

  return response.data.data.items;
}