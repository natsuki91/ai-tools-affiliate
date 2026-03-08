import Link from "next/link";
import { getAffiliateUrl, PARTNER_AFFILIATES, AFFILIATE_LINK_ATTRS } from "@/lib/affiliate";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

const footerLinks = {
  product: [
    { href: `/${ACTIVE_NICHE_SLUG}/compare`, label: "Compare Tools" },
    { href: `/${ACTIVE_NICHE_SLUG}/tools`, label: "All Tools" },
    { href: `/${ACTIVE_NICHE_SLUG}/blog`, label: "Blog" },
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              ToolScout
            </Link>
            <p className="mt-2 text-sm text-text-secondary">
              Honest comparisons and reviews of software tools. Updated weekly.
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
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Follow</h3>
            <ul className="mt-3 flex gap-4">
              <li>
                <a
                  href="https://twitter.com/toolscout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition"
                  aria-label="ToolScout on X (Twitter)"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/toolscout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition"
                  aria-label="ToolScout on LinkedIn"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Recommended</h3>
            <ul className="mt-3 space-y-2">
              {PARTNER_AFFILIATES.map(({ slug, name, description }) => (
                <li key={slug}>
                  <a
                    href={getAffiliateUrl(slug)}
                    className="text-sm text-text-secondary hover:text-text-primary transition"
                    {...AFFILIATE_LINK_ATTRS}
                  >
                    {name} <span className="text-text-muted">— {description}</span>
                  </a>
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
