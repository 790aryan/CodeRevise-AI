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

export async function updateProblem(id, payload) {
  const response = await api.patch(
    `/problems/${id}`,
    payload,
  );

  return response.data.data.problem;
}

export async function deleteProblem(id) {
  const response = await api.delete(
    `/problems/${id}`,
  );

  return response.data.data.problem;
}