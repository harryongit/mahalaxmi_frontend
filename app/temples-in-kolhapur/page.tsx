import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { ArrowRight, Landmark, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Famous Temples in Kolhapur – Mahalaxmi, Jyotirlinga & Places to Visit",
  description:
    "A guide to the most famous temples and sacred places in Kolhapur — Ambabai Mahalaxmi, Narsobawadi, Jyotirlinga, Shahuji Museum, Rankala and more.",
  alternates: { canonical: "/temples-in-kolhapur" },
  openGraph: {
    type: "website",
    title: "Famous Temples in Kolhapur – A Devotee Guide",
    description:
      "Discover the most sacred temples and tourist places to visit in Kolhapur, Maharashtra.",
    url: `${SITE_URL}/temples-in-kolhapur`,
  },
};

const temples = [
  {
    name: "Ambabai Mahalaxmi Temple",
    distance: "Kolhapur City Centre",
    description:
      "The crown jewel — a 7th-century Shakti Peetha housing Goddess Mahalakshmi. Night aartis and the world-famous Kirnotsav sun-ray darshan during Navratri.",
    highlight: true,
  },
  {
    name: "Jyotirlinga Narsobawadi",
    distance: "35 km from Kolhapur",
    description:
      "One of Maharashtra's twelve Jyotirlingas — the sacred abode of Lord Dattatreya and Swami Narsobawadi at Banks of Krishna.",
  },
  {
    name: "Shahuji Chhatrapati Museum",
    distance: "3 km from Mandir",
    description:
      "Royal artefacts, vintage weapons, and the legendary Shahuji Wada palace — a living record of Kolhapur's Maratha heritage.",
  },
  {
    name: "Rankala Lake",
    distance: "5 km from Mandir",
    description:
      "Scenic lakeside gardens, toy train and boating. One of Kolhapur's most popular relaxation spots for families.",
  },
  {
    name: "Panhala Fort",
    distance: "22 km from Kolhapur",
    description:
      "A historic hill fort with stunning views, surrounded by nature. Famous as a stronghold of Shivaji and Tarabai.",
  },
  {
    name: "Bordewadi Ganpati Temple",
    distance: "10 km from Kolhapur",
    description:
      "A serene Ganpati temple surrounded by greenery — a favourite pilgrimage spot for families in the Kolhapur district.",
  },
];

export default function TemplesPage() {
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Famous Temples and Tourist Places in Kolhapur",
    description:
      "A guide to sacred temples and places to visit in Kolhapur district, Maharashtra.",
    url: `${SITE_URL}/temples-in-kolhapur`,
    itemListElement: temples.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      description: t.description,
    })),
  };

  return (
    <>
      <JsonLd data={tourSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Explore Kolhapur"
          badge="Pilgrim Guide"
          title="Sacred Kolhapur —"
          titleGold="Temples & Places"
          description="Plan your pilgrimage to Kolhapur. A guide to the sacred temples, famous shrines and must-visit attractions in the city of Goddess Ambabai."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-10">
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {temples.map((t, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-6 shadow-sm relative ${
                  t.highlight
                    ? "border-amber-400 bg-gradient-to-br from-amber-50 to-white ring-2 ring-amber-200/50"
                    : "border-stone-200 bg-white"
                }`}
              >
                {t.highlight && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-[#3C0F1A] text-amber-100 px-2.5 py-1 rounded-full">
                    Primary
                  </span>
                )}
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                  <Landmark className="size-4" />
                  <span>{t.distance}</span>
                </div>
                <h3 className="font-serif text-lg font-bold mt-2">{t.name}</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 size-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <Compass className="size-7 text-amber-300 shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl">
                    Begin at the <span className="text-gradient-gold italic">Shakti Peetha</span>
                  </h2>
                  <p className="text-sm text-amber-100/80 mt-2 max-w-lg">
                    Every spiritual journey to Kolhapur begins at the temple of Goddess Mahalakshmi —
                    the 51 sacred Shakti Peetha that anchors the city's spiritual energy.
                  </p>
                </div>
              </div>
              <Link
                href="/darshan-timings"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3.5 hover:brightness-105 transition-all shrink-0"
              >
                View Darshan Timings <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}