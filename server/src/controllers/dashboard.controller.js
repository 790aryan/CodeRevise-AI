import { getDashboardSummary,  getDashboardProgress,} from '../services/dashboard.service.js';

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