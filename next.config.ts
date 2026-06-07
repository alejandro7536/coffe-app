import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sileo ships as an ESM "use client" package that depends on `motion`.
  // Turbopack needs it transpiled so the <Toaster> client component hydrates
  // and its toast subscription actually runs in the browser.
  transpilePackages: ["sileo"],
};

export default nextConfig;
