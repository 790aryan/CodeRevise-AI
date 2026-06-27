import {api }from './api';

export async function fetchProblemDetails(url) {
  const response = await api.post('/problems/fetch-details', {
    url,
  });

  return response.data.data;
}