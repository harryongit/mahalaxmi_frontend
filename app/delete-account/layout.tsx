import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Delete My Account – Mahalaxmi Temple Kolhapur",
  description:
    "Request deletion of your devotee account and personal data at Shri Mahalakshmi (Ambabai) Temple Kolhapur in accordance with applicable privacy laws.",
  alternates: { canonical: "/delete-account" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Delete My Account",
    description: "Request removal of your devotee data from Mahalaxmi Temple Kolhapur.",
    url: `${SITE_URL}/delete-account`,
  },
};

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}