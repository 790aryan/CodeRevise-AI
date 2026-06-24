import bcrypt from 'bcryptjs';
import { PASSWORD_POLICY } from '../constants/auth.js';
import { ValidationError } from './errors.js';
import { normalizePassword } from './auth.utils.js';

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
  const normalizedPassword = normalizePassword(password);

  if (!normalizedPassword) {
    throw new ValidationError(PASSWORD_POLICY.MESSAGES.REQUIRED);
  }

  return bcrypt.hash(normalizedPassword, SALT_ROUNDS);
}

export async function comparePassword(password, passwordHash) {
  const normalizedPassword = normalizePassword(password);

  if (!normalizedPassword || !passwordHash) {
    return false;
  }

  return bcrypt.compare(normalizedPassword, passwordHash);
}
