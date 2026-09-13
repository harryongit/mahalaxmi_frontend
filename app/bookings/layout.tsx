import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "My Seva Bookings – Mahalaxmi Temple Kolhapur",
  description:
    "View and track your online puja and seva bookings at Shri Mahalakshmi (Ambabai) Temple, Kolhapur — status, receipts and prasadam delivery updates.",
  alternates: { canonical: "/bookings" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "My Seva Bookings",
    description: "Track your puja bookings at Mahalaxmi Temple Kolhapur.",
    url: `${SITE_URL}/bookings`,
  },
};

export default function BookingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}