import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Daily Rituals, Aarti Timings & Online Puja Booking",
  description:
    "Book daily rituals at Mahalaxmi Temple Kolhapur online — Kumkumarchan, Panchamrut Abhishek, Padya Puja, Havan & more. See aarti timings and receive prasadam at home.",
  alternates: { canonical: "/rituals" },
  openGraph: {
    type: "website",
    title: "Daily Rituals, Aarti Timings & Online Puja Booking",
    description:
      "Reserve online pujas and sevas at Shri Mahalaxmi Temple Kolhapur and receive consecrated prasadam at home.",
    url: `${SITE_URL}/rituals`,
  },
};

export default function RitualsLayout({ children }: { children: React.ReactNode }) {
  return children;
}