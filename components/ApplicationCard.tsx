"use client";

import { ApplicationStatus, JobApplication } from "@/lib/types";
import { STATUS_DOT, STATUS_STYLES } from "@/lib/statusStyles";
import { APPLICATION_STATUSES } from "@/lib/types";
import { parseISODate } from "@/lib/dates";

interface ApplicationCardProps {
  application: JobApplication;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export function ApplicationCard({
  application,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) {
  const appliedDate = application.dateApplied
    ? parseISODate(application.dateApplied)
    : new Date(application.dateAdded);
  const formattedDate = appliedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => onDelete(application.id)}
        aria-label={`Delete application for ${application.role} at ${application.company}`}
        className="absolute right-3 top-3 rounded-md p-1 text-zinc-300 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus-visible:text-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-400 dark:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 dark:focus-visible:text-zinc-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>

      <div className="pr-6">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {application.role}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {application.company}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[application.status]}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[application.status]}`}
          />
          {application.status}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          Applied {formattedDate}
        </span>
      </div>

      <select
        value={application.status}
        onChange={(e) =>
          onStatusChange(application.id, e.target.value as ApplicationStatus)
        }
        aria-label="Change status"
        className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-xs text-zinc-600 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
      >
        {APPLICATION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
