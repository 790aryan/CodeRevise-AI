export function normalizeEmail(value) {
  return normalizeOptionalString(value)?.toLowerCase();
}

export function normalizeLeetcodeUsername(value) {
  return normalizeOptionalString(value)?.toLowerCase();
}

export function normalizeCodeforcesHandle(value) {
  return normalizeOptionalString(value)?.toLowerCase();
}

export function normalizeOptionalString(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : undefined;
}
