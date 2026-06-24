export const TOKEN_TYPES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const TOKEN_LIFETIMES = {
  ACCESS_TOKEN_SECONDS: 15 * 60,
  REFRESH_TOKEN_SECONDS: 7 * 24 * 60 * 60,
  ACCESS_TOKEN_LABEL: '15m',
  REFRESH_TOKEN_LABEL: '7d',
};

export const COOKIE_NAMES = {
  ACCESS_TOKEN_COOKIE: 'coderevise_access_token',
  REFRESH_TOKEN_COOKIE: 'coderevise_refresh_token',
};

export const COOKIE_DEFAULTS = {
  httpOnly: true,
  sameSite: {
    development: 'lax',
    production: 'strict',
  },
  secure: {
    development: false,
    production: true,
  },
  path: '/',
};

export const PASSWORD_POLICY = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 72,
  REQUIRE_LOWERCASE: true,
  REQUIRE_UPPERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SYMBOL: false,
  RATIONALE: {
    MIN_LENGTH: 'Eight characters is the minimum practical baseline for user-created passwords.',
    MAX_LENGTH:
      'Seventy-two characters keeps compatibility with common future password hashing algorithms.',
    REQUIRE_LOWERCASE:
      'Lowercase letters prevent passwords made only of numbers or symbols.',
    REQUIRE_UPPERCASE:
      'Uppercase letters add variety without requiring obscure formatting.',
    REQUIRE_NUMBER:
      'Numbers add basic complexity while staying easy for users to understand.',
    REQUIRE_SYMBOL:
      'Symbols are encouraged but not required to avoid unrealistic password rules.',
  },
  MESSAGES: {
    REQUIRED: 'Password is required.',
    MIN_LENGTH: 'Password must be at least 8 characters.',
    MAX_LENGTH: 'Password must be at most 72 characters.',
    LOWERCASE: 'Password must include at least one lowercase letter.',
    UPPERCASE: 'Password must include at least one uppercase letter.',
    NUMBER: 'Password must include at least one number.',
    SYMBOL: 'Password must include at least one symbol.',
  },
};

export const JWT_CLAIMS = {
  USER_ID: 'userId',
  TOKEN_TYPE: 'tokenType',
  ISSUED_AT: 'iat',
  EXPIRATION: 'exp',
};

export const AUTH_SECURITY = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_SECONDS: 15 * 60,
  EMAIL_NORMALIZATION: {
    trim: true,
    lowercase: true,
  },
  PASSWORD_HANDLING: {
    trimOuterWhitespace: false,
    preserveInternalWhitespace: true,
    hashBeforeStorage: true,
    neverLogPlaintext: true,
  },
  FUTURE_RATE_LIMITS: {
    REGISTER_WINDOW_SECONDS: 15 * 60,
    REGISTER_MAX_REQUESTS: 10,
    LOGIN_WINDOW_SECONDS: 15 * 60,
    LOGIN_MAX_REQUESTS: 20,
    REFRESH_WINDOW_SECONDS: 60,
    REFRESH_MAX_REQUESTS: 30,
  },
};
