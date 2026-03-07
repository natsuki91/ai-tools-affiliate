import type { Comparison } from "@/types/compare";
import { CompareCard } from "@/components/compare/CompareCard";
import Link from "next/link";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

interface LatestComparisonsProps {
  comparisons: Comparison[];
}

export function LatestComparisons({ comparisons }: LatestComparisonsProps) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-primary">Latest Comparisons</h2>
          <Link
            href={`/${ACTIVE_NICHE_SLUG}/compare`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.slice(0, 4).map((c) => (
            <CompareCard key={c.id} comparison={c} nicheSlug={ACTIVE_NICHE_SLUG} />
          ))}
        </div>
      </div>
    </section>
  );
}
