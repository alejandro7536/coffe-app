// Base path for the GitHub Pages *project* deployment
// (served from https://<user>.github.io/coffe-app/).
//
// Empty during development so the app serves from "/", and "/coffe-app" in
// production builds. Plain <img> src values are NOT rewritten by Next's
// basePath, so image paths are prefixed with this manually (see lib/drinks.ts).
//
// Keep the repo name here in sync with `basePath` in next.config.ts.
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/coffe-app" : "";
