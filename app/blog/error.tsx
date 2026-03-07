"use client";

import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-text-primary">Something went wrong</h1>
      <p className="mt-2 text-text-secondary">The blog page couldn’t load. Please try again.</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-card"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
