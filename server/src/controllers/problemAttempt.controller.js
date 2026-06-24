import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  createProblemAttempt,
  deleteProblemAttempt,
  getProblemAttemptById,
  listProblemAttempts,
  updateProblemAttempt,
} from '../services/problemAttempt.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function createProblemAttemptController(request, response, next) {
  try {
    const problemAttempt = await createProblemAttempt(request.body);

    sendSuccess(response, {
      statusCode: HTTP_STATUS.CREATED,
      message: 'Problem attempt created successfully.',
      data: { problemAttempt },
    });
  } catch (error) {
    next(error);
  }
}

export async function listProblemAttemptsController(request, response, next) {
  try {
    const result = await listProblemAttempts(request.query);

    sendSuccess(response, {
      message: 'Problem attempts retrieved successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProblemAttemptController(request, response, next) {
  try {
    const problemAttempt = await getProblemAttemptById(request.params.id);

    sendSuccess(response, {
      message: 'Problem attempt retrieved successfully.',
      data: { problemAttempt },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProblemAttemptController(request, response, next) {
  try {
    const problemAttempt = await updateProblemAttempt(
      request.params.id,
      request.body,
    );

    sendSuccess(response, {
      message: 'Problem attempt updated successfully.',
      data: { problemAttempt },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProblemAttemptController(request, response, next) {
  try {
    const problemAttempt = await deleteProblemAttempt(request.params.id);

    sendSuccess(response, {
      message: 'Problem attempt deleted successfully.',
      data: { problemAttempt },
    });
  } catch (error) {
    next(error);
  }
}
