import {
  PASSWORD_POLICY,
  TOKEN_TYPES,
} from '../constants/auth.js';
import { normalizeAuthEmail, normalizePassword } from '../utils/auth.utils.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(payload) {
  const errors = {};
  const emailError = validateEmail(payload?.email, { required: true });
  const passwordError = validatePassword(payload?.password, { required: true });
  const nameError = validateName(payload?.name, { required: true });

  assignError(errors, 'email', emailError);
  assignError(errors, 'password', passwordError);
  assignError(errors, 'name', nameError);

  return createValidationResult(errors);
}

export function validateLogin(payload) {
  const errors = {};
  const emailError = validateEmail(payload?.email, { required: true });
  const passwordError = validatePasswordPresence(payload?.password);

  assignError(errors, 'email', emailError);
  assignError(errors, 'password', passwordError);

  return createValidationResult(errors);
}

export function validateRefresh(payload) {
  const errors = {};
  const tokenTypeError = validateTokenType(
    payload?.tokenType,
    TOKEN_TYPES.REFRESH_TOKEN,
  );

  assignError(errors, 'tokenType', tokenTypeError);

  return createValidationResult(errors);
}

export function validateLogout(payload) {
  const errors = {};

  if (payload?.tokenType !== undefined) {
    const tokenTypeError = validateTokenType(
      payload.tokenType,
      TOKEN_TYPES.REFRESH_TOKEN,
    );
    assignError(errors, 'tokenType', tokenTypeError);
  }

  return createValidationResult(errors);
}

export function validatePassword(value, { required = false } = {}) {
  const password = normalizePassword(value);

  if (!password) {
    return required ? PASSWORD_POLICY.MESSAGES.REQUIRED : undefined;
  }

  if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
    return PASSWORD_POLICY.MESSAGES.MIN_LENGTH;
  }

  if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
    return PASSWORD_POLICY.MESSAGES.MAX_LENGTH;
  }

  if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return PASSWORD_POLICY.MESSAGES.LOWERCASE;
  }

  if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return PASSWORD_POLICY.MESSAGES.UPPERCASE;
  }

  if (PASSWORD_POLICY.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    return PASSWORD_POLICY.MESSAGES.NUMBER;
  }

  if (PASSWORD_POLICY.REQUIRE_SYMBOL && !/[^a-zA-Z0-9]/.test(password)) {
    return PASSWORD_POLICY.MESSAGES.SYMBOL;
  }

  return undefined;
}

function validatePasswordPresence(value) {
  return normalizePassword(value) ? undefined : PASSWORD_POLICY.MESSAGES.REQUIRED;
}

function validateEmail(value, { required = false } = {}) {
  const email = normalizeAuthEmail(value);

  if (!email) {
    return required ? 'Email is required.' : undefined;
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Email must be a valid email address.';
  }

  return undefined;
}

function validateName(value, { required = false } = {}) {
  const name = typeof value === 'string' ? value.trim() : undefined;

  if (!name) {
    return required ? 'Name is required.' : undefined;
  }

  if (name.length < 2) {
    return 'Name must be at least 2 characters.';
  }

  if (name.length > 80) {
    return 'Name must be at most 80 characters.';
  }

  return undefined;
}

function validateTokenType(value, expectedType) {
  if (!value) {
    return 'Token type is required.';
  }

  if (value !== expectedType) {
    return `Token type must be ${expectedType}.`;
  }

  return undefined;
}

function assignError(errors, field, error) {
  if (error) {
    errors[field] = error;
  }
}

function createValidationResult(errors) {
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
