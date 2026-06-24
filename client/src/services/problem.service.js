import { api } from './api.js';

export async function getProblems() {
  const response = await api.get('/problems');

  return response.data.data.items;
}

export async function createProblem(payload) {
  const response = await api.post('/problems', payload);

  return response.data.data;
}

export async function getProblemById(id) {
  const response = await api.get(`/problems/${id}`);

  return response.data.data.problem;
}