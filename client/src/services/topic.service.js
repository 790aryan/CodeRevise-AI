import { api } from './api.js';

export async function getTopics() {
  const response = await api.get('/topics');

  return response.data.data.topics;
}