import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Car, MapPin, Navigation, Info, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Parking Near Mahalaxmi Temple Kolhapur | Car Parking Guide",
  description:
    "Official guide for car parking near Shree Karveer Niwasini Ambabai Mahalaxmi Temple Kolhapur. Find pay-and-park locations, distances, and tips for peak festival days.",
  alternates: { canonical: "/parking" },
  openGraph: {
    type: "website",
    title: "Mahalaxmi Temple Kolhapur Parking Guide",
    description:
      "Where to park near Mahalaxmi Temple Kolhapur. Official parking grounds, private lots, and walking distances.",
    url: `${SITE_URL}/parking`,
  },
};

const parkingSpots = [
  {
    title: "Vidyapeeth High School Ground",
    type: "Official Pay & Park",
    distance: "200 meters (3 min walk)",
    capacity: "Large (Cars & Two-Wheelers)",
    desc: "The primary and most convenient parking spot managed during peak seasons. Located very close to the southern courtyard (Dakshin Darwaja).",
  },
  {
    title: "Bindu Chowk Parking",
    type: "Public Pay & Park",
    distance: "500 meters (7 min walk)",
    capacity: "Medium",
    desc: "A multi-level automated parking facility and ground parking available near Bindu Chowk. Safe and secure for outstation vehicles.",
  },
  {
    title: "Bhavani Mandap Area",
    type: "Street Parking / Designated Lots",
    distance: "300 meters (5 min walk)",
    capacity: "Limited",
    desc: "Some designated street parking is available near Bhavani Mandap, but it fills up very quickly early in the morning.",
  },
];

export default function ParkingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is there car parking near Mahalaxmi Temple Kolhapur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, designated pay-and-park facilities are available near the temple, primarily at the Vidyapeeth High School ground and Bindu Chowk.",
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
          breadcrumb="Temple Guide"
          badge="Travel & Logistics"
          title="Parking Near Mahalaxmi"
          titleGold="Temple Kolhapur"
          description="Find the most convenient and secure car parking near Shree Karveer Niwasini Ambabai Temple."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          
          <section className="bg-amber-50 border border-amber-200/60 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
            <Info className="size-6 text-amber-800 shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl font-bold text-amber-950">Important Traffic Advisory</h2>
              <p className="text-sm text-stone-700 mt-2 leading-relaxed">
                The temple is located in the heart of old Kolhapur city where streets are narrow. 
                Vehicles are restricted from entering the immediate temple perimeter (No Vehicle Zone). 
                Please use the designated parking lots mentioned below and walk the remaining short distance to the temple gates.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-center text-amber-950 mb-8">
              Designated Parking Locations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {parkingSpots.map((spot) => (
                <div
                  key={spot.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#3C0F1A] p-2.5 rounded-lg text-amber-100">
                      <Car className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                        {spot.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                        {spot.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4 border-y border-stone-100 py-3">
                    <div className="flex items-center gap-2 text-stone-700">
                      <MapPin className="size-4 text-amber-600" />
                      <strong>Distance:</strong> {spot.distance}
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <Navigation className="size-4 text-amber-600" />
                      <strong>Capacity:</strong> {spot.capacity}
                    </div>
                  </div>
                  
                  <p className="text-xs text-stone-600 leading-relaxed mt-auto">
                    {spot.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-950">
              Ready for Darshan?
            </h2>
            <p className="text-sm text-stone-600 mt-3 max-w-xl mx-auto">
              Once you have parked your car, the temple is just a short walk away. 
              Check out how to navigate the temple entries or book a VIP pass to save time.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/how-to-reach"
                className="inline-flex items-center gap-2 rounded-full border border-amber-900/20 text-amber-950 font-bold text-sm px-6 py-3 hover:bg-amber-50 transition-all"
              >
                Directions Map <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/vip-darshan"
                className="inline-flex items-center gap-2 rounded-full bg-[#3C0F1A] text-white font-bold text-sm px-6 py-3 hover:opacity-90 transition-all"
              >
                VIP Pass Details <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
