import { ValidationError } from '../../utils/errors.js';
import { fetchCodeforcesProblem } from './codeforces.service.js';
import { fetchLeetCodeProblem } from './leetcode.service.js';
import { Topic } from '../../models/Topic.model.js';
import { slugify } from '../../utils/slugify.js';

export async function fetchProblemMetadata(url) {
  if (!url) {
    throw new ValidationError('Problem URL is required.');
  }

  if (url.includes('codeforces.com')) {
    const problem = await fetchCodeforcesProblem(url);

    return attachTopics(problem);
  }

  if (url.includes('leetcode.com')) {
    const problem = await fetchLeetCodeProblem(url);

return attachTopics(problem);
  }

  throw new ValidationError('Unsupported platform.');
}

async function attachTopics(problem) {
  // Use Promise.all to run all database queries concurrently
  const topicDocuments = await Promise.all(
    problem.topics.map(async (topicName) => {
      const slug = slugify(topicName);
      let topic = await Topic.findOne({ slug });

      if (!topic) {
        topic = await Topic.create({
          name: topicName,
          slug,
          isActive: true,
        });
        console.log(`Created new topic: ${topic.name}`);
      }
      return topic;
    })
  );

  return {
    ...problem,
    topics: topicDocuments.map((topic) => ({
      _id: topic._id,
      name: topic.name,
      slug: topic.slug,
    })),
  };
}