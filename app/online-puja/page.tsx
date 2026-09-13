import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Flame, ArrowRight, Sparkles, Award, Heart, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Puja & Seva Booking – Mahalaxmi Temple Kolhapur",
  description:
    "Book sacred online pujas and sevas at Shri Mahalakshmi (Ambabai) Temple Kolhapur — Kumkumarchan, Abhishek, Havan, VIP darshan and festival sevas. Prasadam delivered to your home.",
  alternates: { canonical: "/online-puja" },
  openGraph: {
    type: "website",
    title: "Online Puja & Seva Booking – Mahalaxmi Temple Kolhapur",
    description:
      "Book authentic Vedic pujas and sevas at Shri Ambabai Temple Kolhapur. Prasadam home delivery and WhatsApp video proof.",
    url: `${SITE_URL}/online-puja`,
  },
};

const pujaCategories = [
  {
    tag: "Pooja",
    description: "Sacred pujas performed by temple Vedic pujaris in your name with Gotra recitation.",
    items: [
      { slug: "s1", name: "Kumkumarchan Seva", price: "₹551", desc: "Sacred saffron & vermillion offering", popular: true },
      { slug: "s2", name: "Panchamrut Abhishek", price: "₹751", desc: "Vedic five-nectar holy bath ceremony" },
      { slug: "s3", name: "Padya Puja & Archana", price: "₹551", desc: "Traditional foot worship and 108-name archana" },
      { slug: "s4", name: "Kulachar Mahapuja", price: "₹5,001", desc: "Grand ancestral family worship" },
      { slug: "s5", name: "Sahastra Namavali Puja", price: "₹7,001", desc: "1000 holy names chanting with lotus archana" },
      { slug: "s6", name: "Shreesukta & Navachandi Havan", price: "₹11,001", desc: "Sacred fire ritual for prosperity" },
    ],
  },
  {
    tag: "Chadhava (Offerings)",
    description: "Traditional offerings of cloth, crown, coconut and flowers upon the Goddess.",
    items: [
      { slug: "c1", name: "Regular Otee Offering", price: "₹251", desc: "Blouse piece, coconut & saffron" },
      { slug: "c2", name: "Silk Saree Otee", price: "₹1,100", desc: "Pure silk saree draped on Goddess" },
      { slug: "c3", name: "Silver Chhatra Arpan", price: "₹2,500", desc: "Consecrated silver offering" },
    ],
  },
  {
    tag: "Naivedya (Food Offerings)",
    description: "Sacred bhog and bhojan sevas — from Puranpoli to Brahman Bhojan.",
    items: [
      { slug: "n1", name: "Puranpoli Naivedya Bhog", price: "₹351", desc: "Kolhapuri mahabhog at noon Aarti" },
      { slug: "n2", name: "Brahman Bhojan Seva", price: "₹1,001", desc: "Meal for 5 Vedic priests in your name" },
      { slug: "n3", name: "Suwasini & Kumarika Bhojan", price: "₹751", desc: "Sacred food for girls & mothers" },
    ],
  },
  {
    tag: "Other Sevas",
    description: "Annadan, Gou Seva and Deepam — serve every living being at the temple.",
    items: [
      { slug: "o1", name: "Annadan Mahaseva", price: "₹501", desc: "Feed pilgrims visiting the temple" },
      { slug: "o2", name: "Goushala Gou Seva", price: "₹301", desc: "Cow fodder & medical care" },
      { slug: "o3", name: "Sahastra Deepam Lighting", price: "₹201", desc: "Light 11 oil lamps during Sandhya Aarti" },
    ],
  },
];

const festivalSevas = [
  { slug: "e1", name: "Kirnotsav Sun-Ray Special Puja", price: "₹2,100", desc: "Archana during the sun-ray miracle", period: "Jan & Nov" },
  { slug: "e2", name: "Sharadiya Navratri 9-Day Seva", price: "₹3,100", desc: "Complete 9-day Navratri archana", period: "Sep – Oct" },
  { slug: "e3", name: "Chaitra Rathotsav Chariot Seva", price: "₹5,100", desc: "Garland & lamp offering during chariot yatra", period: "April" },
];

export default function OnlinePujaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Online Puja and Seva at Mahalaxmi Temple Kolhapur",
    description:
      "Authentic Vedic pujas and sevas at Shri Ambabai Mahalaxmi Temple Kolhapur. Book Kumkumarchan, Abhishek, Havan, festival sevas and VIP darshan online.",
    url: `${SITE_URL}/online-puja`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Online Puja"
          badge="Vedic Seva · Prasadam at Home"
          title="Online Puja &"
          titleGold="Seva Booking"
          description="Reserve sacred Vedic pujas and sevas at Shri Ambabai Mahalaxmi Temple Kolhapur. WhatsApp video proof and consecrated prasadam delivered to your home."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          <section className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-amber-200/70 bg-white p-5 text-center shadow-sm">
              <Shield className="mx-auto size-6 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-2">100% Authentic Seva</h3>
              <p className="text-xs text-stone-600 mt-1">Conducted by head Vedic temple pujaris</p>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-white p-5 text-center shadow-sm">
              <Sparkles className="mx-auto size-6 text-emerald-600" />
              <h3 className="font-serif text-lg font-bold mt-2">WhatsApp Proof</h3>
              <p className="text-xs text-stone-600 mt-1">Photos and video sent to your number</p>
            </div>
            <div className="rounded-2xl border border-amber-200/70 bg-white p-5 text-center shadow-sm">
              <Award className="mx-auto size-6 text-amber-800" />
              <h3 className="font-serif text-lg font-bold mt-2">Prasadam Delivery</h3>
              <p className="text-xs text-stone-600 mt-1">Consecrated prasadam shipped to your door</p>
            </div>
          </section>

          {pujaCategories.map((cat) => (
            <section key={cat.tag}>
              <h2 className="font-serif text-2xl sm:text-3xl text-amber-950">
                {cat.tag}
              </h2>
              <p className="text-sm text-stone-600 mt-1">{cat.description}</p>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                {cat.items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/puja/${p.slug}`}
                    className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-bold text-stone-900">{p.name}</h3>
                          {p.popular && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{p.desc}</p>
                      </div>
                      <div className="text-sm font-bold text-amber-800 whitespace-nowrap">{p.price}</div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:text-amber-950">
                      View details & book <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-3xl border border-amber-200/70 bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-950 text-center">
              Festival & Utsav Special Sevas
            </h2>
            <p className="text-center text-sm text-stone-600 mt-2 max-w-2xl mx-auto">
              These sevas are performed only on auspicious festival days at the temple.
              Book in advance to secure your family's participation in these rare rituals.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {festivalSevas.map((f) => (
                <Link
                  key={f.slug}
                  href={`/puja/${f.slug}`}
                  className="group rounded-2xl bg-gradient-to-br from-[#2A0C14] to-[#1F070E] text-white p-6 border border-amber-600/20 hover:border-amber-400/40 transition-all"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
                    {f.period}
                  </div>
                  <h3 className="font-serif text-lg mt-2 font-bold">{f.name}</h3>
                  <p className="text-xs text-white/70 mt-1">{f.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--gold)]">{f.price}</span>
                    <ArrowRight className="size-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-amber-50/60 border border-amber-200/70 p-8 text-center space-y-3">
            <Heart className="mx-auto size-6 text-amber-800" />
            <h2 className="font-serif text-2xl text-amber-950">
              Prasad Will Reach Your Door
            </h2>
            <p className="text-sm text-stone-700 max-w-xl mx-auto">
              Every booking includes consecrated prasadam — packed with love and delivered
              safely to your home anywhere in India via courier.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}