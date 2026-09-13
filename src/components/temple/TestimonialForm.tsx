"use client";

import { useState } from "react";
import { contentApi } from "@/src/lib/api";
import { MessageSquarePlus, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;
    setLoading(true);
    setError("");

    try {
      await contentApi.createTestimonial({ name, role, text });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setName("");
    setRole("");
    setText("");
    setError("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition-colors shadow-md border border-stone-700"
      >
        <MessageSquarePlus className="size-4 text-[var(--gold)]" />
        <span>Share Your Experience</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setIsOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl z-10 border border-amber-200"
            >
              <div className="bg-gradient-to-r from-[#3C0F1A] via-[#5C1A29] to-[#2B0A12] p-5 text-white flex justify-between items-center border-b border-[var(--gold)]/30">
                <h3 className="font-serif text-xl font-bold text-gradient-gold">Share Your Experience</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white"
                  disabled={loading}
                >
                  ✕
                </button>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-stone-800">
                  <p className="text-xs text-stone-500 mb-4">
                    Your testimonial will be reviewed by the temple administration before it is published on the website.
                  </p>
                  
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-stone-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Patil"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-stone-700">City / Role (Optional)</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Devotee from Mumbai"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-stone-700">Your Testimonial *</label>
                    <textarea
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Write your experience..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !name || !text}
                      className="w-full py-3 rounded-xl bg-amber-900 text-white font-bold text-sm shadow-md hover:bg-amber-950 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="size-4 animate-spin" /> : <span>Submit Testimonial</span>}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="size-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">Thank You! 🙏</h3>
                    <p className="text-sm text-stone-600 mt-2">
                      Your experience has been successfully submitted and will be published soon after review.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-sm hover:bg-stone-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
