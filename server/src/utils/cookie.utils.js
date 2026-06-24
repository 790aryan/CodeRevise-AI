import { TOKEN_TYPES } from '../constants/auth.js';
import {
  createCookieOptions,
  getCookieName,
} from './auth.utils.js';

export function setAccessTokenCookie(response, token, { environment } = {}) {
  response.cookie(
    getCookieName(TOKEN_TYPES.ACCESS_TOKEN),
    token,
    createCookieOptions(TOKEN_TYPES.ACCESS_TOKEN, { environment }),
  );
}

export function setRefreshTokenCookie(response, token, { environment } = {}) {
  response.cookie(
    getCookieName(TOKEN_TYPES.REFRESH_TOKEN),
    token,
    createCookieOptions(TOKEN_TYPES.REFRESH_TOKEN, { environment }),
  );
}

export function clearAuthCookies(response, { environment } = {}) {
  response.clearCookie(
    getCookieName(TOKEN_TYPES.ACCESS_TOKEN),
    createClearCookieOptions(TOKEN_TYPES.ACCESS_TOKEN, { environment }),
  );
  response.clearCookie(
    getCookieName(TOKEN_TYPES.REFRESH_TOKEN),
    createClearCookieOptions(TOKEN_TYPES.REFRESH_TOKEN, { environment }),
  );
}

export function readCookie(request, cookieName) {
  const cookieHeader = request.headers.cookie;

  if (!cookieHeader) {
    return undefined;
  }

  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .map((cookie) => cookie.split('='))
    .find(([name]) => name === cookieName)?.[1];
}

function createClearCookieOptions(tokenType, { environment } = {}) {
  const { maxAge, ...options } = createCookieOptions(tokenType, { environment });
  void maxAge;

  return options;
}
