import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

export const metadata: Metadata = {
  title: "Privacy Policy | ToolScout.tools",
  description:
    "ToolScout.tools privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR.",
  openGraph: {
    title: "Privacy Policy | ToolScout.tools",
    description:
      "ToolScout.tools privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR.",
    url: `${SITE_URL}/privacy`,
    siteName: "ToolScout",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy | ToolScout.tools",
  url: `${SITE_URL}/privacy`,
  description:
    "ToolScout.tools privacy policy. Learn how we collect, use, and protect your personal data in compliance with GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <LegalLayout title="Privacy Policy" lastUpdated="March 2026">
        <section id="intro">
          <p>
            ToolScout.tools (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your information when you visit
            toolscout.tools.
          </p>
        </section>

        <section id="info-we-collect">
          <h2 className="text-xl font-semibold text-text-primary">1. Information We Collect</h2>
          <h3 className="mt-3 text-base font-semibold text-text-primary">Information You Provide</h3>
          <p className="mt-2">
            We may collect information you voluntarily provide, including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Email address (when subscribing to our newsletter)</li>
            <li>Name and email (when submitting a sponsor inquiry)</li>
            <li>Any other information you choose to provide via contact forms</li>
          </ul>

          <h3 className="mt-4 text-base font-semibold text-text-primary">
            Information Collected Automatically
          </h3>
          <p className="mt-2">
            When you visit our site, we automatically collect:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>IP address and approximate location</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring website</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
          <p className="mt-2">
            This information is collected via tools such as analytics and cookies.
          </p>
        </section>

        <section id="how-we-use">
          <h2 className="text-xl font-semibold text-text-primary">2. How We Use Your Information</h2>
          <p className="mt-2">We use the information we collect to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Operate and improve ToolScout.tools</li>
            <li>Send newsletters (only if you subscribed)</li>
            <li>Respond to sponsor inquiries and contact messages</li>
            <li>Analyze site traffic and user behavior</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> sell your personal data to third parties or share your email
            address with sponsors or third parties.
          </p>
        </section>

        <section id="cookies">
          <h2 className="text-xl font-semibold text-text-primary">3. Cookies</h2>
          <p className="mt-2">
            We use cookies to improve your experience on our site and to understand how visitors use
            our content.
          </p>
          <h3 className="mt-3 text-base font-semibold text-text-primary">
            Types of cookies we use
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Essential cookies</strong> — Required for the site to function. Cannot be
              disabled.
            </li>
            <li>
              <strong>Analytics cookies</strong> — Used to understand how visitors use our site (e.g.
              Google Analytics). These are only set after you give consent via our cookie banner.
            </li>
            <li>
              <strong>Preference cookies</strong> — Remember your settings and preferences.
            </li>
          </ul>
          <p className="mt-3">
            You can control cookies through your browser settings or via our cookie consent banner.{" "}
            Disabling analytics cookies will not affect your ability to use the site.
          </p>
        </section>

        <section id="affiliates">
          <h2 className="text-xl font-semibold text-text-primary">
            4. Affiliate Links &amp; Third-Party Sites
          </h2>
          <p className="mt-2">
            ToolScout.tools contains affiliate links to third-party websites. When you click these
            links and make a purchase, we may earn a commission. We are not responsible for the
            privacy practices of these third-party sites.
          </p>
          <p className="mt-2">
            We recommend reading the privacy policy of any third-party site you visit through our
            links. Our affiliate partners include (but are not limited to) web hosting providers,
            eCommerce platforms, VPN services, course platforms, and affiliate networks.
          </p>
        </section>

        <section id="newsletter">
          <h2 className="text-xl font-semibold text-text-primary">
            5. Newsletter &amp; Email Communications
          </h2>
          <p className="mt-2">
            If you subscribe to our newsletter, we store your email address securely and use it only
            to send newsletters and updates. You can unsubscribe at any time via the link in any
            email. We will never share your email address with third parties or send spam.
          </p>
        </section>

        <section id="storage">
          <h2 className="text-xl font-semibold text-text-primary">
            6. Data Storage &amp; Security
          </h2>
          <p className="mt-2">
            Your data is stored securely using industry-standard hosting providers and encryption in
            transit (HTTPS/SSL). Access to personal data is limited to those who need it to operate
            the site.
          </p>
          <p className="mt-2">
            We retain your data only as long as necessary for the purposes outlined in this policy.
          </p>
        </section>

        <section id="gdpr-rights">
          <h2 className="text-xl font-semibold text-text-primary">
            7. Your Rights (GDPR — EU/EEA Users)
          </h2>
          <p className="mt-2">
            If you are located in the EU or EEA, you have the right to:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Access</strong> — Request a copy of your personal data.
            </li>
            <li>
              <strong>Rectification</strong> — Correct inaccurate personal data.
            </li>
            <li>
              <strong>Erasure</strong> — Request deletion of your personal data.
            </li>
            <li>
              <strong>Portability</strong> — Receive your data in a portable format.
            </li>
            <li>
              <strong>Objection</strong> — Object to processing of your personal data.
            </li>
            <li>
              <strong>Withdraw consent</strong> — Withdraw consent at any time.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us at{" "}
            <span className="font-mono">privacy@toolscout.tools</span>. We will respond within 30 days.
          </p>
        </section>

        <section id="children">
          <h2 className="text-xl font-semibold text-text-primary">8. Children&apos;s Privacy</h2>
          <p className="mt-2">
            ToolScout.tools is not directed at children under 13. We do not knowingly collect
            personal data from children. If you believe a child has provided us with personal data,
            please contact us and we will delete it immediately.
          </p>
        </section>

        <section id="changes">
          <h2 className="text-xl font-semibold text-text-primary">9. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. We will notify you of significant
            changes by updating the &quot;Last updated&quot; date at the top of this page. Continued
            use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-xl font-semibold text-text-primary">10. Contact Us</h2>
          <p className="mt-2">
            For privacy-related questions or to exercise your GDPR rights, contact us at{" "}
            <span className="font-mono">privacy@toolscout.tools</span>.
          </p>
        </section>
      </LegalLayout>
    </div>
  );
}
