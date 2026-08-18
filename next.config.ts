import type { NextConfig } from "next";

// GitHub Pages *project* site: served from https://<user>.github.io/coffe-app/.
// Keep this repo name in sync with BASE_PATH in lib/config.ts.
const basePath = process.env.NODE_ENV === "production" ? "/coffe-app" : "";

const nextConfig: NextConfig = {
  // Static HTML export (GitHub Pages serves static files only) -> writes ./out.
  output: "export",
  basePath,
  // Emit `route/index.html` so deep links like /cart/ resolve on GitHub Pages.
  trailingSlash: true,
  // next/image optimization needs a server; disable it for the static export.
  images: { unoptimized: true },
  // sileo ships as an ESM "use client" package that depends on `motion`.
  // Turbopack needs it transpiled so the <Toaster> client component hydrates.
  transpilePackages: ["sileo"],
};

export default nextConfig;
