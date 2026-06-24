import mongoose from 'mongoose';
import {
  USER_ACCOUNT_STATUS,
  USER_LIMITS,
  USER_THEMES,
} from '../constants/user.js';
import {
  normalizeCodeforcesHandle,
  normalizeEmail,
  normalizeLeetcodeUsername,
  normalizeOptionalString,
} from '../utils/userNormalization.js';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [
        USER_LIMITS.NAME_MIN_LENGTH,
        `Name must be at least ${USER_LIMITS.NAME_MIN_LENGTH} characters.`,
      ],
      maxlength: [
        USER_LIMITS.NAME_MAX_LENGTH,
        `Name must be at most ${USER_LIMITS.NAME_MAX_LENGTH} characters.`,
      ],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      set: normalizeEmail,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required.'],
      select: false,
    },
    leetcodeUsername: {
      type: String,
      trim: true,
      lowercase: true,
      set: normalizeLeetcodeUsername,
      maxlength: [
        USER_LIMITS.USERNAME_MAX_LENGTH,
        `LeetCode username must be at most ${USER_LIMITS.USERNAME_MAX_LENGTH} characters.`,
      ],
      match: [
        /^[a-z0-9_.-]+$/,
        'LeetCode username may only contain letters, numbers, dots, underscores, and hyphens.',
      ],
    },
    codeforcesHandle: {
      type: String,
      trim: true,
      lowercase: true,
      set: normalizeCodeforcesHandle,
      maxlength: [
        USER_LIMITS.USERNAME_MAX_LENGTH,
        `Codeforces handle must be at most ${USER_LIMITS.USERNAME_MAX_LENGTH} characters.`,
      ],
      match: [
        /^[a-z0-9_.-]+$/,
        'Codeforces handle may only contain letters, numbers, dots, underscores, and hyphens.',
      ],
    },
    theme: {
      type: String,
      enum: {
        values: Object.values(USER_THEMES),
        message: 'Theme is not supported.',
      },
      default: USER_THEMES.SYSTEM,
    },
    timezone: {
      type: String,
      trim: true,
      default: 'UTC',
      validate: {
        validator(value) {
          try {
            Intl.DateTimeFormat(undefined, { timeZone: value });
            return true;
          } catch {
            return false;
          }
        },
        message: 'Timezone must be a valid IANA timezone.',
      },
    },
    bio: {
      type: String,
      trim: true,
      set: normalizeOptionalString,
      maxlength: [
        USER_LIMITS.BIO_MAX_LENGTH,
        `Bio must be at most ${USER_LIMITS.BIO_MAX_LENGTH} characters.`,
      ],
    },
    avatarUrl: {
      type: String,
      trim: true,
      set: normalizeOptionalString,
      maxlength: [
        USER_LIMITS.AVATAR_URL_MAX_LENGTH,
        `Avatar URL must be at most ${USER_LIMITS.AVATAR_URL_MAX_LENGTH} characters.`,
      ],
      validate: {
        validator(value) {
          if (!value) {
            return true;
          }

          try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol);
          } catch {
            return false;
          }
        },
        message: 'Avatar URL must be a valid HTTP or HTTPS URL.',
      },
    },
    weeklyReportsEnabled: {
      type: Boolean,
      default: true,
    },
    publicProfileEnabled: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: {
        values: Object.values(USER_ACCOUNT_STATUS),
        message: 'Account status is not supported.',
      },
      default: USER_ACCOUNT_STATUS.ACTIVE,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

// Password hashes are stored only after bcrypt processing and excluded from default query output.
// Authentication code must explicitly opt in with select('+passwordHash') when verifying credentials.

// Unique email lookup is required for identity ownership, but authentication fields are intentionally excluded.
userSchema.index({ email: 1 }, { unique: true });

// Platform indexes prepare sync and profile linking while allowing users to leave accounts unconnected.
userSchema.index(
  { leetcodeUsername: 1 },
  {
    unique: true,
    partialFilterExpression: { leetcodeUsername: { $type: 'string' } },
  },
);
userSchema.index(
  { codeforcesHandle: 1 },
  {
    unique: true,
    partialFilterExpression: { codeforcesHandle: { $type: 'string' } },
  },
);

// Preferences support future retention, readiness, weekly report, streak, and roadmap calculations.
// Public profile fields stay opt-in so future public pages can project safe user data without exposing private learning records.

export const User = mongoose.model('User', userSchema);
export { userSchema };
