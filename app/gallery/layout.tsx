import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Photo Gallery – Mahalaxmi Temple Kolhapur",
  description:
    "View photographs of Shri Mahalakshmi Ambabai Temple Kolhapur — golden Kirnotsav sun rays, Navratri alankars, Rathotsav chariot procession and ancient Hemadpanthi stone carvings.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    title: "Photo Gallery – Mahalaxmi Temple Kolhapur",
    description:
      "Sacred moments from Shri Ambabai Mahalaxmi Temple — sun-ray miracles, festivals, and stone carvings.",
    url: `${SITE_URL}/gallery`,
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}