"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { useQuery } from "@tanstack/react-query";
import { serviceApi, paymentApi } from "@/src/lib/api";
import { useRazorpay } from "react-razorpay";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/src/lib/utils";
import {
  Check,
  Calendar as CalendarIcon,
  Clock,
  Flame,
  ShieldCheck,
  Gift,
  CheckCircle2,
  Info,
  Edit,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Package,
  Sparkles,
  X,
  User,
  Phone,
  Heart,
  Star,
  BookOpen,
  HelpCircle,
  Image as ImageIcon,
  ChevronDown,
} from "lucide-react";

// Data Definitions
const sevasData = [
  {
    id: "s1",
    title: "Kumkumarchan Seva",
    subtitle: "Sacred Saffron & Vermillion Offering",
    price: 551,
    time: "Daily • 07:00 AM & 05:00 PM",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
    description: "Recitation of 1000 holy names of Divine Mother Mahalaxmi while offering pure saffron-blessed vermillion powder to Her divine lotus feet.",
    benefits: [
      { title: "Financial Abundance", desc: "Attracts prosperous growth in business and wealth." },
      { title: "Family Protection", desc: "Bestows family immunity, health & divine grace." },
      { title: "Marital Harmony", desc: "Strengthens marital bonds & protects from negativity." },
    ],
    process: [
      { step: 1, title: "Sankalpa", desc: "Vedic Pandits initiate Sankalpa with your Gotra & Names." },
      { step: 2, title: "Kumkum Archana", desc: "Continuous Kumkum Archana with Lalita Sahasranama." },
      { step: 3, title: "Prasadam & Video", desc: "WhatsApp Video proof & Consecrated Prasadam Home Courier." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
      "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
    ],
    reviews: [
      { name: "Sunita Kulkarni", text: "Received WhatsApp video proof and Kumkum prasadam in 3 days. Extremely blessed!", rating: 5 },
      { name: "Rajesh Shinde", text: "Very authentic Vedic chanting and blissful experience.", rating: 5 },
    ],
    faqs: [
      { q: "Will my Gotra be recited?", a: "Yes, Panditji recites your Gotra and family names during Sankalpa." },
      { q: "How do I get photo/video proof?", a: "Video proof is dispatched directly to your WhatsApp number." },
    ],
  },
  {
    id: "s2",
    title: "Panchamrut Abhishek",
    subtitle: "Vedic Holy Bath Ceremony",
    price: 751,
    time: "Daily • 06:00 AM & 08:30 AM",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
    description: "Vedic ritual bathing of the deity idol with five sacred nectars (cow milk, curd, honey, ghee, sugar) with Shreesukta chanting.",
    benefits: [
      { title: "Removes Obstacles", desc: "Clears spiritual blockages & bestows smooth success." },
      { title: "Physical Energy", desc: "Energizes physical health, vitality & inner peace." },
      { title: "Permanent Wealth", desc: "Shreesukta mantras invoke permanent Mahalaxmi grace." },
    ],
    process: [
      { step: 1, title: "Sankalpa", desc: "Vedic Panditji invokes Gotra & Family Sankalpa." },
      { step: 2, title: "5-Nectar Bath", desc: "Five Nectars ritual bath with Shreesukta Chanting." },
      { step: 3, title: "Alankar & Aarti", desc: "Fresh Silk Alankar, Aarti & WhatsApp Video proof." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545232979-fbf34fe37b38?q=80&w=800",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
    ],
    reviews: [
      { name: "Vikram Patil", text: "The Panchamrut Abhishek is performed with utter purity.", rating: 5 },
    ],
    faqs: [
      { q: "What time is Panchamrut Abhishek performed?", a: "Daily morning between 06:00 AM and 08:30 AM." },
    ],
  },
  {
    id: "s3",
    title: "Padya Puja & Archana",
    subtitle: "Sacred Foot Worship",
    price: 551,
    time: "Daily • 09:00 AM",
    deity: "Goddess Ambabai Mahalaxmi",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800",
    description: "Traditional foot worship and lotus flower offerings with 108 auspicious names of Goddess Mahalaxmi.",
    benefits: [
      { title: "Spiritual Peace", desc: "Purifies mind and grants tranquility." },
      { title: "Desire Fulfillment", desc: "Fulfills noble family aspirations." },
    ],
    process: [
      { step: 1, title: "108 Archana", desc: "108 Name Archana with fresh lotus flowers." },
      { step: 2, title: "Delivery", desc: "Gotra recitation & Prasadam home delivery." },
    ],
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800"],
    reviews: [{ name: "Ananya Deshmukh", text: "Spiritual peace and quick confirmation.", rating: 5 }],
    faqs: [{ q: "How is Prasadam delivered?", a: "Packed securely and delivered via courier to your door." }],
  },
];

const addOnsData = [
  {
    id: "a1",
    title: "Regular Otee Offering",
    price: 351,
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=300",
    description: "Haldi-Kumkum, Coconut & blouse piece.",
  },
  {
    id: "a2",
    title: "Silk Saree Otee",
    price: 1201,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300",
    description: "Pure silk saree draped on Goddess.",
  },
  {
    id: "a3",
    title: "Puranpoli Naivedya",
    price: 300,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=300",
    description: "Freshly made Puranpoli bhog.",
  },
  {
    id: "a4",
    title: "Brahman & Suwasini Bhojan",
    price: 1201,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300",
    description: "Feeding Brahmans & Suwasinis.",
  },
  {
    id: "a5",
    title: "Gou Seva (Cow Feeding)",
    price: 501,
    image: "https://images.unsplash.com/photo-1570042707223-933390c5240c?q=80&w=300",
    description: "Fresh fodder for cows in Goushala.",
  },
];

const auspiciousDates = [
  { date: "2026-09-22", label: "22 Sep", occasion: "Ghatasthapana" },
  { date: "2026-09-26", label: "26 Sep", occasion: "Lalita Panchami" },
  { date: "2026-09-29", label: "29 Sep", occasion: "Mahashtami" },
  { date: "2026-09-30", label: "30 Sep", occasion: "Khandi Navami" },
  { date: "2026-10-02", label: "02 Oct", occasion: "Dasara" },
];

function CheckoutForm() {
  const searchParams = useSearchParams();

  const pujaId = searchParams.get("puja") || "lakshmi-puja";
  const initialName = searchParams.get("name") || "";
  const initialMobile = searchParams.get("mobile") || "";

  const { data: dbService, isLoading: isServiceLoading } = useQuery({
    queryKey: ["service", pujaId],
    queryFn: () => serviceApi.getService(pujaId),
  });

  const { Razorpay } = useRazorpay();

  // Fallback to static sevasData if DB service fails or loads, but use dbService if it exists
  const selectedPuja = dbService 
    ? { ...dbService, price: dbService.price || 0, title: dbService.title || "Puja" } 
    : (sevasData.find((s) => s.id === pujaId) || sevasData[0]);
  
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-22");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

  // Active Step State: 1 = Seva & Addons | 2 = Devotee Details
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);

  // Tab State inside Step 1 Details: 'overview' | 'benefits' | 'process' | 'gallery' | 'reviews' | 'faqs'
  const [detailsTab, setDetailsTab] = useState<"overview" | "benefits" | "process" | "gallery" | "reviews" | "faqs">("overview");

  // Form Fields
  const [name, setName] = useState(initialName);
  const [mobile, setMobile] = useState(initialMobile);
  const [whatsapp, setWhatsapp] = useState(initialMobile);
  const [gotra, setGotra] = useState("Kashyapa");
  const [dontKnowGotra, setDontKnowGotra] = useState(false);
  const [participatingMembers, setParticipatingMembers] = useState("");
  const [email, setEmail] = useState("");

  // Aashirwad Box & Address State
  const [wantAashirwadBox, setWantAashirwadBox] = useState<"yes" | "no" | null>(null);
  const [pincode, setPincode] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [roadArea, setRoadArea] = useState("");
  const [landmark, setLandmark] = useState("");

  // Confirmation Modal & Success State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialName && !name) setName(initialName);
    if (initialMobile && !mobile) {
      setMobile(initialMobile);
      if (!whatsapp) setWhatsapp(initialMobile);
    }
  }, [initialName, initialMobile]);

  const toggleAddon = (id: string, price: number) => {
    setSelectedAddons((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = price;
      return next;
    });
  };

  const sevasTotal = selectedPuja.price;
  const addonsTotal = Object.values(selectedAddons).reduce((a, b) => a + b, 0);
  const totalAmount = sevasTotal + addonsTotal;

  const matchedOccasion = auspiciousDates.find((d) => d.date === selectedDate)?.occasion;

  const formatReadableDate = (dateStr: string) => {
    try {
      return formatDate(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const handleProceedToStep2 = () => {
    setCheckoutStep(2);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleProceedToConfirmModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || mobile.length < 10 || !email) return;
    if (wantAashirwadBox === "yes") {
      if (!pincode || !cityName || !stateName || !houseNo || !roadArea || !landmark) {
        return;
      }
    }
    setShowConfirmModal(true);
  };

  const handleFinalSubmitAndPay = async () => {
    try {
      const order = await paymentApi.createOrder(totalAmount);
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TUfclqVsVWvO8E",
        amount: order.amount,
        currency: order.currency as "INR",
        name: "Shri Mahalaxmi Mandir",
        description: selectedPuja.title,
        order_id: order.order_id,
        handler: async (response: any) => {
          try {
            const verifyRes = await paymentApi.verifySignature({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.status === "success") {
              const payload = {
                userName: name,
                mobile: mobile,
                email: email,
                gotra: gotra,
                familyMembers: participatingMembers,
                pujaTitle: selectedPuja.title,
                amount: totalAmount,
                bookingDate: new Date().toISOString(),
                pujaSlotDate: selectedDate,
                paymentMode: "Razorpay",
                paymentStatus: "Paid",
                transactionId: response.razorpay_payment_id,
                service_slug: dbService ? dbService.slug : selectedPuja.id,
              };
              
              const { bookingApi } = await import("@/src/lib/api");
              await bookingApi.createBooking(payload);
              
              setShowConfirmModal(false);
              setIsSuccess(true);
            }
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: name,
          contact: mobile,
          email: email,
        },
        theme: {
          color: "#D4AF37",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (err) {
      console.error("Booking initialization failed:", err);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  const tabsList = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "benefits", label: "Benefits", icon: Heart },
    { id: "process", label: "Process", icon: Sparkles },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
  ] as const;

  return (
    <div className="container-temple max-w-6xl mx-auto space-y-6">
      
      {/* SLEEK FLOATING WIZARD STEPPER TAB BAR */}
      {!isSuccess && (
        <div className="bg-white rounded-2xl p-2 border border-amber-300/80 shadow-sm flex items-center justify-between max-w-xl mx-auto text-xs">
          <button
            onClick={() => setCheckoutStep(1)}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
              checkoutStep === 1
                ? "bg-[#3C0F1A] text-white shadow-md"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span className="size-5 rounded-full bg-[var(--gold)] text-stone-950 text-[11px] font-bold flex items-center justify-center shadow-xs">
              1
            </span>
            <span>Step 1: Puja & Add-ons</span>
          </button>

          <button
            onClick={() => {
              setCheckoutStep(2);
              window.scrollTo({ top: 120, behavior: "smooth" });
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
              checkoutStep === 2
                ? "bg-[#3C0F1A] text-white shadow-md"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span className="size-5 rounded-full bg-[var(--gold)] text-stone-950 text-[11px] font-bold flex items-center justify-center shadow-xs">
              2
            </span>
            <span>Step 2: Devotee Details</span>
          </button>
        </div>
      )}

      {!isSuccess ? (
        <AnimatePresence mode="wait">
          {/* STEP 1: CLEAN TWO-COLUMN LAYOUT */}
          {checkoutStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
                {/* LEFT SIDE: ADD-ON OFFERINGS */}
                <div className="rounded-3xl border border-amber-300/80 bg-white p-5 sm:p-6 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-2">
                      <Gift className="size-5 text-amber-800" />
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Add-On Seva Offerings (Optional)
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      {Object.keys(selectedAddons).length} Selected
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {addOnsData.map((addon) => {
                      const active = !!selectedAddons[addon.id];
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id, addon.price)}
                          className={`p-3 rounded-2xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                            active
                              ? "bg-amber-50 border-amber-500 text-amber-950 shadow-xs"
                              : "bg-white border-stone-200 hover:border-amber-300"
                          }`}
                        >
                          <img
                            src={addon.image}
                            alt={addon.title}
                            className="size-14 rounded-xl object-cover shrink-0 border border-stone-200"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                                {addon.title}
                              </h4>
                              <span className="font-serif text-xs font-bold text-amber-900 shrink-0">
                                +₹{addon.price}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">
                              {addon.description}
                            </p>
                          </div>

                          <div
                            className={`size-6 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                              active
                                ? "bg-amber-800 border-amber-800 text-white shadow-xs"
                                : "border-stone-300 bg-stone-50 text-stone-400"
                            }`}
                          >
                            {active && <Check className="size-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SIDE: UNCLUTTERED PUJA SUMMARY & VISUAL CALENDAR */}
                <div className="space-y-4">
                  {/* Selected Puja Summary Card */}
                  <div className="rounded-3xl border border-amber-300/80 bg-white shadow-md overflow-hidden text-xs">
                    {/* Header Banner */}
                    <div className="p-4 bg-gradient-to-r from-[#3C0F1A] via-[#5C1A29] to-[#2B0A12] text-white flex items-center justify-between border-b border-[var(--gold)]/30">
                      <div>
                        <span className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider block">
                          {selectedPuja.deity}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-gradient-gold">
                          {selectedPuja.title}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] text-amber-200 uppercase block font-semibold">Dakshina</span>
                        <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                          ₹{selectedPuja.price}
                        </span>
                      </div>
                    </div>

                    {/* Summary Info */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedPuja.image}
                          alt={selectedPuja.title}
                          className="size-16 rounded-xl object-cover shrink-0 border border-amber-300"
                        />
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-amber-900 block">{selectedPuja.subtitle}</span>
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                            <Clock className="size-3 text-amber-800" />
                            <span>{selectedPuja.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* VISUAL CALENDAR SELECTOR */}
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                            <CalendarIcon className="size-3.5 text-amber-800" />
                            <span>Select Puja Date *</span>
                          </label>
                          <span className="text-xs font-bold text-amber-900 bg-white px-2.5 py-0.5 rounded-lg border border-amber-300">
                            {formatReadableDate(selectedDate)}
                          </span>
                        </div>

                        <input
                          type="date"
                          required
                          min={todayStr}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-amber-400 text-xs font-bold text-stone-900 focus:outline-none cursor-pointer"
                        />

                        {matchedOccasion && (
                          <div className="p-2 rounded-xl bg-amber-200/80 text-amber-950 text-[11px] font-semibold flex items-center gap-1.5">
                            <Sparkles className="size-3.5 text-amber-800 shrink-0" />
                            <span>Festival: <strong>{matchedOccasion}</strong></span>
                          </div>
                        )}

                        {/* Quick Festival Date Chips */}
                        <div className="flex overflow-x-auto gap-1.5 pt-0.5 scrollbar-thin">
                          {auspiciousDates.map((item) => {
                            const active = selectedDate === item.date;
                            return (
                              <button
                                type="button"
                                key={item.date}
                                onClick={() => setSelectedDate(item.date)}
                                className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                  active
                                    ? "bg-amber-800 text-white border-amber-800 shadow-xs"
                                    : "bg-white text-stone-700 border-amber-300 hover:border-amber-500"
                                }`}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Total Dakshina Action Bar */}
                  <div className="p-4 rounded-3xl bg-[#3C0F1A] text-white flex items-center justify-between shadow-lg border border-amber-300/40">
                    <div>
                      <span className="text-[9px] text-amber-200 uppercase block font-semibold">Total Dakshina</span>
                      <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                        ₹{totalAmount}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleProceedToStep2}
                      className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Step 2</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SEPARATE INTERACTIVE TABS: Overview | Benefits | Process | Gallery | Reviews | FAQs */}
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-5">
                
                {/* Horizontal Tab Buttons Bar */}
                <div className="flex overflow-x-auto border-b border-stone-200 pb-2 gap-2 scrollbar-thin">
                  {tabsList.map((t) => {
                    const Icon = t.icon;
                    const active = detailsTab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDetailsTab(t.id)}
                        className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                          active
                            ? "bg-amber-900 text-white border-amber-900 shadow-sm"
                            : "bg-stone-50 text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-900"
                        }`}
                      >
                        <Icon className="size-3.5" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Panels */}
                <div className="text-xs">
                  {/* OVERVIEW TAB */}
                  {detailsTab === "overview" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-stone-700 leading-relaxed">
                      <h4 className="font-serif text-base font-bold text-stone-900">About {selectedPuja.title}</h4>
                      <p>{selectedPuja.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                          <strong>100% Authentic Seva</strong><br />Conducted by temple Vedic pujaris.
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                          <strong>WhatsApp Proof</strong><br />Video updates sent directly to WhatsApp.
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                          <strong>Home Prasadam</strong><br />Consecrated prasadam courier dispatch.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* BENEFITS TAB */}
                  {detailsTab === "benefits" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedPuja.benefits?.map((b: {title: string, desc: string}, i: number) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                          <span className="font-serif font-bold text-amber-900 text-sm block">{b.title}</span>
                          <p className="text-stone-600 leading-snug">{b.desc}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* PROCESS TAB */}
                  {detailsTab === "process" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      {selectedPuja.process?.map((p: {step: number, title: string, desc: string}, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                          <span className="size-6 rounded-full bg-[#3C0F1A] text-amber-300 font-bold flex items-center justify-center shrink-0">
                            {p.step}
                          </span>
                          <div>
                            <strong className="text-stone-900 block font-bold">{p.title}</strong>
                            <span className="text-stone-600">{p.desc}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* GALLERY TAB */}
                  {detailsTab === "gallery" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedPuja.gallery?.map((img: string, i: number) => (
                        <img key={i} src={img} alt="Puja Photo" className="h-32 w-full rounded-xl object-cover border border-stone-200 shadow-xs" />
                      ))}
                    </motion.div>
                  )}

                  {/* REVIEWS TAB */}
                  {detailsTab === "reviews" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
                      {selectedPuja.reviews?.map((r: {name: string, text: string}, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <div className="flex justify-between items-center font-bold text-stone-900">
                            <span>{r.name}</span>
                            <span className="text-amber-500">★★★★★</span>
                          </div>
                          <p className="text-stone-600 italic">"{r.text}"</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* FAQS TAB */}
                  {detailsTab === "faqs" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      {selectedPuja.faqs?.map((f: {q: string, a: string}, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                          <strong className="text-stone-900 block font-bold">Q: {f.q}</strong>
                          <p className="text-stone-600">A: {f.a}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 2: DEVOTEE DETAILS */}
          {checkoutStep === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleProceedToConfirmModal}
              className="space-y-4 max-w-3xl mx-auto text-xs"
            >
              <button
                type="button"
                onClick={() => setCheckoutStep(1)}
                className="inline-flex items-center gap-1.5 font-bold text-amber-950 bg-white px-4 py-2 rounded-xl border border-amber-300 shadow-xs hover:bg-amber-50 cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                <span>← Back to Step 1: Puja & Add-ons</span>
              </button>

              <div className="rounded-3xl border border-amber-300/80 bg-white p-5 sm:p-7 shadow-xl space-y-5">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Step 2: Participant Details & Gotra
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Panditji will recite your Gotra and family member names during the live ritual.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-800 block mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1">Mobile Number *</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs text-stone-600 font-bold border-r border-stone-300 pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-14 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For invoice delivery"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[var(--gold)]/20 focus:border-[var(--gold)] outline-none transition-all"
                    />
                </div>

                <div className="space-y-1 pt-1">
                  <label className="font-bold text-stone-800 flex items-center gap-1.5">
                    <MessageCircle className="size-4 text-emerald-600" />
                    <span>WhatsApp Number for Photo/Video Updates *</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-stone-600 font-bold border-r border-stone-300 pr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-14 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Flame className="size-4 text-amber-800" />
                    <span>Select Participant's Gotra *</span>
                  </label>
                  <select
                    disabled={dontKnowGotra}
                    value={dontKnowGotra ? "Kashyapa" : gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-medium focus:bg-white focus:border-amber-500 focus:outline-none disabled:bg-stone-100"
                  >
                    <option value="Atri">Atri</option>
                    <option value="Bharadvaja">Bharadvaja</option>
                    <option value="Gautama">Gautama</option>
                    <option value="Jamadagni">Jamadagni</option>
                    <option value="Kashyapa">Kashyapa</option>
                    <option value="Vasishta">Vasishta</option>
                    <option value="Vishvamitra">Vishvamitra</option>
                  </select>

                  <label className="flex items-center gap-2 mt-1.5 text-stone-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dontKnowGotra}
                      onChange={(e) => {
                        setDontKnowGotra(e.target.checked);
                        if (e.target.checked) setGotra("Kashyapa");
                      }}
                      className="rounded border-stone-300 text-amber-800 size-4"
                    />
                    <span className="flex items-center gap-1">
                      <Info className="size-3.5 text-amber-800" />
                      I do not know gotra
                    </span>
                  </label>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="font-bold text-stone-800 block">
                    Participating Member Names (For Panditji Recitation)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Ramesh Deshmukh, Priya Deshmukh, Rohan Deshmukh"
                    value={participatingMembers}
                    onChange={(e) => setParticipatingMembers(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Aashirwad Box Toggle & Address */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                        <Package className="size-4 text-amber-800" />
                        <span>Would you like to receive the Aashirwad box?</span>
                      </h4>
                      <p className="text-[11px] text-stone-600">Contains Ganga Jal and sacred Tirth elements.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setWantAashirwadBox("yes")}
                        className={`px-5 py-2 rounded-xl font-bold text-xs transition-all ${
                          wantAashirwadBox === "yes"
                            ? "bg-amber-800 text-white shadow-md"
                            : "bg-white text-stone-700 border border-stone-300"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setWantAashirwadBox("no")}
                        className={`px-5 py-2 rounded-xl font-bold text-xs transition-all ${
                          wantAashirwadBox === "no"
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-white text-stone-700 border border-stone-300"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {wantAashirwadBox === "yes" && (
                    <div className="space-y-2 pt-2 border-t border-amber-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                        Delivery Address (Compulsory)
                      </span>

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Pincode *"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="City *"
                          value={cityName}
                          onChange={(e) => setCityName(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="State *"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="House No / Building *"
                          value={houseNo}
                          onChange={(e) => setHouseNo(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Road / Area *"
                          value={roadArea}
                          onChange={(e) => setRoadArea(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs"
                        />
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Landmark *"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-3xl bg-[#3C0F1A] text-white flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-[9px] text-amber-200 uppercase block font-semibold">Total Dakshina</span>
                    <span className="font-serif text-3xl font-bold text-[var(--gold)]">
                      ₹{totalAmount}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-8 rounded-2xl bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)] text-stone-950 font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Book</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      ) : (
        /* Success State */
        <div className="rounded-3xl border-2 border-emerald-400 bg-white p-8 text-center space-y-4 shadow-xl max-w-lg mx-auto">
          <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
              ॥ श्री अंबाबाई प्रसन्न ॥
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Puja Booking Confirmed!
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Devotee <strong className="text-stone-900">{name}</strong>, your seva{" "}
              <strong className="text-amber-900">{selectedPuja.title}</strong> has been successfully booked for{" "}
              <strong className="text-stone-900">{formatReadableDate(selectedDate)}</strong>.
            </p>
          </div>

          <Link
            href="/bookings"
            className="inline-block py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#4A1521] to-[#3B0E19] text-white text-xs font-bold shadow-md"
          >
            View My Bookings Dashboard
          </Link>
        </div>
      )}

      {/* CONFIRMATION POPUP MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-amber-300 bg-[#FAF8F5] text-stone-800 shadow-2xl z-10"
            >
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 size-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20"
              >
                <X className="size-4" />
              </button>

              <div className="p-5 bg-gradient-to-r from-[#3C0F1A] via-[#5C1A29] to-[#2B0A12] text-white text-center relative border-b border-[var(--gold)]/30">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/15 px-2.5 py-0.5 rounded-full border border-[var(--gold)]/30 inline-block mb-1">
                  ॥ श्री महालक्ष्मी प्रसन्न ॥
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-tight">
                  Review & Confirm Seva Booking
                </h3>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="rounded-xl border border-amber-200 bg-white p-3.5 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPuja.image}
                      alt={selectedPuja.title}
                      className="size-14 rounded-xl object-cover shrink-0 border border-amber-200"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900">{selectedPuja.title}</h4>
                      <p className="text-[11px] text-stone-500">Date: {formatReadableDate(selectedDate)}</p>
                    </div>
                  </div>
                  <span className="font-serif text-lg font-bold text-amber-900">₹{selectedPuja.price}</span>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-3.5 space-y-2">
                  <span className="font-bold text-stone-800 block">Devotee Details:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                    <div>Name: <strong>{name}</strong></div>
                    <div>Phone: <strong>+91 {mobile}</strong></div>
                    <div>WhatsApp: <strong>+91 {whatsapp}</strong></div>
                    <div>Gotra: <strong>{gotra || "Kashyapa"}</strong></div>
                  </div>
                </div>

                {wantAashirwadBox === "yes" && (
                  <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-[11px] text-stone-800">
                    <strong>Aashirwad Box Address:</strong> {houseNo}, {roadArea}, {cityName}, {stateName} - {pincode}
                  </div>
                )}

                <div className="p-4 rounded-xl bg-[#3C0F1A] text-white flex items-center justify-between shadow-md">
                  <div>
                    <span className="text-[9px] text-amber-200 uppercase block font-semibold">Total Dakshina</span>
                    <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                      ₹{totalAmount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowConfirmModal(false)}
                      className="px-3 py-2 rounded-xl bg-white text-stone-700 font-bold text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmitAndPay}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-xs"
                    >
                      Submit & Pay ₹{totalAmount}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const pujaId = searchParams.get("puja") || "s1";
  const selectedPuja = sevasData.find((s) => s.id === pujaId) || sevasData[0];

  return (
    <>
      {/* Clean & Standard PageHero */}
      <PageHero
        breadcrumb={`Seva Checkout / ${selectedPuja.title}`}
        badge="Secure Online Booking"
        title="Complete Your"
        titleGold={`${selectedPuja.title} (₹${selectedPuja.price})`}
        description={`Customize your optional add-ons, pick an auspicious date, and submit devotee Gotra details.`}
      />

      <main className="flex-1 py-10 px-3 sm:px-6">
        <CheckoutForm />
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-stone-600">Loading...</div>}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
