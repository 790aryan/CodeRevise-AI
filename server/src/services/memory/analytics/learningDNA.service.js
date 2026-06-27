export function generateLearningDNA(stats) {
  const learningSpeed = calculateLearningSpeed(stats);
  const retrieval = calculateRetrieval(stats);
  const improvement = calculateImprovement(stats);
  const confidence = calculateConfidence(stats);
  const retention = calculateRetention(stats);

  return {
    learningSpeed,
    retrieval,
    improvement,
    confidence,
    retention,
    style: buildLearningStyle({
      learningSpeed,
      retrieval,
      improvement,
      confidence,
      retention,
    }),
  };
}

function calculateLearningSpeed(stats) {
  const avg = stats.averageTime || 1200;

  if (avg <= 300) return 5;
  if (avg <= 600) return 4;
  if (avg <= 900) return 3;
  if (avg <= 1200) return 2;

  return 1;
}

function calculateRetrieval(stats) {
  const memory = stats.memoryScore ?? 0;

  if (memory >= 90) return 5;
  if (memory >= 75) return 4;
  if (memory >= 60) return 3;
  if (memory >= 40) return 2;

  return 1;
}

function calculateImprovement(stats) {
  const mastery = stats.masteryScore ?? 0;

  if (mastery >= 90) return 5;
  if (mastery >= 75) return 4;
  if (mastery >= 60) return 3;
  if (mastery >= 40) return 2;

  return 1;
}

function calculateConfidence(stats) {
  const confidence = stats.averageConfidence ?? 0;

  if (confidence >= 4.8) return 5;
  if (confidence >= 4.2) return 4;
  if (confidence >= 3.4) return 3;
  if (confidence >= 2.5) return 2;

  return 1;
}

function calculateRetention(stats) {
  const stability = stats.stability ?? 1;

  if (stability >= 365) return 5;
  if (stability >= 120) return 4;
  if (stability >= 30) return 3;
  if (stability >= 7) return 2;

  return 1;
}

function buildLearningStyle(scores) {
  const style = [];

  if (scores.learningSpeed >= 4)
    style.push('Rapid Learner');

  if (scores.retention >= 4)
    style.push('Excellent Long-Term Memory');

  if (scores.retrieval >= 4)
    style.push('Strong Retrieval Ability');

  if (scores.improvement >= 4)
    style.push('Fast Improvement');

  if (scores.confidence <= 2)
    style.push('Needs Confidence Calibration');

  return style;
}