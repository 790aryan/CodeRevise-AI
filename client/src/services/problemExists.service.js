import { api } from './api';

export async function checkProblemExists(platform, platformProblemId) {
  const response = await api.get('/problems/exists', {
    params: {
      platform,
      platformProblemId,
    },
  });

  return response.data.data;
}