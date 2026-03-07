/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "/next/",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  // Redirects disabled for static export (no server). Use /ai-tools/compare etc. directly.
};

export default nextConfig;
