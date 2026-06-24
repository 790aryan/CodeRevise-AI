import { api } from './api.js';

export async function getDashboardSummary() {
  const response = await api.get('/dashboard/summary');

  return response.data.data;
}

export async function getDashboardProgress() {
  const response = await api.get('/dashboard/progress');
  return response.data.data;
}

export async function getRecentActivity() {
  const response = await api.get('/dashboard/recent-activity');
  return response.data.data;
}