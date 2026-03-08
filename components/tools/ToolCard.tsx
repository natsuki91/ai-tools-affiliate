import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/types/tool";
import { formatPrice } from "@/lib/utils";
import { AffiliateButton } from "@/components/shared/AffiliateButton";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

interface ToolCardProps {
  tool: Tool;
  showCta?: boolean;
  /** When set, links go to /[niche]/tools/[slug]. */
  nicheSlug?: string;
  /** Show a "NEW" badge (e.g. in Recently Added section) */
  showNewBadge?: boolean;
}

export function ToolCard({ tool, showCta = true, nicheSlug = ACTIVE_NICHE_SLUG, showNewBadge }: ToolCardProps) {
  return (
    <article
      className={`rounded-2xl border bg-card p-6 backdrop-blur transition hover:border-primary/30 ${
        tool.is_sponsored ? "border-warning/40" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1">
          {tool.logo_url ? (
            <Image
              src={tool.logo_url}
              alt=""
              width={48}
              height={48}
              className="rounded-xl object-contain"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface text-xl font-bold text-primary">
              {tool.name.charAt(0)}
            </div>
          )}
          <div className="ml-4 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/${nicheSlug}/tools/${tool.slug}`}
                className="font-semibold text-text-primary hover:text-primary transition truncate"
              >
                {tool.name}
              </Link>
              {showNewBadge && (
                <span className="shrink-0 rounded bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                  NEW
                </span>
              )}
              {tool.is_sponsored && (
                <span className="shrink-0 rounded bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                  Sponsored
                </span>
              )}
            </div>
            {tool.tagline && (
              <p className="mt-0.5 text-sm text-text-secondary line-clamp-2">{tool.tagline}</p>
            )}
          </div>
        </div>
        {tool.rating != null && (
          <div className="shrink-0 rounded-lg bg-primary/20 px-2 py-1 text-sm font-bold text-primary">
            {tool.rating}/10
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-text-secondary line-clamp-2">{tool.description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-text-primary">
          {formatPrice(tool.starting_price)}
        </span>
        {showCta && (
          <AffiliateButton toolName={tool.name} affiliateUrl={tool.affiliate_url} size="sm" variant="secondary" />
        )}
      </div>
    </article>
  );
}
