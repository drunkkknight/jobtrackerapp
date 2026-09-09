"use client";

import { ApplicationStatus, JobApplication } from "@/lib/types";
import { ApplicationCard } from "./ApplicationCard";

interface ApplicationListProps {
  applications: JobApplication[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export function ApplicationList({
  applications,
  onDelete,
  onStatusChange,
}: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          No applications yet
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          Add your first job application above to start tracking it.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
