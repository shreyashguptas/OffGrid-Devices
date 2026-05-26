/**
 * Rolling priceValidUntil — end of the current calendar year. Re-evaluated
 * on each build, which is sufficient for an evergreen SKU. Format: YYYY-12-31.
 *
 * Google's Product rich-results validator warns when an Offer omits
 * priceValidUntil; this avoids the warning without committing to a real
 * expiry that would need manual maintenance.
 */
export function priceValidUntilEndOfYear(): string {
  return `${new Date().getFullYear()}-12-31`;
}
