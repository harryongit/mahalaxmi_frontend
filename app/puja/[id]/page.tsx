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

import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/src/lib/api";

export default function PujaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const pujaId = (params?.id as string) || "s1";

  const { data: puja, isLoading } = useQuery({
    queryKey: ["service", pujaId],
    queryFn: () => serviceApi.getService(pujaId),
  });

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
    if (puja) {
      router.push(`/checkout?puja=${puja.slug || puja.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900 justify-center items-center">
        <Navbar />
        <div className="py-20">Loading puja details...</div>
        <Footer />
      </div>
    );
  }

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900 justify-center items-center">
        <Navbar />
        <div className="py-20">Puja not found.</div>
        <Footer />
      </div>
    );
  }

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
                {puja.benefits?.map((b: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-amber-200/90 bg-white p-6 space-y-2 shadow-sm"
                  >
                    <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm border border-amber-300">
                      0{i + 1}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">{b.title || b.name || "Benefit"}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{b.desc || b.description || ""}</p>
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
                {puja.process?.map((p: any, i: number) => (
                  <div
                    key={p.step || i}
                    className="rounded-3xl border border-stone-200 bg-white p-6 flex items-start gap-5 shadow-sm"
                  >
                    <div className="size-12 rounded-2xl bg-[#3C0F1A] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 border border-amber-400">
                      {p.step || i + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-stone-900">{p.title || p.name || "Step"}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">{p.desc || p.description || ""}</p>
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
                {puja.gallery?.map((img: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all h-60"
                  >
                    <img src={typeof img === 'string' ? img : img.url} alt="Puja Gallery" className="size-full object-cover" />
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
                {puja.reviews?.map((r: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-stone-200 bg-white p-6 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">{r.name || "Devotee"}</h4>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {r.location || "India"} • {r.date || "Recently"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(r.rating || 5)].map((_, idx) => (
                          <Star key={idx} className="size-4 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 italic leading-relaxed">"{r.text || r.review || "Wonderful experience."}"</p>
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
                {puja.faqs?.map((faq: any, i: number) => {
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
                        <span>{faq.q || faq.question}</span>
                        <ChevronDown
                          className={`size-5 text-amber-800 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                          {faq.a || faq.answer}
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
