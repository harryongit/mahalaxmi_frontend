import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "My Profile – Mahalaxmi Temple Kolhapur",
  description: "Manage your devotee profile, bookings and preferences at Shri Mahalakshmi (Ambabai) Temple, Kolhapur.",
  alternates: { canonical: "/profile" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "My Profile – Mahalaxmi Temple Kolhapur",
    description: "Manage your devotee account and seva bookings.",
    url: `${SITE_URL}/profile`,
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}