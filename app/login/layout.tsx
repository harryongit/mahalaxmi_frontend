import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Devotee Login / Sign Up – Mahalaxmi Temple Kolhapur",
  description:
    "Log in or sign up as a devotee of Shri Mahalakshmi (Ambabai) Temple Kolhapur to book online pujas, track sevas and receive prasadam.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Devotee Login – Mahalaxmi Temple Kolhapur",
    description: "Log in to book online pujas and track seva bookings.",
    url: `${SITE_URL}/login`,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}