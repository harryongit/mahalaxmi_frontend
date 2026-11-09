"use client";

import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { User, Phone, Mail, MapPin, ShieldCheck, Sparkles, Edit3, Check, X, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, bookingApi } from "@/src/lib/api";
import { useState, useEffect } from "react";
import { formatDate } from "@/src/lib/utils";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { user: authUser, isLoggedIn, isLoading: authLoading, openLoginModal, updateUserLocal } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", "me"],
    queryFn: userApi.getProfile,
    enabled: isLoggedIn,
    initialData: authUser || undefined,
  });

  const { data: stats } = useQuery({
    queryKey: ["user", "stats"],
    queryFn: userApi.getStats,
    enabled: isLoggedIn,
  });

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["user", "bookings"],
    queryFn: bookingApi.getUserBookings,
    enabled: isLoggedIn,
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => userApi.updateProfile(data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      if (updated) {
        updateUserLocal(updated);
      }
      setIsEditing(false);
    },
  });

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile: "",
    gotra: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const activeUser = user || authUser;
    if (activeUser) {
      setEditForm({
        name: activeUser.name || "",
        email: activeUser.email || "",
        mobile: activeUser.mobile || "",
        gotra: activeUser.gotra || "",
        city: activeUser.city || "",
        address: activeUser.address || "",
      });
    }
  }, [user, authUser]);

  const handleSave = () => {
    updateMutation.mutate(editForm);
  };

  const activeDevotee = user || authUser;

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

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="container-temple max-w-4xl mx-auto space-y-8">
          {!isLoggedIn && !authLoading ? (
            /* Unauthenticated Devotee Callout Card */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-amber-300/80 bg-white p-8 sm:p-12 text-center shadow-xl space-y-5"
            >
              <div className="size-16 rounded-full bg-amber-100 border-2 border-amber-300 mx-auto flex items-center justify-center text-amber-800 shadow-sm">
                <Sparkles className="size-8 text-amber-600" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3C0F1A]">
                  Devotee Sign In Required
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Please log in with your WhatsApp or mobile number to view and manage your sacred devotee profile, addresses, and ritual preferences.
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
              {/* Header Devotee Identity Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-3xl border border-[var(--gold)]/30 p-6 sm:p-8 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white shadow-xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                  <div className="size-20 rounded-full bg-[var(--gold)]/20 border-2 border-[var(--gold)] flex items-center justify-center font-serif text-3xl text-[var(--gold)] font-bold shadow-xl shrink-0">
                    {activeDevotee?.name ? activeDevotee.name.charAt(0).toUpperCase() : "D"}
                  </div>

                  <div className="text-center sm:text-left space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-semibold border border-[var(--gold)]/30 mb-1">
                      <ShieldCheck className="size-3.5" />
                      <span>Verified Devotee</span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold">
                      {activeDevotee?.name && activeDevotee.name.trim() ? activeDevotee.name : (activeDevotee?.mobile || "Devotee")}
                    </h1>
                    <p className="text-sm text-amber-100/70">
                      Registered Member {activeDevotee?.city && activeDevotee.city.trim() ? `• ${activeDevotee.city} Circle` : ""}
                    </p>
                  </div>

                  {isEditing ? (
                    <div className="sm:ml-auto flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 hover:bg-emerald-500/30 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer"
                      >
                        <Check className="size-3.5 text-emerald-400" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 rounded-full border border-rose-500/40 bg-rose-500/20 hover:bg-rose-500/30 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer"
                      >
                        <X className="size-3.5 text-rose-400" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="sm:ml-auto px-4 py-2 rounded-full border border-[var(--gold)]/40 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer"
                    >
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
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="mt-1 w-full p-2 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:border-amber-500"
                        />
                      ) : (
                        <span className="text-stone-900 font-semibold">{activeDevotee?.name && activeDevotee.name.trim() ? activeDevotee.name : "Devotee"}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Mobile Number</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Phone className="size-3.5 text-amber-800" />
                        <span className="font-mono font-semibold text-stone-800">
                          {activeDevotee?.mobile || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Email Address</span>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="mt-1 w-full p-2 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:border-amber-500"
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-0.5">
                          <Mail className="size-3.5 text-amber-800" />
                          <span className="text-stone-800">{activeDevotee?.email || "Not provided"}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">City & Circle</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          className="mt-1 w-full p-2 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:border-amber-500"
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="size-3.5 text-amber-800" />
                          <span className="text-stone-800">{activeDevotee?.city && activeDevotee.city.trim() ? activeDevotee.city : "-"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Gotra & Ritual Preferences */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                    <Sparkles className="size-5 text-amber-800" />
                    <h2 className="font-serif text-xl font-bold text-stone-900">Ritual Sankalpa Preferences</h2>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Gotra (Ancestral Lineage)</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.gotra}
                          onChange={(e) => setEditForm({ ...editForm, gotra: e.target.value })}
                          placeholder="e.g. Kashyapa, Bharadwaja"
                          className="mt-1 w-full p-2 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:border-amber-500"
                        />
                      ) : (
                        <span className="text-stone-800 font-semibold">
                          {activeDevotee?.gotra && activeDevotee.gotra.trim() ? activeDevotee.gotra : "-"}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Preferred Seva Types</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                          Lakshmi Kuber Puja
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                          Kumkumarchana
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-300">
                          Abhishek Seva
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-stone-500 font-semibold block">Devotee Activity Summary</span>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Total sevas booked: <strong>{stats?.total_orders ?? 0}</strong> • Completed: <strong>{stats?.completed_orders ?? 0}</strong>
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
                      <div
                        key={booking.id}
                        className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:shadow-md transition-shadow"
                      >
                        <div>
                          <div className="font-bold text-stone-900 text-sm">{booking.pujaTitle}</div>
                          <div className="text-xs text-stone-500 mt-1">
                            Ref: <span className="font-mono font-bold text-amber-800">{booking.bookingRef}</span> • {formatDate(booking.bookingDate)}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-1.5 flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-md font-bold ${
                                booking.paymentStatus === "Completed"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : booking.paymentStatus === "Paid & Confirmed"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {booking.paymentStatus}
                            </span>
                            <span>Slot: <strong>{formatDate(booking.pujaSlotDate || booking.bookingDate)}</strong></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-stone-200 pt-3 sm:pt-0">
                          <div className="text-right">
                            <div className="font-serif font-bold text-lg text-[#3C0F1A]">₹{booking.amount}</div>
                          </div>
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
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
