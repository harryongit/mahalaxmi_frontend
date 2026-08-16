"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Star,
  ArrowRight,
  Heart,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Image as ImageIcon,
  Award,
} from "lucide-react";

// Puja Details Master Dataset
const pujaDatabase: Record<
  string,
  {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    time: string;
    deity: string;
    image: string;
    description: string;
    benefits: { title: string; desc: string }[];
    process: { step: number; title: string; desc: string }[];
    gallery: string[];
    reviews: { name: string; location: string; rating: number; text: string; date: string }[];
    faqs: { q: string; a: string }[];
  }
> = {
  s1: {
    id: "s1",
    title: "Kumkumarchan Seva",
    subtitle: "Sacred Saffron & Vermillion Offering",
    price: 551,
    time: "Daily • 07:00 AM & 05:00 PM",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1000",
    description:
      "Kumkumarchan is an auspicious ritual where 108 or 1000 holy names of Divine Mother Mahalaxmi are recited continuously while offering pure saffron-blessed vermillion powder to Her divine lotus feet.",
    benefits: [
      {
        title: "Family Health & Well-being",
        desc: "Bestows divine immunity, mental peace, and protection from negative energies.",
      },
      {
        title: "Financial Abundance",
        desc: "Attracts prosperous growth in trade, business, and family wealth.",
      },
      {
        title: "Marital Harmony",
        desc: "Strengthens marital bonds and brings long life and prosperity to spouses.",
      },
      {
        title: "Spiritual Elevation",
        desc: "Purifies karmic impurities and deepens devotional connection to Divine Mother.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Gotra & Name Sankalpa",
        desc: "Vedic Pandits initiate the ritual by taking your name, gotra, and family intention.",
      },
      {
        step: 2,
        title: "Continuous Kumkum Archana",
        desc: "Recitation of Lalita Sahasranama with continuous vermillion flower offering.",
      },
      {
        step: 3,
        title: "Maha Aarti & Bhog Offering",
        desc: "Grand camphor aarti and offering of fresh coconut, jaggery, and flowers.",
      },
      {
        step: 4,
        title: "Prasadam & Video Dispatch",
        desc: "Consecrated Kumkum prasadam is dispatched to your home address, and video proof is sent on WhatsApp.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
      "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
      "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800",
    ],
    reviews: [
      {
        name: "Sunita Kulkarni",
        location: "Pune",
        rating: 5,
        text: "The Kumkumarchan seva was conducted so reverently! I received WhatsApp video of Panditji chanting my Gotra and the Kumkum prasadam arrived in 3 days.",
        date: "12 Aug 2026",
      },
      {
        name: "Rajesh Shinde",
        location: "Mumbai",
        rating: 5,
        text: "Very authentic and blissful experience. Highly recommend booking online if you cannot visit Kolhapur in person.",
        date: "05 Aug 2026",
      },
    ],
    faqs: [
      {
        q: "Will my Gotra be recited during the Kumkumarchan Puja?",
        a: "Yes, Panditji recites your full name and Gotra during the initial Sankalpa ceremony before beginning the Archana.",
      },
      {
        q: "How will I receive the Puja photos and videos?",
        a: "Puja videos and photographs taken during the ritual will be dispatched directly to your registered WhatsApp number.",
      },
      {
        q: "How is the consecrated Prasadam delivered?",
        a: "Blessed Kumkum, dry prasadam, and holy threads are securely packed in a sacred box and delivered via courier to your door.",
      },
    ],
  },
  s2: {
    id: "s2",
    title: "Panchamrut Abhishek",
    subtitle: "Vedic Holy Bath Ceremony",
    price: 751,
    time: "Daily • 06:00 AM & 08:30 AM",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=1000",
    description:
      "Panchamrut Abhishek is an ancient Vedic ritual of bathing the sacred deity idol with five holy nectars: cow milk, curd, pure honey, cow ghee, and sugar, accompanied by Shreesukta Vedic chanting.",
    benefits: [
      {
        title: "Removal of Obstacles",
        desc: "Clears spiritual blockages and bestows smooth success in endeavors.",
      },
      {
        title: "Physical Energy & Longevity",
        desc: "The five sacred elements energize bodily health and vitality.",
      },
      {
        title: "Wealth & Prosperity",
        desc: "Shreesukta mantras invoke permanent grace of Goddess Mahalaxmi.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Sankalp & Mantra Avahan",
        desc: "Panditji takes devotee Gotra and invokes divine presence.",
      },
      {
        step: 2,
        title: "Five Nectars Abhishek Bath",
        desc: "Ritual pouring of milk, curd, honey, ghee and sugar while chanting Shreesukta.",
      },
      {
        step: 3,
        title: "Fresh Alankar & Aarti",
        desc: "Draping deity in fresh silks and performing Maha Aarti.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
    ],
    reviews: [
      {
        name: "Vikram Patil",
        location: "Kolhapur",
        rating: 5,
        text: "The Panchamrut Abhishek is performed with utter purity. Felt immensely blessed.",
        date: "01 Aug 2026",
      },
    ],
    faqs: [
      {
        q: "What time is Panchamrut Abhishek conducted?",
        a: "Daily in the morning hours between 06:00 AM and 08:30 AM during morning Mangala Aarti.",
      },
    ],
  },
};

// Fallback for remaining puja IDs (s3, s4, s5, s6)
const getPujaData = (id: string) => {
  if (pujaDatabase[id]) return pujaDatabase[id];
  return {
    ...pujaDatabase["s1"],
    id,
    title: id === "s3" ? "Padya Puja & Archana" : id === "s4" ? "Kulachar Mahapuja" : id === "s5" ? "Sahastra Namavali" : "Shreesukta Yajna Havan",
    price: id === "s4" ? 5001 : id === "s5" ? 7001 : id === "s6" ? 11001 : 551,
  };
};

export default function PujaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const pujaId = (params?.id as string) || "s1";
  const puja = getPujaData(pujaId);

  // Tabs state: 'overview' | 'benefits' | 'process' | 'gallery' | 'reviews' | 'faqs'
  const [activeTab, setActiveTab] = useState<
    "overview" | "benefits" | "process" | "gallery" | "reviews" | "faqs"
  >("overview");

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "benefits", label: "Benefits", icon: Heart },
    { id: "process", label: "Process", icon: Sparkles },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
  ] as const;

  const handleBookNow = () => {
    router.push(`/checkout?puja=${puja.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb={`Puja Details / ${puja.title}`}
        badge="Sacred Ritual Seva"
        title={puja.title}
        titleGold="Details & Booking"
        description={puja.subtitle}
      />

      <main className="flex-1 py-10 px-4">
        <div className="container-temple max-w-6xl mx-auto space-y-8">
          
          {/* Top Hero Overview Banner */}
          <div className="rounded-3xl border border-amber-200/90 bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-center gap-8">
            <img
              src={puja.image}
              alt={puja.title}
              className="w-full lg:w-96 h-64 sm:h-72 rounded-2xl object-cover shrink-0 border border-amber-200 shadow-md"
            />

            <div className="space-y-4 flex-1 text-center lg:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  {puja.deity}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
                  {puja.title}
                </h1>
                <p className="text-sm font-semibold text-amber-800">{puja.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {puja.description}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold pt-2">
                <div className="bg-stone-100 border border-stone-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-stone-700">
                  <Clock className="size-4 text-amber-800" />
                  <span>{puja.time}</span>
                </div>
                <div className="bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-xl text-amber-950 font-bold text-sm">
                  Dakshina: ₹{puja.price}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={handleBookNow}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="size-4 text-[var(--gold)]" />
                  <span>Book {puja.title} Now</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Header Bar */}
          <div className="flex overflow-x-auto border-b border-stone-200 pb-2 gap-2 scrollbar-thin">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`shrink-0 px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    active
                      ? "bg-amber-900 text-white border-amber-900 shadow-md"
                      : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-900"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="space-y-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Spiritual Significance of {puja.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Performing {puja.title} at Goddess Ambabai Mahalaxmi Temple invokes divine grace, wealth, and mental tranquility. Panditjis chant traditional Vedic mantras and recite your Gotra and family member names during the ritual.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <ShieldCheck className="size-6 text-amber-800 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-stone-900">100% Authentic Seva</h4>
                      <p className="text-xs text-stone-600 mt-1">Conducted by head temple Vedic pujaris.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <MessageCircle className="size-6 text-emerald-600 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-stone-900">WhatsApp Proof</h4>
                      <p className="text-xs text-stone-600 mt-1">Photos and video updates sent to WhatsApp.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <Award className="size-6 text-amber-800 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-stone-900">Prasadam Courier</h4>
                      <p className="text-xs text-stone-600 mt-1">Blessed prasadam shipped directly home.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BENEFITS TAB */}
            {activeTab === "benefits" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {puja.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-amber-200/90 bg-white p-6 space-y-2 shadow-sm"
                  >
                    <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm border border-amber-300">
                      0{i + 1}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">{b.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* PROCESS TAB */}
            {activeTab === "process" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {puja.process.map((p) => (
                  <div
                    key={p.step}
                    className="rounded-3xl border border-stone-200 bg-white p-6 flex items-start gap-5 shadow-sm"
                  >
                    <div className="size-12 rounded-2xl bg-[#3C0F1A] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 border border-amber-400">
                      {p.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-stone-900">{p.title}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* GALLERY TAB */}
            {activeTab === "gallery" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {puja.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all h-60"
                  >
                    <img src={img} alt="Puja Gallery" className="size-full object-cover" />
                  </div>
                ))}
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {puja.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-stone-200 bg-white p-6 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">{r.name}</h4>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {r.location} • {r.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(r.rating)].map((_, idx) => (
                          <Star key={idx} className="size-4 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 italic leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* FAQS TAB */}
            {activeTab === "faqs" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {puja.faqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full p-5 text-left flex items-center justify-between font-serif text-base font-bold text-stone-900 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`size-5 text-amber-800 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}

          </div>

          {/* Bottom Sticky CTA Bar */}
          <div className="p-6 rounded-3xl bg-[#3C0F1A] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-[10px] text-amber-200 uppercase tracking-wider block font-semibold">
                Perform Divine Seva
              </span>
              <h3 className="font-serif text-2xl font-bold text-[var(--gold)]">
                {puja.title} — ₹{puja.price}
              </h3>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-900 font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="size-4" />
              <span>Book Seva Now</span>
              <ArrowRight className="size-4" />
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
