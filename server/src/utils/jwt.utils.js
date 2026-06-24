import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { TOKEN_LIFETIMES, TOKEN_TYPES } from '../constants/auth.js';
import { AppError } from './errors.js';
import { createPlannedJwtPayload } from './auth.utils.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export function generateAccessToken(userId) {
  return generateToken(userId, TOKEN_TYPES.ACCESS_TOKEN);
}

export function generateRefreshToken(userId) {
  return generateToken(userId, TOKEN_TYPES.REFRESH_TOKEN);
}

export function verifyAccessToken(token) {
  return verifyToken(token, TOKEN_TYPES.ACCESS_TOKEN);
}

export function verifyRefreshToken(token) {
  return verifyToken(token, TOKEN_TYPES.REFRESH_TOKEN);
}

function generateToken(userId, tokenType) {
  const secret = getSecret(tokenType);
  const payload = createPlannedJwtPayload({ userId, tokenType });
  const expiresIn =
    tokenType === TOKEN_TYPES.REFRESH_TOKEN
      ? TOKEN_LIFETIMES.REFRESH_TOKEN_SECONDS
      : TOKEN_LIFETIMES.ACCESS_TOKEN_SECONDS;

  return jwt.sign(
    {
      userId: payload.userId,
      tokenType: payload.tokenType,
    },
    secret,
    { expiresIn },
  );
}

function verifyToken(token, expectedTokenType) {
  if (!token) {
    throw new AppError('Authentication token is required.', {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: 'missing_token',
    });
  }

  try {
    const payload = jwt.verify(token, getSecret(expectedTokenType));

    if (payload.tokenType !== expectedTokenType) {
      throw new AppError('Authentication token type is invalid.', {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        code: 'invalid_token_type',
      });
    }

    return payload;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Authentication token is invalid or expired.', {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: 'invalid_token',
    });
  }
}

function getSecret(tokenType) {
  return tokenType === TOKEN_TYPES.REFRESH_TOKEN
    ? config.jwtRefreshSecret
    : config.jwtAccessSecret;
}
