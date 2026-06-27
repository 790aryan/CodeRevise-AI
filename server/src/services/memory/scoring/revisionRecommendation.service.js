import { simulateRetention } from '../simulation/retentionSimulator.service.js';

export const calculateRevisionRecommendation = ({
  memoryState,
}) => {
  const simulation = simulateRetention({
    memoryState,
  });

  return {
    recommendedRevisionInterval:
      simulation.reviewDay,

    requiresAIIntervention: false,
  };
};