import Link from "next/link";

const footerLinks = {
  product: [
    { href: "/compare", label: "Compare Tools" },
    { href: "/tools", label: "All Tools" },
    { href: "/blog", label: "Blog" },
  ],
  company: [
    { href: "/sponsor", label: "Sponsor" },
    { href: "/about", label: "About" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              AI Tools
            </Link>
            <p className="mt-2 text-sm text-text-secondary">
              Honest comparisons and reviews of AI software. Updated weekly.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Product</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Company</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Legal</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-secondary">
          <p>
            We may earn a commission when you sign up through our links. This does not affect our
            editorial reviews. <Link href="/disclosure" className="underline hover:text-text-primary">Disclosure</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
