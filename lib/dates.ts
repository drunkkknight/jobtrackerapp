/** Today's date in the user's local timezone, as YYYY-MM-DD (the format <input type="date"> uses). */
export function todayISODate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string as a local date. `new Date("YYYY-MM-DD")` parses as
 * UTC midnight, which shows as the previous day in timezones behind UTC.
 */
export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
