import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";

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
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased" style={{ fontFamily: "system-ui, sans-serif" }}>
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
