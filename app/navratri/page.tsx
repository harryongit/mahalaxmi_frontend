import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Sparkles, CalendarDays, ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Sharadiya Navratri at Mahalaxmi Temple Kolhapur – Kirnotsav, 9 Days of Devi",
  description:
    "Celebrate Sharadiya Navratri at Shri Ambabai Mahalaxmi Temple Kolhapur — 9 days of Devi worship, the famous Kirnotsav sun-ray darshan, night aartis and Devi Sthapana seva. Book online.",
  alternates: { canonical: "/navratri" },
  openGraph: {
    type: "website",
    title: "Sharadiya Navratri at Mahalaxmi Temple Kolhapur",
    description:
      "9 days of Devi worship, Kirnotsav sun-ray darshan and Navratri seva booking at Ambabai Temple Kolhapur.",
    url: `${SITE_URL}/navratri`,
  },
};

const navratriDays = [
  { day: 1, devi: "Shailputri", detail: "Gray shari: devotion and the chants of the first form of Parvati." },
  { day: 2, devi: "Brahmacharini", detail: "Gray shari: austerity and penance honoured on this day." },
  { day: 3, devi: "Chandraghanta", detail: "Gray shari: peace of mind and courage." },
  { day: 4, devi: "Kushmanda", detail: "Orange shari: the cosmic energy that created the universe." },
  { day: 5, devi: "Skandamata", detail: "Orange shari: the motherly form of the Goddess." },
  { day: 6, devi: "Katyayani", detail: "Orange shari: fierce and courageous devotion." },
  { day: 7, devi: "Kalratri", detail: "White shari: removing fear and darkness." },
  { day: 8, devi: "Mahagauri", detail: "White shari: peace and purity — Maha Ashtami." },
  { day: 9, devi: "Siddhidatri", detail: "White shari: Siddhi, powers and blessings of Maha Navami." },
];

export default function NavratriPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Sharadiya Navratri Mahotsav at Shri Mahalaxmi Temple Kolhapur",
    description:
      "Nine days of Devi worship with Kirnotsav sun-ray darshan, night aartis and Navratri seva at Ambabai Mahalaxmi Temple Kolhapur.",
    url: `${SITE_URL}/navratri`,
    location: {
      "@type": "HinduTemple",
      name: "Shri Mahalakshmi (Ambabai) Temple",
      address: { "@type": "PostalAddress", addressLocality: "Kolhapur", addressRegion: "Maharashtra", addressCountry: "IN" },
    },
  };

  return (
    <>
      <JsonLd data={eventSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Festivals"
          badge="Sharadiya Navratri"
          title="9 Nights of the"
          titleGold="Divine Mother"
          description="Kolhapur's grandest festival — nine nights of Devi worship, the world-famous Kirnotsav sun-ray darshan, and the night aartis of Chandrakala more."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm text-center">
              <Sparkles className="mx-auto size-7 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-3">Kirnotsav Sun-Ray Darshan</h3>
              <p className="text-xs text-stone-600 mt-2">
                At dawn, the rising sun's rays fall directly on the Mahalakshmi idol through the temple's east-facing door — a divine spectacle on 3–4 days of Navratri.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm text-center">
              <CalendarDays className="mx-auto size-7 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-3">9 Days of Devi Sthapana</h3>
              <p className="text-xs text-stone-600 mt-2">
                Ghatasthapana on the first day, with Devi in a new form of the Goddess honoured each day through Ashtami and Navami.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm text-center">
              <MapPin className="mx-auto size-7 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-3">Night Aartis & More</h3>
              <p className="text-xs text-stone-600 mt-2">
                The renowned night aarti of Mahalaxmi, along with Vedic rituals and thousands of pilgrims from across Maharashtra.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-950 border-b-2 border-amber-200/70 pb-3">
              Nine Forms of the Goddess — Day by Day
            </h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {navratriDays.map((d) => (
                <div key={d.day} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Day {d.day}</span>
                    <span className="size-8 grid place-items-center rounded-full bg-[#3C0F1A] text-amber-100 font-serif font-bold">
                      {d.day}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold mt-2">{d.devi}</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{d.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative text-center">
              <h2 className="font-serif text-2xl sm:text-3xl">
                Be Part of the <span className="text-gradient-gold italic">Grand Navratri Seva</span>
              </h2>
              <p className="text-sm text-amber-100/80 mt-3 max-w-xl mx-auto">
                Book the 9-day Navratri Seva, Devi Sthapana, Kirnotsav offering or a daily Kumkumarchan for Chaitra or Sharadiya Navratri — performed in your family's names.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/puja/e2"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3.5 hover:brightness-105 transition-all"
                >
                  Book 9-Day Navratri Seva <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/online-puja"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 text-amber-100 font-bold text-sm px-7 py-3.5 hover:bg-white/5 transition-all"
                >
                  View All Festive Sevas
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}