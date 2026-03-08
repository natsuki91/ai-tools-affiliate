import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface px-4 py-20 sm:py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Find the Right AI Tool
          </span>
        </h1>
        <p className="mt-4 text-lg text-text-secondary sm:text-xl">
          Honest comparisons, real reviews, and clear pricing. Compare ChatGPT, Claude, and more—all
          in one place.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/compare"
            className="inline-flex rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Compare Tools
          </Link>
          <Link
            href="/tools"
            className="inline-flex rounded-full border-2 border-border bg-transparent px-8 py-4 text-base font-semibold text-text-primary transition hover:bg-card hover:border-primary/50"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
