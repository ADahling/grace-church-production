import { LanguageProvider } from "@/context/LanguageContext";
import { generateMultilingualMetadata } from "@/lib/seo-utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "../components/Footer";
import { SisterGraceButton } from "../components/SisterGraceChatbot";
import { PrayerIntentionButton } from "../components/PrayerIntentionTracker";
import { SpiritualProgressButton } from "../components/SpiritualProgressDashboard";
import { StructuredData } from "../components/StructuredData";
import "./globals.css";

// Optimize font loading with display swap for better performance
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  ...generateMultilingualMetadata(
    "Grace - AI-Powered Catholic Spiritual Wellness",
    "Discover deeper faith through personalized prayers, sacred meditations, and spiritual guidance rooted in Catholic tradition. Join thousands of Catholics worldwide in growing closer to God."
  ),
  keywords: [
    "Catholic",
    "spiritual wellness",
    "prayer",
    "meditation",
    "faith",
    "AI spiritual guidance",
    "Catholic prayers",
    "spiritual growth",
    "religious community",
    "Catholic tradition",
    "rosary",
    "divine office",
    "saints",
    "liturgy",
    "spiritual direction",
    "Catholic app",
    "prayer app",
    "meditation app"
  ],
  authors: [{ name: "Grace Church Team" }],
  creator: "Grace Church",
  publisher: "Grace Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://graces.church"),
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
  verification: {
    google: "your-google-verification-code", // TODO: Replace with actual verification code
  },
  category: "Religion & Spirituality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cuijuolyvcocoplnfouu.supabase.co" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://api.elevenlabs.io" />
        
        {/* Optimize viewport for mobile performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#6b9bcc" />
        <meta name="msapplication-TileColor" content="#6b9bcc" />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <LanguageProvider>
          {children}
          <Footer />
        </LanguageProvider>
        <StructuredData />
        <SisterGraceButton />
        <PrayerIntentionButton />
        <SpiritualProgressButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}