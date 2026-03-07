import type { Metadata } from "next";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import Link from "next/link";

export const metadata: Metadata = buildSEOMeta({
  title: "Sponsor — List Your AI Tool",
  description:
    "Get your AI tool in front of thousands of decision-makers. Sponsored listings and featured placement.",
  path: "/sponsor",
});

const tiers = [
  {
    name: "Basic",
    price: 99,
    features: [
      "Listed in Directory",
      '"Sponsored" Badge',
    ],
  },
  {
    name: "Pro",
    price: 199,
    popular: true,
    features: [
      "Everything in Basic",
      "Featured on Homepage",
      "Featured in Category Pages",
      "Gold Border Highlight",
    ],
  },
  {
    name: "Premium",
    price: 399,
    features: [
      "Everything in Pro",
      "Dedicated Review Page",
      "Newsletter Feature",
      "Priority in Compare Pages",
    ],
  },
];

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">List Your AI Tool</h1>
      <p className="mt-2 text-lg text-text-secondary">
        Get your AI tool in front of thousands of decision-makers. We review and compare tools
        daily — sponsor a listing for visibility and trust.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border bg-card p-6 ${
              tier.popular ? "border-primary ring-2 ring-primary/30" : "border-border"
            }`}
          >
            {tier.popular && (
              <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                Popular
              </span>
            )}
            <h2 className="mt-4 text-xl font-semibold text-text-primary">{tier.name}</h2>
            <p className="mt-2">
              <span className="text-3xl font-bold text-text-primary">${tier.price}</span>
              <span className="text-text-secondary">/mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-text-secondary">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-success">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              className="mt-6 block w-full rounded-lg border-2 border-primary py-3 text-center font-semibold text-primary transition hover:bg-primary/10"
            >
              Get started
            </Link>
          </div>
        ))}
      </div>

      <section id="contact" className="mt-16 rounded-2xl border border-border bg-card p-8">
        <h2 className="text-xl font-semibold text-text-primary">Contact for custom deals</h2>
        <p className="mt-2 text-text-secondary">
          Need a custom plan or have questions? Email us at sponsor@example.com (replace with your
          Resend/contact endpoint when ready).
        </p>
      </section>
    </div>
  );
}
