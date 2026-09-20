import type { Metadata } from "next";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { SITE_URL } from "@/src/lib/seo";
import { Calendar, Sun, Moon, Clock } from "lucide-react";
import { getPanchangam, Observer, tithiNames, nakshatraNames } from "@ishubhamx/panchangam-js";

export const metadata: Metadata = {
  title: "Aaj Ka Panchang | Daily Hindu Calendar | Mahalaxmi Temple",
  description:
    "Check today's Panchang for Kolhapur including Tithi, Nakshatra, Sunrise, Sunset, Paksha, and Ritu.",
  alternates: { canonical: "/panchang" },
  openGraph: {
    type: "website",
    title: "Aaj Ka Panchang - Mahalaxmi Temple Kolhapur",
    description: "Check today's Panchang including Tithi and Nakshatra.",
    url: `${SITE_URL}/panchang`,
  },
};

export default function PanchangPage() {
  // Kolhapur Coordinates: 16.6946° N, 74.2432° E, ~569m elevation
  const observer = new Observer(16.6946, 74.2432, 569);
  
  // Get panchang for today in IST (UTC+5:30 -> 330 minutes)
  const panchang = getPanchangam(new Date(), observer, { 
    timezoneOffset: 330 
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />
      <PageHero
        breadcrumb="Astrology"
        badge="Daily Calendar"
        title="Aaj Ka"
        titleGold="Panchang"
        description="Daily Vedic calendar (Panchang) calculated for Kolhapur, Maharashtra."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-8">
        
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-200/50">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calendar className="size-8 text-amber-800" />
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Today's Panchang
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            
            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
              <div className="p-3 bg-amber-100/50 rounded-xl text-amber-800 shrink-0">
                <Moon className="size-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Tithi</span>
                <p className="text-lg font-bold text-stone-900 mt-1">{tithiNames[panchang.tithi]}</p>
                <p className="text-sm text-stone-600">Lunar Day</p>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
              <div className="p-3 bg-amber-100/50 rounded-xl text-amber-800 shrink-0">
                <Sparkles className="size-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Nakshatra</span>
                <p className="text-lg font-bold text-stone-900 mt-1">{nakshatraNames[panchang.nakshatra]}</p>
                <p className="text-sm text-stone-600">Lunar Mansion</p>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
              <div className="p-3 bg-amber-100/50 rounded-xl text-amber-800 shrink-0">
                <Sun className="size-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Sun Details</span>
                <div className="mt-1 space-y-1">
                  <p className="text-sm font-bold text-stone-900">Rise: <span className="font-medium text-stone-600">{panchang.sunrise?.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}</span></p>
                  <p className="text-sm font-bold text-stone-900">Set: <span className="font-medium text-stone-600">{panchang.sunset?.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}</span></p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
              <div className="p-3 bg-amber-100/50 rounded-xl text-amber-800 shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Lunar Phase</span>
                <div className="mt-1 space-y-1">
                  <p className="text-sm font-bold text-stone-900">Paksha: <span className="font-medium text-stone-600">{panchang.paksha}</span></p>
                  <p className="text-sm font-bold text-stone-900">Masa: <span className="font-medium text-stone-600">{panchang.masa.name}</span></p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
