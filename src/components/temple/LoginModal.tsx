"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import {
  Country,
  DEFAULT_COUNTRY,
  validatePhoneNumber,
} from "@/src/lib/countryCodes";
import { PhoneInputWithCountry } from "./PhoneInputWithCountry";

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLoginSuccess?: (user: any) => void;
}

export function LoginModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  onLoginSuccess,
}: LoginModalProps) {
  const auth = useAuth();

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : auth.isLoginModalOpen;
  const handleModalClose = propOnClose || auth.closeLoginModal;

  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Auto-dismiss feedback: 5s for success, 8s for errors
  useEffect(() => {
    if (!feedback) return;
    const duration = feedback.type === "error" ? 8000 : 5000;
    const timer = setTimeout(() => {
      setFeedback(null);
    }, duration);
    return () => clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    if (!isModalOpen) {
      // Reset state on close
      setStep("input");
      setFeedback(null);
      setOtp(["", "", "", "", "", ""]);
      setResendCountdown(0);
    }
  }, [isModalOpen]);

  const getFullPhoneNumber = () => {
    return `${country.dialCode}${phoneNumber.trim().replace(/\D/g, "")}`;
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
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
      const res = await auth.requestOtp(fullPhone);
      setStep("otp");
      setResendCountdown(60); // 1-minute cooldown
      setOtp(["", "", "", "", "", ""]);

      const successText =
        res?.message ||
        `Verification OTP sent to your WhatsApp number (${country.dialCode} ${cleanDigits}).`;
      setFeedback({
        type: "success",
        text: successText,
      });
    } catch (error: any) {
      const msg = error?.message || "Failed to send OTP. Please check your WhatsApp number.";
      setFeedback({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = getFullPhoneNumber();
    const otpString = otp.join("").trim();

    if (otpString.length < 6) {
      setFeedback({ type: "error", text: "Please enter all 6 digits of the OTP received on WhatsApp." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await auth.login(fullPhone, otpString);
      const isNew = res.is_new_user;
      const successMessage = isNew
        ? "Welcome to Shree Ambabai Temple! Devotee account created."
        : res.message || "Login successful. Jai Shree Mahalakshmi!";

      setFeedback({ type: "success", text: successMessage });
      if (onLoginSuccess) {
        onLoginSuccess({
          phone: fullPhone,
          name: auth.user?.name || "Devotee",
        });
      }

      setTimeout(() => {
        handleModalClose();
      }, 800);
    } catch (error: any) {
      const msg = error?.message || "Invalid or expired OTP code. Please try again.";
      setFeedback({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const autoFillOtp = (code: string) => {
    const digits = code.slice(0, 6).split("");
    while (digits.length < 6) digits.push("");
    setOtp(digits);
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData) {
      autoFillOtp(pasteData);
      setFeedback(null);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative w-full max-w-md overflow-visible rounded-3xl border border-amber-300/70 bg-[#FAF8F5] text-stone-800 shadow-2xl z-10 font-sans"
          >
            {/* Regal Temple Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white text-center relative border-b border-amber-400/30 rounded-t-3xl">
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              <h3 id="devotee-modal-title" className="font-serif text-2xl font-bold text-gradient-gold">
                {step === "otp" ? "Verification OTP" : "Devotee Login"}
              </h3>
              <p className="text-xs text-amber-100/75 mt-1">
                {step === "otp"
                  ? "Enter the 6-digit verification code sent to your WhatsApp"
                  : "Enter your WhatsApp number for instant OTP verification"}
              </p>
            </div>

            {/* Form Body */}
            <div className="p-5 sm:p-7 space-y-4 rounded-b-3xl">
              {/* Dynamic Toast / Feedback Banner */}
              <AnimatePresence mode="wait">
                {feedback && (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    id="devotee-modal-feedback"
                    className={`text-xs font-semibold rounded-xl p-3 flex items-start gap-2.5 shadow-sm border ${
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
                <form id="devotee-input-form" onSubmit={handleSendOtp} className="space-y-4">
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
                    id="devotee-phone-input"
                    label="WhatsApp Mobile Number"
                    error={feedback?.type === "error" ? feedback.text : null}
                  />

                  {/* Reassurance Notice */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-amber-50/70 border border-amber-200/80 text-xs text-stone-700 flex items-start gap-2.5">
                    <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                      <MessageSquare className="size-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-[11px] text-stone-800">
                        Official WhatsApp Verification
                      </p>
                      <p className="text-[10px] text-stone-600 leading-relaxed">
                        A dynamic 6-digit OTP will be delivered directly to your WhatsApp. New devotees will be registered automatically upon verification.
                      </p>
                    </div>
                  </div>

                  <button
                    id="devotee-send-otp-btn"
                    type="submit"
                    disabled={loading || phoneNumber.trim().length < 6}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-sm font-bold hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/40 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin text-amber-300" />
                        <span>Sending WhatsApp OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send WhatsApp OTP</span>
                        <ArrowRight className="size-4 text-[var(--gold)]" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* STEP 2: OTP Verification Screen */}
              {step === "otp" && (
                <form id="devotee-otp-form" onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                  <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5">
                    <p className="text-xs text-stone-700">
                      We sent a 6-digit verification code to WhatsApp:
                    </p>
                    <p className="text-sm font-bold text-stone-900 font-mono mt-0.5">
                      {country.flag} {country.dialCode} {phoneNumber}
                    </p>
                    <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] text-amber-900/80 font-medium">
                      <Clock className="size-3 text-amber-700" />
                      <span>Expires in 5 minutes</span>
                    </div>
                  </div>

                  {/* 6-Digit OTP Inputs */}
                  <div className="flex justify-center gap-2 sm:gap-2.5 my-2" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        autoFocus={idx === 0}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          const newOtp = [...otp];
                          newOtp[idx] = val;
                          setOtp(newOtp);
                          if (val && idx < 5) {
                            const nextInput = document.getElementById(`otp-input-${idx + 1}`);
                            nextInput?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                            const prevInput = document.getElementById(`otp-input-${idx - 1}`);
                            prevInput?.focus();
                          }
                        }}
                        className="size-10 sm:size-11 rounded-xl bg-white border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-400/30 text-center font-bold text-lg text-stone-900 focus:outline-none transition-all shadow-inner"
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-stone-500 italic">
                    Tip: Tap &ldquo;Copy code&rdquo; in WhatsApp and paste here directly.
                  </p>

                  <button
                    id="devotee-verify-otp-btn"
                    type="submit"
                    disabled={loading || otp.join("").length < 6}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-sm font-bold hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/40 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin text-amber-300" />
                        <span>Verifying OTP...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-4 text-[var(--gold)]" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("input");
                        setFeedback(null);
                      }}
                      className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                    >
                      <ArrowLeft className="size-3" /> Change number
                    </button>
                    <button
                      type="button"
                      id="devotee-resend-otp-btn"
                      onClick={() => handleSendOtp()}
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
              )}

              <div className="pt-2 border-t border-stone-200 text-center flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>Protected by Shree Ambabai Temple Kolhapur Trust</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
