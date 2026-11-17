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
import {
  Sparkles,
  UserCheck,
  ShieldCheck,
  RefreshCw,
  Users,
  Receipt,
  Phone,
  MessageCircle,
  Gift,
  Check,
  X,
  Filter,
} from "lucide-react";
import { adminBookingApi, adminUserApi } from "@/src/lib/api";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { s, setS } = useAdmin();
  const [activeTab, setActiveTab] = useState<"bookings" | "users">("users");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedBooking, setSelectedBooking] = useState<SevaBooking | null>(null);

  // Live real-time devotees fetch from database (refetches every 5s)
  const {
    data: dbDevoteesData = [],
    refetch: refetchLiveDevotees,
    isFetching: isRefreshingDevotees,
  } = useQuery({
    queryKey: ["admin", "liveDevotees"],
    queryFn: adminUserApi.getUsers,
    staleTime: 0,
    refetchInterval: 5000,
  });

  const liveUsers: DevoteeUser[] = Array.isArray(dbDevoteesData)
    ? dbDevoteesData
    : Array.isArray((dbDevoteesData as any)?.data)
    ? (dbDevoteesData as any).data
    : [];

  const allUsers: DevoteeUser[] = liveUsers.length > 0 ? liveUsers : (s.users || []);

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

  const filteredUsers = allUsers.filter((u) => {
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

      {/* 4 Overview Statistics Cards - Balanced, spacious executive cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          onClick={() => setActiveTab("users")}
          className={`p-4 sm:p-5 rounded-2xl relative overflow-hidden cursor-pointer transition-all ${
            activeTab === "users" ? "border-amber-500 ring-2 ring-amber-400/30 bg-amber-50/40" : "border-stone-200/90 hover:border-amber-400 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Registered Devotees
            </span>
            <div className="size-8.5 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-base shrink-0">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="font-serif mt-2 text-3xl font-bold text-[#3C0F1A]">
            {allUsers.length} <span className="text-xs font-sans font-semibold text-stone-600">Devotees</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 text-xs text-amber-800 font-semibold flex items-center justify-between">
            <span>{activeTab === "users" ? "Viewing devotee list ↓" : "Click to view list →"}</span>
          </div>
        </Card>

        <Card
          onClick={() => setActiveTab("bookings")}
          className={`p-4 sm:p-5 rounded-2xl relative overflow-hidden cursor-pointer transition-all ${
            activeTab === "bookings" ? "border-amber-500 ring-2 ring-amber-400/30 bg-amber-50/40" : "border-stone-200/90 hover:border-amber-400 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Online Seva Bookings
            </span>
            <div className="size-8.5 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-base shrink-0">
              <HiOutlineCreditCard />
            </div>
          </div>
          <div className="font-serif mt-2 text-3xl font-bold text-[#3C0F1A]">
            {allBookings.length} <span className="text-xs font-sans font-semibold text-stone-600">Bookings</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex items-center gap-1.5 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">{successfulBookingsCount} Paid</span>
            {failedBookingsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]">{failedBookingsCount} Failed</span>
            )}
            <span className="ml-auto text-amber-800 font-semibold">{activeTab === "bookings" ? "Viewing ↓" : "View →"}</span>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 transition-all bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Booking Collections
            </span>
            <div className="size-8.5 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-base shrink-0">
              <Sparkles className="size-4 text-amber-700" />
            </div>
          </div>
          <div className="font-serif mt-2 text-3xl font-bold text-[#3C0F1A]">
            ₹{totalBookedAmount > 0 ? totalBookedAmount.toLocaleString("en-IN") : s.summary.total_revenue.toLocaleString("en-IN")}
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 text-xs text-stone-500">
            Dakshina via UPI & Gateway
          </div>
        </Card>

        <Card className="p-4 sm:p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 transition-all bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Gotra Recitations
            </span>
            <div className="size-8.5 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-base shrink-0">
              <HiOutlineClock />
            </div>
          </div>
          <div className="font-serif mt-2 text-3xl font-bold text-[#3C0F1A]">
            {allBookings.filter((b) => b.paymentStatus === "Paid & Confirmed" || b.paymentStatus === "Pending Recitation").length || 0} <span className="text-xs font-sans font-semibold text-stone-600">Pending</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 text-xs text-amber-700 font-medium">
            Ready for Panditji recitation
          </div>
        </Card>
      </div>

      {/* Main View Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-stone-200/90 shadow-xs">
        {/* Toggle Pill Buttons */}
        <div className="inline-flex p-1 rounded-lg bg-stone-100 border border-stone-200">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "users"
                ? "bg-[#3C0F1A] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            <Users className="size-3.5" />
            <span>Devotees ({allUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "bookings"
                ? "bg-[#3C0F1A] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            <Receipt className="size-3.5" />
            <span>Seva Bookings ({allBookings.length})</span>
          </button>
        </div>

        {/* Search Input Bar & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-72">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
            <input
              type="text"
              placeholder={activeTab === "bookings" ? "Search Ref ID, Name, Puja..." : "Search Devotee Name, Phone..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              refetchLiveDevotees();
              refetchLiveBookings();
              toast.success("Live devotees and bookings refreshed!");
            }}
            disabled={isRefreshingDevotees || isRefreshingBookings}
            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 border border-stone-200 transition-colors cursor-pointer shrink-0"
            title="Refresh Live Data"
          >
            <RefreshCw className={`size-3.5 ${(isRefreshingDevotees || isRefreshingBookings) ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
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

            {/* Status Dropdown Filter & Real-time Refresh */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="size-3.5 text-stone-400" />
                <label htmlFor="booking-status-filter" className="text-stone-500 font-medium">Status:</label>
                <select
                  id="booking-status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-1.5 text-xs text-stone-700 font-medium focus:bg-white focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Booking Statuses</option>
                  <option value="Paid & Confirmed">Paid & Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Payment Failed">Payment Failed</option>
                  <option value="Pending Recitation">Pending Recitation</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  refetchLiveBookings();
                  toast.success("Bookings refreshed from database");
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                title="Refresh live bookings from database"
              >
                <RefreshCw className={`size-3.5 ${isRefreshingBookings ? "animate-spin" : ""}`} />
                <span>Refresh Live</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
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
                      <div className="text-[11px] text-stone-600 font-mono flex items-center gap-1.5">
                        <Phone className="size-3 text-stone-400 shrink-0" />
                        <span>{b.mobile}</span>
                      </div>
                      {b.whatsapp && (
                        <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                          <MessageCircle className="size-2.5 text-emerald-600 shrink-0" />
                          <span>WA: {b.whatsapp}</span>
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
                        <div className="text-[10px] text-amber-800 font-semibold truncate max-w-[180px] flex items-center gap-1" title={b.addons}>
                          <Gift className="size-3 text-amber-700 shrink-0" />
                          <span>{b.addons}</span>
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
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="size-3" />
                            <span>Done</span>
                          </span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-3.5 rounded-xl bg-gradient-to-br from-white to-amber-50/30 border border-amber-200/70 hover:border-amber-400 hover:shadow-xs transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <div className="size-9 rounded-xl bg-[#3C0F1A] text-amber-200 font-serif font-bold text-sm flex items-center justify-center border border-amber-300 shrink-0">
                    {((user.name || "Devotee").trim().charAt(0) || "D").toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h4 className="font-bold text-stone-900 text-xs truncate">
                      {user.name && user.name.trim() ? user.name : "Devotee"}
                    </h4>

                    <div className="flex items-center gap-1 text-[11px] text-stone-600">
                      <HiOutlinePhone className="text-amber-700 shrink-0 size-3" />
                      <span className="font-mono">{user.mobile || "-"}</span>
                    </div>

                    <div className="text-[10px] text-stone-500 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 pt-0.5">
                      <span>Gotra: <strong className="text-stone-700">{user.gotra && user.gotra.trim() ? user.gotra : "-"}</strong></span>
                      <span>•</span>
                      <span>City: <strong className="text-stone-700">{user.city && user.city.trim() ? user.city : "-"}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2 border-l border-amber-100/80">
                  <div className="text-[9px] uppercase text-stone-400 font-bold">Sevas</div>
                  <div className="font-serif text-sm font-bold text-[#3C0F1A]">
                    {user.totalBookings || 0}
                  </div>
                  <div className="text-[11px] font-bold text-amber-900">
                    ₹{Number(user.totalSpent || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isRefreshingDevotees && allUsers.length === 0 && (
            <div className="py-12 text-center text-stone-500 text-xs font-medium flex items-center justify-center gap-2">
              <RefreshCw className="size-4 animate-spin text-amber-700" />
              <span>Loading registered devotees from database...</span>
            </div>
          )}

          {filteredUsers.length === 0 && !isRefreshingDevotees && (
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
                aria-label="Close"
              >
                <X className="size-4" />
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
                        <MessageCircle className="size-3" />
                        <span>Chat</span>
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
