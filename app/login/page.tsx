"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  KeyRound,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import {
  Country,
  DEFAULT_COUNTRY,
  isPhoneValid,
  validatePhoneNumber,
} from "@/src/lib/countryCodes";
import { PhoneInputWithCountry } from "@/src/components/temple/PhoneInputWithCountry";

export default function LoginPage() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();
  const { requestOtp, login } = useAuth();

  // 60-second live ticking countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCountdown]);

  // Auto-dismiss error and success messages after 3 seconds
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => {
      setFeedback(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const getFullPhoneNumber = () => {
    return `${country.dialCode}${phoneNumber.trim().replace(/\D/g, "")}`;
  };

  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (resendCountdown > 0 && step === "otp") {
      return;
    }

    const cleanDigits = phoneNumber.trim().replace(/\D/g, "");
    const validation = validatePhoneNumber(phoneNumber, country);

    if (!validation.isValid) {
      setFeedback({
        type: "error",
        text: validation.error || `Please enter a valid phone number for ${country.name}.`,
      });
      return;
    }

    const fullPhone = getFullPhoneNumber();
    setFeedback(null);
    setLoading(true);

    try {
      const res = await requestOtp(fullPhone);
      setStep("otp");
      setResendCountdown(60); // 1-minute countdown
      if (res && res.otp) {
        setDevOtpHint(res.otp);
      } else {
        setDevOtpHint("123456");
      }
      setFeedback({
        type: "success",
        text: `OTP sent to ${country.flag} ${country.dialCode} ${cleanDigits}. Please enter it below.`,
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Failed to send OTP. Please check your number and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = getFullPhoneNumber();
    const cleanOtp = otp.trim();

    if (cleanOtp.length < 6) {
      setFeedback({ type: "error", text: "Please enter the complete 6-digit OTP." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await login(fullPhone, cleanOtp);
      const isNew = res.is_new_user;
      setFeedback({
        type: "success",
        text: isNew
          ? "Welcome to Shree Ambabai Temple! Devotee account created."
          : res.message || "Login successful. Jai Mata Di!",
      });
      setTimeout(() => {
        router.push("/profile");
      }, 700);
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Invalid OTP code. Please check and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900 font-sans">
      <Navbar />
      <PageHero
        title="Devotee"
        titleGold="Portal"
        description="Access your sacred devotee profile, rituals, and bookings securely via mobile OTP."
        breadcrumb="Account"
      />
      <div className="flex-1 max-w-md mx-auto w-full py-12 px-4">
        {/* Card Container - overflow-visible ensures the floating dropdown is never clipped */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-200/80 relative overflow-visible">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <ShieldCheck size={140} />
          </div>

          {/* Feedback Banner */}
          {feedback && (
            <div
              className={`mb-5 text-xs font-semibold rounded-xl p-3 flex items-start gap-2 ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                  : "bg-red-50 text-red-700 border border-red-300"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="size-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* STEP 1: Phone Input */}
          {step === "input" && (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-[11px] font-bold mb-3">
                <Sparkles className="size-3 text-amber-600" />
                <span>Instant Mobile & WhatsApp Access</span>
              </div>

              <h2 className="text-2xl font-serif text-[#3C0F1A] mb-1 font-bold relative z-10">
                Devotee Sign In
              </h2>
              <p className="text-xs text-stone-500 mb-6 relative z-10">
                Enter your WhatsApp / Mobile number to receive a secure OTP. If you don't have an account, one will be created automatically.
              </p>

              <form onSubmit={handleRequestOtp} className="space-y-4 relative z-10">
                {/* Phone Input with attached floating country dropdown */}
                <PhoneInputWithCountry
                  country={country}
                  onCountryChange={setCountry}
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={setPhoneNumber}
                  disabled={loading}
                  autoFocus
                  id="login-page-phone-input"
                  label="WhatsApp / Mobile Number"
                  error={feedback?.type === "error" ? feedback.text : null}
                />

                {/* Reassurance Info Box */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-amber-50/70 border border-amber-200/80 text-xs text-stone-700 flex items-start gap-2.5">
                  <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <MessageSquare className="size-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-[11px] text-stone-800">
                      WhatsApp & SMS OTP Verification
                    </p>
                    <p className="text-[10px] text-stone-600 leading-relaxed">
                      OTP will be sent to <strong>{country.dialCode} {phoneNumber || "your number"}</strong>. Devotees without an existing account will be registered automatically.
                    </p>
                  </div>
                </div>

                <button
                  id="login-page-send-otp-btn"
                  type="submit"
                  disabled={loading || phoneNumber.trim().length < 6}
                  className="w-full bg-[#3C0F1A] text-amber-50 py-3.5 rounded-xl font-bold text-sm hover:bg-[#2A0A12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="size-4 animate-spin text-amber-300" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Login OTP</span>
                      <ArrowRight className="size-4 text-amber-300" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* STEP 2: OTP Verification */}
          {step === "otp" && (
            <>
              <button
                onClick={() => setStep("input")}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 relative z-10 mb-3 cursor-pointer font-semibold"
              >
                <ArrowLeft className="size-3" /> Change mobile number
              </button>
              <h2 className="text-2xl font-serif text-[#3C0F1A] mb-1 font-bold relative z-10">
                Enter Verification OTP
              </h2>
              <p className="text-xs text-stone-500 mb-4 relative z-10">
                OTP code sent to <strong>{country.flag} {country.dialCode} {phoneNumber}</strong>
              </p>

              {devOtpHint && (
                <div className="bg-amber-100/90 border border-amber-300 rounded-xl px-3 py-2 text-left flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      Dev Test OTP:
                    </span>
                    <span className="ml-1.5 font-mono font-bold text-sm text-amber-950">
                      {devOtpHint}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtp(devOtpHint)}
                    className="px-2.5 py-1 rounded-lg bg-amber-800 text-amber-50 text-[10px] font-bold hover:bg-amber-900 transition-colors cursor-pointer"
                  >
                    Auto Fill
                  </button>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    6-Digit OTP Code
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                      <KeyRound size={16} />
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="e.g. 123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-400/30 focus:border-amber-500 transition-colors outline-none font-mono font-bold text-center text-base tracking-widest text-stone-900"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full bg-[#3C0F1A] text-amber-50 py-3 rounded-xl font-bold text-sm hover:bg-[#2A0A12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="size-4 animate-spin text-amber-300" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify & Continue</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="text-stone-500 hover:text-stone-900 underline cursor-pointer"
                  >
                    Edit number
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRequestOtp()}
                    disabled={loading || resendCountdown > 0}
                    className={
                      resendCountdown > 0
                        ? "text-stone-400 font-medium cursor-not-allowed select-none"
                        : "text-amber-900 font-bold hover:underline cursor-pointer"
                    }
                  >
                    {resendCountdown > 0 ? (
                      <span>Resend OTP in {resendCountdown}s</span>
                    ) : (
                      <span>Resend OTP</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-6 pt-4 border-t border-stone-200 text-center flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>Protected by Shree Ambabai Temple Kolhapur Trust</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}