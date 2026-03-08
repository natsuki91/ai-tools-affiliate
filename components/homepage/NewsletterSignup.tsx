"use client";

import { useState } from "react";

const NEWSLETTER_FORM_ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION?.trim() || null;

export function NewsletterSignup({ source = "homepage_inline" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong");
        return;
      }
      setStatus("success");
      setMessage("Thanks! Check your inbox to confirm.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  // Static host: form posts to Mailchimp/ConvertKit URL (set NEXT_PUBLIC_NEWSLETTER_FORM_ACTION)
  if (NEWSLETTER_FORM_ACTION) {
    return (
      <section className="border-t border-border bg-surface px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Get Weekly Tool Picks & Deals
          </h2>
          <p className="mt-2 text-text-secondary">
            We compare new tools every week so you don&apos;t have to.
          </p>
          <form
            action={NEWSLETTER_FORM_ACTION}
            method="post"
            target="_blank"
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              name="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              aria-label="Email"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
            >
              Subscribe Free
            </button>
          </form>
          <p className="mt-3 text-xs text-text-secondary">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border bg-surface px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Get Weekly Tool Picks & Deals
        </h2>
        <p className="mt-2 text-text-secondary">
          We compare new tools every week so you don&apos;t have to.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe Free"}
          </button>
        </form>
        {message && (
          <p className={`mt-3 text-sm ${status === "success" ? "text-success" : "text-error"}`}>
            {message}
          </p>
        )}
        <p className="mt-3 text-xs text-text-secondary">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
