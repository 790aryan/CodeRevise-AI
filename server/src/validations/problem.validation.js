import {
  ALL_PROBLEM_DIFFICULTIES,
  MISTAKE_TYPES,
  PLATFORMS,
  PROBLEM_LIMITS,
  PROBLEM_STATUSES,
} from '../constants/problem.js';
import { normalizeOptionalString } from '../utils/userNormalization.js';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const validators = {
  requiredString(value, label, maxLength) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return `${label} is required.`;
    }

    if (normalized.length > maxLength) {
      return `${label} must be at most ${maxLength} characters.`;
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

  slug(value, label) {
    const error = validators.requiredString(
      value,
      label,
      PROBLEM_LIMITS.SLUG_MAX_LENGTH,
    );

    if (error) {
      return error;
    }

    if (!SLUG_PATTERN.test(String(value).trim().toLowerCase())) {
      return `${label} must use lowercase letters, numbers, and hyphens.`;
    }

    return undefined;
  },

  optionalSlug(value, label) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (normalized.length > PROBLEM_LIMITS.SLUG_MAX_LENGTH) {
      return `${label} must be at most ${PROBLEM_LIMITS.SLUG_MAX_LENGTH} characters.`;
    }

    if (!SLUG_PATTERN.test(normalized.toLowerCase())) {
      return `${label} must use lowercase letters, numbers, and hyphens.`;
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

  boolean(value, label) {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'boolean') {
      return `${label} must be true or false.`;
    }

    return undefined;
  },

  url(value, label) {
    const error = validators.requiredString(
      value,
      label,
      PROBLEM_LIMITS.PROBLEM_URL_MAX_LENGTH,
    );

    if (error) {
      return error;
    }

    try {
      const url = new URL(String(value).trim());

      if (!['http:', 'https:'].includes(url.protocol)) {
        return `${label} must use HTTP or HTTPS.`;
      }
    } catch {
      return `${label} must be a valid URL.`;
    }

    return undefined;
  },

  optionalUrl(value, label) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (normalized.length > PROBLEM_LIMITS.PROBLEM_URL_MAX_LENGTH) {
      return `${label} must be at most ${PROBLEM_LIMITS.PROBLEM_URL_MAX_LENGTH} characters.`;
    }

    try {
      const url = new URL(normalized);

      if (!['http:', 'https:'].includes(url.protocol)) {
        return `${label} must use HTTP or HTTPS.`;
      }
    } catch {
      return `${label} must be a valid URL.`;
    }

    return undefined;
  },

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

  objectIdArray(value, label) {
    if (!Array.isArray(value) || value.length === 0) {
      return `${label} must include at least one item.`;
    }

    const invalidItem = value.find((item) => validators.objectId(item, label));

    if (invalidItem) {
      return `${label} contains an invalid identifier.`;
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

  date(value, label) {
    if (value === undefined) {
      return undefined;
    }

    if (Number.isNaN(new Date(value).getTime())) {
      return `${label} must be a valid date.`;
    }

    return undefined;
  },
};

const createTopicSchema = {
  name: (value) =>
    validators.requiredString(
      value,
      'Topic name',
      PROBLEM_LIMITS.TOPIC_NAME_MAX_LENGTH,
    ),
  slug: (value) => validators.slug(value, 'Topic slug'),
  description: (value) =>
    validators.optionalString(
      value,
      'Topic description',
      PROBLEM_LIMITS.TOPIC_DESCRIPTION_MAX_LENGTH,
    ),
  isActive: (value) => validators.boolean(value, 'Topic active flag'),
};

const createProblemSchema = {
  title: (value) =>
    validators.requiredString(
      value,
      'Problem title',
      PROBLEM_LIMITS.TITLE_MAX_LENGTH,
    ),
  slug: (value) => validators.slug(value, 'Problem slug'),
  platform: (value) =>
    validators.enumValue(value, 'Problem platform', Object.values(PLATFORMS)),
  platformProblemId: (value) =>
    validators.requiredString(
      value,
      'Platform problem ID',
      PROBLEM_LIMITS.PLATFORM_PROBLEM_ID_MAX_LENGTH,
    ),
  problemUrl: (value) => validators.url(value, 'Problem URL'),
  difficulty: (value) =>
    validators.enumValue(value, 'Problem difficulty', ALL_PROBLEM_DIFFICULTIES),
  topics: (value) => validators.objectIdArray(value, 'Problem topics'),
  isPremium: (value) => validators.boolean(value, 'Problem premium flag'),
  isActive: (value) => validators.boolean(value, 'Problem active flag'),
};

const updateTopicSchema = {
  name: (value) =>
    validators.optionalString(
      value,
      'Topic name',
      PROBLEM_LIMITS.TOPIC_NAME_MAX_LENGTH,
    ),
  slug: (value) => validators.optionalSlug(value, 'Topic slug'),
  description: (value) =>
    validators.optionalString(
      value,
      'Topic description',
      PROBLEM_LIMITS.TOPIC_DESCRIPTION_MAX_LENGTH,
    ),
  isActive: (value) => validators.boolean(value, 'Topic active flag'),
};

const updateProblemSchema = {
  title: (value) =>
    validators.optionalString(
      value,
      'Problem title',
      PROBLEM_LIMITS.TITLE_MAX_LENGTH,
    ),
  slug: (value) => validators.optionalSlug(value, 'Problem slug'),
  platform: (value) =>
    validators.enumValue(value, 'Problem platform', Object.values(PLATFORMS), {
      required: false,
    }),
  platformProblemId: (value) =>
    validators.optionalString(
      value,
      'Platform problem ID',
      PROBLEM_LIMITS.PLATFORM_PROBLEM_ID_MAX_LENGTH,
    ),
  problemUrl: (value) => validators.optionalUrl(value, 'Problem URL'),
  difficulty: (value) =>
    validators.enumValue(value, 'Problem difficulty', ALL_PROBLEM_DIFFICULTIES, {
      required: false,
    }),
  topics: (value) =>
    value === undefined
      ? undefined
      : validators.objectIdArray(value, 'Problem topics'),
  isPremium: (value) => validators.boolean(value, 'Problem premium flag'),
  isActive: (value) => validators.boolean(value, 'Problem active flag'),
};

const createProblemAttemptSchema = {
  userId: (value) => validators.objectId(value, 'User ID'),
  problemId: (value) => validators.objectId(value, 'Problem ID'),
  status: (value) =>
    validators.enumValue(
      value,
      'Problem attempt status',
      Object.values(PROBLEM_STATUSES),
      { required: false },
    ),
  attemptCount: (value) => validators.nonNegativeNumber(value, 'Attempt count'),
  successfulAttemptCount: (value) =>
    validators.nonNegativeNumber(value, 'Successful attempt count'),
  timeSpentMinutes: (value) =>
    validators.nonNegativeNumber(value, 'Time spent minutes'),
  notes: (value) =>
    validators.optionalString(value, 'Notes', PROBLEM_LIMITS.NOTES_MAX_LENGTH),
  mistakeType: (value) =>
    validators.enumValue(value, 'Mistake type', Object.values(MISTAKE_TYPES), {
      required: false,
    }),
  lastAttemptedAt: (value) => validators.date(value, 'Last attempted date'),
  lastSolvedAt: (value) => validators.date(value, 'Last solved date'),
};

const updateProblemAttemptSchema = {
  status: createProblemAttemptSchema.status,
  attemptCount: createProblemAttemptSchema.attemptCount,
  successfulAttemptCount: createProblemAttemptSchema.successfulAttemptCount,
  timeSpentMinutes: createProblemAttemptSchema.timeSpentMinutes,
  notes: createProblemAttemptSchema.notes,
  mistakeType: createProblemAttemptSchema.mistakeType,
  lastAttemptedAt: createProblemAttemptSchema.lastAttemptedAt,
  lastSolvedAt: createProblemAttemptSchema.lastSolvedAt,
};

export function validateCreateTopic(payload) {
  return validateAgainstSchema(payload, createTopicSchema);
}

export function validateUpdateTopic(payload) {
  return validateAgainstSchema(payload, updateTopicSchema);
}

export function validateCreateProblem(payload) {
  return validateAgainstSchema(payload, createProblemSchema);
}

export function validateUpdateProblem(payload) {
  return validateAgainstSchema(payload, updateProblemSchema);
}

export function validateCreateProblemAttempt(payload) {
  return validateAgainstSchema(payload, createProblemAttemptSchema);
}

export function validateUpdateProblemAttempt(payload) {
  return validateAgainstSchema(payload, updateProblemAttemptSchema);
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
