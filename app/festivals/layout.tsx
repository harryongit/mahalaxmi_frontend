import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Festivals & Utsavs at Mahalaxmi Temple Kolhapur",
  description:
    "Experience Kirnotsav sun-ray miracle, Sharadiya Navratri Lalita Panchami, Rathotsav chariot procession and Karthikai Deepotsav at Shri Mahalaxmi Temple Kolhapur. Book festival special puja online.",
  alternates: { canonical: "/festivals" },
  openGraph: {
    type: "website",
    title: "Festivals & Utsavs at Mahalaxmi Temple Kolhapur",
    description:
      "Grand utsavs and festivals at Ambabai Mandir — Kirnotsav, Navratri, Rathotsav and Deepotsav festival timings and puja booking.",
    url: `${SITE_URL}/festivals`,
  },
};

export default function FestivalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}