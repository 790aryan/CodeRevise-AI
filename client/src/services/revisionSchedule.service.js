import { api } from './api.js';

export async function getRevisionSchedules() {
  const response = await api.get('/revision-schedules');

  return response.data.data.items;
}

export async function getDueTodaySchedules() {
  const response = await api.get(
    '/revision-schedules?dueToday=true',
  );

  return response.data.data.items;
}

export async function updateRevisionSchedule(
  id,
  payload,
) {
  const response = await api.patch(
    `/revision-schedules/${id}`,
    payload,
  );

  return response.data.data.revisionSchedule;
}