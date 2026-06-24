import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  createRevisionSession,
  deleteRevisionSession,
  getRevisionSessionById,
  listRevisionSessions,
  updateRevisionSession,
} from '../services/revisionSession.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function createRevisionSessionController(request, response, next) {
  try {
    const revisionSession = await createRevisionSession(request.body);

    sendSuccess(response, {
      statusCode: HTTP_STATUS.CREATED,
      message: 'Revision session created successfully.',
      data: { revisionSession },
    });
  } catch (error) {
    next(error);
  }
}

export async function listRevisionSessionsController(request, response, next) {
  try {
    const result = await listRevisionSessions(request.query);

    sendSuccess(response, {
      message: 'Revision sessions retrieved successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRevisionSessionController(request, response, next) {
  try {
    const revisionSession = await getRevisionSessionById(request.params.id);

    sendSuccess(response, {
      message: 'Revision session retrieved successfully.',
      data: { revisionSession },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRevisionSessionController(request, response, next) {
  try {
    const revisionSession = await updateRevisionSession(
      request.params.id,
      request.body,
    );

    sendSuccess(response, {
      message: 'Revision session updated successfully.',
      data: { revisionSession },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteRevisionSessionController(request, response, next) {
  try {
    const revisionSession = await deleteRevisionSession(request.params.id);

    sendSuccess(response, {
      message: 'Revision session deleted successfully.',
      data: { revisionSession },
    });
  } catch (error) {
    next(error);
  }
}
