"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { Flame, Calendar, Clock, Download, CheckCircle2, Sparkles, LogIn, Copy, Package, Heart, User, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "@/src/lib/api";
import { formatDate } from "@/src/lib/utils";
import { useAuth } from "@/src/context/AuthContext";

export default function BookingsPage() {
  const { isLoggedIn, isLoading: authLoading, openLoginModal } = useAuth();
  const [filter, setFilter] = useState<"all" | "confirmed" | "failed">("all");

  const { data: bookingsData = [], isLoading } = useQuery({
    queryKey: ["user", "bookings"],
    queryFn: bookingApi.getUserBookings,
    enabled: isLoggedIn,
    staleTime: 3000,
  });

  const bookings: any[] = Array.isArray(bookingsData)
    ? bookingsData
    : Array.isArray((bookingsData as any)?.data)
    ? (bookingsData as any).data
    : [];

  const confirmedCount = bookings.filter((b) => b.paymentStatus === "Paid & Confirmed" || b.paymentStatus === "Completed").length;
  const failedCount = bookings.filter((b) => b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail")).length;

  const filteredBookings = bookings.filter((b) => {
    const isFailed = b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail");
    if (filter === "confirmed") return !isFailed;
    if (filter === "failed") return isFailed;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* Proper Dark Compact Hero Banner */}
      <PageHero
        breadcrumb="My Bookings"
        badge="Live Puja Tracking"
        title="My Puja"
        titleGold="Bookings & Receipts"
        description="Track your upcoming ritual schedules, live photography updates, and download official receipts."
      />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="container-temple max-w-4xl mx-auto space-y-8">
          {!isLoggedIn && !authLoading ? (
            /* Unauthenticated Devotee Bookings Callout Card */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-amber-300/80 bg-white p-8 sm:p-12 text-center shadow-xl space-y-5"
            >
              <div className="size-16 rounded-full bg-orange-100 border-2 border-orange-300 mx-auto flex items-center justify-center text-orange-800 shadow-sm">
                <Flame className="size-8 text-orange-600" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3C0F1A]">
                  Devotee Sign In Required
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Please sign in with your WhatsApp or mobile number to view your scheduled pujas, live priest updates, and download official donation receipts.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center">
                <button
                  onClick={() => openLoginModal()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4A1521] to-[#3B0E19] text-white font-bold text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 border border-amber-400/40 cursor-pointer"
                >
                  <LogIn className="size-4 text-[var(--gold)]" />
                  <span>Devotee Login (WhatsApp / Mobile)</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header Action Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-3xl border border-[var(--gold)]/30 p-6 sm:p-8 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white shadow-xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-semibold border border-[var(--gold)]/30 mb-2">
                      <Flame className="size-3.5 text-amber-400" />
                      <span>Puja Reservations Dashboard</span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold">
                      My Puja Bookings
                    </h1>
                    <p className="text-sm text-amber-100/70">
                      Track live rituals, scheduled dates & prasadam dispatch
                    </p>
                  </div>

                  <Link
                    href="/rituals"
                    className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-900 font-semibold text-xs shadow-md hover:brightness-105 transition-all"
                  >
                    + Book New Puja
                  </Link>
                </div>
              </motion.div>

              {/* Filter Tabs: All | Confirmed | Failed */}
              {bookings.length > 0 && (
                <div className="flex items-center gap-2 pb-1 text-xs">
                  <span className="text-stone-500 font-bold">Filter Bookings:</span>
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                      filter === "all"
                        ? "bg-amber-900 text-white border-amber-900 shadow-xs"
                        : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    All ({bookings.length})
                  </button>
                  <button
                    onClick={() => setFilter("confirmed")}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                      filter === "confirmed"
                        ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                        : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    ✓ Confirmed ({confirmedCount})
                  </button>
                  {failedCount > 0 && (
                    <button
                      onClick={() => setFilter("failed")}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
                        filter === "failed"
                          ? "bg-rose-700 text-white border-rose-700 shadow-xs"
                          : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      ❌ Failed ({failedCount})
                    </button>
                  )}
                </div>
              )}

              {/* Bookings List Cards */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-12 text-stone-500 font-medium">Loading your bookings...</div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12 px-4 text-stone-600 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
                    <Sparkles className="size-8 text-amber-500 mx-auto" />
                    <h3 className="font-serif text-lg font-bold text-stone-800">No Puja Bookings Found</h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      You have not booked any sacred rituals yet. Explore temple pujas and perform sankalpa in your family name.
                    </p>
                    <Link
                      href="/rituals"
                      className="inline-block mt-2 py-2 px-4 rounded-xl bg-[#3C0F1A] text-amber-100 text-xs font-bold hover:bg-[#4D1624] transition-colors"
                    >
                      Explore Sacred Rituals
                    </Link>
                  </div>
                ) : (
                  filteredBookings.map((b: any, i: number) => {
                    const isFailed = b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail");
                    return (
                    <motion.div
                      key={b.id || i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-3xl border p-5 sm:p-6 transition-all space-y-4 shadow-sm ${
                        isFailed ? "border-rose-300 bg-rose-50/20" : "border-stone-200 bg-white hover:border-amber-400"
                      }`}
                    >
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              {b.bookingRef}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(b.bookingRef);
                                toast.success("Booking Reference copied!");
                              }}
                              className="text-stone-400 hover:text-stone-700 cursor-pointer"
                              title="Copy Booking ID"
                            >
                              <Copy className="size-3.5" />
                            </button>
                          </div>
                          <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">{b.pujaTitle}</h3>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold self-start sm:self-center shadow-2xs ${
                            isFailed
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : b.paymentStatus === "Completed"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : "bg-amber-100 text-amber-900 border border-amber-300"
                          }`}
                        >
                          {isFailed ? (
                            <AlertCircle className="size-3.5 text-rose-600" />
                          ) : (
                            <CheckCircle2 className="size-3.5 text-emerald-600" />
                          )}
                          {b.paymentStatus || "Paid & Confirmed"}
                        </span>
                      </div>

                      {/* Ritual & Devotee Metadata */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50/70 p-3.5 rounded-2xl border border-stone-100">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-500 block">Devotee & Gotra</span>
                          <span className="font-bold text-stone-900">{b.userName || "Devotee"}</span>
                          <span className="text-stone-600 font-medium ml-1.5">• Gotra: <strong className="text-amber-900">{b.gotra || "Kashyapa"}</strong></span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-500 block">Slot Date</span>
                          <div className="flex items-center gap-1.5 font-bold text-stone-800">
                            <Calendar className="size-3.5 text-amber-800" />
                            <span>{formatDate(b.pujaSlotDate || b.bookingDate)}</span>
                          </div>
                        </div>

                        {b.sankalp && (
                          <div className="sm:col-span-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-amber-950 font-medium">
                            <span className="text-[10px] uppercase font-bold text-amber-800 block">Sacred Sankalpa</span>
                            "{b.sankalp}"
                          </div>
                        )}

                        {b.familyMembers && (
                          <div className="sm:col-span-2 text-stone-600">
                            <strong className="text-stone-800 font-bold">Names for Recitation:</strong> {b.familyMembers}
                          </div>
                        )}

                        {b.addons && (
                          <div className="sm:col-span-2 text-stone-600">
                            <strong className="text-stone-800 font-bold">Sacred Offerings Included:</strong> {b.addons}
                          </div>
                        )}

                        {b.address && (
                          <div className="sm:col-span-2 flex items-start gap-1.5 text-stone-600">
                            <Package className="size-3.5 text-amber-800 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-stone-800 font-bold">Aashirwad / Prasad Delivery:</strong> {b.address}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer Details */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 text-xs border-t border-stone-100">
                        <div className="flex items-center gap-3">
                          <span className="text-stone-800 font-serif font-bold text-base">
                            Dakshina: <span className="text-amber-900">₹{b.amount}</span>
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium">
                            via {b.paymentMode || "Razorpay"}
                            {b.transactionId && ` (${b.transactionId})`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isFailed ? (
                            <Link
                              href={`/checkout?puja=${b.service_slug || b.pujaTitle}`}
                              className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                            >
                              <span>Retry Puja Booking</span>
                              <ArrowRight className="size-3.5" />
                            </Link>
                          ) : (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-stone-700 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200 text-[11px] font-semibold">
                                🎁 Holy Prasad: <strong>Scheduled</strong>
                              </span>
                              <a
                                href={bookingApi.getInvoiceUrl(b.bookingRef)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-[11px] flex items-center gap-1 transition-colors shadow-2xs"
                                title="Download Official PDF Invoice"
                              >
                                <Download className="size-3 text-amber-800" />
                                <span>Invoice PDF</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
