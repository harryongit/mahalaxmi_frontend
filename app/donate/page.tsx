"use client";

import { useState } from "react";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { useRazorpay } from "react-razorpay";
import { paymentApi, contentApi } from "@/src/lib/api";
import { Heart, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | "">("");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("General Donation");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { Razorpay } = useRazorpay();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 1) return;
    setLoading(true);

    try {
      const order = await paymentApi.createOrder(Number(amount));
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TUfclqVsVWvO8E",
        amount: order.amount,
        currency: order.currency as "INR",
        name: "Shri Mahalaxmi Mandir",
        description: `Donation: ${purpose}`,
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
                name: name || "Anonymous Devotee",
                amount: Number(amount),
                purpose: purpose,
                date: new Date().toISOString(),
              };
              
              await contentApi.createDonation(payload);
              setIsSuccess(true);
            }
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: name,
        },
        theme: {
          color: "#D4AF37",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (err) {
      console.error("Donation initialization failed:", err);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const predefinedAmounts = [501, 1001, 2100, 5100, 11000];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-950 pb-20">
      <Navbar />
      
      <PageHero 
        breadcrumb="Donate"
        badge="Temple Seva"
        title="Make a Sacred Donation to"
        titleGold="Karveer Nivasini Ambabai"
        description="Support the Karveer Nivasini Ambabai Mahalaxmi Mandir through your generous dan (donation) and receive divine blessings"
      />

      <div className="container-temple max-w-2xl mx-auto -mt-10 relative z-10">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="donate-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl border border-amber-300/80 bg-white shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#3C0F1A] via-[#5C1A29] to-[#2B0A12] p-6 text-white text-center">
                <Heart className="size-8 text-[var(--gold)] mx-auto mb-3" />
                <h2 className="font-serif text-2xl font-bold text-gradient-gold">Donation Form</h2>
                <p className="text-sm text-amber-100/80 mt-1">
                  Your generous contribution helps maintain the temple and its charitable activities.
                </p>
              </div>

              <form onSubmit={handleDonate} className="p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2">Select Amount (₹)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                    {predefinedAmounts.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt)}
                        className={`py-2 rounded-xl border text-sm font-bold transition-all ${
                          amount === amt
                            ? "bg-amber-900 text-white border-amber-900 shadow-md scale-105"
                            : "bg-stone-50 text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-800"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-stone-500 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Enter custom amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value) || "")}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-bold focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2">Devotee Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name (leave blank to be anonymous)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2">Donation Purpose</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    <option value="General Donation">General Temple Donation</option>
                    <option value="Annadaan (Food Offering)">Annadaan (Food Offering)</option>
                    <option value="Goushala (Cow Shelter)">Goushala (Cow Shelter)</option>
                    <option value="Temple Maintenance">Temple Maintenance & Renovation</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <button
                    type="submit"
                    disabled={loading || !amount}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white font-bold shadow-lg hover:from-[#5C1A29] hover:to-[#4A1521] transition-all flex items-center justify-center gap-2 border border-amber-400/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Donate ₹{amount || 0}</span>
                    <ArrowRight className="size-4 text-[var(--gold)]" />
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>100% Secure Encrypted Payment via Razorpay</span>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-xl space-y-4"
            >
              <div className="size-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto border-4 border-white shadow-md">
                <CheckCircle className="size-10 text-emerald-600" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-4">
                Dhanyawad! 🙏
              </h2>
              <p className="text-stone-600 leading-relaxed text-sm max-w-md mx-auto">
                Your donation of <strong>₹{amount}</strong> has been received successfully. May Goddess Ambabai Mahalaxmi bless you with peace and prosperity.
              </p>
              <div className="pt-6">
                <a href="/" className="inline-flex items-center gap-2 text-amber-800 font-bold hover:underline">
                  Return to Home page
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Footer />
    </main>
  );
}
