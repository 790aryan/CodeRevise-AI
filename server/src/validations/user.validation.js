import { USER_THEMES, USER_LIMITS } from '../constants/user.js';
import {
  normalizeEmail,
  normalizeOptionalString,
} from '../utils/userNormalization.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLATFORM_USERNAME_PATTERN = /^[a-z0-9_.-]+$/;

const validators = {
  name(value, { required = false } = {}) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return required ? 'Name is required.' : undefined;
    }

    if (normalized.length < USER_LIMITS.NAME_MIN_LENGTH) {
      return `Name must be at least ${USER_LIMITS.NAME_MIN_LENGTH} characters.`;
    }

    if (normalized.length > USER_LIMITS.NAME_MAX_LENGTH) {
      return `Name must be at most ${USER_LIMITS.NAME_MAX_LENGTH} characters.`;
    }

    return undefined;
  },

  email(value, { required = false } = {}) {
    const normalized = normalizeEmail(value);

    if (!normalized) {
      return required ? 'Email is required.' : undefined;
    }

    if (!EMAIL_PATTERN.test(normalized)) {
      return 'Email must be a valid email address.';
    }

    return undefined;
  },

  platformUsername(value, label) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (normalized.length > USER_LIMITS.USERNAME_MAX_LENGTH) {
      return `${label} must be at most ${USER_LIMITS.USERNAME_MAX_LENGTH} characters.`;
    }

    if (!PLATFORM_USERNAME_PATTERN.test(normalized.toLowerCase())) {
      return `${label} may only contain letters, numbers, dots, underscores, and hyphens.`;
    }

    return undefined;
  },

  theme(value) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (!Object.values(USER_THEMES).includes(normalized)) {
      return `Theme must be one of: ${Object.values(USER_THEMES).join(', ')}.`;
    }

    return undefined;
  },

  timezone(value) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (!isValidTimezone(normalized)) {
      return 'Timezone must be a valid IANA timezone.';
    }

    return undefined;
  },

  bio(value) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (normalized.length > USER_LIMITS.BIO_MAX_LENGTH) {
      return `Bio must be at most ${USER_LIMITS.BIO_MAX_LENGTH} characters.`;
    }

    return undefined;
  },

  avatarUrl(value) {
    const normalized = normalizeOptionalString(value);

    if (!normalized) {
      return undefined;
    }

    if (normalized.length > USER_LIMITS.AVATAR_URL_MAX_LENGTH) {
      return `Avatar URL must be at most ${USER_LIMITS.AVATAR_URL_MAX_LENGTH} characters.`;
    }

    try {
      const url = new URL(normalized);
      if (!['http:', 'https:'].includes(url.protocol)) {
        return 'Avatar URL must use HTTP or HTTPS.';
      }
    } catch {
      return 'Avatar URL must be a valid URL.';
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
};

const createUserProfileSchema = {
  name: (value) => validators.name(value, { required: true }),
  email: (value) => validators.email(value, { required: true }),
  leetcodeUsername: (value) =>
    validators.platformUsername(value, 'LeetCode username'),
  codeforcesHandle: (value) =>
    validators.platformUsername(value, 'Codeforces handle'),
  theme: validators.theme,
  timezone: validators.timezone,
  bio: validators.bio,
  avatarUrl: validators.avatarUrl,
  weeklyReportsEnabled: (value) =>
    validators.boolean(value, 'Weekly reports setting'),
  publicProfileEnabled: (value) =>
    validators.boolean(value, 'Public profile setting'),
};

const updateUserProfileSchema = {
  name: validators.name,
  leetcodeUsername: (value) =>
    validators.platformUsername(value, 'LeetCode username'),
  codeforcesHandle: (value) =>
    validators.platformUsername(value, 'Codeforces handle'),
  bio: validators.bio,
  avatarUrl: validators.avatarUrl,
};

const updatePreferencesSchema = {
  theme: validators.theme,
  timezone: validators.timezone,
  weeklyReportsEnabled: (value) =>
    validators.boolean(value, 'Weekly reports setting'),
  publicProfileEnabled: (value) =>
    validators.boolean(value, 'Public profile setting'),
};

export function validateCreateUserProfile(payload) {
  return validateAgainstSchema(payload, createUserProfileSchema);
}

export function validateUpdateUserProfile(payload) {
  return validateAgainstSchema(payload, updateUserProfileSchema);
}

export function validateUpdatePreferences(payload) {
  return validateAgainstSchema(payload, updatePreferencesSchema);
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

function isValidTimezone(value) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}
