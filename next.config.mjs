/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // No assetPrefix: assets at /_next/ so FTP deploy has one less nested folder to upload
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  // Redirects disabled for static export (no server). Use /ai-tools/compare etc. directly.
};

export default nextConfig;
