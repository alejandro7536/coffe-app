import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sileo";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster position="bottom-center" options={{ fill: "#000000" }} />
      </body>
    </html>
  );
}
