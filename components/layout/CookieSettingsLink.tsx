"use client";

const CONSENT_KEY = "cookie_consent";

export function CookieSettingsLink() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new Event("cookie-consent-reset"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm text-text-secondary hover:text-text-primary transition"
    >
      Cookie settings
    </button>
  );
}
