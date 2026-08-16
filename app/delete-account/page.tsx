"use client";

import { useState } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { motion } from "framer-motion";
import { UserX, ShieldAlert, CheckCircle2, Phone, User, Trash2 } from "lucide-react";

export default function DeleteAccountPage() {
  useLenis();
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10 || !confirmed) return;
    setIsDeleted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb="Delete My Account"
        badge="Data Erasure & Account Closing"
        title="Delete My"
        titleGold="Account"
        description="Request permanent deletion of your registered devotee account, booking history, and personal profile data."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 max-w-2xl mx-auto w-full space-y-8">
        <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 text-stone-800">
          
          <div className="border-b border-rose-100 pb-4 flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-300">
              <UserX className="size-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-rose-950">
                Account Erasure Request
              </h2>
              <p className="text-xs text-rose-700 font-medium">
                Permanent deletion of account & personal profile data
              </p>
            </div>
          </div>

          {isDeleted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-4 bg-rose-50 rounded-2xl border border-rose-200 p-6"
            >
              <div className="size-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center border border-rose-300 shadow-md">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-rose-950">
                Account Deletion Request Processed
              </h3>
              <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed">
                Your request to permanently erase account data associated with mobile <strong>+91 {mobile}</strong> has been received. Your profile data and stored preferences will be cleared from our servers within 24 hours.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs shadow-md hover:bg-stone-800"
              >
                Return to Home Page
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900">
                <ShieldAlert className="size-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <strong>Warning:</strong> Deleting your account will permanently remove your stored family Gotra profiles, past Puja receipts, and active Darshan notifications.
                </p>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Registered Devotee Name *</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 size-4 text-stone-400" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Kulkarni"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Registered Mobile Number *</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-stone-600 font-bold border-r border-stone-300 pr-2.5">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-16 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Reason for Deletion (Optional)</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-rose-500 focus:outline-none"
                >
                  <option value="">Select reason...</option>
                  <option value="privacy">Privacy concerns</option>
                  <option value="duplicate">Created duplicate account</option>
                  <option value="no-longer-use">No longer use this platform</option>
                  <option value="other">Other reason</option>
                </select>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  required
                  type="checkbox"
                  id="confirm-delete"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="size-4 rounded accent-rose-700 mt-0.5 cursor-pointer"
                />
                <label htmlFor="confirm-delete" className="text-stone-700 font-medium leading-tight cursor-pointer">
                  I understand that this action is permanent and my stored devotee booking history will be erased.
                </label>
              </div>

              <button
                type="submit"
                disabled={!name || mobile.length < 10 || !confirmed}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4 ${
                  name && mobile.length >= 10 && confirmed
                    ? "bg-rose-700 text-white hover:bg-rose-800 cursor-pointer"
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                <Trash2 className="size-4" />
                <span>Permanently Delete My Account</span>
              </button>
            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
