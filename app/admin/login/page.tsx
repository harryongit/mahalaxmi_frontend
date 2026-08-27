"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { authService } from "@/src/services/authService";

type ToastState = {
  type: "success" | "error" | "loading";
  message: string;
} | null;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = (type: "success" | "error" | "loading", message: string) => {
    setToast({ type, message });
    if (type !== "loading") {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("error", "Please enter valid Admin Email & Password.");
      return;
    }

    setLoading(true);
    showToast("loading", "Loading...");

    try {
      // Clean API Service Call (no direct URL in component)
      const data = await authService.adminLogin({
        email: email.trim(),
        password: password,
      });

      showToast("success", data.message || "Admin Login Successful!");

      if (typeof window !== "undefined") {
        localStorage.setItem("admin_auth", "true");
        localStorage.setItem("access_token", data.access_token);
      }

      setTimeout(() => {
        router.push("/admin");
      }, 700);

    } catch (err: any) {
      const backendErrorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password";

      showToast("error", backendErrorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#120407] via-[#1C0508] to-[#2B090F] text-white p-4 relative font-sans overflow-hidden">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-10 left-10 size-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 size-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* FLOATING ANIMATED BACKEND TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 z-[90] px-5 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-bold ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-emerald-950/50"
                : toast.type === "error"
                ? "bg-rose-950/90 border-rose-400 text-rose-200 shadow-rose-950/50"
                : "bg-amber-950/90 border-amber-400 text-amber-200 shadow-amber-950/50"
            }`}
          >
            {toast.type === "success" && <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />}
            {toast.type === "error" && <AlertCircle className="size-4 text-rose-400 shrink-0" />}
            {toast.type === "loading" && <Loader2 className="size-4 text-amber-400 animate-spin shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl border-2 border-[var(--gold)]/60 bg-[#1F070E]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-6 relative z-10"
      >
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-1 rounded-full bg-gradient-to-tr from-[var(--gold)] via-amber-300 to-amber-600 shadow-xl mx-auto">
            <img
              src="/logo.png"
              alt="Shri Mahalaxmi Mandir Logo"
              className="size-14 rounded-full object-cover border-2 border-amber-100"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-[10px] uppercase font-bold tracking-widest">
              <ShieldCheck className="size-3.5" />
              <span>Restricted Sansthan Portal</span>
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold mt-2">
              Admin Login
            </h1>
            <p className="text-xs text-amber-100/70 font-normal">
              Shri Mahalaxmi Mandir, Kolhapur
            </p>
          </div>
        </div>

        {/* Form Inputs (Dark Theme) */}
        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-amber-200 font-bold mb-1">
              Admin Email *
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 size-4 text-amber-400/70" />
              <input
                required
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-amber-300/40 text-white placeholder:text-stone-500 font-medium focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-200 font-bold mb-1">
              Admin Password *
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 size-4 text-amber-400/70" />
              <input
                required
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-amber-300/40 text-white placeholder:text-stone-500 font-medium focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2 mt-2 ${
              email && password
                ? "bg-gradient-to-r from-[var(--gold)] via-amber-300 to-amber-500 text-stone-950 hover:brightness-110 cursor-pointer"
                : "bg-stone-800 text-stone-500 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </span>
            ) : (
              <>
                <span>Login to Admin Dashboard</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-amber-200/50 font-medium border-t border-amber-900/40">
          Protected Admin Access • Service Layer: authService.adminLogin
        </div>

      </motion.div>

      <div className="mt-6 text-center text-xs text-amber-200/50">
        © {new Date().getFullYear()} Shri Mahalaxmi Mandir Kolhapur
      </div>
    </div>
  );
}
