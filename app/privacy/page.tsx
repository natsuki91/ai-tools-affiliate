import type { Metadata } from "next";
import { buildSEOMeta } from "@/components/shared/SEOMeta";

export const metadata: Metadata = buildSEOMeta({
  title: "Privacy Policy",
  description: "How AI Tools collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Privacy Policy</h1>
      <p className="mt-4 text-sm text-text-secondary">Last updated: March 2026</p>
      <div className="mt-8 space-y-6 text-text-secondary">
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Information we collect</h2>
          <p className="mt-2">
            When you visit our site, we may collect usage data (e.g. pages viewed, referrer) via
            analytics tools. If you contact us or submit a form (e.g. sponsor inquiries), we collect
            the information you provide (name, email, message).
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">How we use it</h2>
          <p className="mt-2">
            We use this information to run and improve the site, respond to inquiries, and
            understand how visitors use our content. We do not sell your personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Cookies and analytics</h2>
          <p className="mt-2">
            We may use cookies and similar technologies for analytics and basic site functionality.
            You can change your preference at any time using the <strong>Cookie settings</strong> link
            in the site footer; that will reopen the cookie banner so you can accept or reject
            non-essential cookies (e.g. analytics). You can also control cookies through your browser
            settings.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Third-party links</h2>
          <p className="mt-2">
            Our site links to external sites (e.g. AI tool signup pages). Those sites have their own
            privacy policies; we are not responsible for their practices.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Contact</h2>
          <p className="mt-2">
            For privacy-related questions, use the contact method listed on our site (e.g. sponsor
            or about page).
          </p>
        </section>
      </div>
    </div>
  );
}
