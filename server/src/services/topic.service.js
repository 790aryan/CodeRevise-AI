import mongoose from 'mongoose';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { Topic } from '../models/Topic.model.js';
import {
  validateCreateTopic,
  validateUpdateTopic,
} from '../validations/problem.validation.js';
import { AppError, NotFoundError, ValidationError } from '../utils/errors.js';

export async function createTopic(payload) {
  const validation = validateCreateTopic(payload);

  if (!validation.valid) {
    throw new ValidationError('Topic input is invalid.', validation.errors);
  }

  await ensureTopicIsUnique({
    name: payload.name,
    slug: payload.slug,
  });

  return Topic.create(payload);
}

export async function listTopics() {
  return Topic.find().sort({ name: 1 });
}

export async function getTopicById(topicId) {
  assertObjectId(topicId, 'Topic ID');

  const topic = await Topic.findById(topicId);

  if (!topic) {
    throw new NotFoundError('Topic was not found.');
  }

  return topic;
}

export async function updateTopic(topicId, payload) {
  assertObjectId(topicId, 'Topic ID');

  const validation = validateUpdateTopic(payload);

  if (!validation.valid) {
    throw new ValidationError('Topic update input is invalid.', validation.errors);
  }

  await ensureTopicExists(topicId);
  await ensureTopicIsUnique({
    name: payload.name,
    slug: payload.slug,
    excludedTopicId: topicId,
  });

  const topic = await Topic.findByIdAndUpdate(topicId, payload, {
    new: true,
    runValidators: true,
  });

  if (!topic) {
    throw new NotFoundError('Topic was not found.');
  }

  return topic;
}

export async function deleteTopic(topicId) {
  assertObjectId(topicId, 'Topic ID');

  const topic = await Topic.findByIdAndDelete(topicId);

  if (!topic) {
    throw new NotFoundError('Topic was not found.');
  }

  return topic;
}

async function ensureTopicExists(topicId) {
  const exists = await Topic.exists({ _id: topicId });

  if (!exists) {
    throw new NotFoundError('Topic was not found.');
  }
}

async function ensureTopicIsUnique({ name, slug, excludedTopicId }) {
  const conditions = [];

  if (name) {
    conditions.push({ name });
  }

  if (slug) {
    conditions.push({ slug });
  }

  if (conditions.length === 0) {
    return;
  }

  const query = { $or: conditions };

  if (excludedTopicId) {
    query._id = { $ne: excludedTopicId };
  }

  const duplicate = await Topic.exists(query);

  if (duplicate) {
    throw new AppError('Topic name or slug already exists.', {
      statusCode: HTTP_STATUS.CONFLICT,
      code: 'topic_conflict',
    });
  }
}

function assertObjectId(value, label) {
  if (!mongoose.isValidObjectId(value)) {
    throw new ValidationError(`${label} is invalid.`, {
      id: `${label} must be a valid identifier.`,
    });
  }
}
