import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  createTopic,
  deleteTopic,
  getTopicById,
  listTopics,
  updateTopic,
} from '../services/topic.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export async function createTopicController(request, response, next) {
  try {
    const topic = await createTopic(request.body);

    sendSuccess(response, {
      statusCode: HTTP_STATUS.CREATED,
      message: 'Topic created successfully.',
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
}

export async function listTopicsController(_request, response, next) {
  try {
    const topics = await listTopics();

    sendSuccess(response, {
      message: 'Topics retrieved successfully.',
      data: { topics },
    });
  } catch (error) {
    next(error);
  }
}

export async function getTopicController(request, response, next) {
  try {
    const topic = await getTopicById(request.params.id);

    sendSuccess(response, {
      message: 'Topic retrieved successfully.',
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTopicController(request, response, next) {
  try {
    const topic = await updateTopic(request.params.id, request.body);

    sendSuccess(response, {
      message: 'Topic updated successfully.',
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTopicController(request, response, next) {
  try {
    const topic = await deleteTopic(request.params.id);

    sendSuccess(response, {
      message: 'Topic deleted successfully.',
      data: { topic },
    });
  } catch (error) {
    next(error);
  }
}
