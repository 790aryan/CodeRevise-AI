import { HTTP_STATUS } from '../constants/httpStatus.js';
import { User } from '../models/User.model.js';
import {
  validateLogin,
  validateRefresh,
  validateRegister,
} from '../validations/auth.validation.js';
import { normalizeAuthEmail } from '../utils/auth.utils.js';
import { AppError, ValidationError } from '../utils/errors.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.utils.js';
import { comparePassword, hashPassword } from '../utils/password.utils.js';

const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password.';

export async function registerUser(payload) {
  const validation = validateRegister(payload);

  if (!validation.valid) {
    throw new ValidationError('Registration input is invalid.', validation.errors);
  }

  const email = normalizeAuthEmail(payload.email);
  const existingUser = await User.findOne({ email }).select('_id').lean();

  if (existingUser) {
    throw new AppError('Registration could not be completed.', {
      statusCode: HTTP_STATUS.CONFLICT,
      code: 'registration_conflict',
    });
  }

  const passwordHash = await hashPassword(payload.password);
  const user = await User.create({
    name: payload.name,
    email,
    passwordHash,
  });

  return createSessionPayload(user);
}

export async function loginUser(payload) {
  const validation = validateLogin(payload);

  if (!validation.valid) {
    throw new ValidationError('Login input is invalid.', validation.errors);
  }

  const email = normalizeAuthEmail(payload.email);
  const user = await User.findOne({ email }).select('+passwordHash');
  const passwordMatches = await comparePassword(payload.password, user?.passwordHash);

  if (!user || !passwordMatches) {
    throw new AppError(INVALID_CREDENTIALS_MESSAGE, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: 'invalid_credentials',
    });
  }

  return createSessionPayload(user);
}

export function refreshSession(refreshToken) {
  const payload = verifyRefreshToken(refreshToken);
  const validation = validateRefresh({ tokenType: payload.tokenType });

  if (!validation.valid) {
    throw new AppError('Refresh token is invalid.', {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      code: 'invalid_refresh_token',
    });
  }

  return {
    accessToken: generateAccessToken(payload.userId),
  };
}

export function logoutUser() {
  return {
    loggedOut: true,
  };
}

function createSessionPayload(user) {
  const userId = user._id.toString();

  return {
    user: serializeAuthUser(user),
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
}

function serializeAuthUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    accountStatus: user.accountStatus,
    theme: user.theme,
    timezone: user.timezone,
  };
}
