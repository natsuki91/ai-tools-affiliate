import type { Metadata } from "next";
import { buildSEOMeta } from "@/components/shared/SEOMeta";

export const metadata: Metadata = buildSEOMeta({
  title: "Disclosure — Affiliate & Sponsored Content",
  description: "How we make money: affiliate links and sponsored listings. Our reviews remain honest and independent.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Disclosure</h1>
      <p className="mt-4 text-text-secondary">
        ToolScout is a comparison and review site. We may earn money when you sign up for or purchase
        products through links on our site.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-text-primary">Affiliate links</h2>
      <p className="mt-2 text-text-secondary">
        Many of the links to AI tools (e.g. ChatGPT, Claude, Jasper) are affiliate links. If you
        click and sign up or buy, we may receive a commission. This does not change the price you
        pay and helps us keep the site running. Our reviews and comparisons are written
        independently; we do not promise positive coverage in exchange for affiliate relationships.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-text-primary">Sponsored listings</h2>
      <p className="mt-2 text-text-secondary">
        Some tools are marked as &quot;Sponsored.&quot; These are paid placements. We clearly label
        them. Sponsored tools are still included in our directory and comparison tables; we do not
        guarantee positive reviews for sponsors.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-text-primary">Honesty</h2>
      <p className="mt-2 text-text-secondary">
        We aim to give you accurate, useful comparisons and reviews. We call out limitations and
        downsides, not only benefits. If you have questions about how we operate, contact us.
      </p>
    </div>
  );
}
