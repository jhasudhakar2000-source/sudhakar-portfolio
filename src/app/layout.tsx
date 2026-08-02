import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AnimationProvider } from "@/components/providers/animation-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { defaultMetadata } from "@/lib/metadata";

const sans = localFont({
  src: "../../public/fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 1000",
});

const display = localFont({
  src: "../../public/fonts/space-grotesk-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <AnimationProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AnimationProvider>
      </body>
    </html>
  );
}
