"use client";

import { useState } from "react";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { authApi } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { ShieldCheck, Phone } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    
    setLoading(true);
    try {
      const res = await authApi.login(phone);
      localStorage.setItem("access_token", res.access_token);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your number.");
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
          
          <h2 className="text-3xl font-serif text-[#3C0F1A] mb-2 font-bold relative z-10">Welcome Back</h2>
          <p className="text-stone-500 mb-8 relative z-10">Enter your mobile number to view your sevas</p>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
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
              {loading ? "Verifying..." : "Login Securely"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
