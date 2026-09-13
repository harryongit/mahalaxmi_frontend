import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Package, Timer, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prasadam Home Delivery – Mahalaxmi Temple Kolhapur",
  description:
    "Receive consecrated prasadam from Shri Mahalakshmi (Ambabai) Temple Kolhapur delivered to your home. Kumkumarchan, Abhishek and festival prasadam couriered across India.",
  alternates: { canonical: "/prasadam" },
  openGraph: {
    type: "website",
    title: "Prasadam Home Delivery – Mahalaxmi Temple Kolhapur",
    description:
      "Blessed prasadam from Ambabai Mahalaxmi Temple delivered to your doorstep anywhere in India.",
    url: `${SITE_URL}/prasadam`,
  },
};

const steps = [
  { title: "Book Your Puja", desc: "Choose any online seva — Kumkumarchan, Abhishek, Havan or festival puja." },
  { title: "Puja Performed", desc: "On the chosen date, temple pujaris perform the ritual with your Gotra and family names." },
  { title: "Prasad Consecrated", desc: "The offering is blessed at the sanctum during Aarti and packed hygienically." },
  { title: "Delivered to Your Door", desc: "Your prasadam is shipped via courier, with WhatsApp photos and video proof." },
];

export default function PrasadamPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Prasadam Home Delivery from Mahalaxmi Temple Kolhapur",
    description:
      "Consecrated prasadam from Shri Mahalakshmi (Ambabai) Temple Kolhapur delivered across India.",
    url: `${SITE_URL}/prasadam`,
    areaServed: "India",
    provider: { "@type": "HinduTemple", name: "Shri Mahalakshmi Temple, Kolhapur" },
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Prasadam Delivery"
          badge="Delivered Across India"
          title="Sacred Prasad,"
          titleGold="Delivered Home"
          description="The blessing of Goddess Ambabai, packed with love and safely couriered to your doorstep — anywhere in India."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-center text-amber-950">
              How Prasadam Delivery Works
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <div key={i} className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm relative">
                  <div className="size-9 rounded-2xl bg-[#3C0F1A] text-amber-100 flex items-center justify-center font-serif font-bold border border-amber-400">
                    {i + 1}
                  </div>
                  <h3 className="font-serif text-lg font-bold mt-3">{s.title}</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-amber-200/70 bg-white p-6 text-center shadow-sm">
              <Package className="mx-auto size-7 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-3">Hygienic Packing</h3>
              <p className="text-xs text-stone-600 mt-2">Devotional items packed fresh in sealed containers</p>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-white p-6 text-center shadow-sm">
              <Timer className="mx-auto size-7 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-3">3–7 Day Delivery</h3>
              <p className="text-xs text-stone-600 mt-2">Fast dispatch to anywhere in India</p>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-white p-6 text-center shadow-sm">
              <ShieldCheck className="mx-auto size-7 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-3">Authentic & Blessed</h3>
              <p className="text-xs text-stone-600 mt-2">Consecrated at the sanctum during Aarti</p>
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 size-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="size-7 text-amber-300 shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl">
                    From the Sanctum of <span className="text-gradient-gold italic">Goddess Ambabai</span>
                  </h2>
                  <p className="text-sm text-amber-100/80 mt-2 max-w-lg">
                    Every prasadam offering is sanctified at Shri Mahalakshmi Temple, Kolhapur —
                    the same shrine of Goddess Mahalaxmi that has blessed millions for centuries.
                  </p>
                </div>
              </div>
              <Link
                href="/online-puja"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3.5 hover:brightness-105 transition-all shrink-0"
              >
                Book a Puja <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}