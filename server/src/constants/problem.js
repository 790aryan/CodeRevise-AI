export const PLATFORMS = {
  LEETCODE: 'leetcode',
  CODEFORCES: 'codeforces',
};

export const LEETCODE_DIFFICULTIES = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const CODEFORCES_DIFFICULTIES = {
  RATING_800: '800',
  RATING_900: '900',
  RATING_1000: '1000',
  RATING_1100: '1100',
  RATING_1200: '1200',
  RATING_1300: '1300',
  RATING_1400: '1400',
  RATING_1500: '1500',
  RATING_1600: '1600',
  RATING_1700: '1700',
  RATING_1800: '1800',
  RATING_1900: '1900',
  RATING_2000: '2000',
  RATING_2100: '2100',
  RATING_2200: '2200',
  RATING_2300: '2300',
  RATING_2400: '2400',
  RATING_2500: '2500',
  RATING_2600: '2600',
  RATING_2700: '2700',
  RATING_2800: '2800',
  RATING_2900: '2900',
  RATING_3000_PLUS: '3000+',
};

export const PROBLEM_STATUSES = {
  NOT_STARTED: 'not_started',
  ATTEMPTED: 'attempted',
  SOLVED: 'solved',
  REVISITED: 'revisited',
  NEEDS_REVISION: 'needs_revision',
};

export const MISTAKE_TYPES = {
  LOGIC_ERROR: 'logic_error',
  IMPLEMENTATION_ERROR: 'implementation_error',
  SYNTAX_ERROR: 'syntax_error',
  TIME_COMPLEXITY: 'time_complexity',
  SPACE_COMPLEXITY: 'space_complexity',
  EDGE_CASE: 'edge_case',
  FORGOT_APPROACH: 'forgot_approach',
  OTHER: 'other',
};

export const PROBLEM_LIMITS = {
  TOPIC_NAME_MAX_LENGTH: 80,
  TOPIC_DESCRIPTION_MAX_LENGTH: 500,
  TITLE_MAX_LENGTH: 180,
  SLUG_MAX_LENGTH: 220,
  PLATFORM_PROBLEM_ID_MAX_LENGTH: 120,
  PROBLEM_URL_MAX_LENGTH: 2048,
  NOTES_MAX_LENGTH: 2000,
};

export const ALL_PROBLEM_DIFFICULTIES = [
  ...Object.values(LEETCODE_DIFFICULTIES),
  ...Object.values(CODEFORCES_DIFFICULTIES),
];
