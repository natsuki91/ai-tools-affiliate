"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "cookie_consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function loadGA(id: string) {
  if (typeof window === "undefined" || !id) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
  const g = (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = function (...args: unknown[]) {
    ((window as unknown as { dataLayer: unknown[] }).dataLayer).push(args);
  };
  g("js", new Date());
  g("config", id);
}

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === null) {
      setShow(true);
      return;
    }
    setAnalyticsChoice(consent === "true");
    if (consent === "true" && GA_ID) loadGA(GA_ID);
  }, [mounted]);

  useEffect(() => {
    const handler = () => {
      setManageOpen(false);
      setShow(true);
    };
    window.addEventListener("cookie-consent-reset", handler);
    return () => window.removeEventListener("cookie-consent-reset", handler);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setShow(false);
    setManageOpen(false);
    if (GA_ID) loadGA(GA_ID);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "false");
    setShow(false);
    setManageOpen(false);
  };

  const openManage = () => {
    setManageOpen(true);
    setAnalyticsChoice(localStorage.getItem(CONSENT_KEY) !== "false");
  };

  const savePreferences = () => {
    localStorage.setItem(CONSENT_KEY, analyticsChoice ? "true" : "false");
    setShow(false);
    setManageOpen(false);
    if (analyticsChoice && GA_ID) loadGA(GA_ID);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-surface p-4 shadow-lg sm:p-5"
    >
      <div className="mx-auto max-w-3xl">
        {!manageOpen ? (
          <>
            <p className="text-sm text-text-primary">
              We use cookies for analytics to improve the site. By continuing you accept our use of
              cookies. See our <Link href="/privacy" className="underline hover:text-primary">Privacy</Link> and{" "}
              <Link href="/terms" className="underline hover:text-primary">Terms</Link>.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={accept}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={reject}
                className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-card"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={openManage}
                className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-card"
              >
                Manage preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-text-primary">Cookie preferences</p>
            <p className="mt-1 text-sm text-text-secondary">
              We only use optional cookies for analytics (e.g. Google Analytics). You can turn them off.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-sm text-text-primary">Analytics</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnalyticsChoice(false)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${!analyticsChoice ? "border-primary bg-primary/10 text-primary" : "border-border bg-transparent text-text-secondary hover:bg-card"}`}
                >
                  Off
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyticsChoice(true)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${analyticsChoice ? "border-primary bg-primary/10 text-primary" : "border-border bg-transparent text-text-secondary hover:bg-card"}`}
                >
                  On
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-card"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
