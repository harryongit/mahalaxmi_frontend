"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  Flame,
  X,
  ChevronRight,
  User,
  ArrowRight,
} from "lucide-react";
import { SectionEyebrow } from "./effects";

// Service Category Definitions matching the exact design
const SERVICE_TYPES = [
  { id: "Pooja", label: "Pooja", icon: "🕉️" },
  { id: "Chadhava", label: "Chadhava", icon: "📿" },
  { id: "Naivedya", label: "Naivedya", icon: "🍃" },
  { id: "Other", label: "Other", icon: "🙏" },
  { id: "Darshan", label: "Darshan", icon: "🛕" },
  { id: "Events", label: "Events", icon: "📅" },
];

// Complete Sevas Data across all categories
const sevasData = [
  // --- POOJA ---
  {
    id: "s1",
    category: "Pooja",
    title: "Kumkumarchan Seva",
    subtitle: "Sacred Saffron & Vermillion Offering",
    price: 551,
    time: "Daily • 07:00 AM & 05:00 PM",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
    description: "Personalized kumkum offering dedicated to Goddess Ambabai for health, prosperity, and peace.",
    tag: "Most Popular",
  },
  {
    id: "s2",
    category: "Pooja",
    title: "Panchamrut Abhishek",
    subtitle: "Vedic Holy Bath Ceremony",
    price: 751,
    time: "Daily • 06:00 AM & 08:30 AM",
    image: "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
    description: "Sacred ritual bath with milk, curd, honey, ghee and sugar accompanied by Vedic chanting.",
    tag: "High Blessing",
  },
  {
    id: "s3",
    category: "Pooja",
    title: "Padya Puja & Archana",
    subtitle: "Sacred Foot Worship",
    price: 551,
    time: "Daily • 09:00 AM",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
    description: "Traditional foot worship and flower offerings with 108 auspicious names of Goddess Mahalaxmi.",
    tag: "Daily Seva",
  },
  {
    id: "s4",
    category: "Pooja",
    title: "Kulachar Mahapuja",
    subtitle: "Grand Family Ancestral Worship",
    price: 5001,
    time: "Festive & Special Days",
    image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800",
    description: "Comprehensive ancestral family worship with complete Alankar Shringar, Naivedya, and Aarti.",
    tag: "Family Seva",
  },
  {
    id: "s5",
    category: "Pooja",
    title: "Sahastra Namavali Puja",
    subtitle: "1000 Holy Names Chanting",
    price: 7001,
    time: "Daily • 11:00 AM",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    description: "Chanting of 1000 divine names with continuous lotus and fresh flower archana.",
    tag: "Special Seva",
  },
  {
    id: "s6",
    category: "Pooja",
    title: "Shreesukta & Navachandi Havan",
    subtitle: "Sacred Yajna Fire Ritual",
    price: 11001,
    time: "Scheduled Special Days",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800",
    description: "Powerful fire ritual for financial prosperity, removal of obstacles, and spiritual growth.",
    tag: "Grand Havan",
  },

  // --- CHADHAVA ---
  {
    id: "c1",
    category: "Chadhava",
    title: "Regular Otee Offering",
    subtitle: "Blouse Piece, Coconut & Saffron",
    price: 251,
    time: "Daily • All Hours",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    description: "Traditional Otee bharana with fresh coconut, green blouse piece, rice grains, and kumkum.",
    tag: "Traditional",
  },
  {
    id: "c2",
    category: "Chadhava",
    title: "Silk Saree Otee Offering",
    subtitle: "Pure Paithani / Silk Saree Drape",
    price: 1100,
    time: "Daily Morning & Evening",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
    description: "Offering of pure silk saree draped on Goddess Mahalaxmi during daily Alankar Shringar.",
    tag: "Sacred Drape",
  },
  {
    id: "c3",
    category: "Chadhava",
    title: "Silver Chhatra (Crown) Arpan",
    subtitle: "Consecrated Silver Offering",
    price: 2500,
    time: "Festival Special Days",
    image: "https://images.unsplash.com/photo-1570042707223-933390c5240c?q=80&w=800",
    description: "Offering of consecrated silver parasol / crown to sanctify your family gotra.",
    tag: "Royal Offering",
  },

  // --- NAIVEDYA ---
  {
    id: "n1",
    category: "Naivedya",
    title: "Puranpoli Naivedya Bhog",
    subtitle: "Authentic Kolhapuri Mahabhog",
    price: 351,
    time: "Daily • 12:00 PM Afternoon",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800",
    description: "Freshly prepared Puranpoli Naivedya with pure cow ghee offered at noon Aarti.",
    tag: "Fresh Bhog",
  },
  {
    id: "n2",
    category: "Naivedya",
    title: "Brahman Bhojan Seva",
    subtitle: "Meal Served to 5 Priests",
    price: 1001,
    time: "Daily • 01:00 PM",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
    description: "Sponsor complete Vedic meals for 5 hereditary Shreepujaks in your family name.",
    tag: "Punya Seva",
  },
  {
    id: "n3",
    category: "Naivedya",
    title: "Suwasini & Kumarika Bhojan",
    subtitle: "Sacred Food for Girls & Mothers",
    price: 751,
    time: "Navratri & Festive Days",
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=800",
    description: "Sacred meal and gift offering for married women and young girls during auspicious days.",
    tag: "Mother Blessing",
  },

  // --- OTHER ---
  {
    id: "o1",
    category: "Other",
    title: "Annadan Mahaseva",
    subtitle: "Free Meal Distribution for Pilgrims",
    price: 501,
    time: "Daily • 11:30 AM – 03:00 PM",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
    description: "Feed hungry pilgrims and devotees visiting Shri Mahalaxmi Mandir.",
    tag: "Annadan",
  },
  {
    id: "o2",
    category: "Other",
    title: "Goushala Gou Seva",
    subtitle: "Cow Fodder & Medical Care",
    price: 301,
    time: "Daily Goushala Service",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800",
    description: "Sponsor nutritious green fodder, jaggery, and health care for cows in the temple Goushala.",
    tag: "Gou Seva",
  },
  {
    id: "o3",
    category: "Other",
    title: "Sahastra Deepam Lighting",
    subtitle: "11 Oil Lamps Lighting",
    price: 201,
    time: "Daily • Evening Sandhya Aarti",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    description: "Light 11 earthen oil lamps in front of the inner sanctum during Sandhya Aarti.",
    tag: "Deepam",
  },

  // --- DARSHAN ---
  {
    id: "d1",
    category: "Darshan",
    title: "VIP Priority Darshan Pass",
    subtitle: "Skip Queue Priority Mandir Entry",
    price: 200,
    time: "Daily • All Opening Hours",
    image: "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
    description: "Priority entry pass for quick and peaceful darshan of Goddess Ambabai without long waiting queues.",
    tag: "VIP Pass",
  },
  {
    id: "d2",
    category: "Darshan",
    title: "Senior Citizen & Infant Entry Pass",
    subtitle: "Assisted Special Line Access",
    price: 100,
    time: "Daily • All Hours",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
    description: "Special assisted queue access for elderly devotees, pregnant women, and infants.",
    tag: "Assisted Entry",
  },

  // --- EVENTS ---
  {
    id: "e1",
    category: "Events",
    title: "Kirnotsav Sun-Ray Special Puja",
    subtitle: "Bi-Annual Sun Ray Miracle Seva",
    price: 2100,
    time: "Jan 31–Feb 02 & Nov 09–11",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
    description: "Special Archana during Kirnotsav when setting sun rays fall directly on Goddess Ambabai's idol.",
    tag: "Kirnotsav Special",
  },
  {
    id: "e2",
    category: "Events",
    title: "Sharadiya Navratri 9-Day Seva",
    subtitle: "Full 9 Nights Festival Sankalpa",
    price: 3100,
    time: "Sep 22 – Oct 02, 2026",
    image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800",
    description: "Complete 9 days Navratri Archana in your family name with Lalita Panchami Gaja-Shringar.",
    tag: "Navratri Pass",
  },
  {
    id: "e3",
    category: "Events",
    title: "Chaitra Rathotsav Chariot Seva",
    subtitle: "Annual Golden Chariot Procession",
    price: 5100,
    time: "Chaitra Purnima (April)",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800",
    description: "Sponsor garland and lamp offerings during the annual golden chariot yatra through Kolhapur.",
    tag: "Rathotsav Yatra",
  },
];

export function BookingWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Pooja");
  const [selectedPuja, setSelectedPuja] = useState<typeof sevasData[0] | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const filteredSevas = sevasData.filter((s) => s.category === activeTab);

  const handleSelectPujaCard = (seva: typeof sevasData[0]) => {
    setSelectedPuja(seva);
  };

  const handleProceedToCheckoutPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || mobile.length < 10 || !selectedPuja) return;
    router.push(
      `/checkout?puja=${selectedPuja.id}&name=${encodeURIComponent(name)}&mobile=${mobile}`
    );
  };

  return (
    <section id="book-puja" className="relative py-12 md:py-16 bg-[#FCF9F3] text-stone-900 border-t border-amber-200/80">
      <div className="container-temple max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <SectionEyebrow>Fast Online Booking</SectionEyebrow>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.05] text-stone-900">
            Book Your Sacred <span className="text-gradient-gold">Puja & Seva</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-normal">
            Select your preferred service category below to view available offerings.
          </p>
        </div>

        {/* SLEEK, COMPACT SERVICE TYPES TAB BAR */}
        <div className="flex justify-center overflow-x-auto pb-1.5 scrollbar-none">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-[#F4EFE6] border border-amber-200/90 shadow-sm">
            {SERVICE_TYPES.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#3C0F1A] text-white shadow-sm border border-amber-400/30"
                      : "text-stone-700 hover:text-amber-950 hover:bg-white/60"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Sevas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-2">
          {filteredSevas.map((seva) => (
            <motion.div
              key={seva.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="group relative rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img
                  src={seva.image}
                  alt={seva.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Tag Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md border border-amber-300">
                  {seva.tag}
                </span>

                {/* Price Tag */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] text-amber-200 uppercase tracking-wider block font-semibold">
                      Dakshina
                    </span>
                    <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                      ₹{seva.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-white/80 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    <Clock className="size-3 text-amber-400" />
                    <span>{seva.time.split("•")[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {seva.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 mt-0.5">{seva.subtitle}</p>
                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed font-normal">
                    {seva.description}
                  </p>
                </div>

                {/* Action CTA Button */}
                <button
                  onClick={() => handleSelectPujaCard(seva)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-xs font-semibold hover:from-[#5C1A29] hover:to-[#4A1521] shadow-md transition-all flex items-center justify-center gap-2 border border-amber-400/30 cursor-pointer group-hover:scale-[1.01]"
                >
                  <Flame className="size-4 text-[var(--gold)]" />
                  <span>Book {seva.title}</span>
                  <ChevronRight className="size-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STEP 1 INITIAL MODAL POPUP (Name & Mobile Number) */}
      <AnimatePresence>
        {selectedPuja && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPuja(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-200/90 bg-[#FAF8F5] text-stone-800 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedPuja(null)}
                className="absolute top-4 right-4 size-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="p-6 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white text-center relative">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-semibold mb-2">
                  <Sparkles className="size-3.5" />
                  <span>Fast Puja Registration</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gradient-gold">
                  {selectedPuja.title}
                </h3>
                <p className="text-xs text-amber-100/70 mt-1">
                  Dakshina: <strong className="text-[var(--gold)]">₹{selectedPuja.price}</strong>
                </p>
              </div>

              <form onSubmit={handleProceedToCheckoutPage} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs text-stone-700 font-bold mb-1">
                    Your Name *
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 size-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-700 font-bold mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs text-stone-600 font-bold border-r border-stone-300 pr-2.5">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!name || mobile.length < 10}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
                    name && mobile.length >= 10
                      ? "bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white hover:opacity-95 cursor-pointer"
                      : "bg-stone-300 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  <span>Proceed to Booking Details Page</span>
                  <ArrowRight className="size-4 text-[var(--gold)]" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
