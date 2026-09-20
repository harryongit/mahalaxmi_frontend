import type { Metadata } from "next";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Sacred Mantras of the Divine Mother | Devi Mandir",
  description:
    "Explore powerful mantras for daily chanting including Durga Bija Mantra, Chandi Gayatri Mantra, Annapurna Mantra, and more. Find the meaning and pronunciation.",
  alternates: { canonical: "/mantras" },
  openGraph: {
    type: "website",
    title: "Sacred Mantras of Devi - Mahalaxmi Temple",
    description: "Daily chanting mantras of the Divine Mother.",
    url: `${SITE_URL}/mantras`,
  },
};

const mantras = [
  {
    title: "Durga Bija Mantra",
    sanskrit: "ॐ दुं दुर्गायै नमः",
    transliteration: "Om Dum Durgayei Namaha",
    meaning: "Om and Salutations to that feminine energy which protects from all manner of negative influences.",
  },
  {
    title: "Durga Gayatri Mantra",
    sanskrit: "ॐ गिरिजायै विद्महे शिवप्रियायै धीमहि तन्नो दुर्गा प्रचोदयात्",
    transliteration: "Om Girijayei Vidmahe Shiva Priyayei Dheemahi Tanno Durga Prachodayat",
    meaning: "Om, Let us meditate on the daughter of the mountain, the beloved of Shiva. May that Durga inspire and illuminate our mind.",
  },
  {
    title: "Chandi Bija Mantra",
    sanskrit: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
    transliteration: "Om Aim Hreem Kleem Chamundayai Vicche",
    meaning: "Om, to the goddess who is the union of creation, preservation, and destruction, I bow to thee.",
  },
  {
    title: "Annapurna Gayatri Mantra",
    sanskrit: "ॐ भगवत्यै विद्महे माहेश्वर्यै धीमहि तन्नो अन्नपूर्णा प्रचोदयात्",
    transliteration: "Om Bhagavatyei Vidmahe Maheshwaryei Dheemahi Tanno Annapurna Prachodayat",
    meaning: "Om, Let us meditate on the Supreme Goddess, the great Queen. May that Annapurna inspire and illuminate our mind with nourishment.",
  },
  {
    title: "Ganapati Mula Mantra",
    sanskrit: "ॐ गं गणपतये नमः",
    transliteration: "Om Gam Ganapataye Namaha",
    meaning: "Om and Salutations to the Lord of the Ganas (Lord Ganesha).",
  },
  {
    title: "Mahalaxmi Gayatri Mantra",
    sanskrit: "ॐ महालक्ष्म्यै विद्महे विष्णुपत्नी च धीमहि तन्नो लक्ष्मी प्रचोदयात्",
    transliteration: "Om Mahalakshmyai Vidmahe Vishnu Patni Cha Dheemahi Tanno Lakshmi Prachodayat",
    meaning: "Om, Let us meditate on the Great Goddess Lakshmi, the consort of Lord Vishnu. May that Goddess Lakshmi inspire and illuminate our mind.",
  }
];

export default function MantrasPage() {
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sacred Mantras of the Divine Mother",
    itemListElement: mantras.map((mantra, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "CreativeWork",
        name: mantra.title,
        text: mantra.sanskrit,
        abstract: mantra.meaning,
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
          badge="Daily Devotion"
          title="Sacred Mantras of"
          titleGold="Divine Mother"
          description="Chant these powerful mantras daily to invoke peace, prosperity, and spiritual awakening."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          
          <section className="text-center max-w-2xl mx-auto">
            <BookOpen className="mx-auto size-8 text-amber-800 mb-3" />
            <h2 className="font-serif text-3xl text-amber-950">Chanting for the Soul</h2>
            <p className="text-sm text-stone-700 mt-2">
              Mantras are sacred sound vibrations that protect the mind from negativity. 
              Find a quiet place, sit comfortably, and chant these mantras with pure devotion.
            </p>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            {mantras.map((mantra, i) => (
              <div 
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/50 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                  <Sparkles className="size-24" />
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-amber-950 mb-4">{mantra.title}</h3>
                
                <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100 mb-4">
                  <p className="text-xl sm:text-2xl text-center text-amber-900 font-medium tracking-wide">
                    {mantra.sanskrit}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pronunciation</span>
                    <p className="text-sm font-medium text-stone-800 mt-0.5">{mantra.transliteration}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Meaning</span>
                    <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">{mantra.meaning}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
