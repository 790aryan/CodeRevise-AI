import axios from 'axios';
import { ValidationError } from '../../utils/errors.js';

export async function fetchLeetCodeProblem(url) {
  const match = url.match(/leetcode\.com\/problems\/([^/]+)/);

  if (!match) {
    throw new ValidationError('Invalid LeetCode problem URL.');
  }

  const titleSlug = match[1];

  const query = `
    query getQuestionDetail($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionFrontendId
        title
        difficulty
        topicTags {
          name
        }
      }
    }
  `;

  const response = await axios.post(
    'https://leetcode.com/graphql',
    {
      query,
      variables: {
        titleSlug,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
    }
  );

  const question = response.data?.data?.question;

  if (!question) {
    throw new ValidationError('Problem not found.');
  }

return {
    title: question.title,
    platform: 'leetcode',
    // 1. Force this to be a Number so your backend doesn't reject it
    platformProblemId: Number(question.questionFrontendId), 
    // 2. Force this to lowercase ("Easy" -> "easy")
    difficulty: question.difficulty.toLowerCase(), 
    topics: question.topicTags.map((tag) => tag.name),
    problemUrl: url,
  };
}