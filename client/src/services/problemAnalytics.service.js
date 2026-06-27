import { api } from './api.js';

export async function getProblemAnalytics(problemId) {
  const response = await api.get(
    `/problem-analytics/${problemId}`,
  );

  return response.data;
}

export async function hasLearnedProblem(problemId) {
  try {
    const analytics = await getProblemAnalytics(problemId);

    return analytics !== null;
  } catch {
    return false;
  }
}