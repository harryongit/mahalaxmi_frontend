"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAdmin, SevaBooking, DevoteeUser } from "../admin-context";
import { Head, Card, upd } from "../admin-ui";
import {
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineEye,
} from "react-icons/hi";
import { Sparkles, UserCheck, ShieldCheck, RefreshCw } from "lucide-react";
import { adminBookingApi } from "@/src/lib/api";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { s, setS } = useAdmin();
  const [activeTab, setActiveTab] = useState<"bookings" | "users">("bookings");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedBooking, setSelectedBooking] = useState<SevaBooking | null>(null);

  // Live real-time bookings fetch from database (refetches every 5s)
  const {
    data: dbBookingsData = [],
    refetch: refetchLiveBookings,
    isFetching: isRefreshingBookings,
  } = useQuery({
    queryKey: ["admin", "liveBookings"],
    queryFn: adminBookingApi.getAllBookings,
    staleTime: 0,
    refetchInterval: 5000,
  });

  const liveBookings: SevaBooking[] = Array.isArray(dbBookingsData)
    ? dbBookingsData
    : Array.isArray((dbBookingsData as any)?.data)
    ? (dbBookingsData as any).data
    : [];

  const allBookings: SevaBooking[] = liveBookings.length > 0 ? liveBookings : (s.bookings || []);

  const totalBookedAmount = allBookings
    .filter((b) => b.paymentStatus !== "Payment Failed")
    .reduce((acc, b) => acc + (b.amount || 0), 0);

  const successfulBookingsCount = allBookings.filter(
    (b) => b.paymentStatus === "Paid & Confirmed" || b.paymentStatus === "Completed"
  ).length;

  const failedBookingsCount = allBookings.filter(
    (b) => b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail")
  ).length;

  const filteredBookings = allBookings.filter((b) => {
    const matchesSearch =
      (b.userName || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.bookingRef || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.mobile || "").includes(search) ||
      (b.pujaTitle || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "All" || b.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = (s.users || []).filter((u) => {
    const q = search.toLowerCase();
    const nameMatch = (u.name || "").toLowerCase().includes(q);
    const mobileMatch = (u.mobile || "").includes(search);
    const cityMatch = (u.city || "").toLowerCase().includes(q);
    const gotraMatch = (u.gotra || "").toLowerCase().includes(q);
    return nameMatch || mobileMatch || cityMatch || gotraMatch;
  });

  const handleUpdateBookingStatus = async (bookingId: string, bookingRef: string, newStatus: SevaBooking["paymentStatus"]) => {
    try {
      const updatedBookings = allBookings.map((b) =>
        b.id === bookingId ? { ...b, paymentStatus: newStatus } : b
      );
      setS({ ...s, bookings: updatedBookings });
      
      const res = await adminBookingApi.updateStatus(bookingRef, newStatus);
      await refetchLiveBookings();
      toast.success(res?.message || `Booking status updated to ${newStatus}`);
    } catch (error: any) {
      console.error("Failed to update booking status", error);
      toast.error(error?.message || "Failed to update booking status");
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <Head
        title="Devotee Management & Seva Bookings"
        sub="Monitor registered devotees, payment flows, and Gotra recitation bookings."
      />

      {/* 4 Overview Statistics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          onClick={() => setActiveTab("users")}
          className={`relative overflow-hidden cursor-pointer transition-all ${
            activeTab === "users" ? "border-amber-500 ring-2 ring-amber-400/30 bg-amber-50/40" : "border-amber-200 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Registered Devotees
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.summary.total_users || s.users?.length || 0} Devotees
          </div>
          <div className="mt-2 text-xs text-amber-800 font-semibold flex items-center justify-between">
            <span>{activeTab === "users" ? "Viewing devotee list below ↓" : "Click to view devotees list →"}</span>
          </div>
        </Card>

        <Card
          onClick={() => setActiveTab("bookings")}
          className={`relative overflow-hidden cursor-pointer transition-all ${
            activeTab === "bookings" ? "border-amber-500 ring-2 ring-amber-400/30 bg-amber-50/40" : "border-amber-200 hover:border-amber-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Online Seva Bookings
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineCreditCard />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {allBookings.length} Total ({successfulBookingsCount} Paid, {failedBookingsCount} Failed)
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <HiOutlineCheckCircle />
            <span>{activeTab === "bookings" ? "Viewing bookings below ↓" : "Click to view bookings →"}</span>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Total Booking Collections
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <Sparkles className="size-4 text-amber-600" />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            ₹{s.summary.total_revenue.toLocaleString("en-IN")}
          </div>
          <div className="mt-2 text-xs text-stone-500">
            Dakshina received via UPI & Bank
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Gotra Recitations Scheduled
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineClock />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.bookings?.filter((b) => b.paymentStatus !== "Completed").length || 0} Pending
          </div>
          <div className="mt-2 text-xs text-amber-700 font-medium">
            Ready for Panditji recitation
          </div>
        </Card>
      </div>

      {/* Main View Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        {/* Toggle Pill Buttons */}
        <div className="inline-flex p-1 rounded-xl bg-stone-100 border border-stone-200">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "bookings"
                ? "bg-[#3C0F1A] text-white shadow-sm"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            📜 Seva Bookings & Payment Details ({s.bookings?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "users"
                ? "bg-[#3C0F1A] text-white shadow-sm"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            👥 Registered Devotees List ({s.users?.length || 0})
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full sm:w-72">
          <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
          <input
            type="text"
            placeholder={activeTab === "bookings" ? "Search Ref ID, Name, Puja..." : "Search Devotee Name, Phone..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* TAB 1: SEVA BOOKINGS & PAYMENT DETAILS */}
      {activeTab === "bookings" && (
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3C0F1A]">
                Online Seva Bookings & Payment Flow
              </h3>
              <p className="text-xs text-stone-500">Real-time record of puja bookings, gotra details & dakshina payments</p>
            </div>

            {/* Filter Tabs & Real-time Refresh */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Filter Status:</span>
              {["All", "Paid & Confirmed", "Completed", "Payment Failed", "Pending Recitation"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border ${
                    filterStatus === status
                      ? "bg-amber-100 text-amber-950 border-amber-300 font-bold"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {status}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  refetchLiveBookings();
                  toast.success("Bookings refreshed from database");
                }}
                className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                title="Refresh live bookings from database"
              >
                <RefreshCw className={`size-3.5 ${isRefreshingBookings ? "animate-spin" : ""}`} />
                <span>Refresh Live</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-[11px] uppercase tracking-wider text-stone-500 font-bold bg-stone-50">
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Devotee & Contact</th>
                  <th className="py-3 px-4">Puja Title</th>
                  <th className="py-3 px-4">Gotra & Family</th>
                  <th className="py-3 px-4">Slot Date & Time</th>
                  <th className="py-3 px-4">Amount & Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-900">
                      {b.bookingRef}
                      <span className="block text-[10px] text-stone-400 font-normal">{b.bookingDate}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{b.userName}</div>
                      <div className="text-[11px] text-stone-600 font-mono flex items-center gap-1">
                        <span>📱 {b.mobile}</span>
                      </div>
                      {b.whatsapp && (
                        <div className="text-[10px] text-emerald-700 font-mono">
                          💬 WA: {b.whatsapp}
                        </div>
                      )}
                      {b.email && (
                        <div className="text-[10px] text-stone-400 truncate max-w-[130px]">
                          {b.email}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#3C0F1A]">{b.pujaTitle}</div>
                      {b.addons && (
                        <div className="text-[10px] text-amber-800 font-semibold truncate max-w-[180px]" title={b.addons}>
                          🎁 {b.addons}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-amber-800">Gotra: {b.gotra}</div>
                      {b.sankalp && (
                        <div className="text-[11px] text-stone-700 font-medium italic truncate max-w-[160px]" title={b.sankalp}>
                          "{b.sankalp}"
                        </div>
                      )}
                      {b.familyMembers && (
                        <div className="text-[10px] text-stone-500 truncate max-w-[160px]" title={b.familyMembers}>
                          {b.familyMembers}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700 whitespace-nowrap">
                      {b.pujaSlotDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-amber-900 text-sm">₹{b.amount}</div>
                      <div className="text-[10px] text-emerald-700 font-medium">{b.paymentMode || "Razorpay"}</div>
                      <div className="text-[9px] text-stone-400 font-mono truncate max-w-[110px]" title={b.transactionId}>{b.transactionId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.paymentStatus === "Completed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : b.paymentStatus === "Paid & Confirmed"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail")
                            ? "bg-rose-100 text-rose-800 border border-rose-300 font-bold"
                            : "bg-blue-100 text-blue-900 border border-blue-300"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(b)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-stone-300"
                        >
                          <HiOutlineEye className="size-3.5" />
                          <span>View Details</span>
                        </button>

                        {b.paymentStatus === "Pending Recitation" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, b.bookingRef, "Paid & Confirmed")}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 text-amber-950 font-bold text-[11px] hover:bg-amber-600 transition-colors cursor-pointer"
                          >
                            Confirm Payment
                          </button>
                        )}
                        {b.paymentStatus === "Paid & Confirmed" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, b.bookingRef, "Completed")}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Mark Completed
                          </button>
                        )}
                        {b.paymentStatus === "Completed" && (
                          <span className="text-[11px] text-stone-400 font-semibold">Done ✓</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="py-8 text-center text-stone-500 text-xs font-medium">
                No matching seva bookings found.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* TAB 2: REGISTERED DEVOTEES LIST */}
      {activeTab === "users" && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3C0F1A]">
                Registered Devotees Database
              </h3>
              <p className="text-xs text-stone-500">Devotees registered for online pujas and sansthan communications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 flex items-start justify-between gap-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="size-11 rounded-2xl bg-[#3C0F1A] text-amber-200 font-serif font-bold text-lg flex items-center justify-center border-2 border-amber-300 shrink-0">
                    {((user.name || "Devotee").trim().charAt(0) || "D").toUpperCase()}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-stone-900 text-sm">
                      {user.name && user.name.trim() ? user.name : "Devotee"}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <HiOutlinePhone className="text-amber-700 shrink-0" />
                      <span className="font-mono">{user.mobile || "-"}</span>
                    </div>

                    <div className="text-[11px] text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                      <span>Gotra: <strong className="text-stone-800">{user.gotra && user.gotra.trim() ? user.gotra : "-"}</strong></span>
                      <span>•</span>
                      <span>City: <strong className="text-stone-800">{user.city && user.city.trim() ? user.city : "-"}</strong></span>
                      <span>•</span>
                      <span>Joined: <span className="text-stone-700">{user.regDate || "-"}</span></span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1 shrink-0">
                  <div className="text-[10px] uppercase text-stone-400 font-bold">Total Sevas</div>
                  <div className="font-serif text-lg font-bold text-[#3C0F1A]">
                    {user.totalBookings || 0} Bookings
                  </div>
                  <div className="text-xs font-bold text-amber-900">
                    ₹{Number(user.totalSpent || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-8 text-center text-stone-500 text-xs font-medium">
              No matching registered devotees found.
            </div>
          )}
        </Card>
      )}
      {/* DETAILED BOOKING DOSSIER MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#3C0F1A] via-[#5C1A29] to-[#2B0A12] text-white flex items-center justify-between border-b border-amber-400/30">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold)] block">
                  Seva Booking Dossier
                </span>
                <h3 className="font-serif text-xl font-bold">
                  Ref: {selectedBooking.bookingRef}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="size-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Devotee & Contact Section */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-stone-800 block text-xs uppercase tracking-wider">
                  1. Devotee & Contact Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Full Name</span>
                    <strong className="text-stone-900 text-sm">{selectedBooking.userName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Primary Mobile</span>
                    <span className="font-mono font-bold text-stone-900">+91 {selectedBooking.mobile}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">WhatsApp Updates Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-800">+91 {selectedBooking.whatsapp || selectedBooking.mobile}</span>
                      <a
                        href={`https://wa.me/91${(selectedBooking.whatsapp || selectedBooking.mobile).replace(/\D/g, "")}?text=${encodeURIComponent(`Jai Shri Mahalaxmi! Regarding your seva booking ${selectedBooking.bookingRef} for ${selectedBooking.pujaTitle}...`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 transition-colors inline-flex items-center gap-1"
                      >
                        💬 Chat
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Email Address</span>
                    <span className="font-medium text-stone-900">{selectedBooking.email || "Not specified"}</span>
                  </div>
                </div>
              </div>

              {/* Ritual & Recitation Section */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-950 block text-xs uppercase tracking-wider">
                  2. Ritual & Gotra Recitation Dossier
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Main Seva / Puja</span>
                    <strong className="text-amber-950 text-sm">{selectedBooking.pujaTitle}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Scheduled Slot Date</span>
                    <span className="font-bold text-stone-900">{selectedBooking.pujaSlotDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Devotee Gotra</span>
                    <strong className="text-amber-900 text-sm">{selectedBooking.gotra || "Kashyapa"}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Family Members for Recitation</span>
                    <span className="text-stone-800 font-medium">{selectedBooking.familyMembers || "None specified"}</span>
                  </div>
                  {selectedBooking.sankalp && (
                    <div className="sm:col-span-2 p-3 rounded-xl bg-white border border-amber-200">
                      <span className="text-[10px] text-amber-800 uppercase font-bold block">Sacred Devotee Sankalpa / Prayer</span>
                      <p className="text-stone-800 font-medium mt-0.5 italic">"{selectedBooking.sankalp}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sacred Add-on Offerings */}
              {selectedBooking.addons && (
                <div className="p-4 rounded-2xl bg-amber-100/50 border border-amber-300/80 space-y-1.5">
                  <span className="font-bold text-amber-950 block text-xs uppercase tracking-wider">
                    3. Sacred Add-on Offerings (Chadhava & Naivadya)
                  </span>
                  <p className="text-stone-800 font-semibold">{selectedBooking.addons}</p>
                </div>
              )}

              {/* Delivery Address */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="font-bold text-stone-800 block text-xs uppercase tracking-wider">
                  4. Prasad / Aashirwad Box Delivery
                </span>
                <p className="text-stone-700 font-medium">
                  {selectedBooking.address || "Sanctum distribution (No postal shipping)"}
                </p>
              </div>

              {/* Payment Details */}
              <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-2">
                <span className="font-bold text-amber-300 block text-xs uppercase tracking-wider">
                  5. Payment & Gateway Details
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Dakshina</span>
                    <strong className="text-lg text-[var(--gold)] font-serif">₹{selectedBooking.amount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Gateway</span>
                    <span className="font-medium">{selectedBooking.paymentMode || "Razorpay"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Razorpay Txn ID</span>
                    <span className="font-mono text-[11px] text-amber-200">{selectedBooking.transactionId || "-"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Payment Status</span>
                    <span className="font-bold text-emerald-400">{selectedBooking.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with Status Actions */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-bold">Update Status:</span>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateBookingStatus(selectedBooking.id, selectedBooking.bookingRef, "Paid & Confirmed");
                    setSelectedBooking({ ...selectedBooking, paymentStatus: "Paid & Confirmed" });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs cursor-pointer transition-colors"
                >
                  Paid & Confirmed
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateBookingStatus(selectedBooking.id, selectedBooking.bookingRef, "Completed");
                    setSelectedBooking({ ...selectedBooking, paymentStatus: "Completed" });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Mark Completed
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
