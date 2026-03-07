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
