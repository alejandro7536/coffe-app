import type { Metadata } from "next";
import { Sora, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store";
import AppShell from "./components/AppShell";

// Sora is a variable font — no explicit weight needed.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Be Vietnam Pro is not variable — declare the weights the design uses.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chap Coffee — Premium Coffee Experience",
  description:
    "Discover the finest artisanal coffee blends crafted for a premium sensory experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${beVietnam.variable}`}>
      <body>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
