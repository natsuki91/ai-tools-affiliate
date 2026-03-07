/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      { source: "/compare", destination: "/ai-tools/compare", permanent: true },
      { source: "/compare/:path*", destination: "/ai-tools/compare/:path*", permanent: true },
      { source: "/tools", destination: "/ai-tools/tools", permanent: true },
      { source: "/tools/:path*", destination: "/ai-tools/tools/:path*", permanent: true },
      { source: "/blog", destination: "/ai-tools/blog", permanent: true },
      { source: "/blog/:path*", destination: "/ai-tools/blog/:path*", permanent: true },
      { source: "/category/:path*", destination: "/ai-tools/category/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
