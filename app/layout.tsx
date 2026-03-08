import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: {
    default: "AI Tools Comparison — Find the Best AI Software",
    template: "%s | AI Tools",
  },
  description:
    "Compare AI tools side-by-side. Honest reviews, pricing, and guides for ChatGPT, Claude, and 500+ AI software tools.",
  openGraph: {
    type: "website",
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
        {/* Google tag (gtag.js) — set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local (e.g. G-Q97DNWL4VV) */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
                `.trim(),
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased" style={{ fontFamily: "system-ui, sans-serif" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
