import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

export function sendSuccess(
  response,
  {
    statusCode = HTTP_STATUS.OK,
    message = MESSAGES.SUCCESS.OK,
    data = {},
  } = {},
) {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendFailure(
  response,
  {
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = MESSAGES.ERROR.INTERNAL,
    error = {},
  } = {},
) {
  return response.status(statusCode).json({
    success: false,
    message,
    error,
  });
}
