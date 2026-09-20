import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL, TEMPLE_ADDRESS } from "@/src/lib/seo";
import { Plane, Train, Bus, Car, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Reach Karveer Nivasini Ambabai Mahalaxmi Temple Kolhapur",
  description:
    "Complete travel guide to Karveer Nivasini Shree Mahalakshmi (Ambabai) Temple Kolhapur — nearest airport, railway station, bus stand, and driving directions.",
  alternates: { canonical: "/how-to-reach" },
  openGraph: {
    type: "website",
    title: "How to Reach Karveer Nivasini Ambabai Mahalaxmi Temple Kolhapur",
    description:
      "Directions to Shree Karveer Niwasini Ambabai Mahalaxmi Kolhapur by air, rail and road, with travel tips.",
    url: `${SITE_URL}/how-to-reach`,
  },
};

const modes = [
  {
    icon: Plane,
    title: "By Air",
    name: "Kolhapur Airport",
    detail:
      "Chhatrapati Rajaram Maharaj Airport (Kolhapur) is just ~10 km from the temple, with direct flights from Mumbai and Bengaluru. Pune and Belgaum airports are larger alternatives connected by taxi.",
    time: "15–20 min by taxi",
  },
  {
    icon: Train,
    title: "By Train",
    name: "Kolhapur Railway Station (Nearest Railway Station)",
    detail:
      "Direct trains connect Kolhapur with Mumbai, Pune, Bengaluru, Solapur and Miraj. The Shree Ambabai Mahalaxmi Temple Kolhapur nearest railway station is Chhatrapati Shahu Maharaj Terminus (KOP) — an auto-rickshaw or taxi ride of about 10 minutes (~3 km).",
    time: "10 min by auto",
  },
  {
    icon: Bus,
    title: "By Road / Bus",
    name: "Central Bus Stand (CSBT), Kolhapur",
    detail:
      "MSRTC buses run frequently from Mumbai (Shivneri), Pune, Sangli, Satara and Miraj. The central bus stand is ~2 km from the temple in the heart of the city.",
    time: "5–10 min by auto",
  },
  {
    icon: Car,
    title: "By Car",
    name: "National Highways NH-48 & NH-166",
    detail:
      "Kolhapur is well connected by highway — ~375 km from Mumbai, ~230 km from Pune and ~120 km from Belgaum. For those driving, Shree Ambabai Mahalaxmi Temple Kolhapur parking is available in the designated pay-and-park area near the southern courtyard (Vidyapeeth High School ground). Note: Mahalaxmi Ambabai to Jyotiba Temple distance is about 21 km (approx 45 mins by car).",
    time: "Parking available nearby",
  },
];

export default function HowToReachPage() {
  const touristSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Shri Mahalakshmi (Ambabai) Temple, Kolhapur",
    description:
      "One of the 51 Shakti Peethas of India, dedicated to Goddess Mahalaxmi (Ambabai).",
    url: `${SITE_URL}/how-to-reach`,
    isAccessibleForFree: true,
    address: TEMPLE_ADDRESS,
    touristType: ["Pilgrim", "Hindu Devotee", "Heritage Traveller"],
  };

  return (
    <>
      <JsonLd data={touristSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="How to Reach"
          badge="Kolhapur · Maharashtra"
          title="Find Your Way to Karveer Nivasini"
          titleGold="Ambabai Mahalaxmi"
          description="Shree Karveer Niwasini Ambabai Mahalaxmi Kolhapur sits in the very heart of the city. Here is every way to reach it — by air, train, bus or road."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section className="text-center space-y-3 max-w-2xl mx-auto">
            <MapPin className="mx-auto size-8 text-amber-800" />
            <h2 className="font-serif text-3xl text-amber-950">Temple Address</h2>
            <p className="text-sm text-stone-700">
              Mahalaxmi Temple Road, Bava Ganapati Galli,
              <br /> Kolhapur, Maharashtra 416012, India
            </p>
            <p className="text-xs text-stone-500">
              The temple stands in the centre of old Kolhapur city, within walking distance of many
              hotels and the historic Bhavani Mandap.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-center text-amber-950">
              Travel Options to Mahalaxmi Temple
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {modes.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-2xl bg-[#3C0F1A] text-amber-100 border border-amber-400">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="font-serif text-xl font-bold text-stone-900">{m.title}</div>
                        <div className="text-[11px] font-semibold text-amber-800">{m.time}</div>
                      </div>
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mt-4">
                      {m.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">{m.detail}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 size-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-widest">
                  <Clock className="size-4" />
                  Plan Your Visit
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                  Check Darshan Timings <span className="text-gradient-gold italic">First</span>
                </h2>
                <p className="text-sm text-amber-100/80 mt-2 max-w-lg">
                  The temple opens in two shifts daily. See the full aarti and darshan schedule
                  before you travel.
                </p>
              </div>
              <Link
                href="/darshan-timings"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3.5 hover:brightness-105 transition-all shrink-0"
              >
                Darshan Timings <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}