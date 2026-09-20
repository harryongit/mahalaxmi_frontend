import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Bed, Home, Hotel, Coffee, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hotels Near Mahalaxmi Ambabai Temple Kolhapur | Bhakta Niwas",
  description:
    "Find the best accommodation and hotels near Mahalaxmi Ambabai Temple Kolhapur. Book temple Bhakta Niwas, budget dharamshalas, and premium hotels under 1000/2000.",
  alternates: { canonical: "/accommodation" },
  openGraph: {
    type: "website",
    title: "Hotels & Accommodation near Mahalaxmi Temple Kolhapur",
    description:
      "A complete guide to Bhakta Niwas, Dharamshalas, and hotels near Karveer Nivasini Ambabai Temple.",
    url: `${SITE_URL}/accommodation`,
  },
};

const stays = [
  {
    icon: Home,
    title: "Temple Bhakta Niwas",
    desc: "The official Yatri Niwas (pilgrim accommodation) managed by the Devasthan Committee. It offers basic, clean, and highly affordable rooms for devotees.",
    price: "₹300 - ₹800",
    distance: "Walking distance",
  },
  {
    icon: Bed,
    title: "Budget Dharamshalas & Lodges",
    desc: "Several charitable Dharamshalas (including Jain Dharamshalas) are located within the temple vicinity, ideal for large families.",
    price: "Under ₹1000",
    distance: "5-10 min walk",
  },
  {
    icon: Hotel,
    title: "Mid-Range Hotels",
    desc: "Comfortable AC/Non-AC hotels near Mahalaxmi Temple Kolhapur under 2000. Perfect for families looking for modern amenities.",
    price: "₹1000 - ₹2500",
    distance: "1-2 km radius",
  },
  {
    icon: Coffee,
    title: "Premium & Heritage Stays",
    desc: "Experience Kolhapur's royal hospitality. Premium hotels offer fine dining, valet parking, and easy access to both the temple and Rankala Lake.",
    price: "₹3000+",
    distance: "2-4 km radius",
  },
];

export default function AccommodationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are there hotels near Mahalaxmi Ambabai Temple Kolhapur under 1000?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, there are many lodges, dharamshalas, and budget hotels near the temple offering rooms under ₹1000 per night.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book the Mahalaxmi Temple Kolhapur Bhakta Niwas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bhakta Niwas can often be booked upon arrival at the Devasthan Committee office, though advance booking is recommended during Navratri and festivals.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Accommodation"
          badge="Where to Stay"
          title="Hotels & Bhakta Niwas near"
          titleGold="Ambabai Temple"
          description="From affordable Dharamshalas and the official Temple Bhakta Niwas to premium hotels, find the perfect stay near Mahalaxmi Temple Kolhapur."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-amber-950">Stay Near the Goddess</h2>
            <p className="text-sm text-stone-700">
              Kolhapur offers a wide range of accommodation options. Staying close to the temple 
              allows you to easily attend the early morning Kakad Aarti (5:00 AM) or the evening Shej Aarti without travel hassle.
            </p>
          </section>

          <section>
            <div className="grid sm:grid-cols-2 gap-5">
              {stays.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 place-items-center rounded-2xl bg-[#3C0F1A] text-amber-100 shrink-0">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-stone-900">{s.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs font-bold text-amber-800">
                          <span>{s.price}</span>
                          <span className="text-stone-300">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" /> {s.distance}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-3 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white p-8 sm:p-10 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl">Need Help Planning Your Visit?</h2>
            <p className="text-sm text-amber-100/80 mt-3 max-w-xl mx-auto">
              Make sure to check the temple darshan timings before booking your accommodation to ensure you don't miss the major aartis.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/darshan-timings"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm px-7 py-3 hover:brightness-105 transition-all"
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
