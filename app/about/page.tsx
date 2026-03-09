import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

export const metadata: Metadata = {
  title: "About ToolScout — How We Review & Compare Software Tools",
  description:
    "ToolScout.tools is an independent software comparison site. Learn how we review tools, how we make money, and the team behind the site.",
  openGraph: {
    title: "About ToolScout — How We Review & Compare Software Tools",
    description:
      "ToolScout.tools is an independent software comparison site. Learn how we review tools, how we make money, and the team behind the site.",
    url: `${SITE_URL}/about`,
    siteName: "ToolScout",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ToolScout",
  url: SITE_URL,
  description: "Independent software comparison and review site",
  foundingDate: "2026",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@toolscout.tools",
    contactType: "customer service",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        className="border-b border-border bg-surface/60 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="mx-auto flex max-w-4xl items-center gap-2 text-sm text-text-secondary">
          <li>
            <Link href="/" className="hover:text-text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-text-primary" aria-current="page">
            About
          </li>
        </ol>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* SECTION 1 — Hero */}
        <section className="py-8 sm:py-12">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            We Help You Find the Right Software — Without the Noise
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            There are thousands of software tools out there. Most review sites just copy specs from
            product pages and slap on a star rating. We actually use the tools, test them properly,
            and tell you the honest truth — even when that means saying a popular tool isn&apos;t
            worth it.
          </p>
        </section>

        {/* SECTION 2 — Our Story */}
        <section className="py-8 sm:py-12 border-t border-border">
          <h2 className="text-2xl font-bold text-text-primary">Why We Built ToolScout</h2>
          <div className="mt-4 space-y-4 text-text-secondary">
            <p>
              We got tired of reading software reviews that were clearly written just to earn an
              affiliate commission. Every tool rated 9.5/10, every review ending with &quot;it&apos;s
              the best we&apos;ve ever used&quot;, and somehow every single sponsored tool happened
              to win every comparison.
            </p>
            <p>
              So we built ToolScout.tools — a comparison site that puts honest, useful information
              first. We research every tool thoroughly, test what we can ourselves, and we&apos;re
              not afraid to point out real flaws. If a tool isn&apos;t worth your money, we&apos;ll
              say so — even if we lose out on a commission.
            </p>
            <p>
              ToolScout.tools is run by a small independent team of software enthusiasts,
              developers, and digital marketers who use these tools in our own work every day. We
              don&apos;t have investors or corporate owners telling us what to write. Just us, our
              honest opinions, and a commitment to helping you make better software decisions.
            </p>
          </div>
        </section>

        {/* SECTION 3 — What We Cover */}
        <section className="py-8 sm:py-12 border-t border-border">
          <h2 className="text-2xl font-bold text-text-primary">What We Review &amp; Compare</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Link
              href="/ai-tools"
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-lg"
            >
              <div className="text-2xl" aria-hidden>
                🤖
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">AI Tools &amp; Software</h3>
              <p className="mt-2 text-sm text-text-secondary">
                ChatGPT, Claude, Jasper, Midjourney and hundreds more AI tools across writing, image
                generation, coding, video, and productivity.
              </p>
            </Link>

            <Link
              href="/web-hosting"
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-sky-400 hover:shadow-lg"
            >
              <div className="text-2xl" aria-hidden>
                🌐
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">Web Hosting</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Shared hosting, WordPress hosting, VPS, cloud, and managed hosting from providers
                like Hostinger, Bluehost, and SiteGround.
              </p>
            </Link>

            <Link
              href="/vpn"
              className="rounded-2xl border border-border bg-card p-5 opacity-90 transition hover:border-emerald-400 hover:shadow-lg"
            >
              <div className="text-2xl" aria-hidden>
                🔒
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">VPN &amp; Cybersecurity</h3>
              <p className="mt-2 text-sm text-text-secondary">
                VPN services, password managers, antivirus software, and identity protection tools
                to keep you safe online. (Coming soon)
              </p>
            </Link>

            <Link
              href="/ecommerce-tools"
              className="rounded-2xl border border-border bg-card p-5 opacity-90 transition hover:border-amber-400 hover:shadow-lg"
            >
              <div className="text-2xl" aria-hidden>
                🛒
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">eCommerce Tools</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Online store platforms, payment processors, dropshipping tools, and everything you
                need to sell online. (Coming soon)
              </p>
            </Link>

            <Link
              href="/marketing-tools"
              className="rounded-2xl border border-border bg-card p-5 opacity-90 transition hover:border-pink-400 hover:shadow-lg"
            >
              <div className="text-2xl" aria-hidden>
                📣
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">Marketing Tools</h3>
              <p className="mt-2 text-sm text-text-secondary">
                SEO tools, email marketing platforms, CRM software, social media tools, and
                analytics platforms. (Coming soon)
              </p>
            </Link>

            <Link
              href="/online-courses"
              className="rounded-2xl border border-border bg-card p-5 opacity-90 transition hover:border-violet-400 hover:shadow-lg"
            >
              <div className="text-2xl" aria-hidden>
                🎓
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">
                Online Courses &amp; Education
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Online learning platforms, course marketplaces, and tools for creators who want to
                teach online. (Coming soon)
              </p>
            </Link>
          </div>
        </section>

        {/* SECTION 4 — Our Review Process */}
        <section className="py-8 sm:py-12 border-t border-border">
          <h2 className="text-2xl font-bold text-text-primary">Our Review Process</h2>
          <div className="mt-6 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                1
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">🔍 Research</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  We start by researching each tool thoroughly — reading documentation, watching
                  demos, studying pricing pages, and reading real user feedback on Reddit, G2, and
                  Trustpilot.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                2
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">🧪 Testing</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  Where possible we test tools ourselves using free trials or paid plans. For tools
                  we use in our own work (like Hostinger for web hosting and Cursor for coding) our
                  reviews are based on months of real daily use.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                3
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">✍️ Writing</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  We write every review from scratch — no copy-pasting from product pages. We focus
                  on what actually matters: real pricing, honest pros and cons, and who the tool is
                  genuinely best for.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                4
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">🔄 Updating</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  Software changes fast. We revisit and update our reviews regularly to make sure
                  pricing, features, and ratings reflect the current version of each tool.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — How We Make Money */}
        <section className="py-8 sm:py-12 border-t border-border">
          <h2 className="text-2xl font-bold text-text-primary">
            How ToolScout Makes Money (Full Transparency)
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-text-primary">1. Affiliate Commissions</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Some links on our site are affiliate links. This means if you click a link and sign
                up for a tool, we may earn a commission at no extra cost to you. This is how most
                independent review sites stay free to use.
              </p>
              <p className="mt-3 text-sm text-text-secondary">
                Important: affiliate relationships never influence our ratings or recommendations. We
                have affiliate links for tools we&apos;ve rated poorly, and we recommend tools we
                don&apos;t have affiliate deals with. Our editorial opinions are genuinely
                independent.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-text-primary">2. Sponsored Listings</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Some tools pay to be featured as &quot;Sponsored&quot; on our site. Sponsored
                listings are always clearly labeled with a &quot;Sponsored&quot; badge so you always
                know. Paying for a sponsored listing does not affect a tool&apos;s editorial rating
                or review.
              </p>
              <p className="mt-3 text-sm text-text-secondary">
                We believe in full transparency because your trust is worth more to us than any
                individual commission.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — The Team */}
        <section className="py-8 sm:py-12 border-t border-border text-center">
          <h2 className="text-2xl font-bold text-text-primary">Who&apos;s Behind ToolScout</h2>
          <div className="mt-4 space-y-3 text-text-secondary">
            <p>
              ToolScout.tools is independently owned and operated. We&apos;re a small team of
              software enthusiasts, developers, and digital marketers based across Europe.
            </p>
            <p>
              We built ToolScout because we wanted a review site we could actually trust ourselves —
              one that prioritizes honest information over affiliate revenue.
            </p>
            <p>Have a question, spotted an error, or want to get in touch? We&apos;d love to hear from you.</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@toolscout.tools"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Contact Us
            </a>
            <Link
              href="/sponsor"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Sponsor Your Tool
            </Link>
          </div>
        </section>

        {/* SECTION 7 — Trust Signals */}
        <section className="py-8 sm:py-12 border-t border-border">
          <div className="grid gap-4 rounded-2xl border border-border bg-surface/60 p-6 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl" aria-hidden>
                📅
              </div>
              <p className="mt-1 text-sm font-semibold text-text-primary">Launched 2026</p>
            </div>
            <div className="text-center">
              <div className="text-2xl" aria-hidden>
                ✍️
              </div>
              <p className="mt-1 text-sm font-semibold text-text-primary">
                Independent Editorial Team
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl" aria-hidden>
                🔍
              </div>
              <p className="mt-1 text-sm font-semibold text-text-primary">500+ Tools Researched</p>
            </div>
            <div className="text-center">
              <div className="text-2xl" aria-hidden>
                💯
              </div>
              <p className="mt-1 text-sm font-semibold text-text-primary">No Paid Reviews — Ever</p>
            </div>
          </div>
        </section>

        {/* SECTION 8 — Contact CTA */}
        <section className="py-8 sm:py-12 border-t border-border text-center">
          <p className="text-sm text-text-secondary">
            Found an error? Have a suggestion? Want to work with us?
          </p>
          <a
            href="mailto:hello@toolscout.tools"
            className="mt-3 inline-flex rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Get In Touch → hello@toolscout.tools
          </a>
        </section>
      </main>
    </div>
  );
}
