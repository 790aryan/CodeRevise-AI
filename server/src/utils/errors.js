import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

export class AppError extends Error {
  constructor(
    message,
    {
      statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
      code = 'app_error',
      isOperational = true,
    } = {},
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = MESSAGES.ERROR.NOT_FOUND) {
    super(message, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      code: 'not_found',
    });
  }
}

export class ValidationError extends AppError {
  constructor(message = MESSAGES.ERROR.VALIDATION, errorDetails = {}) {
    super(message, {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      code: 'validation_error',
    });
    this.details = errorDetails;
  }
}
