import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Map, Navigation, ArrowRight, Sun, Mountain, Landmark, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Places to Visit Near Mahalaxmi Temple Kolhapur | Jyotiba Distance",
  description:
    "Explore nearby attractions like Jyotiba Temple (21km), Rankala Lake, Panhala Fort, and New Palace. Complete guide with distances from Mahalaxmi Temple Kolhapur.",
  alternates: { canonical: "/nearby-attractions" },
  openGraph: {
    type: "website",
    title: "Nearby Places to Visit - Mahalaxmi Temple Kolhapur",
    description:
      "Distances and guides for Jyotiba Temple, Rankala Lake, and other top tourist spots in Kolhapur.",
    url: `${SITE_URL}/nearby-attractions`,
  },
};

const attractions = [
  {
    icon: Sun,
    title: "Shree Jyotiba Temple",
    distance: "21 km from Mahalaxmi Temple",
    time: "45 mins by car",
    desc: "A highly revered temple located at a height of 3124 feet on a mountain in Wadi Ratnagiri. Jyotiba is considered an incarnation of Lord Shiva, Vishnu, and Brahma. Mahalaxmi Ambabai to Jyotiba Temple distance is easily covered by private cabs and state buses.",
  },
  {
    icon: Mountain,
    title: "Rankala Lake",
    distance: "2.5 km from Mahalaxmi Temple",
    time: "10 mins by auto / 25 mins walking",
    desc: "A historic and picturesque lake built by Chhatrapati Shahu Maharaj. Enjoy the scenic promenade, sunset views, and the famous Kolhapuri Bhel at the chaupati. It's the most popular relaxation spot near the temple.",
  },
  {
    icon: Landmark,
    title: "New Palace (Shahu Museum)",
    distance: "4.5 km from Mahalaxmi Temple",
    time: "15 mins by car/auto",
    desc: "The magnificent royal residence of the Chhatrapati of Kolhapur, featuring incredible black stone architecture. The ground floor houses the fascinating Shahaji Chhatrapati Museum exhibiting weapons, royal costumes, and artifacts.",
  },
  {
    icon: Building2,
    title: "Panhala Fort",
    distance: "22 km from Mahalaxmi Temple",
    time: "50 mins by car",
    desc: "One of the most important and massive hill forts in the Deccan, closely associated with Chhatrapati Shivaji Maharaj. An excellent half-day trip featuring stunning panoramic views of the Sahyadri mountains.",
  },
  {
    icon: Building2,
    title: "Bhavani Mandap",
    distance: "500 meters from Mahalaxmi Temple",
    time: "5 mins walking",
    desc: "The old palace of Kolhapur located right adjacent to the Mahalaxmi temple complex. It houses the shrine of Goddess Tulja Bhavani and features beautiful wooden architecture and ancient canons.",
  },
];

export default function NearbyAttractionsPage() {
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Places to Visit Near Mahalaxmi Temple Kolhapur",
    itemListElement: attractions.map((attr, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "TouristAttraction",
        name: attr.title,
        description: attr.desc,
      },
    })),
  };

  return (
    <>
      <JsonLd data={schemaList} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Tourist Guide"
          badge="Kolhapur Tourism"
          title="Nearby Places"
          titleGold="to Visit"
          description="Make the most of your trip. Explore historic forts, serene lakes, and sacred shrines around Kolhapur."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section className="text-center max-w-2xl mx-auto">
            <Map className="mx-auto size-8 text-amber-800 mb-3" />
            <h2 className="font-serif text-3xl text-amber-950">Beyond the Temple</h2>
            <p className="text-sm text-stone-700 mt-2">
              Kolhapur is rich in history and nature. Once you have completed your darshan of 
              Shree Karveer Niwasini Ambabai, here are the top places you must add to your itinerary.
            </p>
          </section>

          <section>
            <div className="space-y-6">
              {attractions.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div 
                    key={a.title}
                    className="flex flex-col sm:flex-row gap-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/50 hover:shadow-md transition-shadow"
                  >
                    <div className="grid place-items-center size-16 rounded-full bg-gradient-to-br from-[#4A1521] to-[#7A2438] text-amber-200 shrink-0 shadow-inner">
                      <Icon className="size-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-bold text-stone-900">{a.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          <Navigation className="size-3" /> {a.distance}
                        </span>
                        <span className="text-xs font-medium text-stone-500">
                          {a.time}
                        </span>
                      </div>
                      <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl bg-amber-50 border border-amber-200 p-8 text-center mt-12">
            <h2 className="font-serif text-2xl text-amber-950 mb-3">Planning to stay longer?</h2>
            <p className="text-sm text-stone-700 max-w-lg mx-auto mb-6">
              Check out our guide to hotels, dharamshalas, and Bhakta Niwas options located conveniently near these tourist spots.
            </p>
            <Link
              href="/accommodation"
              className="inline-flex items-center gap-2 rounded-full bg-[#3C0F1A] text-white font-bold text-sm px-7 py-3 hover:opacity-90 transition-all"
            >
              View Accommodation Guide <ArrowRight className="size-4" />
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
