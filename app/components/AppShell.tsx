"use client";

import type { CSSProperties, ReactNode } from "react";
import { useStore } from "../store";
import AmbientBackground from "./AmbientBackground";
import Nav from "./Nav";
import Footer from "./Footer";
import Toast from "./Toast";

// Visual shell shared by every route. Sets the live --accent (from the active
// drink) on the app root so the ambient aurora and any accent-keyed surfaces
// stay in sync across navigations.
export default function AppShell({ children }: { children: ReactNode }) {
  const { activeDrink } = useStore();

  return (
    <div
      className="app"
      style={{ "--accent": activeDrink.accent } as CSSProperties}
    >
      <AmbientBackground />
      <Nav />
      {children}
      <Footer />
      <Toast />
    </div>
  );
}
