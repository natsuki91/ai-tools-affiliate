import Link from "next/link";

const nav = [
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-tools/compare", label: "Compare" },
  { href: "/ai-tools/tools", label: "Tools" },
  { href: "/ai-tools/blog", label: "Blog" },
  { href: "/sponsor", label: "Sponsor" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-text-primary transition hover:opacity-90"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tool Compare
          </span>
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-text-secondary transition hover:text-text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
