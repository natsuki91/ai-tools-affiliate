import Link from "next/link";
import { NICHES } from "@/lib/niches";

const colorClasses: Record<string, string> = {
  indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 hover:border-indigo-400/50",
  sky: "from-sky-500/20 to-sky-600/10 border-sky-500/30",
  emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
  rose: "from-rose-500/20 to-rose-600/10 border-rose-500/30",
  violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30",
};

export function NicheGrid() {
  const activeNiches = NICHES.filter((niche) => niche.active);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-text-primary">Browse by category</h2>
        <p className="mt-1 text-text-secondary">Choose a niche to compare tools and read guides.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeNiches.map((niche) => {
            const colorClass = colorClasses[niche.color] ?? colorClasses.indigo;
            const content = (
              <div className={`relative rounded-xl border bg-gradient-to-br p-5 transition ${colorClass} cursor-pointer hover:shadow-lg`}>
                <span className="text-2xl" aria-hidden>
                  {niche.icon}
                </span>
                <h3 className="mt-2 font-semibold text-text-primary">{niche.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{niche.tagline}</p>
              </div>
            );
            return (
              <Link key={niche.slug} href={`/${niche.slug}`} className="block">
                {content}
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-text-muted">
          More categories coming soon.
        </p>
      </div>
    </section>
  );
}
