export const APPLICATION_STATUSES = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  dateAdded: string;
  /** Local calendar date (YYYY-MM-DD). Missing on entries saved before this field existed. */
  dateApplied?: string;
}
