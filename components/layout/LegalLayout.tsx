import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <nav
        className="border-b border-border bg-surface/60 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="mx-auto flex max-w-3xl items-center gap-2 text-sm text-text-secondary">
          <li>
            <Link href="/" className="hover:text-text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-text-primary" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      <main className="mx-auto flex max-w-3xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
          <p className="mt-2 text-sm text-text-secondary">Last updated: {lastUpdated}</p>
        </header>
        <article className="space-y-6 text-base leading-relaxed text-text-secondary">
          {children}
        </article>
        <footer className="mt-10 text-sm text-text-secondary">
          <Link href="/" className="text-primary hover:underline">
            ← Back to homepage
          </Link>
        </footer>
      </main>
    </div>
  );
}

