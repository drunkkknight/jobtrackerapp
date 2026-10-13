"use client";

import { useState, FormEvent } from "react";
import { APPLICATION_STATUSES, ApplicationStatus, JobApplication } from "@/lib/types";
import { todayISODate } from "@/lib/dates";

interface AddApplicationFormProps {
  onAdd: (application: JobApplication) => void;
}

export function AddApplicationForm({ onAdd }: AddApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [dateApplied, setDateApplied] = useState(todayISODate);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();
    if (!trimmedCompany || !trimmedRole || !dateApplied) return;

    onAdd({
      id: crypto.randomUUID(),
      company: trimmedCompany,
      role: trimmedRole,
      status,
      dateAdded: new Date().toISOString(),
      dateApplied,
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
    setDateApplied(todayISODate());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:grid-cols-5 sm:items-end dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="sm:col-span-1">
        <label
          htmlFor="company"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Acme Inc."
          required
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="role"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Role
        </label>
        <input
          id="role"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Product Manager"
          required
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="status"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        >
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="dateApplied"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Date Applied
        </label>
        <input
          id="dateApplied"
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
          required
          // The page is prerendered, so the client's "today" can differ from the server HTML.
          suppressHydrationWarning
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:[color-scheme:dark] dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="sm:col-span-1">
        <button
          type="submit"
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Add Application
        </button>
      </div>
    </form>
  );
}
