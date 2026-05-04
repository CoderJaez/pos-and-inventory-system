import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedEnv: true,
  },
};

export default withPWA(nextConfig);
