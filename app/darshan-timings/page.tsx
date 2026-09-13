import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL, SITE_NAME, TEMPLE_ADDRESS } from "@/src/lib/seo";
import { Clock, Sunrise, Sunset, Moon, Flame, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Darshan Timings & Aarti Schedule – Mahalaxmi Temple Kolhapur",
  description:
    "Complete darshan timings and aarti schedule of Shri Mahalakshmi (Ambabai) Temple Kolhapur — morning and evening darshan hours, all 5 daily aartis, and special festival timings.",
  alternates: { canonical: "/darshan-timings" },
  openGraph: {
    type: "website",
    title: "Darshan Timings & Aarti Schedule – Mahalaxmi Temple Kolhapur",
    description:
      "Temple opening hours, 5 daily aarti timings and festival darshan schedule at Shri Mahalaxmi Mandir Kolhapur.",
    url: `${SITE_URL}/darshan-timings`,
  },
};

const aartiSchedule = [
  { name: "Kakad Aarti", time: "05:00 AM", note: "Dawn worship — awakening of the Goddess" },
  { name: "Sakal Aarti", time: "08:00 AM", note: "Morning arati after abhisheka and alankar" },
  { name: "Madhyahn Aarti", time: "12:00 PM", note: "Midday worship with naivedya offering" },
  { name: "Sandhya Aarti", time: "06:00 PM", note: "Evening arati with 11 oil lamps" },
  { name: "Shej Aarti", time: "09:00 PM", note: "Night worship — the Goddess retires to sleep" },
];

const dayTimings = [
  { day: "Monday – Friday", morning: "05:00 AM – 12:30 PM", evening: "04:00 PM – 09:30 PM" },
  { day: "Saturday", morning: "05:00 AM – 01:00 PM", evening: "04:00 PM – 10:00 PM" },
  { day: "Sunday & Festival Days", morning: "04:30 AM – 01:00 PM", evening: "04:00 PM – 10:00 PM" },
];

export default function DarshanTimingsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Darshan Timings", item: `${SITE_URL}/darshan-timings` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Darshan Timings"
          badge="Open All 7 Days"
          title="Darshan & Aarti"
          titleGold="Timings"
          description="Plan your visit to Shri Mahalakshmi (Ambabai) Temple Kolhapur with our complete daily darshan schedule and all five aarti timings."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section>
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-amber-950">
              Temple Opening Hours
            </h2>
            <p className="text-center text-stone-600 text-sm max-w-2xl mx-auto mt-3">
              The temple opens twice daily for darshan. During festival seasons and on auspicious
              days, timings are extended.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#3C0F1A] text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Day</th>
                    <th className="px-4 py-3 font-semibold">Morning Darshan</th>
                    <th className="px-4 py-3 font-semibold">Evening Darshan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {dayTimings.map((t) => (
                    <tr key={t.day} className="hover:bg-amber-50/40">
                      <td className="px-4 py-3 font-semibold text-stone-800">{t.day}</td>
                      <td className="px-4 py-3 text-stone-600">{t.morning}</td>
                      <td className="px-4 py-3 text-stone-600">{t.evening}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-stone-500 mt-3">
              Note: Regular darshan is free. VIP priority darshan passes and special assistance
              passes for senior citizens are available for advance booking.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-amber-950">
              Daily Aarti Schedule (All 5 Aartis)
            </h2>
            <p className="text-center text-stone-600 text-sm max-w-2xl mx-auto mt-3">
              Five sacred aartis are offered to Goddess Ambabai every single day — the same
              tradition that has continued uninterrupted for centuries.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {aartiSchedule.map((a) => (
                <div
                  key={a.name}
                  className="rounded-2xl border border-amber-200/70 bg-white p-5 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mx-auto grid size-11 place-items-center rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    <Flame className="size-5" />
                  </div>
                  <div className="font-serif text-lg font-bold text-stone-900 mt-3">{a.name}</div>
                  <div className="text-xs font-bold text-amber-800 mt-1">{a.time}</div>
                  <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">{a.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 overflow-hidden relative">
            <div className="absolute top-0 right-1/4 size-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-serif text-2xl sm:text-3xl">
                Book Puja for Your <span className="text-gradient-gold italic">Darshan Day</span>
              </h2>
              <p className="text-sm text-amber-100/80 mt-3 max-w-xl">
                Combine your visit with a personalised seva — Kumkumarchan, Abhishek or Havan —
                performed in your name at the temple.
              </p>
              <Link
                href="/online-puja"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3.5 hover:brightness-105 transition-all"
              >
                Explore Online Pujas <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-center text-amber-950">
              Good to Know Before Your Visit
            </h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Sunrise className="size-6 text-amber-800" />
                <h3 className="font-serif text-lg font-bold mt-3">Best Time for Darshan</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Early morning after Kakad Aarti (05:30–07:30 AM) offers the calmest darshan.
                  Evening during Sandhya Aarti is the most beautiful.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Clock className="size-6 text-amber-800" />
                <h3 className="font-serif text-lg font-bold mt-3">Expected Waiting Time</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  On ordinary days darshan takes 15–30 minutes. On festival days, allow 1–2 hours
                  or book a VIP darshan pass online.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Moon className="size-6 text-amber-800" />
                <h3 className="font-serif text-lg font-bold mt-3">Evening Ambience</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  The evening Shej Aarti with its deeparadhana of hundreds of lamps is a divine
                  sight you should not miss.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}