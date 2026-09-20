import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Donate to Karveer Nivasini Ambabai Mahalaxmi Temple Kolhapur",
  description:
    "Make an online donation (Dehgi / Dan) to Shree Karveer Niwasini Ambabai Mahalaxmi Kolhapur for Annadaan, Goushala, and temple maintenance.",
  alternates: { canonical: "/donate" },
  openGraph: {
    type: "website",
    title: "Donate to Karveer Nivasini Ambabai Temple",
    description:
      "Support the Karveer Nivasini Ambabai Mahalaxmi Mandir through online donation for various sevas and maintenance.",
    url: `${SITE_URL}/donate`,
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
