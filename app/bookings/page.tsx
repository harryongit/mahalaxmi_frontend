"use client";

import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { Flame, Calendar, Clock, Download, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const mockBookings = [
  {
    id: "PUJA-2026-8841",
    name: "Special Mahapuja & Kumkumarchana",
    deity: "Goddess Ambabai Mahalaxmi",
    date: "Aug 20, 2026",
    time: "06:00 AM - 08:30 AM",
    status: "Upcoming",
    amount: "₹ 2,501",
    prasadam: "Home Delivery Scheduled",
  },
  {
    id: "PUJA-2026-7729",
    name: "Abhishek Seva & Archana",
    deity: "Goddess Ambabai",
    date: "Aug 02, 2026",
    time: "09:00 AM",
    status: "Completed",
    amount: "₹ 1,100",
    prasadam: "Delivered on Aug 04",
  },
  {
    id: "PUJA-2026-5510",
    name: "Sahasranama Archana",
    deity: "Goddess Ambabai",
    date: "Jul 15, 2026",
    time: "05:30 PM",
    status: "Completed",
    amount: "₹ 750",
    prasadam: "Delivered on Jul 17",
  },
];

export default function BookingsPage() {
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

      <main className="flex-1 py-12 px-4">
        <div className="container-temple max-w-4xl mx-auto space-y-8">
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

          {/* Bookings List Cards */}
          <div className="space-y-4">
            {mockBookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-stone-200 bg-white hover:border-amber-400/80 p-5 sm:p-6 transition-all space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-800">{b.id}</span>
                    <h3 className="font-serif text-lg font-bold text-stone-900">{b.name}</h3>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center ${
                      b.status === "Upcoming"
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    }`}
                  >
                    <CheckCircle2 className="size-3.5" />
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-600 font-medium">
                    <Calendar className="size-4 text-amber-800 shrink-0" />
                    <span>{b.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-600 font-medium">
                    <Clock className="size-4 text-amber-800 shrink-0" />
                    <span>{b.time}</span>
                  </div>

                  <div className="text-stone-700 font-bold">
                    Amount Paid: <span className="text-amber-800">{b.amount}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs">
                  <span className="text-stone-700 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 font-medium">
                    🎁 Prasadam Status: <strong className="text-stone-900">{b.prasadam}</strong>
                  </span>

                  <button className="text-amber-900 hover:underline font-bold flex items-center gap-1 cursor-pointer">
                    <Download className="size-3.5" /> Download Devotee Receipt
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
