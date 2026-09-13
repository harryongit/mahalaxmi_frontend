"use client";

import { useState } from "react";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { authApi } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { ShieldCheck, Phone, KeyRound, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    try {
      await authApi.requestOtp(phone);
      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setLoading(true);
    try {
      await authApi.login(phone, otp);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />
      <PageHero
        title="Devotee"
        titleGold="Login"
        description="Access your profile and bookings securely."
        breadcrumb="Login"
      />
      <div className="flex-1 max-w-md mx-auto w-full py-16 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <ShieldCheck size={120} />
          </div>

          {step === "phone" ? (
            <>
              <h2 className="text-3xl font-serif text-[#3C0F1A] mb-2 font-bold relative z-10">Welcome Back</h2>
              <p className="text-stone-500 mb-8 relative z-10">Enter your mobile number to view your sevas</p>

              <form onSubmit={handleRequestOtp} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                      <Phone size={18} />
                    </span>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="w-full bg-[#3C0F1A] text-amber-50 py-3.5 rounded-xl font-medium hover:bg-[#2A0A12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("phone")}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 relative z-10 mb-2"
              >
                <ArrowLeft className="size-3" /> Edit number
              </button>
              <h2 className="text-3xl font-serif text-[#3C0F1A] mb-2 font-bold relative z-10">Enter OTP</h2>
              <p className="text-stone-500 mb-8 relative z-10">
                OTP sent to <strong>{phone}</strong>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">One-Time Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                      <KeyRound size={18} />
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 4}
                  className="w-full bg-[#3C0F1A] text-amber-50 py-3.5 rounded-xl font-medium hover:bg-[#2A0A12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Login Securely"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}