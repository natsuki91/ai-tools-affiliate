import Link from "next/link";
import type { Comparison } from "@/types/compare";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

interface CompareCardProps {
  comparison: Comparison;
  /** When set (e.g. on niche pages), links go to /[niche]/compare/[slug]. */
  nicheSlug?: string;
}

export function CompareCard({ comparison, nicheSlug = ACTIVE_NICHE_SLUG }: CompareCardProps) {
  const toolA = comparison.tool_a?.name ?? "Tool A";
  const toolB = comparison.tool_b?.name ?? "Tool B";

  return (
    <Link
      href={`/${nicheSlug}/compare/${comparison.slug}`}
      className="block rounded-2xl border border-border bg-card p-6 backdrop-blur transition hover:border-primary/30"
    >
      <h3 className="font-semibold text-text-primary transition group-hover:text-primary">
        {comparison.title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary line-clamp-2">
        {comparison.meta_desc ?? comparison.verdict ?? `${toolA} vs ${toolB} comparison.`}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
        <span>{toolA}</span>
        <span>vs</span>
        <span>{toolB}</span>
      </div>
    </Link>
  );
}
