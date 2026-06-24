import { getDashboardSummary,  getDashboardProgress, getRecentActivity, getDifficultyBreakdown, getWeakTopics,} from '../services/dashboard.service.js';

export async function getSummary(req, res, next) {
  try {
    const result = await getDashboardSummary();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProgress(req, res, next) {
  try {
    const result = await getDashboardProgress();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRecentActivityController(req, res, next) {
  try {
    const result = await getRecentActivity();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDifficultyBreakdownController(
  req,
  res,
  next,
) {
  try {
    const result = await getDifficultyBreakdown();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getWeakTopicsController(
  req,
  res,
  next,
) {
  try {
    const result = await getWeakTopics();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}