"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { AboutHeroCanvas } from "@/src/components/temple/AboutHeroCanvas";
import { IMG } from "@/src/components/temple/images";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* 1. Immersive Temple Hero */}
      <AboutHeroCanvas />

      {/* 2. About the Temple */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-6">
          ABOUT THE TEMPLE
        </h2>
        <p className="font-serif text-3xl sm:text-5xl leading-tight mb-12 text-amber-950">
          A sanctuary woven <br className="hidden sm:block" /> from stone, fire and song.
        </p>
        <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto text-left">
          <p>
            Shri Mahalaxmi Mandir in Kolhapur is one of the most sacred Shakti Peethas in India, dedicated to Goddess Mahalaxmi (Ambabai). Built originally during the Chalukya period in the 7th century CE, the temple has been expanded over centuries by various dynasties including the Shilahara, Yadava, and Maratha rulers.
          </p>
          <p>
            It holds immense importance in Hindu tradition, standing as an enduring symbol of spiritual devotion, cultural heritage, and incredible ancient architectural mastery. The temple remains a living, breathing space where centuries-old traditions are performed every single day without interruption.
          </p>
        </div>
      </section>

      {/* 3. Sacred Deity */}
      <section className="py-24 px-4 sm:px-6 w-full border-t border-amber-900/10 bg-amber-50/30">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-4">
              SACRED DEITY
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-amber-950 mb-6">
              Goddess Mahalaxmi <br /> (Ambabai)
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              The idol of Mahalaxmi is believed to be self-manifested (Swayambhu). Seated on a stone platform, the image of the four-armed deity is carved in black stone, holding sacred symbols in her hands. She is revered as the mother of the universe, blessing devotees with spiritual liberation and worldly prosperity alike.
            </p>
          </div>
          <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative border-4 border-white">
            <img
              src={IMG.about}
              alt="Goddess Mahalaxmi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Kirnotsav */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-6">
          KIRNOTSAV
        </h2>
        <p className="font-serif text-3xl sm:text-4xl leading-tight mb-8 text-amber-950">
          A rare alignment of <br className="hidden sm:block" /> light and devotion.
        </p>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto">
          The annual Kirnotsav (Festival of Sun Rays) is a unique architectural and astronomical phenomenon. Twice a year, in January and November, the setting sun aligns perfectly with the temple's western entrance. The golden rays travel across the mandapam, illuminating the Goddess's feet on the first day, her chest on the second, and finally resting upon her face on the third day.
        </p>
      </section>

      {/* 5. Architecture Grid */}
      <section className="py-24 px-4 sm:px-6 w-full bg-[#1A1412] text-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-4">
              ARCHITECTURE
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              A Geometry of Devotion
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 text-center">
            {[
              { id: "01", title: "Gopuram", desc: "The towering, intricately carved entrance gateway." },
              { id: "02", title: "Main Entrance", desc: "Sacred thresholds leading inward to the divine." },
              { id: "03", title: "Mandapam", desc: "The grand assembly hall supported by master-crafted pillars." },
              { id: "04", title: "Sanctum", desc: "Garbhagriha — the innermost sacred chamber." },
              { id: "05", title: "Pillars", desc: "Monolithic columns bearing ancient stories and geometry." },
              { id: "06", title: "Carvings", desc: "Centuries-old bas-reliefs of celestial dancers and deities." }
            ].map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <span className="text-sm font-mono text-amber-500/70 mb-3">{item.id}</span>
                <h4 className="font-serif text-xl text-amber-100 mb-2">{item.title}</h4>
                <div className="w-8 h-[1px] bg-amber-500/30 mb-3" />
                <p className="text-xs text-amber-50/60 max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Temple Information */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="border border-amber-900/10 p-8 sm:p-12 bg-white text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-10">
            TEMPLE INFORMATION
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900/50 mb-2">Address</div>
              <p className="text-sm font-medium text-stone-800">
                Mahalaxmi Temple, <br />
                Shivaji Chowk, Kolhapur, <br />
                Maharashtra 416012
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900/50 mb-2">Temple Timings</div>
              <p className="text-sm font-medium text-stone-800">
                5:00 AM – 9:30 PM <br />
                (Open Daily)
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-900/50 mb-2">Presiding Deity</div>
              <p className="text-sm font-medium text-stone-800">
                Goddess Mahalaxmi <br />
                (Ambabai)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Mission / Vision / Values */}
      <section className="py-24 px-4 sm:px-6 w-full bg-amber-950 text-amber-50 border-y border-amber-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-4">MISSION</h3>
            <p className="font-serif text-xl text-amber-100">
              To preserve sacred tradition with grace and openness.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-4">VISION</h3>
            <p className="font-serif text-xl text-amber-100">
              A spiritual home for every seeker, of every path.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-4">VALUES</h3>
            <p className="font-serif text-xl text-amber-100 space-y-1">
              <span className="block">Reverence.</span>
              <span className="block">Service.</span>
              <span className="block">Compassion.</span>
              <span className="block">Beauty.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 8. MahalaxmiPuja Story */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-3xl mx-auto w-full text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-6">
          OUR SACRED JOURNEY
        </h2>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-8">
          MahalaxmiPuja was born from a vision to bring authentic temple rituals closer to devotees who cannot physically visit Kolhapur. We understand that devotion knows no geographical boundaries.
        </p>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-10">
          Our platform serves as a digital bridge to the divine, ensuring that every seva, chadhava, and naivedya is offered with exact Vedic precision by the hereditary Shreepujaks of the temple, directly in your name.
        </p>
        <div className="w-16 h-[1px] bg-amber-900/20 mx-auto" />
      </section>

      {/* 9. Services & Statistics */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-20">

        {/* Services List */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-800 mb-4">
              OUR SERVICES
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl text-amber-950">
              Complete Devotional Offerings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🕉️", title: "Online Puja Booking", desc: "Book personalized pujas performed by hereditary Shreepujak." },
              { icon: "📿", title: "Chadhava / Arpan", desc: "Offer Regular Otee, Saree Otee, directly to Goddess Mahalaxmi." },
              { icon: "🍃", title: "Naivedya / Bhog", desc: "Offer Puranpoli Naivedya and sacred Bhojan in your family name." },
              { icon: "📺", title: "Online Darshan", desc: "Watch live aarti and darshan of Goddess Ambabai 24/7." },
              { icon: "🛕", title: "Offline Darshan Pass", desc: "Book VIP darshan passes for priority temple entry." },
              { icon: "🙏", title: "Annadan & Gou Seva", desc: "Contribute to sacred Annadan and Goushala Gou Seva." }
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm flex gap-4 items-start">
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <h4 className="font-serif font-bold text-amber-950 text-lg mb-1">{s.title}</h4>
                  <p className="text-xs text-stone-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Minimal Variant */}
        <div className="border-t border-amber-900/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Authentic</span>
            <span className="text-xs text-stone-500">Hereditary Shreepujak</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Trusted</span>
            <span className="text-xs text-stone-500">50,000+ Devotees</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Devoted</span>
            <span className="text-xs text-stone-500">Performed with Love</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="text-amber-700 w-6 h-6 mb-3" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-1">Fast</span>
            <span className="text-xs text-stone-500">Instant Booking</span>
          </div>
        </div>

      </section>

      {/* 10. Visit Contact Action */}
      <section className="py-24 px-4 text-center bg-amber-50">
        <h2 className="font-serif text-3xl sm:text-4xl text-amber-950 mb-6">Experience the Divine</h2>
        <Link
          href="/services"
          className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-amber-950 transition-colors"
        >
          Book a Seva
        </Link>
      </section>

      <Footer />
    </div>
  );
}
