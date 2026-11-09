"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  RefreshCw,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import {
  Country,
  DEFAULT_COUNTRY,
  isPhoneValid,
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
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
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

  // Auto-dismiss error and success messages after 3 seconds
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => {
      setFeedback(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    if (!isModalOpen) {
      // Reset state on close
      setStep("input");
      setFeedback(null);
      setDevOtpHint(null);
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
      if (res && res.otp) {
        setDevOtpHint(res.otp);
      } else {
        setDevOtpHint("123456");
      }
      setFeedback({
        type: "success",
        text: `Verification code sent to ${country.dialCode} ${cleanDigits}.`,
      });
    } catch (error: any) {
      const msg = error?.message || "Failed to send OTP. Please check your number.";
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
      setFeedback({ type: "error", text: "Please enter the complete 6-digit OTP code." });
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
      }, 700);
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

          {/* Modal Card - overflow-visible ensures the floating dropdown is never clipped! */}
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
                  ? "Enter the 6-digit verification code sent to your phone"
                  : "Enter your WhatsApp / Mobile number for instant OTP verification"}
              </p>
            </div>

            {/* Form Body - rounded bottom */}
            <div className="p-5 sm:p-7 space-y-4 rounded-b-3xl">
              {/* Status Feedback Notice */}
              {feedback && (
                <div
                  id="devotee-modal-feedback"
                  className={`text-xs font-semibold rounded-xl p-3 flex items-start gap-2 ${feedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-red-50 text-red-700 border border-red-300"
                    }`}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <X className="size-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* STEP 1: Phone Input Screen */}
              {step === "input" && (
                <form id="devotee-input-form" onSubmit={handleSendOtp} className="space-y-4">
                  {/* Phone Input with attached floating country dropdown */}
                  <PhoneInputWithCountry
                    country={country}
                    onCountryChange={setCountry}
                    phoneNumber={phoneNumber}
                    onPhoneNumberChange={setPhoneNumber}
                    disabled={loading}
                    autoFocus
                    id="devotee-phone-input"
                    label="WhatsApp / Mobile Number"
                    error={feedback?.type === "error" ? feedback.text : null}
                  />

                  {/* Reassurance Notice */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-amber-50/70 border border-amber-200/80 text-xs text-stone-700 flex items-start gap-2.5">
                    <div className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                      <MessageSquare className="size-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-[11px] text-stone-800">
                        Instant WhatsApp & SMS Verification
                      </p>
                      <p className="text-[10px] text-stone-600 leading-relaxed">
                        OTP will be sent to <strong>{country.dialCode} {phoneNumber || "your number"}</strong>. Devotees without an existing account will be registered automatically.
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
                        <span>Sending Sacred OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Login OTP</span>
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
                      We sent a 6-digit verification OTP to:
                    </p>
                    <p className="text-sm font-bold text-stone-900 font-mono mt-0.5">
                      {country.flag} {country.dialCode} {phoneNumber}
                    </p>
                  </div>

                  {/* Dev / Test OTP Helper Pill */}
                  {devOtpHint && (
                    <div id="dev-otp-container" className="bg-amber-100/90 border border-amber-300 rounded-xl px-3 py-2 text-left flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                          Dev Test OTP:
                        </span>
                        <span id="dev-otp-value" className="ml-1.5 font-mono font-bold text-sm text-amber-950">
                          {devOtpHint}
                        </span>
                      </div>
                      <button
                        type="button"
                        id="dev-otp-autofill-btn"
                        onClick={() => autoFillOtp(devOtpHint)}
                        className="px-2.5 py-1 rounded-lg bg-amber-800 text-amber-50 text-[10px] font-bold hover:bg-amber-900 transition-colors cursor-pointer"
                      >
                        Auto Fill
                      </button>
                    </div>
                  )}

                  <div className="flex justify-center gap-2 sm:gap-2.5 my-2" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
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
                        className="size-10 sm:size-11 rounded-xl bg-white border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-400/30 text-center font-bold text-lg text-stone-900 focus:outline-none transition-colors"
                      />
                    ))}
                  </div>

                  <button
                    id="devotee-verify-otp-btn"
                    type="submit"
                    disabled={loading || otp.join("").length < 6}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-sm font-bold hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/40 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin text-amber-300" />
                        <span>Verifying...</span>
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
                      onClick={() => setStep("input")}
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
