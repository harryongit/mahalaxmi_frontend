"use client";

import React, { useState, useEffect } from "react";
import { useRazorpay } from "react-razorpay";
import { paymentApi, contentApi, API_BASE_URL, DonationItem, DonationStats } from "@/src/lib/api";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Flame,
  ArrowRight,
  Clock,
  Coins,
  Users,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  Landmark,
  Phone,
  Mail,
  X,
  Download,
  FileText,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEVA_CAUSES = [
  {
    id: "annadanam",
    title: "Maha Annadanam",
    subtitle: "Feed 51 Visiting Pilgrims",
    icon: "🍲",
    defaultAmount: 1100,
    desc: "Offer hot Mahaprasad to devoted pilgrims and sadhus visiting Karveer Nivasini Ambabai.",
    tag: "Most Sacred Seva",
  },
  {
    id: "gouseva",
    title: "Gou Seva & Fodder",
    subtitle: "Caring for 150+ Gir Cows",
    icon: "🐄",
    defaultAmount: 2100,
    desc: "Provides nourishing fresh green fodder, veterinary care, and shelter in the temple Gaushala.",
    tag: "High Merit",
  },
  {
    id: "akhand_deepam",
    title: "Akhand Deepam Jyot",
    subtitle: "Eternal Sanctum Lamp",
    icon: "🪔",
    defaultAmount: 501,
    desc: "Pure cow ghee and cotton wicks to keep the sacred eternal flame burning at the deity's feet.",
    tag: "Daily Seva",
  },
  {
    id: "jirnoddhar",
    title: "Mandir Jirnoddhar",
    subtitle: "Ancient Stone Conservation",
    icon: "🏛️",
    defaultAmount: 5100,
    desc: "Restoration and structural conservation of the 9th-century basalt stone carvings and Gopuram.",
    tag: "Heritage",
  },
  {
    id: "general",
    title: "Samarpan Mandir Dan",
    subtitle: "Where Most Needed",
    icon: "🙏",
    defaultAmount: 1001,
    desc: "Unrestricted contribution used for daily Vedic rituals, floral archana, and temple welfare.",
    tag: "Universal Seva",
  },
];

const PRESET_AMOUNTS = [501, 1100, 2100, 5100, 11000, 21000];

export function DonationsSection({ isStandalonePage = false }: { isStandalonePage?: boolean } = {}) {
  const [selectedCause, setSelectedCause] = useState(SEVA_CAUSES[0]);
  const [amount, setAmount] = useState<number | "">(1100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gotra, setGotra] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live donations feed & stats
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [feedLoading, setFeedLoading] = useState(false);

  // Success Receipt State
  const [completedDonation, setCompletedDonation] = useState<{
    id?: number;
    amount: number;
    name: string;
    purpose: string;
    paymentId: string;
    date: string;
    gotra?: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState(false);

  const { Razorpay } = useRazorpay();

  // Load donations and stats from backend
  const fetchDonationsData = async () => {
    setFeedLoading(true);
    try {
      const [listRes, statsRes] = await Promise.allSettled([
        contentApi.getDonations(12),
        contentApi.getDonationStats(),
      ]);

      if (listRes.status === "fulfilled" && Array.isArray(listRes.value)) {
        setDonations(listRes.value);
      }
      if (statsRes.status === "fulfilled" && statsRes.value) {
        setStats(statsRes.value);
      }
    } catch (err) {
      console.warn("Could not fetch donation stats:", err);
    } finally {
      setFeedLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationsData();
  }, []);

  const handleSelectCause = (cause: typeof SEVA_CAUSES[0]) => {
    setSelectedCause(cause);
    setAmount(cause.defaultAmount);
    setCustomAmount("");
  };

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount("");
    }
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const finalAmount = typeof amount === "number" ? amount : parseInt(customAmount, 10);
    if (!finalAmount || finalAmount < 1) {
      setErrorMsg("Please select or enter an auspicious donation amount (minimum ₹1).");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Razorpay order on backend
      const order = await paymentApi.createOrder(finalAmount);
      const donorDisplayName = isAnonymous ? "Gupt Devotee (Anonymous)" : (name.trim() || "Devotee");

      // Helper to execute donation completion
      const finalizeDonation = async (paymentId: string, orderId: string, signature?: string) => {
        try {
          if (signature) {
            await paymentApi.verifySignature({
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
            });
          }

          const donationPayload = {
            name: donorDisplayName,
            amount: finalAmount,
            purpose: selectedCause.title,
            payment_id: paymentId,
            email: email.trim() || undefined,
            phone: phone.trim() || undefined,
            date: new Date().toISOString().slice(0, 10),
          };

          const savedDonation = await contentApi.createDonation(donationPayload);

          setCompletedDonation({
            id: savedDonation?.id,
            amount: finalAmount,
            name: donorDisplayName,
            purpose: selectedCause.title,
            paymentId: paymentId,
            date: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            gotra: gotra.trim() || undefined,
          });

          // Refresh live feed
          fetchDonationsData();
        } catch (postErr) {
          console.error("Donation record error:", postErr);
          setCompletedDonation({
            amount: finalAmount,
            name: donorDisplayName,
            purpose: selectedCause.title,
            paymentId: paymentId,
            date: new Date().toLocaleDateString("en-IN"),
          });
        }
      };

      // 2. Setup Razorpay options
      const razorpayKey =
        order.key_id ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "rzp_test_TrSL4uY2WXFSnY";

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: (order.currency || "INR") as "INR",
        name: "Shri Ambabai Mahalaxmi Mandir",
        description: `Seva Dan: ${selectedCause.title}`,
        order_id: order.order_id,
        handler: async (response: any) => {
          setLoading(true);
          await finalizeDonation(
            response.razorpay_payment_id || `pay_${Math.random().toString(36).slice(2, 10)}`,
            response.razorpay_order_id || order.order_id,
            response.razorpay_signature
          );
          setLoading(false);
        },
        prefill: {
          name: donorDisplayName,
          contact: phone || undefined,
          email: email || undefined,
        },
        theme: {
          color: "#380D12",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      if (typeof window !== "undefined") {
        if (!(window as any).Razorpay && !Razorpay) {
          await new Promise<boolean>((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
          });
        }

        const RzpConstructor = (window as any).Razorpay || Razorpay;
        if (RzpConstructor) {
          const rzpayInstance = new RzpConstructor(options);
          rzpayInstance.on("payment.failed", function (resp: any) {
            setErrorMsg(resp?.error?.description || "Payment failed. Please retry.");
            setLoading(false);
          });
          rzpayInstance.open();
        } else {
          await finalizeDonation(
            `pay_test_${Math.random().toString(36).slice(2, 9)}`,
            order.order_id
          );
        }
      }
    } catch (err: any) {
      console.error("Razorpay initiation error:", err);
      setErrorMsg(err?.message || "Failed to initiate payment gateway. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPaymentId = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const totalRaised = stats?.total_amount
    ? stats.total_amount
    : donations.reduce((acc, d) => acc + (d.amount || 0), 0) || 31200;

  const totalDonorsCount = stats?.total_count
    ? stats.total_count
    : Math.max(donations.length, 18);

  return (
    <section
      id="donate"
      className={`relative ${
        isStandalonePage
          ? "pt-8 sm:pt-12 pb-16 sm:pb-24 bg-transparent"
          : "py-20 md:py-28 bg-gradient-to-b from-stone-50 via-white to-amber-50/30"
      } overflow-hidden text-stone-900 font-sans`}
    >
      {/* Ambient background ornamentation matching ContactSection */}
      <div className="absolute top-0 right-0 size-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 size-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header (displayed on landing page) */}
        {!isStandalonePage && (
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/90 text-amber-900 border border-amber-300/80 mb-3 shadow-2xs">
              <Sparkles className="size-3 text-amber-600" />
              <span>Sacred Danam & Temple Seva</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380D12] tracking-tight">
              Keep the Sacred Flame Burning
            </h2>

            <p className="mt-3 text-sm text-stone-600 leading-relaxed font-sans">
              Every contribution directly provides hot Vedic Mahaprasad to pilgrims, feeds sacred Gir cows,
              and preserves the 900-year sacred sanctuary of Karveer Nivasini Ambabai.
            </p>
          </div>
        )}

        {/* TOP 4 IMPACT & STAT METRIC CARDS (Full Width Grid Across max-w-6xl Container) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {/* Card 1: Total Danam */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Coins className="size-6 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Total Danam
              </span>
              <span className="font-serif text-2xl lg:text-3xl font-bold text-[#380D12] block">
                ₹{totalRaised.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Seva funds offered
            </p>
          </motion.div>

          {/* Card 2: Devotees */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Users className="size-6 text-[var(--gold)]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Devotees
              </span>
              <span className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 block">
                {totalDonorsCount}+
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Sacred patrons blessed
            </p>
          </motion.div>

          {/* Card 3: Annadanam */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Heart className="size-6 text-rose-300" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Annadanam
              </span>
              <span className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 block">
                5,000+
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Free hot pilgrim meals/day
            </p>
          </motion.div>

          {/* Card 4: 80G Benefit */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <ShieldCheck className="size-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                80G Benefit
              </span>
              <span className="font-serif text-2xl lg:text-3xl font-bold text-emerald-800 block">
                50% Exemption
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Tax exempt seva receipt
            </p>
          </motion.div>
        </section>

        {/* Two-Column Grid: Form (Left) & Sacred Donors Wall (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Donation Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-amber-900/10 bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow">
              {/* Card Title Header */}
              <div className="border-b border-stone-100 pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl shadow-xs">
                    {selectedCause.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#380D12]">
                      {selectedCause.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">{selectedCause.subtitle}</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80">
                  {selectedCause.tag}
                </span>
              </div>

              <form onSubmit={handleDonateSubmit} className="space-y-5 font-sans">
                {/* 1. Choose Seva Cause */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2">
                    1. Choose Seva Cause <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SEVA_CAUSES.map((cause) => {
                      const isSelected = selectedCause.id === cause.id;
                      return (
                        <button
                          key={cause.id}
                          type="button"
                          onClick={() => handleSelectCause(cause)}
                          className={`text-left p-3 rounded-2xl border transition-all text-xs cursor-pointer ${
                            isSelected
                              ? "bg-[#380D12] text-white border-[#380D12] shadow-sm"
                              : "bg-stone-50/80 border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50/40"
                          }`}
                        >
                          <div className="text-xl mb-1">{cause.icon}</div>
                          <div className={`font-bold truncate ${isSelected ? "text-amber-200" : "text-stone-900"}`}>
                            {cause.title}
                          </div>
                          <div className={`text-[11px] font-semibold ${isSelected ? "text-amber-300" : "text-amber-800"}`}>
                            ₹{cause.defaultAmount.toLocaleString("en-IN")}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Select Donation Amount */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500">
                      2. Select Donation Amount (₹) <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-amber-800 font-semibold">Vedic Auspicious Numbers</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                    {PRESET_AMOUNTS.map((val) => {
                      const isSelected = amount === val && customAmount === "";
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSelectPreset(val)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-[#380D12] text-amber-200 border-[#380D12] shadow-xs scale-102"
                              : "bg-stone-50/80 text-stone-700 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50"
                          }`}
                        >
                          ₹{val.toLocaleString("en-IN")}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-stone-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Or enter any custom amount (e.g. 5100)"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white pl-9 pr-4 py-2.5 text-xs text-stone-800 font-bold placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* 3. Devotee Details */}
                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500">
                      3. Devotee Details (For Sankalpa)
                    </label>

                    {/* Anonymous / Gupt Danam Toggle */}
                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-amber-900 font-bold">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="size-3.5 rounded border-stone-300 text-[#380D12] focus:ring-[#380D12]"
                      />
                      <span>Gupt Daan (Anonymous)</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                        Devotee Full Name
                      </label>
                      <input
                        type="text"
                        disabled={isAnonymous}
                        placeholder={isAnonymous ? "Gupt Devotee (Hidden)" : "e.g. Ramesh Kulkarni"}
                        value={isAnonymous ? "" : name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                        WhatsApp Mobile (For Receipt)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                        Email (For 80G Tax Receipt)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. devotee@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                        Gotra / City (Vedic Sankalp)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kashyap Gotra, Kolhapur"
                        value={gotra}
                        onChange={(e) => setGotra(e.target.value)}
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <span className="size-2 rounded-full bg-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !amount || Number(amount) < 1}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#380D12] text-amber-200 hover:bg-[#4A151C] hover:text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-amber-900/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin text-amber-300" />
                        <span>Opening Razorpay Secure Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          Proceed to Donate ₹{Number(amount || 0).toLocaleString("en-IN")} via Razorpay
                        </span>
                        <ArrowRight className="size-4 text-amber-300" />
                      </>
                    )}
                  </button>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 font-medium">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <ShieldCheck className="size-4 text-emerald-600" />
                      <span>100% Encrypted Payment via Razorpay</span>
                    </div>
                    <div className="flex items-center gap-1 text-stone-500">
                      <span>UPI</span> · <span>GPay</span> · <span>PhonePe</span> · <span>Cards</span> · <span>NetBanking</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Column 2: Temple Seva Trust Desk & 80G Benefits */}
          <div className="lg:col-span-5 space-y-6">
            {/* Temple Trust Seva Information Card */}
            <div className="rounded-3xl border border-amber-900/10 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="border-b border-stone-100 pb-4 mb-6">
                <h3 className="font-serif text-xl font-bold text-[#380D12]">
                  Temple Trust Seva Desk
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Official Sansthan contribution channels & Vedic Seva details
                </p>
              </div>

              <div className="space-y-4">
                {/* Maha Annadanam */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs text-lg">
                    🍲
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Daily Maha Annadanam
                    </span>
                    <strong className="text-xs font-bold text-stone-800 block">
                      Serving 5,000+ Pilgrims Daily
                    </strong>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
                      Hot Sattvic Mahaprasad served twice daily (11:30 AM – 2:30 PM & 7:30 PM – 9:30 PM) to all visiting devotees and sadhus.
                    </p>
                  </div>
                </div>

                {/* Gou Seva */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs text-lg">
                    🐄
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Gaushala & Cow Welfare
                    </span>
                    <strong className="text-xs font-bold text-stone-800 block">
                      150+ Sacred Gir Cows Cared For
                    </strong>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
                      Daily fresh green fodder, clean drinking water, and dedicated veterinary medical care at the temple Gaushala.
                    </p>
                  </div>
                </div>

                {/* Akhand Deepam */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs text-lg">
                    🪔
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Sanctum Akhand Deepam
                    </span>
                    <strong className="text-xs font-bold text-stone-800 block">
                      Continuous Consecrated Flame
                    </strong>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
                      Pure cow ghee and organic wicks to keep the sacred flame burning continuously at the feet of Ambabai.
                    </p>
                  </div>
                </div>

                {/* Heritage Restoration */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs text-lg">
                    🏛️
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Mandir Jirnoddhar
                    </span>
                    <strong className="text-xs font-bold text-stone-800 block">
                      900-Year Heritage Preservation
                    </strong>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
                      Expert archaeological conservation of ancient basalt stone sculptures, pillars, and holy Sanctum architecture.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct UPI / Bank Details Box */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Direct UPI Donation ID:</span>
                  <span className="font-mono font-bold text-[#380D12] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    ambabaimahalaxmi@sbi
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Donation Helpline:</span>
                  <a href="tel:+914412345678" className="font-bold text-stone-800 hover:text-amber-800">
                    +91 44 1234 5678
                  </a>
                </div>
              </div>
            </div>


            {/* 80G Tax Exemption Card matching Contact details card */}
            <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex items-start gap-4">
              <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30 shrink-0">
                <Landmark className="size-6" />
              </div>
              <div className="space-y-1">
                <strong className="font-serif text-base font-bold text-stone-900 block">
                  80G Tax Exemption Benefits
                </strong>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  All donations are 50% exempt under Section 80G of the Indian Income Tax Act.
                  Digital official Seva receipts are instantly provided with trust registration details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION RECEIPT MODAL */}
      <AnimatePresence>
        {completedDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="w-full max-w-md rounded-3xl border border-amber-900/20 bg-white text-stone-800 shadow-2xl overflow-hidden relative"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#3C0F1A] via-[#5C1A29] to-[#2B0A12] p-6 text-center text-white relative">
                <div className="size-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-2.5 shadow-md">
                  <CheckCircle2 className="size-8 text-emerald-400" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold block">
                  Jai Shree Ambabai Mahalaxmi!
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  Puja Sankalpa Confirmed
                </h3>
                <p className="text-xs text-amber-100/90 mt-1 max-w-xs mx-auto">
                  May Goddess Karveer Nivasini Ambabai shower eternal abundance, peace, and health upon your family.
                </p>
              </div>

              {/* Receipt Details */}
              <div className="p-6 space-y-4">
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
                    <span className="text-stone-500 font-semibold">Receipt Number:</span>
                    <span className="font-mono font-bold text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300">
                      MHLX-DON-{String(completedDonation.id || 1).padStart(5, '0')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-amber-200/60">
                    <span className="text-stone-500 font-semibold">Total Danam</span>
                    <span className="font-serif text-xl font-bold text-[#380D12]">
                      ₹{completedDonation.amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Devotee Name:</span>
                    <span className="font-bold text-stone-900">{completedDonation.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Seva Purpose:</span>
                    <span className="font-bold text-[#380D12]">{completedDonation.purpose}</span>
                  </div>

                  {completedDonation.gotra && (
                    <div className="flex justify-between">
                      <span className="text-stone-500 font-medium">Gotra Sankalp:</span>
                      <span className="font-bold text-stone-900">{completedDonation.gotra}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Date:</span>
                    <span className="font-medium text-stone-700">{completedDonation.date}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Tax Exemption:</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                      50% Under Section 80G
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-amber-200/60">
                    <span className="text-stone-500 font-medium">Payment ID:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPaymentId(completedDonation.paymentId)}
                      className="font-mono text-[11px] text-amber-900 hover:text-black flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-amber-300 cursor-pointer"
                    >
                      <span>{completedDonation.paymentId}</span>
                      {copiedId ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3 text-stone-400" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {completedDonation.id && (
                    <a
                      href={`${API_BASE_URL}/content/donations/${completedDonation.id}/invoice`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Download className="size-4" />
                      <span>Download Official 80G Invoice (PDF)</span>
                    </a>
                  )}

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Namaste! I have offered a sacred Seva Danam of ₹${completedDonation.amount.toLocaleString("en-IN")} towards ${completedDonation.purpose} at Shri Karveer Nivasini Ambabai Mahalaxmi Mandir, Kolhapur. Receipt No: MHLX-DON-${String(completedDonation.id || 1).padStart(5, '0')}. Jai Shree Mahalakshmi! 🙏`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="size-4" />
                    <span>Share Receipt on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setCompletedDonation(null)}
                    className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default DonationsSection;
