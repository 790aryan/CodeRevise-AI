/**
 * ==========================================================
 * CodeRevise AI V9
 * AI Coach
 * ==========================================================
 *
 * Generates intelligent coaching messages based on
 * the current memory state.
 */

export function generateAICoach({
  analytics,
}) {
  const messages = [];

  /**
   * ------------------------------------------
   * Memory Health
   * ------------------------------------------
   */

  if (analytics.memoryHealth >= 90) {
    messages.push(
      '🧠 Excellent long-term retention. Keep following your revision schedule.',
    );
  } else if (analytics.memoryHealth >= 70) {
    messages.push(
      '📈 Your memory is healthy. Continue spaced repetition.',
    );
  } else {
    messages.push(
      '⚠ Your memory is weakening. Review this problem soon.',
    );
  }

  /**
   * ------------------------------------------
   * Forget Risk
   * ------------------------------------------
   */

  switch (analytics.forgetRisk) {
    case 'High':
      messages.push(
        '🔥 High forgetting risk detected. Review immediately.',
      );
      break;

    case 'Medium':
      messages.push(
        '⏳ Schedule a revision within the next few days.',
      );
      break;

    default:
      messages.push(
        '✅ Safe to postpone revision.',
      );
  }

  /**
   * ------------------------------------------
   * Strength
   * ------------------------------------------
   */

  if (analytics.strength < 15) {
    messages.push(
      '💡 Focus on active recall instead of rereading.',
    );
  } else if (analytics.strength < 30) {
    messages.push(
      '📚 Encoding quality is improving steadily.',
    );
  } else {
    messages.push(
      '🚀 Encoding quality is excellent.',
    );
  }

  /**
   * ------------------------------------------
   * Stability
   * ------------------------------------------
   */

  if (analytics.stability > 365) {
    messages.push(
      '🏆 This memory is approaching permanent retention.',
    );
  }

  /**
   * ------------------------------------------
   * Next Review
   * ------------------------------------------
   */

  messages.push(
    `📅 Next recommended review in ${analytics.nextRevisionIn} day(s).`,
  );

  return messages;
}