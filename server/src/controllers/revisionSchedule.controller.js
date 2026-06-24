import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  createRevisionSchedule,
  deleteRevisionSchedule,
  getRevisionScheduleById,
  listRevisionSchedules,
  updateRevisionSchedule,
} from '../services/revisionSchedule.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function createRevisionScheduleController(request, response, next) {
  try {
    const revisionSchedule = await createRevisionSchedule(request.body);

    sendSuccess(response, {
      statusCode: HTTP_STATUS.CREATED,
      message: 'Revision schedule created successfully.',
      data: { revisionSchedule },
    });
  } catch (error) {
    next(error);
  }
}

export async function listRevisionSchedulesController(request, response, next) {
  try {
    const result = await listRevisionSchedules(request.query);

    sendSuccess(response, {
      message: 'Revision schedules retrieved successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRevisionScheduleController(request, response, next) {
  try {
    const revisionSchedule = await getRevisionScheduleById(request.params.id);

    sendSuccess(response, {
      message: 'Revision schedule retrieved successfully.',
      data: { revisionSchedule },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRevisionScheduleController(request, response, next) {
  try {
    const revisionSchedule = await updateRevisionSchedule(
      request.params.id,
      request.body,
    );

    sendSuccess(response, {
      message: 'Revision schedule updated successfully.',
      data: { revisionSchedule },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteRevisionScheduleController(request, response, next) {
  try {
    const revisionSchedule = await deleteRevisionSchedule(request.params.id);

    sendSuccess(response, {
      message: 'Revision schedule deleted successfully.',
      data: { revisionSchedule },
    });
  } catch (error) {
    next(error);
  }
}
