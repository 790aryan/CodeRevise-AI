import { NotFoundError } from '../utils/errors.js';

export function notFoundMiddleware(request, _response, next) {
  next(
    new NotFoundError(`Route ${request.method} ${request.originalUrl} was not found.`),
  );
}
