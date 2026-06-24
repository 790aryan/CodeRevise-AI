import {
  COOKIE_DEFAULTS,
  COOKIE_NAMES,
  TOKEN_LIFETIMES,
  TOKEN_TYPES,
} from '../constants/auth.js';
import { normalizeEmail } from './userNormalization.js';

export function normalizeAuthEmail(value) {
  return normalizeEmail(value);
}

export function normalizePassword(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  return String(value);
}

export function createCookieOptions(
  tokenType,
  { environment = 'development' } = {},
) {
  const isProduction = environment === 'production';
  const maxAge =
    tokenType === TOKEN_TYPES.REFRESH_TOKEN
      ? TOKEN_LIFETIMES.REFRESH_TOKEN_SECONDS * 1000
      : TOKEN_LIFETIMES.ACCESS_TOKEN_SECONDS * 1000;

  return {
    httpOnly: COOKIE_DEFAULTS.httpOnly,
    secure: isProduction
      ? COOKIE_DEFAULTS.secure.production
      : COOKIE_DEFAULTS.secure.development,
    sameSite: isProduction
      ? COOKIE_DEFAULTS.sameSite.production
      : COOKIE_DEFAULTS.sameSite.development,
    path: COOKIE_DEFAULTS.path,
    maxAge,
  };
}

export function getCookieName(tokenType) {
  return tokenType === TOKEN_TYPES.REFRESH_TOKEN
    ? COOKIE_NAMES.REFRESH_TOKEN_COOKIE
    : COOKIE_NAMES.ACCESS_TOKEN_COOKIE;
}

export function createJwtPayload({
  userId,
  tokenType,
  issuedAt,
  expiration,
}) {
  return {
    userId,
    tokenType,
    iat: issuedAt,
    exp: expiration,
  };
}

export function createPlannedJwtPayload({
  userId,
  tokenType,
  issuedAt = Math.floor(Date.now() / 1000),
}) {
  const lifetimeSeconds =
    tokenType === TOKEN_TYPES.REFRESH_TOKEN
      ? TOKEN_LIFETIMES.REFRESH_TOKEN_SECONDS
      : TOKEN_LIFETIMES.ACCESS_TOKEN_SECONDS;

  return createJwtPayload({
    userId,
    tokenType,
    issuedAt,
    expiration: issuedAt + lifetimeSeconds,
  });
}
