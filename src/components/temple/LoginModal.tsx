"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, ArrowRight, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest, ApiError } from "@/src/lib/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; phone: string; email: string }) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "phone" && !phone) return;
    if (method === "email" && !email) return;
    setFeedback(null);
    setStep("otp");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const phoneNumber = method === "phone" ? (phone || "9876543210") : email;
    try {
      const res = await apiRequest<{ access_token: string }>("/auth/login", "POST", {
        phone_number: phoneNumber,
      });

      if (typeof window !== "undefined" && res.data?.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
      }
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user", "stats"] });

      setFeedback({ type: "success", text: res.message || "Login successful. Jai Mata Di!" });
      onLoginSuccess({
        name: name || (method === "phone" ? "Devotee User" : email.split("@")[0]),
        phone: phone || "+91 98765 43210",
        email: email || "devotee@mahalaxmi.org",
      });
      resetForm();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to sign in right now. Please try again.";
      console.error("Login failed", error);
      setFeedback({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("input");
    setPhone("");
    setEmail("");
    setName("");
    setOtp(["", "", "", ""]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/65 backdrop-blur-sm"
          />

          {/* Modal Card - Combination of Light & Dark Theme */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-200/80 bg-[#FAF8F5] text-stone-800 shadow-2xl z-10"
          >
            {/* Dark Regal Header Accent */}
            <div className="p-6 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-semibold mb-2">
                <Sparkles className="size-3.5" />
                <span>Sacred Devotee Portal</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gradient-gold">
                {tab === "login" ? "Welcome Back to Mahalaxmi" : "Create Devotee Account"}
              </h3>
              <p className="text-xs text-amber-100/70 mt-1">
                To check all available pujas & offers, log in to your account
              </p>
            </div>

            {/* Light Form Body */}
            <div className="p-6 sm:p-7 space-y-5">
              {/* Tab Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-200/70 rounded-xl border border-stone-300/60">
                <button
                  type="button"
                  onClick={() => {
                    setTab("login");
                    setStep("input");
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${tab === "login"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                    }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("signup");
                    setStep("input");
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${tab === "signup"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                    }`}
                >
                  Create Account
                </button>
              </div>

              {step === "input" ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {tab === "signup" && (
                    <div>
                      <label className="block text-xs text-stone-700 font-semibold mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Deshmukh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none text-sm text-stone-900 placeholder:text-stone-400"
                      />
                    </div>
                  )}

                  {/* Method Switcher */}
                  <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                    <span>{method === "phone" ? "Mobile Number" : "Email Address"}</span>
                    <button
                      type="button"
                      onClick={() => setMethod(method === "phone" ? "email" : "phone")}
                      className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                    >
                      {method === "phone" ? (
                        <>
                          <Mail className="size-3" /> Use Email
                        </>
                      ) : (
                        <>
                          <Phone className="size-3" /> Use Phone
                        </>
                      )}
                    </button>
                  </div>

                  {method === "phone" ? (
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs text-stone-600 font-semibold border-r border-stone-300 pr-2.5">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none text-sm text-stone-900 font-medium placeholder:text-stone-400"
                      />
                    </div>
                  ) : (
                    <input
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none text-sm text-stone-900 font-medium placeholder:text-stone-400"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-sm font-semibold hover:from-[#5C1A29] hover:to-[#4A1521] shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/30 mt-2"
                  >
                    <span>Get Verification Code</span>
                    <ArrowRight className="size-4 text-[var(--gold)]" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                  <p className="text-xs text-stone-600 font-medium">
                    Enter 4-digit code sent to{" "}
                    <span className="text-amber-800 font-bold">
                      {method === "phone" ? `+91 ${phone || "98765 43210"}` : email}
                    </span>
                  </p>

                  {feedback && (
                    <div
                      className={`text-xs font-semibold rounded-lg px-3 py-2 ${
                        feedback.type === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {feedback.text}
                    </div>
                  )}

                  <div className="flex justify-center gap-2.5 my-4">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newOtp = [...otp];
                          newOtp[idx] = val;
                          setOtp(newOtp);
                          if (val && idx < 3) {
                            const nextInput = document.getElementById(`otp-${idx + 1}`);
                            nextInput?.focus();
                          }
                        }}
                        className="size-12 rounded-xl bg-white border border-amber-300 text-center font-bold text-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-sm font-semibold hover:from-[#5C1A29] hover:to-[#4A1521] shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/30 disabled:opacity-60"
                  >
                    <CheckCircle className="size-4 text-[var(--gold)]" />
                    <span>Verify & Proceed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="text-xs text-stone-500 hover:text-stone-800 underline mt-2 block mx-auto"
                  >
                    Change {method === "phone" ? "number" : "email"}
                  </button>
                </form>
              )}

              <div className="pt-3 border-t border-stone-200 text-center flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>100% Secure & Encryption Protected Portal</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
