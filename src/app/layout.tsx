import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import QueryProvider from "@/lib/QueryProvider";
import PWARegister from "@/components/PWARegister";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CryptoDash Pro — Live Trading Terminal",
  description:
    "Real-time cryptocurrency prices, market caps, and historical charts. High-performance trading terminal and crypto dashboard.",
  keywords: [
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "market cap",
    "price chart",
    "trading",
    "PWA",
    "fintech",
  ],
  manifest: "/manifest.json",
  themeColor: "#6366f1",
  alternates: {
    canonical: "https://cryptodash-premium.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cryptodash-premium.vercel.app",
    title: "CryptoDash Pro — Live Trading Terminal",
    description:
      "Real-time cryptocurrency prices, market caps, and historical charts. High-performance trading terminal and crypto dashboard.",
    siteName: "CryptoDash Pro",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "CryptoDash Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoDash Pro — Live Trading Terminal",
    description:
      "Real-time cryptocurrency prices, market caps, and historical charts. High-performance trading terminal and crypto dashboard.",
    images: ["/icon-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CryptoDash",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spaceGrotesk.className}`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <QueryProvider>
            <PWARegister />
            {children}
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
