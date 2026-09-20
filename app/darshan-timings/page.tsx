import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL, SITE_NAME, TEMPLE_ADDRESS } from "@/src/lib/seo";
import { Clock, Sunrise, Sunset, Moon, Flame, ArrowRight, Video, Car, Hotel } from "lucide-react";

export const metadata: Metadata = {
  title: "Mahalaxmi Temple Darshan Timings: Daily Schedule, Aarti Hours and Best Time to Visit",
  description:
    "Planning a visit? Find out the complete Mahalaxmi Temple Darshan Timings, daily Aarti schedule, peak hours, queue-free windows, VIP passes, and live stream options.",
  alternates: { canonical: "/darshan-timings" },
  openGraph: {
    type: "website",
    title: "Mahalaxmi Temple Darshan Timings & Aarti Schedule",
    description: "Official guide to Ambabai Mahalaxmi Temple timings, VIP darshan, and best visiting hours.",
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Mahalaxmi Temple Darshan Timings: Daily Schedule, Aarti Hours and Best Time to Visit",
    description: "Comprehensive guide to Mahalaxmi temple darshan timings, aartis, and visiting tips.",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/darshan-timings`,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Darshan Timings"
          badge="Visitor's Guide"
          title="Mahalaxmi Temple"
          titleGold="Darshan Timings"
          description="Everything you need to know about the daily schedule, Aarti hours, and the best time to visit Shri Karveer Nivasini Ambabai Temple."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          
          <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-amber-950 prose-a:text-amber-700">
            <p className="text-lg text-stone-700 leading-relaxed font-medium">
              If you are planning a pilgrimage to Kolhapur, knowing the exact <strong>mahalaxmi temple darshan timings</strong> (also commonly searched as <strong>mahalaxmi darshan timings</strong>) is essential for a peaceful and fulfilling experience. As one of the most revered Shakti Peethas in India, the temple sees thousands of devotees daily. Here is your official guide to the temple’s daily schedule, <strong>ambabai aarti timings</strong>, festival extensions, and practical visitor information.
            </p>
          </article>

          <section>
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-amber-950">
              Official Daily Darshan Schedule
            </h2>
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
          </section>

          <section>
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-amber-950">
              Aarti Hours: The Five Sacred Rituals
            </h2>
            <p className="text-center text-stone-600 text-sm max-w-2xl mx-auto mt-3">
              Witnessing the divine Aarti is a highly spiritual experience. The temple conducts five Aartis daily.
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

          <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-amber-950 mb-4">Festival & Kirnotsav Timings</h2>
            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              During major festivals like <strong>Navratri</strong> and <strong>Diwali</strong>, the Mahalaxmi temple darshan timings are significantly extended, often remaining open continuously from 4:00 AM until late at night. 
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Additionally, during the rare <strong>Kirnotsav (Festival of Rays)</strong> occurring in January and November, special darshan arrangements are made in the late afternoon (around 4:30 PM to sunset) so devotees can witness the setting sun's rays illuminating the Swayambhu idol.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl sm:text-3xl text-center text-amber-950">
              Darshan Options & Visitor Tips
            </h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Sunrise className="size-6 text-amber-800 mb-3" />
                <h3 className="font-serif text-lg font-bold text-amber-950">Best Time to Visit (Queue-Free Windows)</h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  To avoid heavy crowds, the absolute best time for a peaceful walk-in darshan is early morning between <strong>5:30 AM and 7:00 AM</strong> (right after Kakad Aarti), or early afternoon around <strong>1:00 PM to 2:30 PM</strong>. Peak hours are typically from 9:00 AM to 12:00 PM and 6:00 PM to 8:30 PM.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Clock className="size-6 text-amber-800 mb-3" />
                <h3 className="font-serif text-lg font-bold text-amber-950">VIP & Priority Darshan</h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  Standard walk-in darshan is free and takes roughly 30–45 minutes on regular days. If you are short on time, you can book <Link href="/vip-darshan" className="text-amber-800 underline font-semibold">VIP / Prioritised Darshan Passes</Link> online. Special access is always provided for senior citizens, pregnant women, and physically challenged devotees.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Video className="size-6 text-amber-800 mb-3" />
                <h3 className="font-serif text-lg font-bold text-amber-950">Virtual Livestreams</h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  Can't visit in person? The temple offers live streams of the Aarti ceremonies so you can receive the Goddess's blessings from anywhere in the world. You can also participate by <Link href="/online-puja" className="text-amber-800 underline font-semibold">booking an online Puja</Link>.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <Car className="size-6 text-amber-800 mb-3" />
                <h3 className="font-serif text-lg font-bold text-amber-950">Transport & Accommodation</h3>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  The temple is located just 2.5 km from Kolhapur Railway Station. Auto-rickshaws and taxis are readily available. For overnight stays, you can explore <Link href="/accommodation" className="text-amber-800 underline font-semibold">Yatri Niwas (Temple Accommodation)</Link> or browse numerous <Link href="/nearby-attractions" className="text-amber-800 underline font-semibold">nearby hotels</Link> suited for pilgrims.
                </p>
              </div>

            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 overflow-hidden relative">
            <div className="absolute top-0 right-1/4 size-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative text-center sm:text-left sm:flex items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl">
                  Take Action: <span className="text-gradient-gold italic">Book Seva or Prasadam</span>
                </h2>
                <p className="text-sm text-amber-100/80 mt-3 max-w-xl">
                  Ensure your spiritual journey is complete. Book a special Seva for auspicious dates or order sacred Prasadam for home delivery through the official portal.
                </p>
              </div>
              <div className="mt-6 sm:mt-0 flex flex-col gap-3 shrink-0">
                <Link
                  href="/online-puja"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3.5 hover:brightness-105 transition-all"
                >
                  Book Online Puja <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/prasadam"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/30 bg-white/5 hover:bg-white/10 text-amber-300 font-bold text-sm px-7 py-3.5 transition-all"
                >
                  Order Prasadam
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