import mongoose from 'mongoose';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { Problem } from '../models/Problem.model.js';
import { RevisionSchedule } from '../models/RevisionSchedule.model.js';
import { User } from '../models/User.model.js';
import {
  validateCreateRevisionSchedule,
  validateUpdateRevisionSchedule,
} from '../validations/revision.validation.js';
import { AppError, NotFoundError, ValidationError } from '../utils/errors.js';
import {
  createPaginationOptions,
  createPaginationResult,
} from '../utils/queryOptions.js';

export async function createRevisionSchedule(payload) {
  const validation = validateCreateRevisionSchedule(payload);

  if (!validation.valid) {
    throw new ValidationError(
      'Revision schedule input is invalid.',
      validation.errors,
    );
  }

  await ensureUserExists(payload.userId);
  await ensureProblemExists(payload.problemId);
  await ensureRevisionScheduleIsUnique(payload.userId, payload.problemId);

  return RevisionSchedule.create(payload);
}

export async function listRevisionSchedules(query) {
  const filter = createRevisionScheduleFilter(query);
  const pagination = createPaginationOptions(query);
  const [items, total] = await Promise.all([
    RevisionSchedule.find(filter)
      .populate('userId', 'name email')
      .populate('problemId')
      .sort({ nextRevisionAt: 1 })
      .skip(pagination.skip)
      .limit(pagination.limit),
    RevisionSchedule.countDocuments(filter),
  ]);

  return {
    items,
    pagination: createPaginationResult({ ...pagination, total }),
  };
}

export async function getRevisionScheduleById(revisionScheduleId) {
  assertObjectId(revisionScheduleId, 'Revision schedule ID');

  const revisionSchedule = await RevisionSchedule.findById(revisionScheduleId)
    .populate('userId', 'name email')
    .populate('problemId');

  if (!revisionSchedule) {
    throw new NotFoundError('Revision schedule was not found.');
  }

  return revisionSchedule;
}

export async function updateRevisionSchedule(revisionScheduleId, payload) {
  assertObjectId(revisionScheduleId, 'Revision schedule ID');

  const validation = validateUpdateRevisionSchedule(payload);

  if (!validation.valid) {
    throw new ValidationError(
      'Revision schedule update input is invalid.',
      validation.errors,
    );
  }

  const revisionSchedule = await RevisionSchedule.findByIdAndUpdate(
    revisionScheduleId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate('userId', 'name email')
    .populate('problemId');

  if (!revisionSchedule) {
    throw new NotFoundError('Revision schedule was not found.');
  }

  return revisionSchedule;
}

export async function deleteRevisionSchedule(revisionScheduleId) {
  assertObjectId(revisionScheduleId, 'Revision schedule ID');

  const revisionSchedule =
    await RevisionSchedule.findByIdAndDelete(revisionScheduleId);

  if (!revisionSchedule) {
    throw new NotFoundError('Revision schedule was not found.');
  }

  return revisionSchedule;
}

function createRevisionScheduleFilter(query) {
  const filter = {};

  if (query.userId) {
    assertObjectId(query.userId, 'User ID');
    filter.userId = query.userId;
  }

  if (query.problemId) {
    assertObjectId(query.problemId, 'Problem ID');
    filter.problemId = query.problemId;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.isActive !== undefined) {
    filter.isActive = query.isActive === 'true';
  }

  const dueRange = createDateRange({
    after: query.dueAfter,
    before: query.dueBefore,
    label: 'Revision due date',
  });

  if (dueRange) {
    filter.nextRevisionAt = dueRange;
  }

  return filter;
}

async function ensureUserExists(userId) {
  const user = await User.exists({ _id: userId }).lean();

  if (!user) {
    throw new ValidationError('Revision schedule user is invalid.', {
      userId: 'User must reference an existing user.',
    });
  }
}

async function ensureProblemExists(problemId) {
  const problem = await Problem.exists({ _id: problemId }).lean();

  if (!problem) {
    throw new ValidationError('Revision schedule problem is invalid.', {
      problemId: 'Problem must reference an existing problem.',
    });
  }
}

async function ensureRevisionScheduleIsUnique(userId, problemId) {
  const duplicate = await RevisionSchedule.exists({ userId, problemId }).lean();

  if (duplicate) {
    throw new AppError(
      'Revision schedule already exists for this user and problem.',
      {
        statusCode: HTTP_STATUS.CONFLICT,
        code: 'revision_schedule_conflict',
      },
    );
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
