import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/seo";

const PUJA_NAMES: Record<string, string> = {
  s1: "Kumkumarchan Seva",
  s2: "Panchamrut Abhishek",
  s3: "Padya Puja & Archana",
  s4: "Kulachar Mahapuja",
  s5: "Sahastra Namavali Puja",
  s6: "Shreesukta & Navachandi Havan",
  c1: "Regular Otee Offering",
  c2: "Silk Saree Otee Offering",
  c3: "Silver Chhatra Arpan",
  n1: "Puranpoli Naivedya Bhog",
  n2: "Brahman Bhojan Seva",
  n3: "Suwasini & Kumarika Bhojan",
  o1: "Annadan Mahaseva",
  o2: "Goushala Gou Seva",
  o3: "Sahastra Deepam Lighting",
  d1: "VIP Priority Darshan Pass",
  d2: "Senior Citizen & Infant Entry Pass",
  e1: "Kirnotsav Sun-Ray Special Puja",
  e2: "Sharadiya Navratri 9-Day Seva",
  e3: "Chaitra Rathotsav Chariot Seva",
};

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const name = PUJA_NAMES[id] || "Online Puja";

  return {
    title: `${name} – Book Online at Mahalaxmi Temple Kolhapur`,
    description: `Book ${name} online at Shri Mahalakshmi (Ambabai) Temple Kolhapur. Performed by temple Vedic pujaris with your Gotra recitation — WhatsApp proof and consecrated prasadam delivered home.`,
    alternates: { canonical: `/puja/${id}` },
    openGraph: {
      type: "website",
      title: `${name} – Mahalaxmi Temple Kolhapur`,
      description: `Book ${name} online at Shri Ambabai Mahalaxmi Temple Kolhapur with prasadam home delivery.`,
      url: `${SITE_URL}/puja/${id}`,
    },
  };
}

export default function PujaLayout({ children }: { children: React.ReactNode }) {
  return children;
}