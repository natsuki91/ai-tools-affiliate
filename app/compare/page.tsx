import type { Metadata } from "next";
import Link from "next/link";
import { CompareCard } from "@/components/compare/CompareCard";
import { mockComparisons } from "@/lib/mock-data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";

export const metadata: Metadata = buildSEOMeta({
  title: "AI Tools Comparison — Side-by-Side Comparisons",
  description:
    "Compare ChatGPT vs Claude, Jasper vs Copy.ai, and more. Side-by-side feature and pricing comparisons for AI tools.",
  path: "/compare",
});

export default function CompareListPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Compare AI Tools</h1>
      <p className="mt-2 text-text-secondary">
        Side-by-side comparisons to help you choose the right tool.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockComparisons.map((c) => (
          <CompareCard key={c.id} comparison={c} />
        ))}
      </div>
    </div>
  );
}
