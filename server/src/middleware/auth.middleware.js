import { TOKEN_TYPES } from '../constants/auth.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

import { getCurrentUser } from '../services/auth.service.js';

import { getCookieName } from '../utils/auth.utils.js';
import { readCookie } from '../utils/cookie.utils.js';

import { AppError } from '../utils/errors.js';

export const protect = async (
  request,
  response,
  next,
) => {

  console.log('Cookie Header:', request.headers.cookie);
console.log('All Headers:', request.headers);
  try {
    const accessToken =
  request.cookies[
    getCookieName(TOKEN_TYPES.ACCESS_TOKEN)
  ];

    if (!accessToken) {
      throw new AppError(
        'Access token cookie is required.',
        {
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          code: 'missing_access_token',
        },
      );
    }

    const user =
      await getCurrentUser(accessToken);

    request.user = user;

    next();
  } catch (error) {
    next(error);
  }
};