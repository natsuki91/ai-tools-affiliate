"use client";

import { useEffect, useState } from "react";

const NEWSLETTER_FORM_ACTION =
  process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION?.trim() || null;

export function ExitIntentNewsletter() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!NEWSLETTER_FORM_ACTION) return;
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem("ts_exit_intent_shown") === "1") {
        return;
      }
    } catch {
      // ignore storage errors
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        try {
          window.sessionStorage.setItem("ts_exit_intent_shown", "1");
        } catch {
          // ignore
        }
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };

    // Only attach on larger screens where exit-intent with mouse makes sense
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!NEWSLETTER_FORM_ACTION || !open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
      <div className="max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Before you go — want our best picks?
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Get a short weekly email with new tools, real reviews, and deal alerts. No spam, ever.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1 text-text-secondary hover:bg-card hover:text-text-primary"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form
          action={NEWSLETTER_FORM_ACTION}
          method="post"
          target="_blank"
          className="mt-4 space-y-3"
        >
          <input
            type="email"
            name="EMAIL"
            required
            placeholder="you@example.com"
            aria-label="Email"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Subscribe Free
          </button>
          <p className="text-xs text-text-secondary">
            You&apos;ll get 1–2 emails per week. Unsubscribe in one click.
          </p>
        </form>
      </div>
    </div>
  );
}

