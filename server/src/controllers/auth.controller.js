import { TOKEN_TYPES } from '../constants/auth.js';
import { config } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.service.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getCookieName } from '../utils/auth.utils.js';
import {
  clearAuthCookies,
  readCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '../utils/cookie.utils.js';
import { AppError } from '../utils/errors.js';

export async function register(request, response, next) {
  try {
    const session = await registerUser(request.body);
    applyAuthCookies(response, session);

    sendSuccess(response, {
      statusCode: HTTP_STATUS.CREATED,
      message: 'Registration completed successfully.',
      data: { user: session.user },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(request, response, next) {
  try {
    const session = await loginUser(request.body);
    applyAuthCookies(response, session);

    sendSuccess(response, {
      message: 'Login completed successfully.',
      data: { user: session.user },
    });
  } catch (error) {
    next(error);
  }
}

export function refresh(request, response, next) {
  try {
    const refreshToken = readCookie(
      request,
      getCookieName(TOKEN_TYPES.REFRESH_TOKEN),
    );

    if (!refreshToken) {
      throw new AppError('Refresh token cookie is required.', {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        code: 'missing_refresh_token',
      });
    }

    const session = refreshSession(refreshToken);
    setAccessTokenCookie(response, session.accessToken, {
      environment: config.nodeEnv,
    });

    sendSuccess(response, {
      message: 'Session refreshed successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

export function logout(_request, response, next) {
  try {
    logoutUser();
    clearAuthCookies(response, { environment: config.nodeEnv });

    sendSuccess(response, {
      message: 'Logout completed successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

export async function me(request, response, next) {
  try {
    sendSuccess(response, {
      message: 'Current user retrieved successfully.',
      data: {
        user: request.user,
      },
    });
  } catch (error) {
    next(error);
  }
}

function applyAuthCookies(response, session) {
  setAccessTokenCookie(response, session.accessToken, {
    environment: config.nodeEnv,
  });
  setRefreshTokenCookie(response, session.refreshToken, {
    environment: config.nodeEnv,
  });
}
