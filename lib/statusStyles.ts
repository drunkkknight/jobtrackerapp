import { ApplicationStatus } from "./types";

export const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
  Interviewing:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  Offer: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20",
};

export const STATUS_DOT: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-500",
  Interviewing: "bg-amber-500",
  Offer: "bg-emerald-500",
  Rejected: "bg-rose-500",
};
