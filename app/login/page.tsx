"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  X,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import {
  Country,
  DEFAULT_COUNTRY,
  validatePhoneNumber,
} from "@/src/lib/countryCodes";
import { PhoneInputWithCountry } from "@/src/components/temple/PhoneInputWithCountry";

export default function LoginPage() {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState<"input" | "otp">("input");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();
  const { requestOtp, login } = useAuth();

  // 60-second live countdown timer for OTP resend
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

  // Auto-dismiss feedback: 5s for success, 8s for errors
  useEffect(() => {
    if (!feedback) return;
    const duration = feedback.type === "error" ? 8000 : 5000;
    const timer = setTimeout(() => {
      setFeedback(null);
    }, duration);
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
      setOtpDigits(["", "", "", "", "", ""]);

      const successText =
        res?.message ||
        `Verification OTP sent to your WhatsApp (${country.flag} ${country.dialCode} ${cleanDigits}).`;
      setFeedback({
        type: "success",
        text: successText,
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Failed to send OTP. Please check your WhatsApp number and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = getFullPhoneNumber();
    const otpString = otpDigits.join("").trim();

    if (otpString.length < 6) {
      setFeedback({ type: "error", text: "Please enter all 6 digits of the OTP received on WhatsApp." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await login(fullPhone, otpString);
      const isNew = res.is_new_user;
      setFeedback({
        type: "success",
        text: isNew
          ? "Welcome to Shree Ambabai Temple! Devotee account created."
          : res.message || "Login successful. Jai Shree Mahalakshmi!",
      });
      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Invalid or expired OTP code. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const autoFillOtp = (code: string) => {
    const digits = code.slice(0, 6).split("");
    while (digits.length < 6) digits.push("");
    setOtpDigits(digits);
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData) {
      autoFillOtp(pasteData);
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900 font-sans">
      <Navbar />
      <PageHero
        title="Devotee"
        titleGold="Portal"
        description="Access your sacred devotee profile, rituals, and bookings securely via WhatsApp OTP."
        breadcrumb="Account"
      />
      <div className="flex-1 max-w-md mx-auto w-full py-12 px-4">
        {/* Card Container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-200/80 relative overflow-visible">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <ShieldCheck size={140} />
          </div>

          {/* Animated Feedback Toast Banner */}
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                key="feedback-banner"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`mb-5 text-xs font-semibold rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm border ${
                  feedback.type === "success"
                    ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                    : "bg-red-50 text-red-900 border-red-300"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="size-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed flex-1">{feedback.text}</span>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 1: Phone Input Screen */}
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
                Enter your WhatsApp mobile number to receive a secure 6-digit OTP. If you don&apos;t have an account, one will be created automatically.
              </p>

              <form onSubmit={handleRequestOtp} className="space-y-4 relative z-10">
                {/* Phone Input with attached floating country dropdown */}
                <PhoneInputWithCountry
                  country={country}
                  onCountryChange={setCountry}
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={(val) => {
                    setPhoneNumber(val);
                    if (feedback) setFeedback(null);
                  }}
                  disabled={loading}
                  autoFocus
                  id="login-page-phone-input"
                  label="WhatsApp Mobile Number"
                  error={feedback?.type === "error" ? feedback.text : null}
                />

                {/* Reassurance Info Box */}
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-amber-50/70 border border-amber-200/80 text-xs text-stone-700 flex items-start gap-2.5">
                  <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <MessageSquare className="size-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-[11px] text-stone-800">
                      Official WhatsApp OTP Verification
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
                      <span>Sending WhatsApp OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send WhatsApp OTP</span>
                      <ArrowRight className="size-4 text-amber-300" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* STEP 2: OTP Verification Screen */}
          {step === "otp" && (
            <>
              <button
                type="button"
                onClick={() => {
                  setStep("input");
                  setFeedback(null);
                }}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 relative z-10 mb-3 cursor-pointer font-semibold"
              >
                <ArrowLeft className="size-3" /> Change mobile number
              </button>
              <h2 className="text-2xl font-serif text-[#3C0F1A] mb-1 font-bold relative z-10">
                Enter Verification OTP
              </h2>
              <p className="text-xs text-stone-500 mb-2 relative z-10">
                Code sent to WhatsApp: <strong>{country.flag} {country.dialCode} {phoneNumber}</strong>
              </p>

              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium">
                <Clock className="size-3 text-amber-700" />
                <span>Expires in 5 minutes</span>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4 relative z-10">
                {/* 6-Digit Separate Boxes */}
                <div className="flex justify-center gap-2 sm:gap-2.5 my-2" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`login-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      autoFocus={idx === 0}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = [...otpDigits];
                        newOtp[idx] = val;
                        setOtpDigits(newOtp);
                        if (val && idx < 5) {
                          const nextInput = document.getElementById(`login-otp-${idx + 1}`);
                          nextInput?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
                          const prevInput = document.getElementById(`login-otp-${idx - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="size-11 sm:size-12 rounded-xl bg-stone-50 border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 text-center font-bold text-xl text-stone-900 focus:outline-none transition-all shadow-inner"
                    />
                  ))}
                </div>

                <p className="text-[11px] text-stone-500 italic text-center">
                  Tip: Tap &ldquo;Copy code&rdquo; in WhatsApp and paste here directly.
                </p>

                <button
                  type="submit"
                  disabled={loading || otpDigits.join("").length < 6}
                  className="w-full bg-[#3C0F1A] text-amber-50 py-3 rounded-xl font-bold text-sm hover:bg-[#2A0A12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="size-4 animate-spin text-amber-300" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <span>Verify & Continue</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("input");
                      setFeedback(null);
                    }}
                    className="text-stone-500 hover:text-stone-900 underline cursor-pointer"
                  >
                    Edit number
                  </button>
                  <button
                    type="button"
                    id="login-page-resend-otp-btn"
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
