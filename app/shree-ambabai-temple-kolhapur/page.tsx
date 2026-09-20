import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/src/lib/seo";
import { Sparkles, Sun, Crown, History, HandHeart, Info, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "10 Must-See Highlights at Shree Ambabai Temple Kolhapur for First-Time Pilgrims",
  description:
    "Planning a visit to Shree Ambabai Temple Kolhapur? Discover its 7th-century origins, the Swayambhu idol, Kirnotsav, visiting tips, and official online puja booking services.",
  alternates: { canonical: "/shree-ambabai-temple-kolhapur" },
  openGraph: {
    type: "website",
    title: "10 Must-See Highlights at Shree Ambabai Temple Kolhapur",
    description: "The complete pilgrim's guide to Shree Ambabai Temple in Kolhapur.",
    url: `${SITE_URL}/shree-ambabai-temple-kolhapur`,
  },
};

export default function AmbabaiTempleKolhapurPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "10 Must-See Highlights at Shree Ambabai Temple Kolhapur for First-Time Pilgrims",
    description: "An in-depth guide to visiting Shree Ambabai Temple Kolhapur.",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/shree-ambabai-temple-kolhapur`,
    image: `${SITE_URL}/logo.png`,
  };

  const highlights = [
    {
      title: "1. The Swayambhu (Self-Manifested) Idol",
      icon: Sparkles,
      content: "The heart of the temple is the magnificent four-armed Kolhapur Ambabai idol (also reverently called the Kolhapur Ambabai murti), believed to be Swayambhu (self-manifested). Carved in black stone, She holds a citrus fruit (mhalunga), a mace (kaumodaki), a shield (khetaka), and a bowl (panpatra).",
    },
    {
      title: "2. 7th-Century Architectural Marvel",
      icon: History,
      content: "First built during the Chalukya era (around the 7th century) and expanded in 1102 AD, the temple’s Hemadpanthi architecture is a testament to ancient Indian engineering, featuring intricate carvings that have survived centuries.",
    },
    {
      title: "3. The Kirnotsav (Festival of Sun Rays)",
      icon: Sun,
      content: "This stunning astronomical alignment happens twice a year (in January and November). As the sun sets, its rays travel through the temple doors and fall directly on the deity—first at her feet, then her chest, and finally illuminating her face.",
    },
    {
      title: "4. Dynastic Patronage & Golden Heritage",
      icon: Crown,
      content: "Over 900 years, the temple was fiercely protected and expanded by the Chalukyas, Shilaharas, Yadavas, and later reached its golden era under the Maratha Empire (especially under Tarabai of the Kolhapur royal family).",
    },
  ];

  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Kolhapur Guide"
          badge="Pilgrim's Guide"
          title="Shree Ambabai Temple"
          titleGold="Kolhapur"
          description="Everything you need to know about its 7th-century origins, the majestic Kirnotsav phenomenon, and official services before your first visit."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-16">
          
          <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-amber-950 prose-a:text-amber-700">
            <p className="text-lg text-stone-700 leading-relaxed font-medium">
              Nestled in the historic city of Kolhapur, Maharashtra, the <strong>Shree Mahalakshmi Ambabai Temple Kolhapur</strong> is one of the 18 Maha Shakti Peethas. Whether you refer to it simply as <strong>Ambabai Kolhapur</strong> or seek the most revered <strong>Ambabai temple in Kolhapur</strong>, this sacred site draws millions of devotees annually. It is a spiritual epicentre vibrating with 900 years of unbroken devotion. If you are planning a pilgrimage, here is your essential guide blending rich history with practical tips to make the most of your visit.
            </p>
          </article>

          <section>
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-amber-950 mb-10">
              The Historical & Spiritual Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icon className="size-24 text-amber-900" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-serif text-xl font-bold text-amber-950 mb-3">{h.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{h.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-r from-stone-100 to-amber-50/50 rounded-3xl border border-amber-200/50 p-8 sm:p-12 shadow-sm">
            <h2 className="font-serif text-3xl text-amber-950 mb-6 flex items-center gap-3">
              <Info className="size-8 text-amber-700" />
              Practical Guidance for Pilgrims
            </h2>
            <div className="space-y-6 text-stone-700 text-sm leading-relaxed">
              <div className="flex gap-4 items-start">
                <MapPin className="size-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 text-base mb-1">When to Visit (Best Months)</strong>
                  The temple is spectacular year-round, but visiting during <strong>Navratri (September/October)</strong>, Diwali, or the Kirnotsav days provides an unmatched festive atmosphere. Winter months (November to February) offer the most pleasant weather in Kolhapur.
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <ShieldCheck className="size-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 text-base mb-1">Darshan & Aarti Timings</strong>
                  The temple doors open at 4:30 AM and close at 10:00 PM. The daily Kakad Aarti takes place at 5:00 AM, and the beautifully lit Shej Aarti concludes the day at 9:00 PM. For an exhaustive timetable, view our <Link href="/darshan-timings" className="font-bold underline text-amber-800">official Darshan Timings guide</Link>.
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-1/4 size-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative text-center max-w-3xl mx-auto">
              <HandHeart className="size-12 text-amber-400 mx-auto mb-5" />
              <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                Official Temple Services & <span className="text-gradient-gold italic">Online Bookings</span>
              </h2>
              <p className="text-sm text-amber-100/90 leading-relaxed mb-8">
                As the official source for Shree Ambabai Temple Kolhapur, we offer secure online platforms for devotees who wish to participate remotely or plan their visit in advance. Through our portal, you can directly support temple preservation efforts.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <Link
                  href="/online-puja"
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-amber-300/20 hover:bg-white/10 hover:border-amber-400/50 transition-all group"
                >
                  <span className="font-bold text-amber-300 group-hover:text-amber-200">Online Puja</span>
                  <span className="text-xs text-stone-300 mt-1 text-center">Book Abhishek & Kumkumarchan</span>
                </Link>
                <Link
                  href="/prasadam"
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-amber-300/20 hover:bg-white/10 hover:border-amber-400/50 transition-all group"
                >
                  <span className="font-bold text-amber-300 group-hover:text-amber-200">Prasadam</span>
                  <span className="text-xs text-stone-300 mt-1 text-center">Order divine Ladoo Prasadam</span>
                </Link>
                <Link
                  href="/donate"
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-amber-300/20 hover:bg-white/10 hover:border-amber-400/50 transition-all group"
                >
                  <span className="font-bold text-amber-300 group-hover:text-amber-200">Donations</span>
                  <span className="text-xs text-stone-300 mt-1 text-center">Support Annachhatra & Development</span>
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
