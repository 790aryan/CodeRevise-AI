import mongoose from 'mongoose';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { Problem } from '../models/Problem.model.js';
import { Topic } from '../models/Topic.model.js';
import {
  validateCreateProblem,
  validateUpdateProblem,
} from '../validations/problem.validation.js';
import { AppError, NotFoundError, ValidationError } from '../utils/errors.js';
import {
  createPaginationOptions,
  createPaginationResult,
} from '../utils/queryOptions.js';

export async function createProblem(payload) {
  const validation = validateCreateProblem(payload);

  if (!validation.valid) {
    throw new ValidationError('Problem input is invalid.', validation.errors);
  }

  await ensureTopicsExist(payload.topics);
  await ensurePlatformProblemIsUnique({
    platform: payload.platform,
    platformProblemId: payload.platformProblemId,
  });

  return Problem.create(payload);
}

export async function listProblems(query) {
  const filter = createProblemFilter(query);
  const pagination = createPaginationOptions(query);
  const [items, total] = await Promise.all([
    Problem.find(filter)
      .populate('topics')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit),
    Problem.countDocuments(filter),
  ]);

  return {
    items,
    pagination: createPaginationResult({ ...pagination, total }),
  };
}

export async function getProblemById(problemId) {
  assertObjectId(problemId, 'Problem ID');

  const problem = await Problem.findById(problemId).populate('topics');

  if (!problem) {
    throw new NotFoundError('Problem was not found.');
  }

  return problem;
}

export async function updateProblem(problemId, payload) {
  assertObjectId(problemId, 'Problem ID');

  const validation = validateUpdateProblem(payload);

  if (!validation.valid) {
    throw new ValidationError('Problem update input is invalid.', validation.errors);
  }

  const existingProblem = await Problem.findById(problemId);

  if (!existingProblem) {
    throw new NotFoundError('Problem was not found.');
  }

  if (payload.topics) {
    await ensureTopicsExist(payload.topics);
  }

  await ensurePlatformProblemIsUnique({
    platform: payload.platform ?? existingProblem.platform,
    platformProblemId: payload.platformProblemId ?? existingProblem.platformProblemId,
    excludedProblemId: problemId,
  });

  const problem = await Problem.findByIdAndUpdate(problemId, payload, {
    new: true,
    runValidators: true,
  }).populate('topics');

  if (!problem) {
    throw new NotFoundError('Problem was not found.');
  }

  return problem;
}

export async function deleteProblem(problemId) {
  assertObjectId(problemId, 'Problem ID');

  const problem = await Problem.findByIdAndDelete(problemId);

  if (!problem) {
    throw new NotFoundError('Problem was not found.');
  }

  return problem;
}

function createProblemFilter(query) {
  const filter = {};

  if (query.platform) {
    filter.platform = query.platform;
  }

  if (query.difficulty) {
    filter.difficulty = query.difficulty;
  }

  if (query.topic) {
    filter.topics = query.topic;
  }

  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === 'true';
  }

  return filter;
}

async function ensureTopicsExist(topicIds) {
  const topicCount = await Topic.countDocuments({ _id: { $in: topicIds } });

  if (topicCount !== topicIds.length) {
    throw new ValidationError('Problem topics are invalid.', {
      topics: 'Every topic must reference an existing topic.',
    });
  }
}

async function ensurePlatformProblemIsUnique({
  platform,
  platformProblemId,
  excludedProblemId,
}) {
  if (!platform || !platformProblemId) {
    return;
  }

  const query = { platform, platformProblemId };

  if (excludedProblemId) {
    query._id = { $ne: excludedProblemId };
  }

  const duplicate = await Problem.exists(query);

  if (duplicate) {
    throw new AppError('Problem already exists for this platform identity.', {
      statusCode: HTTP_STATUS.CONFLICT,
      code: 'problem_conflict',
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


export async function checkProblemExists(platform, platformProblemId) {
  return Problem.findOne({
    platform,
    platformProblemId,
  }).select('_id title platform platformProblemId');
}

