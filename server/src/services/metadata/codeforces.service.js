import axios from 'axios';
import { ValidationError } from '../../utils/errors.js';

export async function fetchCodeforcesProblem(url) {
  const match = url.match(
    /codeforces\.com\/problemset\/problem\/(\d+)\/([A-Za-z0-9]+)/
  );

  if (!match) {
    throw new ValidationError('Invalid Codeforces problem URL.');
  }

  const contestId = Number(match[1]);
  const index = match[2];

  const response = await axios.get(
    'https://codeforces.com/api/problemset.problems'
  );

  const problems = response.data.result.problems;

  const problem = problems.find(
    (p) => p.contestId === contestId && p.index === index
  );

  if (!problem) {
    throw new ValidationError('Problem not found.');
  }

  return {
    title: problem.name,
    platform: 'codeforces',
    platformProblemId: `${contestId}${index}`,
    difficulty: problem.rating
      ? String(problem.rating)
      : '',
    topics: problem.tags,
    problemUrl: url,
  };
}