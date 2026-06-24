import mongoose from 'mongoose';
import { Problem } from '../models/Problem.model.js';
import { RevisionSchedule } from '../models/RevisionSchedule.model.js';
import { RevisionSession } from '../models/RevisionSession.model.js';
import { User } from '../models/User.model.js';
import {
  validateCreateRevisionSession,
  validateUpdateRevisionSession,
} from '../validations/revision.validation.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import {
  createPaginationOptions,
  createPaginationResult,
} from '../utils/queryOptions.js';

export async function createRevisionSession(payload) {
  const validation = validateCreateRevisionSession(payload);

  if (!validation.valid) {
    throw new ValidationError(
      'Revision session input is invalid.',
      validation.errors,
    );
  }

  await Promise.all([
    ensureUserExists(payload.userId),
    ensureProblemExists(payload.problemId),
    ensureRevisionScheduleExists(payload.revisionScheduleId),
  ]);

  return RevisionSession.create(payload);
}

export async function listRevisionSessions(query) {
  const filter = createRevisionSessionFilter(query);
  const pagination = createPaginationOptions(query);
  const [items, total] = await Promise.all([
    RevisionSession.find(filter)
      .populate('userId', 'name email')
      .populate('problemId')
      .populate('revisionScheduleId')
      .sort({ completedAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit),
    RevisionSession.countDocuments(filter),
  ]);

  return {
    items,
    pagination: createPaginationResult({ ...pagination, total }),
  };
}

export async function getRevisionSessionById(revisionSessionId) {
  assertObjectId(revisionSessionId, 'Revision session ID');

  const revisionSession = await RevisionSession.findById(revisionSessionId)
    .populate('userId', 'name email')
    .populate('problemId')
    .populate('revisionScheduleId');

  if (!revisionSession) {
    throw new NotFoundError('Revision session was not found.');
  }

  return revisionSession;
}

export async function updateRevisionSession(revisionSessionId, payload) {
  assertObjectId(revisionSessionId, 'Revision session ID');

  const validation = validateUpdateRevisionSession(payload);

  if (!validation.valid) {
    throw new ValidationError(
      'Revision session update input is invalid.',
      validation.errors,
    );
  }

  const revisionSession = await RevisionSession.findByIdAndUpdate(
    revisionSessionId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate('userId', 'name email')
    .populate('problemId')
    .populate('revisionScheduleId');

  if (!revisionSession) {
    throw new NotFoundError('Revision session was not found.');
  }

  return revisionSession;
}

export async function deleteRevisionSession(revisionSessionId) {
  assertObjectId(revisionSessionId, 'Revision session ID');

  const revisionSession =
    await RevisionSession.findByIdAndDelete(revisionSessionId);

  if (!revisionSession) {
    throw new NotFoundError('Revision session was not found.');
  }

  return revisionSession;
}

function createRevisionSessionFilter(query) {
  const filter = {};

  if (query.userId) {
    assertObjectId(query.userId, 'User ID');
    filter.userId = query.userId;
  }

  if (query.problemId) {
    assertObjectId(query.problemId, 'Problem ID');
    filter.problemId = query.problemId;
  }

  if (query.revisionScheduleId) {
    assertObjectId(query.revisionScheduleId, 'Revision schedule ID');
    filter.revisionScheduleId = query.revisionScheduleId;
  }

  if (query.sessionType) {
    filter.sessionType = query.sessionType;
  }

  if (query.result) {
    filter.result = query.result;
  }

  const completedRange = createDateRange({
    after: query.completedAfter,
    before: query.completedBefore,
    label: 'Revision completion date',
  });

  if (completedRange) {
    filter.completedAt = completedRange;
  }

  return filter;
}

async function ensureUserExists(userId) {
  const user = await User.exists({ _id: userId }).lean();

  if (!user) {
    throw new ValidationError('Revision session user is invalid.', {
      userId: 'User must reference an existing user.',
    });
  }
}

async function ensureProblemExists(problemId) {
  const problem = await Problem.exists({ _id: problemId }).lean();

  if (!problem) {
    throw new ValidationError('Revision session problem is invalid.', {
      problemId: 'Problem must reference an existing problem.',
    });
  }
}

async function ensureRevisionScheduleExists(revisionScheduleId) {
  const revisionSchedule = await RevisionSchedule.exists({
    _id: revisionScheduleId,
  }).lean();

  if (!revisionSchedule) {
    throw new ValidationError('Revision session schedule is invalid.', {
      revisionScheduleId:
        'Revision schedule must reference an existing revision schedule.',
    });
  }
}

function createDateRange({ after, before, label }) {
  const range = {};

  if (after !== undefined) {
    range.$gte = parseDateFilter(after, `${label} lower bound`);
  }

  if (before !== undefined) {
    range.$lte = parseDateFilter(before, `${label} upper bound`);
  }

  return Object.keys(range).length > 0 ? range : undefined;
}

function parseDateFilter(value, label) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ValidationError(`${label} is invalid.`, {
      date: `${label} must be a valid date.`,
    });
  }

  return date;
}

function assertObjectId(value, label) {
  if (!mongoose.isValidObjectId(value)) {
    throw new ValidationError(`${label} is invalid.`, {
      id: `${label} must be a valid identifier.`,
    });
  }
}
