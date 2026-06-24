import {
  REVISION_LIMITS,
  REVISION_RESULTS,
  REVISION_STATUSES,
  SESSION_TYPES,
  SPACED_REPETITION_INTERVALS_DAYS,
} from '../constants/revision.js';
import { normalizeOptionalString } from '../utils/userNormalization.js';

const validators = {
  objectId(value, label) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return `${label} is required.`;
    }

    if (!/^[a-f\d]{24}$/i.test(normalized)) {
      return `${label} must be a valid identifier.`;
    }

    return undefined;
  },

  enumValue(value, label, allowedValues, { required = true } = {}) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return required ? `${label} is required.` : undefined;
    }

    if (!allowedValues.includes(normalized)) {
      return `${label} must be one of: ${allowedValues.join(', ')}.`;
    }

    return undefined;
  },

  nonNegativeNumber(value, label) {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
      return `${label} must be a non-negative number.`;
    }

    return undefined;
  },

  date(value, label, { required = false } = {}) {
    if (value === undefined || value === null || value === '') {
      return required ? `${label} is required.` : undefined;
    }

    if (Number.isNaN(new Date(value).getTime())) {
      return `${label} must be a valid date.`;
    }

    return undefined;
  },

  optionalString(value, label, maxLength) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (normalized.length > maxLength) {
      return `${label} must be at most ${maxLength} characters.`;
    }

    return undefined;
  },

  boolean(value, label) {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'boolean') {
      return `${label} must be true or false.`;
    }

    return undefined;
  },

  interval(value) {
    const numberError = validators.nonNegativeNumber(
      value,
      'Current interval days',
    );

    if (numberError) {
      return numberError;
    }

    if (
      value !== undefined &&
      !SPACED_REPETITION_INTERVALS_DAYS.includes(value)
    ) {
      return `Current interval days must be one of: ${SPACED_REPETITION_INTERVALS_DAYS.join(', ')}.`;
    }

    return undefined;
  },
};

const createRevisionScheduleSchema = {
  userId: (value) => validators.objectId(value, 'User ID'),
  problemId: (value) => validators.objectId(value, 'Problem ID'),
  status: (value) =>
    validators.enumValue(value, 'Revision status', Object.values(REVISION_STATUSES), {
      required: false,
    }),
  currentIntervalDays: validators.interval,
  nextRevisionAt: (value) =>
    validators.date(value, 'Next revision date', { required: true }),
  lastRevisionAt: (value) => validators.date(value, 'Last revision date'),
  revisionCount: (value) =>
    validators.nonNegativeNumber(value, 'Revision count'),
  successfulRevisionCount: (value) =>
    validators.nonNegativeNumber(value, 'Successful revision count'),
  lastRevisionResult: (value) =>
    validators.enumValue(
      value,
      'Last revision result',
      Object.values(REVISION_RESULTS),
      { required: false },
    ),
  isActive: (value) => validators.boolean(value, 'Revision active flag'),
};

const updateRevisionScheduleSchema = {
  status: createRevisionScheduleSchema.status,
  currentIntervalDays: createRevisionScheduleSchema.currentIntervalDays,
  nextRevisionAt: (value) => validators.date(value, 'Next revision date'),
  lastRevisionAt: createRevisionScheduleSchema.lastRevisionAt,
  revisionCount: createRevisionScheduleSchema.revisionCount,
  successfulRevisionCount:
    createRevisionScheduleSchema.successfulRevisionCount,
  lastRevisionResult: createRevisionScheduleSchema.lastRevisionResult,
  isActive: createRevisionScheduleSchema.isActive,
};

const createRevisionSessionSchema = {
  userId: (value) => validators.objectId(value, 'User ID'),
  problemId: (value) => validators.objectId(value, 'Problem ID'),
  revisionScheduleId: (value) =>
    validators.objectId(value, 'Revision schedule ID'),
  sessionType: (value) =>
    validators.enumValue(
      value,
      'Revision session type',
      Object.values(SESSION_TYPES),
      { required: false },
    ),
  result: (value) =>
    validators.enumValue(value, 'Revision result', Object.values(REVISION_RESULTS)),
  durationMinutes: (value) =>
    validators.nonNegativeNumber(value, 'Duration minutes'),
  notes: (value) =>
    validators.optionalString(
      value,
      'Notes',
      REVISION_LIMITS.NOTE_MAX_LENGTH,
    ),
  feedback: (value) =>
    validators.optionalString(
      value,
      'Feedback',
      REVISION_LIMITS.FEEDBACK_MAX_LENGTH,
    ),
  completedAt: (value) =>
    validators.date(value, 'Revision completion date', { required: true }),
};

const updateRevisionSessionSchema = {
  sessionType: createRevisionSessionSchema.sessionType,
  result: (value) =>
    validators.enumValue(
      value,
      'Revision result',
      Object.values(REVISION_RESULTS),
      { required: false },
    ),
  durationMinutes: createRevisionSessionSchema.durationMinutes,
  notes: createRevisionSessionSchema.notes,
  feedback: createRevisionSessionSchema.feedback,
  completedAt: (value) => validators.date(value, 'Revision completion date'),
};

export function validateCreateRevisionSchedule(payload) {
  return validateAgainstSchema(payload, createRevisionScheduleSchema);
}

export function validateUpdateRevisionSchedule(payload) {
  return validateAgainstSchema(payload, updateRevisionScheduleSchema);
}

export function validateCreateRevisionSession(payload) {
  return validateAgainstSchema(payload, createRevisionSessionSchema);
}

export function validateUpdateRevisionSession(payload) {
  return validateAgainstSchema(payload, updateRevisionSessionSchema);
}

function validateAgainstSchema(payload, schema) {
  const errors = {};

  for (const [field, validateField] of Object.entries(schema)) {
    const error = validateField(payload?.[field]);

    if (error) {
      errors[field] = error;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
