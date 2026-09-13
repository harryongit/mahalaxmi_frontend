import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Contact Mahalaxmi Temple Kolhapur – Seva, Darshan & Enquiries",
  description:
    "Contact Shri Mahalakshmi Ambabai Temple Kolhapur for online puja booking, darshan timings, seva enquiries, annadan and donations. Phone, email and temple office address.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact Mahalaxmi Temple Kolhapur",
    description:
      "Reach the temple office of Shri Mahalaxmi Mandir Kolhapur for puja booking, darshan and seva enquiries.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}