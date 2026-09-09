"use client";

import { AddApplicationForm } from "@/components/AddApplicationForm";
import { ApplicationList } from "@/components/ApplicationList";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { APPLICATION_STATUSES, ApplicationStatus, JobApplication } from "@/lib/types";
import { STATUS_DOT } from "@/lib/statusStyles";

const STORAGE_KEY = "job-applications";

export default function Home() {
  const [applications, setApplications, isLoaded] = useLocalStorage<
    JobApplication[]
  >(STORAGE_KEY, []);

  function handleAdd(application: JobApplication) {
    setApplications((prev) => [application, ...prev]);
  }

  function handleDelete(id: string) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }

  function handleStatusChange(id: string, status: ApplicationStatus) {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  }

  const counts = APPLICATION_STATUSES.reduce<Record<ApplicationStatus, number>>(
    (acc, status) => {
      acc[status] = applications.filter((app) => app.status === status).length;
      return acc;
    },
    { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 }
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Job Application Tracker
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Keep track of every application, from applied to offer.
          </p>
        </header>

        {isLoaded && applications.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3">
            {APPLICATION_STATUSES.map((status) => (
              <div
                key={status}
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
                {status}
                <span className="text-zinc-400 dark:text-zinc-500">
                  {counts[status]}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8">
          <AddApplicationForm onAdd={handleAdd} />
        </div>

        {isLoaded ? (
          <ApplicationList
            applications={applications}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
