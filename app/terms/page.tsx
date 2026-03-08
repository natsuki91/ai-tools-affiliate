import type { Metadata } from "next";
import { buildSEOMeta } from "@/components/shared/SEOMeta";

export const metadata: Metadata = buildSEOMeta({
  title: "Terms of Use",
  description: "Terms of use for the ToolScout comparison and review website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Terms of Use</h1>
      <p className="mt-4 text-sm text-text-secondary">Last updated: March 2026</p>
      <div className="mt-8 space-y-6 text-text-secondary">
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Use of the site</h2>
          <p className="mt-2">
            By using this site, you agree to use it for lawful purposes only. You may not scrape,
            automate access, or misuse the site in a way that harms us or other users.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Content and accuracy</h2>
          <p className="mt-2">
            We strive for accuracy in our comparisons and reviews, but tool features and pricing
            change. Always confirm details on the official tool website before signing up or paying.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Affiliate and sponsored content</h2>
          <p className="mt-2">
            We may earn commissions or receive payment for listings. See our{" "}
            <a href="/disclosure" className="text-primary hover:underline">Disclosure</a> page for
            more information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Limitation of liability</h2>
          <p className="mt-2">
            This site is provided &quot;as is.&quot; We are not liable for decisions you make based on
            our content or for any losses related to third-party products or services you access
            via our links.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-text-primary">Changes</h2>
          <p className="mt-2">
            We may update these terms. The &quot;Last updated&quot; date at the top reflects the latest
            change. Continued use of the site after changes means you accept the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
