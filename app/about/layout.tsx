import type { Metadata } from "next";
import { SITE_URL, TEMPLE_ADDRESS } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "About Shri Mahalaxmi Temple, Kolhapur",
  description:
    "Discover the spiritual heritage of Shri Mahalakshmi (Ambabai) Temple Kolhapur — one of the 51 Shakti Peethas, its Chalukya-era history, self-manifested deity and daily rituals.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Shri Mahalaxmi Temple, Kolhapur",
    description:
      "One of the 51 Shakti Peethas of India, Shri Mahalakshmi (Ambabai) Temple Kolhapur — history, deity, architecture and living traditions.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}