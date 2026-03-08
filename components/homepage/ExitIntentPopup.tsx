"use client";

import { useState, useEffect, useCallback } from "react";

const SESSION_KEY = "exit_intent_shown";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleClose = useCallback(() => {
    setOpen(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setOpen(true);
      }
    }
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "exit_popup" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong");
        return;
      }
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
      if (typeof sessionStorage !== "undefined") sessionStorage.setItem(SESSION_KEY, "1");
      setTimeout(() => setOpen(false), 2000);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-text-secondary hover:text-text-primary"
          aria-label="Close"
        >
          ×
        </button>
        <h2 id="exit-popup-title" className="text-xl font-bold text-text-primary pr-8">
          Get weekly tool picks & deals
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          We compare new tools every week. One email, no spam.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
            className="rounded-lg border border-border bg-background px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-primary py-3 font-semibold text-white hover:opacity-90 disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe free"}
          </button>
        </form>
        {message && (
          <p className={`mt-2 text-sm ${status === "success" ? "text-success" : "text-error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
