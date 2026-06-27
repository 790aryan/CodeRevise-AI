import { api } from './api.js';

export async function getDashboardSummary() {
  const response = await api.get('/dashboard/summary');
  return response.data;
}

export async function getDashboardProgress() {
  const response = await api.get('/dashboard/progress');
  return response.data;
}

export async function getRecentActivity() {
  const response = await api.get('/dashboard/activity');
  return response.data;
}

export async function getDifficultyBreakdown() {
  const response = await api.get('/dashboard/difficulty');
  return response.data;
}

export async function getWeakTopics() {
  const response = await api.get('/dashboard/weak-topics');
  return response.data;
}

export async function getPlatformDistribution() {
  const response = await api.get('/dashboard/platforms');
  return response.data;
}

export async function getCurrentStreak() {
  const response = await api.get('/dashboard/streak');
  return response.data;
}

export async function getAccuracy() {
  const response = await api.get('/dashboard/accuracy');
  return response.data;
}

export async function getRevisionQueue() {
  const response = await api.get('/dashboard/revision-queue');
  return response.data;
}