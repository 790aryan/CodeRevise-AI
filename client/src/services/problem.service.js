import { api } from './api.js';

export async function getProblems() {
  const response = await api.get('/problems');

  return response.data.data.items;
}