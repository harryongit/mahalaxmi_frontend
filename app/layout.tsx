import type { Metadata, Viewport } from "next";
import "@/src/styles.css";
import Providers from "./providers";

export const viewport: Viewport = {
  themeColor: "#FCF9F3",
};

export const metadata: Metadata = {
  title: "Shri Mandir — A Sacred Journey of Devotion",
  description:
    "Step into a centuries-old sanctuary. Explore the history, architecture, daily rituals and live darshan of Shri Mandir.",
  openGraph: {
    title: "Shri Mandir — A Sacred Journey of Devotion",
    description: "A cinematic, immersive online experience of an ancient temple.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
