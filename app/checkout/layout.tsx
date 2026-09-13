import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Book Online Puja & Seva – Checkout",
  description:
    "Complete your online puja booking at Mahalaxmi Temple Kolhapur — choose your seva, select an auspicious date and pay securely with Razorpay.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Book Online Puja at Mahalaxmi Temple Kolhapur",
    description: "Secure online puja and seva booking at Shri Ambabai Temple.",
    url: `${SITE_URL}/checkout`,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}