import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';
import { sendFailure } from '../utils/apiResponse.js';
import { AppError } from '../utils/errors.js';

export function errorMiddleware(error, _request, response, _next) {
  void _next;

  // Temporary debugging
  console.error('\n========== ERROR ==========');
  console.error(error);
  console.error(error.stack);
  console.error('===========================\n');

  const isOperational =
    error instanceof AppError && error.isOperational;

  const statusCode = isOperational
    ? error.statusCode
    : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  sendFailure(response, {
    statusCode,
    message: isOperational
      ? error.message
      : MESSAGES.ERROR.INTERNAL,
    error: {
      code: isOperational
        ? error.code
        : 'internal_error',

      ...(isOperational && error.details
        ? { details: error.details }
        : {}),
    },
  });
}