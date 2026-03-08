import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { ExitIntentPopup } from "@/components/homepage/ExitIntentPopup";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

export const metadata: Metadata = {
  title: {
    default: "ToolScout — Find & Compare the Best Software Tools",
    template: "%s | ToolScout",
  },
  description:
    "Find and compare the best software tools. Honest reviews, pricing, and guides for AI tools, writing, coding, and more.",
  openGraph: {
    type: "website",
  },
  alternates: {
    canonical: SITE_URL,
    languages: { en: SITE_URL, "x-default": SITE_URL },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Critical CSS inline so the page is never blank if external CSS/JS fail to load */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body{background:#0F0F0F;color:#F8FAFC;font-family:system-ui,sans-serif;font-size:16px;line-height:1.6;margin:0;min-height:100vh;display:flex;flex-direction:column;}
            main{flex:1;}
            a{color:#06B6D4;}
            a:hover{color:#8B5CF6;}
          `.replace(/\s+/g, " ").trim()
        }} />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/styles.css" rel="stylesheet" />
        {/* GA4 loads only after cookie consent (see CookieConsentBanner) */}
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased" style={{ fontFamily: "system-ui, sans-serif" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsentBanner />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
