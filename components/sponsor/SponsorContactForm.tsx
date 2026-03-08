"use client";

import { useState } from "react";

const NICHE_OPTIONS = [
  "AI Tools",
  "Web Hosting",
  "VPN",
  "eCommerce",
  "Marketing",
  "Online Courses",
  "Multiple Niches",
] as const;

const PACKAGE_OPTIONS = [
  "Basic ($99/mo)",
  "Pro ($199/mo)",
  "Premium ($399/mo)",
  "Custom/Multiple Niches",
] as const;

const HEAR_OPTIONS = [
  "Google Search",
  "Reddit",
  "Twitter/X",
  "Product Hunt",
  "Word of Mouth",
  "Other",
] as const;

export type SponsorFormData = {
  toolName: string;
  name: string;
  email: string;
  website: string;
  niche: string;
  package: string;
  message: string;
  howDidYouHear: string;
};

const initial: SponsorFormData = {
  toolName: "",
  name: "",
  email: "",
  website: "",
  niche: "",
  package: "",
  message: "",
  howDidYouHear: "",
};

export function SponsorContactForm() {
  const [formData, setFormData] = useState<SponsorFormData>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof SponsorFormData>(key: K, value: SponsorFormData[K]) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("sending");
    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData(initial);
      } else {
        setStatus("error");
        setErrorMessage(typeof data?.error === "string" ? data.error : "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <label htmlFor="toolName" className="block text-sm font-medium text-text-primary">
          Tool / Company Name *
        </label>
        <input
          id="toolName"
          type="text"
          required
          value={formData.toolName}
          onChange={(e) => update("toolName", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your product or company name"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary">
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Full name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-text-primary">
          Website URL *
        </label>
        <input
          id="website"
          type="url"
          required
          value={formData.website}
          onChange={(e) => update("website", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="https://"
        />
      </div>
      <div>
        <label htmlFor="niche" className="block text-sm font-medium text-text-primary">
          Which niche are you interested in? *
        </label>
        <select
          id="niche"
          required
          value={formData.niche}
          onChange={(e) => update("niche", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select niche</option>
          {NICHE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="package" className="block text-sm font-medium text-text-primary">
          Which package interests you? *
        </label>
        <select
          id="package"
          required
          value={formData.package}
          onChange={(e) => update("package", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select package</option>
          {PACKAGE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary">
          Tell us about your tool *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Briefly describe what your tool does and who it's for..."
        />
      </div>
      <div>
        <label htmlFor="howDidYouHear" className="block text-sm font-medium text-text-primary">
          How did you hear about us?
        </label>
        <select
          id="howDidYouHear"
          value={formData.howDidYouHear}
          onChange={(e) => update("howDidYouHear", e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select one</option>
          {HEAR_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      {status === "success" && (
        <p className="rounded-lg bg-success/20 p-4 text-sm text-success">
          Thanks! We&apos;ll be in touch within 24 hours. 🎉
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-error/20 p-4 text-sm text-error">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
