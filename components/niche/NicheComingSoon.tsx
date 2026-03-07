import Link from "next/link";
import { NICHES } from "@/lib/niches";

interface NicheComingSoonProps {
  niche: (typeof NICHES)[number];
}

export function NicheComingSoon({ niche }: NicheComingSoonProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <span className="text-5xl" aria-hidden>
        {niche.icon}
      </span>
      <h1 className="mt-4 text-3xl font-bold text-text-primary">{niche.name}</h1>
      <p className="mt-2 text-text-secondary">{niche.tagline}</p>
      <p className="mt-6 text-text-muted">This category is coming soon. We&apos;re building it.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
