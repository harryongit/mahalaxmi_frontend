import type { Metadata, Viewport } from "next";
import "@/src/styles.css";
import Providers from "./providers";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  themeColor: "#FCF9F3",
};

export const metadata: Metadata = {
  title: "Ambabai Mahalaxmi Kolhapur — A Sacred Journey of Devotion",
  description:
    "Step into a centuries-old sanctuary. Explore the history, architecture, daily rituals and live darshan of Ambabai Mahalaxmi Kolhapur.",
  openGraph: {
    title: "Ambabai Mahalaxmi Kolhapur — A Sacred Journey of Devotion",
    description: "A cinematic, immersive online experience of Ambabai Mahalaxmi Temple, Kolhapur.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

import { AnalyticsTracker } from "@/src/components/AnalyticsTracker";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Toaster richColors position="top-right" />
        <AnalyticsTracker />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
