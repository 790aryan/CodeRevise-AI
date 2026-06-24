import mongoose from 'mongoose';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { Problem } from '../models/Problem.model.js';
import { ProblemAttempt } from '../models/ProblemAttempt.model.js';
import { User } from '../models/User.model.js';
import {
  validateCreateProblemAttempt,
  validateUpdateProblemAttempt,
} from '../validations/problem.validation.js';
import { AppError, NotFoundError, ValidationError } from '../utils/errors.js';
import {
  createPaginationOptions,
  createPaginationResult,
} from '../utils/queryOptions.js';

export async function createProblemAttempt(payload) {
  const validation = validateCreateProblemAttempt(payload);

  if (!validation.valid) {
    throw new ValidationError('Problem attempt input is invalid.', validation.errors);
  }

  await ensureUserExists(payload.userId);
  await ensureProblemExists(payload.problemId);
  await ensureProblemAttemptIsUnique(payload.userId, payload.problemId);

  return ProblemAttempt.create(payload);
}

export async function listProblemAttempts(query) {
  const filter = createProblemAttemptFilter(query);
  const pagination = createPaginationOptions(query);
  const [items, total] = await Promise.all([
    ProblemAttempt.find(filter)
      .populate('userId', 'name email')
      .populate('problemId')
      .sort({ lastAttemptedAt: -1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit),
    ProblemAttempt.countDocuments(filter),
  ]);

  return {
    items,
    pagination: createPaginationResult({ ...pagination, total }),
  };
}

export async function getProblemAttemptById(problemAttemptId) {
  assertObjectId(problemAttemptId, 'Problem attempt ID');

  const problemAttempt = await ProblemAttempt.findById(problemAttemptId)
    .populate('userId', 'name email')
    .populate('problemId');

  if (!problemAttempt) {
    throw new NotFoundError('Problem attempt was not found.');
  }

  return problemAttempt;
}

export async function updateProblemAttempt(problemAttemptId, payload) {
  assertObjectId(problemAttemptId, 'Problem attempt ID');

  const validation = validateUpdateProblemAttempt(payload);

  if (!validation.valid) {
    throw new ValidationError(
      'Problem attempt update input is invalid.',
      validation.errors,
    );
  }

  const problemAttempt = await ProblemAttempt.findByIdAndUpdate(
    problemAttemptId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate('userId', 'name email')
    .populate('problemId');

  if (!problemAttempt) {
    throw new NotFoundError('Problem attempt was not found.');
  }

  return problemAttempt;
}

export async function deleteProblemAttempt(problemAttemptId) {
  assertObjectId(problemAttemptId, 'Problem attempt ID');

  const problemAttempt = await ProblemAttempt.findByIdAndDelete(problemAttemptId);

  if (!problemAttempt) {
    throw new NotFoundError('Problem attempt was not found.');
  }

  return problemAttempt;
}

function createProblemAttemptFilter(query) {
  const filter = {};

  if (query.userId) {
    filter.userId = query.userId;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.problemId) {
    filter.problemId = query.problemId;
  }

  return filter;
}

async function ensureUserExists(userId) {
  const user = await User.exists({ _id: userId });

  if (!user) {
    throw new ValidationError('Problem attempt user is invalid.', {
      userId: 'User must reference an existing user.',
    });
  }
}

async function ensureProblemExists(problemId) {
  const problem = await Problem.exists({ _id: problemId });

  if (!problem) {
    throw new ValidationError('Problem attempt problem is invalid.', {
      problemId: 'Problem must reference an existing problem.',
    });
  }
}

async function ensureProblemAttemptIsUnique(userId, problemId) {
  const duplicate = await ProblemAttempt.exists({ userId, problemId });

  if (duplicate) {
    throw new AppError('Problem attempt already exists for this user and problem.', {
      statusCode: HTTP_STATUS.CONFLICT,
      code: 'problem_attempt_conflict',
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
