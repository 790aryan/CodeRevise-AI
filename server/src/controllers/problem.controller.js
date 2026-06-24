import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  createProblem,
  deleteProblem,
  getProblemById,
  listProblems,
  updateProblem,
} from '../services/problem.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function createProblemController(request, response, next) {
  try {
    const problem = await createProblem(request.body);

    sendSuccess(response, {
      statusCode: HTTP_STATUS.CREATED,
      message: 'Problem created successfully.',
      data: { problem },
    });
  } catch (error) {
    next(error);
  }
}

export async function listProblemsController(request, response, next) {
  try {
    const result = await listProblems(request.query);

    sendSuccess(response, {
      message: 'Problems retrieved successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProblemController(request, response, next) {
  try {
    const problem = await getProblemById(request.params.id);

    sendSuccess(response, {
      message: 'Problem retrieved successfully.',
      data: { problem },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProblemController(request, response, next) {
  try {
    const problem = await updateProblem(request.params.id, request.body);

    sendSuccess(response, {
      message: 'Problem updated successfully.',
      data: { problem },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProblemController(request, response, next) {
  try {
    const problem = await deleteProblem(request.params.id);

    sendSuccess(response, {
      message: 'Problem deleted successfully.',
      data: { problem },
    });
  } catch (error) {
    next(error);
  }
}
