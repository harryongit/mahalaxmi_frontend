"use client";

import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { User, Phone, Mail, MapPin, ShieldCheck, Sparkles, Edit3, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, bookingApi } from "@/src/lib/api";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", "me"],
    queryFn: userApi.getMe,
  });

  const { data: stats } = useQuery({
    queryKey: ["user", "stats"],
    queryFn: userApi.getStats,
  });

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["user", "bookings"],
    queryFn: bookingApi.getUserBookings,
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => userApi.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      setIsEditing(false);
    }
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile: "",
    gotra: "",
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        gotra: user.gotra || "Kashyapa",
      });
    }
  }, [user]);

  const handleSave = () => {
    updateMutation.mutate(editForm);
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      {/* Proper Dark Compact Hero Banner */}
      <PageHero
        breadcrumb="My Profile"
        badge="Verified Devotee"
        title="Devotee"
        titleGold="Account Profile"
        description="Manage your contact details, prasadam delivery address, and gotra ritual preferences."
      />

      <main className="flex-1 py-12 px-4">
        <div className="container-temple max-w-4xl mx-auto space-y-8">
          {/* Header Devotee Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl border border-[var(--gold)]/30 p-6 sm:p-8 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white shadow-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <div className="size-20 rounded-full bg-[var(--gold)]/20 border-2 border-[var(--gold)] flex items-center justify-center font-serif text-3xl text-[var(--gold)] font-bold shadow-xl shrink-0">
                {user?.name ? user.name.charAt(0) : "D"}
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-semibold border border-[var(--gold)]/30 mb-1">
                  <ShieldCheck className="size-3.5" />
                  <span>Verified Devotee</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {user?.name}
                </h1>
                <p className="text-sm text-amber-100/70">Registered Member • {user?.city || "Kolhapur"} Circle</p>
              </div>

              {isEditing ? (
                <div className="sm:ml-auto flex gap-2">
                  <button onClick={handleSave} className="px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer">
                    <Check className="size-3.5 text-emerald-400" />
                    <span>Save</span>
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-full border border-rose-500/40 bg-rose-500/20 hover:bg-rose-500/30 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer">
                    <X className="size-3.5 text-rose-400" />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="sm:ml-auto px-4 py-2 rounded-full border border-[var(--gold)]/40 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer">
                  <Edit3 className="size-3.5 text-[var(--gold)]" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                <User className="size-5 text-amber-800" />
                <h2 className="font-serif text-xl font-bold text-stone-900">Personal Details</h2>
              </div>

              <div className="space-y-3.5 text-sm">
                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Full Name</span>
                  {isEditing ? (
                    <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="mt-1 w-full p-2 border rounded-md text-stone-900 bg-white" />
                  ) : (
                    <span className="text-stone-900 font-semibold">{user?.name || "N/A"}</span>
                  )}
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Mobile Number</span>
                  {isEditing ? (
                    <input type="text" value={editForm.mobile} onChange={e => setEditForm({...editForm, mobile: e.target.value})} className="mt-1 w-full p-2 border rounded-md text-stone-900 bg-white" />
                  ) : (
                    <span className="text-stone-900 font-semibold flex items-center gap-2">
                      <Phone className="size-3.5 text-amber-800" /> {user?.mobile || "N/A"}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Email Address</span>
                  {isEditing ? (
                    <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="mt-1 w-full p-2 border rounded-md text-stone-900 bg-white" />
                  ) : (
                    <span className="text-stone-900 font-semibold flex items-center gap-2">
                      <Mail className="size-3.5 text-amber-800" /> {user?.email || "N/A"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Devotional Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                <Sparkles className="size-5 text-amber-800" />
                <h2 className="font-serif text-xl font-bold text-stone-900">Ritual Preferences</h2>
              </div>

              <div className="space-y-3.5 text-sm">
                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Preferred Gotra</span>
                  {isEditing ? (
                    <select value={editForm.gotra} onChange={e => setEditForm({...editForm, gotra: e.target.value})} className="mt-1 w-full p-2 border rounded-md text-stone-900 bg-white">
                      <option value="Atri">Atri</option>
                      <option value="Bharadvaja">Bharadvaja</option>
                      <option value="Gautama">Gautama</option>
                      <option value="Jamadagni">Jamadagni</option>
                      <option value="Kashyapa">Kashyapa</option>
                      <option value="Vasishta">Vasishta</option>
                      <option value="Vishvamitra">Vishvamitra</option>
                    </select>
                  ) : (
                    <span className="text-stone-900 font-semibold">{user?.gotra || "N/A"}</span>
                  )}
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Favorite Puja Types</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                      Kumkumarchana
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                      Abhishek Seva
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-stone-500 font-semibold block">Recent Devotee Activity</span>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Booked {stats?.total_orders ?? 0} rituals. {stats?.active_orders ?? 0} active orders.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm mt-6"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-amber-800" />
                <h2 className="font-serif text-xl font-bold text-stone-900">Seva Booking History</h2>
              </div>
            </div>

            {isLoadingBookings ? (
              <div className="text-center py-8 text-stone-500 text-sm font-medium">Loading your bookings...</div>
            ) : bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking: any) => (
                  <div key={booking.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="font-bold text-stone-900 text-sm">{booking.pujaTitle}</div>
                      <div className="text-xs text-stone-500 mt-1">
                        Ref: <span className="font-mono font-bold text-amber-800">{booking.bookingRef}</span> • {new Date(booking.bookingDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1.5 flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md font-bold ${
                          booking.paymentStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          booking.paymentStatus === 'Paid & Confirmed' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {booking.paymentStatus}
                        </span>
                        <span>Slot: <strong>{new Date(booking.pujaSlotDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}</strong></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-stone-200 pt-3 sm:pt-0">
                      <div className="text-right">
                        <div className="font-serif font-bold text-lg text-[#3C0F1A]">₹{booking.amount}</div>
                      </div>
                      <button 
                        onClick={() => window.location.href = `/checkout?puja=${booking.service_slug || 'lakshmi-puja'}&name=${encodeURIComponent(booking.userName || '')}&mobile=${booking.mobile || ''}`}
                        className="px-4 py-2 bg-[#3C0F1A] hover:bg-[#4D1624] text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        Rebook
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-stone-500 text-sm font-medium">
                You have not booked any sevas yet.
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
