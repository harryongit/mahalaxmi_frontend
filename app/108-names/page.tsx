import type { Metadata } from "next";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Sparkles, ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "108 Names of Devi | Ashtottara Shatanamavali",
  description:
    "Read and chant the 108 sacred names of the Divine Mother (Devi Ashtottara Shatanamavali). Experience spiritual bliss and devotion.",
  alternates: { canonical: "/108-names" },
  openGraph: {
    type: "website",
    title: "108 Names of Devi - Mahalaxmi Temple",
    description: "The sacred Namavali of the Divine Mother.",
    url: `${SITE_URL}/108-names`,
  },
};

const names = [
  { sanskrit: "ॐ श्रियै नमः", transliteration: "Om Shriyei Namaha", meaning: "Salutations to the Auspicious One" },
  { sanskrit: "ॐ उमायै नमः", transliteration: "Om Umayei Namaha", meaning: "Salutations to Goddess Uma (Parvati)" },
  { sanskrit: "ॐ भारत्यै नमः", transliteration: "Om Bharatyei Namaha", meaning: "Salutations to the Goddess of Speech" },
  { sanskrit: "ॐ भद्रायै नमः", transliteration: "Om Bhadrayei Namaha", meaning: "Salutations to the Gentle One" },
  { sanskrit: "ॐ भवान्यै नमः", transliteration: "Om Bhavanyei Namaha", meaning: "Salutations to the Creator of the Universe" },
  { sanskrit: "ॐ विजयायै नमः", transliteration: "Om Vijayayei Namaha", meaning: "Salutations to the Victorious One" },
  { sanskrit: "ॐ जयायै नमः", transliteration: "Om Jayayei Namaha", meaning: "Salutations to the Triumphant One" },
  { sanskrit: "ॐ वाण्यै नमः", transliteration: "Om Vanyei Namaha", meaning: "Salutations to the Goddess of Eloquence" },
  { sanskrit: "ॐ सर्वगतायै नमः", transliteration: "Om Sarvagatayei Namaha", meaning: "Salutations to the Omnipresent One" },
  { sanskrit: "ॐ गौर्यै नमः", transliteration: "Om Gauryei Namaha", meaning: "Salutations to the Fair Complexioned One" },
  { sanskrit: "ॐ वाराह्यै नमः", transliteration: "Om Varahyei Namaha", meaning: "Salutations to the Boar-Faced Goddess" },
  { sanskrit: "ॐ कमलप्रियायै नमः", transliteration: "Om Kamala Priyayei Namaha", meaning: "Salutations to the One who loves lotuses" },
  { sanskrit: "ॐ सरस्वत्यै नमः", transliteration: "Om Saraswatyei Namaha", meaning: "Salutations to the Goddess of Knowledge" },
  { sanskrit: "ॐ कमलायै नमः", transliteration: "Om Kamalayei Namaha", meaning: "Salutations to the Lotus-born" },
  { sanskrit: "ॐ मायायै नमः", transliteration: "Om Mayayei Namaha", meaning: "Salutations to the Goddess of Illusion" },
  { sanskrit: "ॐ मातङ्ग्यै नमः", transliteration: "Om Matangyei Namaha", meaning: "Salutations to Goddess Matangi" },
  { sanskrit: "ॐ अपर्णायै नमः", transliteration: "Om Aparnayei Namaha", meaning: "Salutations to the One who performed penance without even leaves" },
  { sanskrit: "ॐ चण्डिकायै नमः", transliteration: "Om Chandikayei Namaha", meaning: "Salutations to the Fierce Goddess" },
  { sanskrit: "ॐ शिवाख्यायै नमः", transliteration: "Om Shivakhyayei Namaha", meaning: "Salutations to the Consort of Shiva" },
  { sanskrit: "ॐ महालक्ष्म्यै नमः", transliteration: "Om Mahalakshmyei Namaha", meaning: "Salutations to the Great Goddess Lakshmi" },
  // Note: Full 108 names can be populated here following this pattern
];

export default function NamavaliPage() {
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "108 Names of Devi",
    itemListElement: names.map((name, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Thing",
        name: name.transliteration,
        description: name.meaning,
      },
    })),
  };

  return (
    <>
      <JsonLd data={schemaList} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Spiritual Chants"
          badge="Namavali"
          title="108 Names of"
          titleGold="Divine Mother"
          description="The Ashtottara Shatanamavali is a garland of 108 sacred names. Chanting them purifies the mind and brings inner peace."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          
          <section className="text-center max-w-2xl mx-auto">
            <ScrollText className="mx-auto size-8 text-amber-800 mb-3" />
            <h2 className="font-serif text-3xl text-amber-950">Devi Ashtottara Shatanamavali</h2>
            <p className="text-sm text-stone-700 mt-2">
              Offer a flower or a grain of rice mentally or physically as you chant each of these 108 holy names of the Mother Goddess.
            </p>
          </section>

          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {names.map((name, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200/50 hover:border-amber-400 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-[0.05] transition-opacity">
                  <Sparkles className="size-16" />
                </div>
                
                <div className="text-sm font-bold text-amber-700/50 mb-2">{(i + 1).toString().padStart(3, '0')}</div>
                
                <h3 className="text-2xl font-medium text-amber-950 mb-1">{name.sanskrit}</h3>
                <p className="font-bold text-sm text-stone-800 mb-3">{name.transliteration}</p>
                
                <div className="h-px w-8 bg-amber-200 mb-3"></div>
                <p className="text-xs text-stone-600 leading-relaxed">{name.meaning}</p>
              </div>
            ))}
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
