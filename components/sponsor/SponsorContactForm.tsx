"use client";

import { useState } from "react";

export function SponsorContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", tier: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", tier: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary">
          Name *
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="tier" className="block text-sm font-medium text-text-primary">
          Interested in
        </label>
        <select
          id="tier"
          value={formData.tier}
          onChange={(e) => setFormData((p) => ({ ...p, tier: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select a tier</option>
          <option value="basic">Basic ($99/mo)</option>
          <option value="pro">Pro ($199/mo)</option>
          <option value="premium">Premium ($399/mo)</option>
          <option value="custom">Custom / Not sure</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Tell us about your tool and what you're looking for."
        />
      </div>
      {status === "success" && (
        <p className="text-sm text-success">Thanks! We&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-error">Something went wrong. Please try again or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
