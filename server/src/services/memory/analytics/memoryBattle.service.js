import { calculateRetrievability } from '../simulation/memoryDecay.service.js';
export function generateMemoryBattle({
  memoryState,
}) {
  const checkpoints = [
    0,
    1,
    3,
    7,
    14,
    30,
  ];

  const timeline =
    checkpoints.map((days) => ({
      day: days,

      retrievability:
        Number(
          calculateRetrievability({
            memoryState: {
              ...memoryState,

              elapsedDays:
                days,
            },
          }).toFixed(1),
        ),
    }));

  const dangerDay =
    timeline.find(
      (point) =>
        point.retrievability < 60,
    )?.day ?? '>30';

  return {
    timeline,

    dangerDay,

    recommendation:
      dangerDay === '>30'
        ? 'Excellent memory stability. No urgent review required.'
        : `Review within ${dangerDay} day(s) to prevent rapid forgetting.`,
  };
}