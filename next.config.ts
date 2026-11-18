import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP avoids expensive AVIF server encoding & heavy CPU software decode on Windows 7 Chrome 109
    formats: ["image/webp"],
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [48, 64, 96, 128, 256, 320, 384],
    minimumCacheTTL: 604800,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
