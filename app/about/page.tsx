import type { Metadata } from "next";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import Link from "next/link";

export const metadata: Metadata = buildSEOMeta({
  title: "About — AI Tools",
  description: "We compare and review AI software so you can find the right tool. Honest, independent, updated regularly.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">About AI Tools</h1>
      <p className="mt-4 text-lg text-text-secondary">
        We compare and review AI software—writing tools, image generators, productivity apps, and
        more—so you can choose with confidence.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-text-primary">What we do</h2>
      <p className="mt-2 text-text-secondary">
        We publish side-by-side comparisons, in-depth reviews, and guides. We test tools, read the
        fine print, and call out pros and cons. Our goal is to save you time and help you find the
        right fit for your workflow and budget.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-text-primary">How we make money</h2>
      <p className="mt-2 text-text-secondary">
        We may earn a commission when you sign up through our links, and we offer sponsored
        listings for AI companies. We always disclose this. Our editorial content is independent;
        we don’t promise positive reviews in exchange for partnerships. See our{" "}
        <Link href="/disclosure" className="text-primary hover:underline">Disclosure</Link> for
        details.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-text-primary">Contact</h2>
      <p className="mt-2 text-text-secondary">
        For sponsor inquiries or partnerships, see our{" "}
        <Link href="/sponsor" className="text-primary hover:underline">Sponsor</Link> page. For
        general questions, use the contact option listed there.
      </p>
    </div>
  );
}
