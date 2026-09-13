import type { Metadata, Viewport } from "next";
import "@/src/styles.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import { JsonLd } from "@/src/components/JsonLd";
import {
  SITE_NAME,
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  OG_IMAGE,
  TEMPLE_ADDRESS,
  TEMPLE_PHONE,
} from "@/src/lib/seo";

export const viewport: Viewport = {
  themeColor: "#FCF9F3",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Mahalaxmi temple Kolhapur",
    "Ambabai temple",
    "online puja booking Kolhapur",
    "Mahalaxmi puja online",
    "darshan timings Kolhapur Mahalaxmi",
    "Rathotsav Kolhapur",
    "Kirnotsav",
    "51 Shakti Peetha",
    "seva booking Mahalaxmi temple",
    "Ambabai darshan timings",
    "Kolhapur temple aarti timings",
    "online seva Kolhapur",
  ],
  authors: [{ name: "Shri Mahalakshmi Temple Kolhapur" }],
  creator: "Shri Mahalakshmi Temple Kolhapur",
  publisher: "Shri Mahalakshmi Temple Kolhapur",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Shri Mahalakshmi (Ambabai) Temple, Kolhapur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

import { AnalyticsTracker } from "@/src/components/AnalyticsTracker";

const templeSchema = {
  "@context": "https://schema.org",
  "@type": ["HinduTemple", "TouristAttraction", "LandmarksOrHistoricalBuildings"],
  "@id": `${SITE_URL}/#temple`,
  name: "Shri Mahalakshmi (Ambabai) Temple",
  alternateName: ["Mahalakshmi Mandir Kolhapur", "Ambabai Mandir"],
  url: SITE_URL,
  telephone: TEMPLE_PHONE,
  email: "info@mahalaxmikolhapur.com",
  image: OG_IMAGE,
  description:
    "Shri Mahalakshmi (Ambabai) Temple in Kolhapur is one of the 51 Shakti Peethas and the chief abode of Goddess Mahalakshmi. Book online puja & seva, view darshan timings and festivals.",
  address: TEMPLE_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 16.7028,
    longitude: 74.2404,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "05:00",
    closes: "21:30",
  },
  isAccessibleForFree: true,
  publicAccess: true,
  sameAs: [
    "https://en.wikipedia.org/wiki/Mahalakshmi_Temple,_Kolhapur",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <JsonLd data={templeSchema} />
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Kolhapur" />
        <meta name="geo.position" content="16.7028;74.2404" />
        <meta name="ICBM" content="16.7028, 74.2404" />
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