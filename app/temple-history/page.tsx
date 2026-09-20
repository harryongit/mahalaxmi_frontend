import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Landmark, Scroll, Shield, Crown, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "History of Karveer Nivasini Shree Ambabai Mahalaxmi Temple – 1102 AD to Today",
  description:
    "The complete history (itihas) of Karveer Nivasini Shree Ambabai Mahalaxmi Temple Kolhapur — Chalukya-era foundation, Shilahara and Maratha expansions, and the Swayambhu idol.",
  alternates: { canonical: "/temple-history" },
  openGraph: {
    type: "website",
    title: "History of Karveer Nivasini Ambabai Mahalaxmi Temple Kolhapur",
    description:
      "From its 1102 AD foundation to the living sanctuary it is today — the full history of Shree Karveer Niwasini Ambabai Mahalaxmi Kolhapur.",
    url: `${SITE_URL}/temple-history`,
  },
};

const timeline = [
  {
    year: "7th Century CE",
    icon: Scroll,
    title: "The Chalukya Beginning",
    text: "The earliest shrine is believed to have been raised during the Chalukya period, establishing Kolhapur as a centre of Goddess worship.",
  },
  {
    year: "1102 AD",
    icon: Landmark,
    title: "The First Stone",
    text: "The present temple structure is founded. Legend credits master sculptor Vishvakarma with laying the foundation over a riverbank shrine.",
  },
  {
    year: "13th Century",
    icon: Shield,
    title: "Shilahara & Yadava Patronage",
    text: "The Shilahara and Yadava dynasties expand the temple, adding sanctums and enlarging the complex into a major Shakti centre.",
  },
  {
    year: "14th Century",
    icon: Crown,
    title: "The Gopuram Rises",
    text: "The tiered gopuram towers are raised. By the reign of the Maratha rulers, the temple enjoys royal court patronage.",
  },
  {
    year: "1561 – 1751 AD",
    icon: Crown,
    title: "Maratha Golden Era",
    text: "Under the Marathas — especially the Tarabai and Kolhapur royal family — the temple receives vast endowments, festivals flourish and Rathotsav becomes a grand annual spectacle.",
  },
  {
    year: "19th – 20th Century",
    icon: Shield,
    title: "Restoration & Living Heritage",
    text: "Restoration works preserve the ancient carvings. Today it is recognised as one of India's most significant Shakti Peethas and a protected monument of living worship.",
  },
];

export default function TempleHistoryPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "History of Mahalaxmi Temple Kolhapur",
    description:
      "The complete history of Shri Mahalakshmi (Ambabai) Temple Kolhapur from the Chalukya period to today.",
    author: { "@type": "Organization", name: "Shri Mahalakshmi Temple Kolhapur" },
    publisher: { "@type": "Organization", name: "Shri Mahalakshmi Temple Kolhapur" },
    url: `${SITE_URL}/temple-history`,
    inLanguage: "en-IN",
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Temple History"
          badge="900+ Years of Devotion"
          title="History of Karveer Nivasini"
          titleGold="Ambabai Mahalaxmi"
          description="From a silent Chalukya shrine to one of India's 51 Shakti Peethas — the extraordinary nine-century journey (itihas) of Karveer Nivasini Ambabai Temple, Kolhapur."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section className="space-y-5 text-stone-700 leading-relaxed text-sm sm:text-base max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-center text-amber-950">
              One of the 51 Shakti Peethas
            </h2>
            <p>
              Shree Karveer Niwasini Ambabai Mahalaxmi Kolhapur is one of the most sacred Shakti Peethas in all of
              India, dedicated to Goddess Mahalaxmi in Her form as <strong>Karveer Nivasini Ambabai</strong>. The
              temple is one of the six great Mahalaxmi temples of the country and is widely held to
              be the most important of them.
            </p>
            <p>
              The idol of the Goddess is believed to be <strong>self-manifested (Swayambhu)</strong>.
              Carved in black stone and seated upon a stone platform, the four-armed Deity holds
              sacred symbols bestowing both spiritual liberation and worldly prosperity.
            </p>
            <p>
              Coupled with the unique <Link href="/festivals" className="text-amber-900 font-bold underline">Kirnotsav</Link> phenomenon —
              when the rays of the setting sun fall directly upon the idol's face in January and
              November — the temple stands as an enduring symbol of devotion, history and
              architectural mastery.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-center text-amber-950">Journey Through Time</h2>
            <div className="mt-10 relative">
              <div
                aria-hidden
                className="absolute left-4 sm:left-1/2 top-0 bottom-0 sm:-translate-x-1/2 w-px bg-amber-200"
              />
              <div className="space-y-8">
                {timeline.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.year} className="relative grid sm:grid-cols-2 gap-4 pl-12 sm:pl-0">
                      <span className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1 grid size-7 place-items-center rounded-full bg-gradient-to-tr from-[#4A1521] to-[#7A2438] border-2 border-amber-300 text-amber-100 shadow-md">
                        <Icon className="size-3.5" />
                      </span>
                      <div className="sm:pr-12 sm:text-right hidden sm:block">
                        <div className="font-serif text-4xl text-gradient-gold">{m.year}</div>
                      </div>
                      <div className="sm:pl-12 rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm">
                        <div className="font-serif text-2xl text-gradient-gold sm:hidden">{m.year}</div>
                        <h3 className="font-serif text-xl font-bold text-stone-900">{m.title}</h3>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-amber-200/70 bg-amber-50/50 p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <Sparkles className="size-8 text-amber-800 shrink-0" />
              <div>
                <h2 className="font-serif text-2xl text-amber-950">
                  Continue Your Sacred Journey
                </h2>
                <p className="text-sm text-stone-700 mt-2 max-w-2xl">
                  Learn about the daily rituals that keep this 900-year-old heritage alive, or book
                  a personalised online puja to become part of the temple's living tradition.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/rituals"
                    className="inline-flex items-center gap-2 rounded-full bg-[#3C0F1A] text-white font-bold text-sm px-6 py-3 hover:opacity-90 transition-all"
                  >
                    Daily Rituals <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/online-puja"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-6 py-3 hover:brightness-105 transition-all"
                  >
                    Book Online Puja <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}