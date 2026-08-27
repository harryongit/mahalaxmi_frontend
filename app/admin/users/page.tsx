"use client";

import { useState } from "react";
import { useAdmin, SevaBooking, DevoteeUser } from "../admin-context";
import { Head, Card, upd } from "../admin-ui";
import {
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi";
import { Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { adminUserApi, adminBookingApi } from "@/src/lib/api";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { s, setS } = useAdmin();
  const [activeTab, setActiveTab] = useState<"bookings" | "users">("bookings");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const totalBookedAmount = (s.bookings || []).reduce((acc, b) => acc + b.amount, 0);

  const filteredBookings = (s.bookings || []).filter((b) => {
    const matchesSearch =
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingRef.toLowerCase().includes(search.toLowerCase()) ||
      b.mobile.includes(search) ||
      b.pujaTitle.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "All" || b.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = (s.users || []).filter((u) => {
    return (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search) ||
      u.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleUpdateBookingStatus = async (bookingId: string, bookingRef: string, newStatus: SevaBooking["paymentStatus"]) => {
    try {
      const updatedBookings = s.bookings.map((b) =>
        b.id === bookingId ? { ...b, paymentStatus: newStatus } : b
      );
      setS({ ...s, bookings: updatedBookings });
      
      await adminBookingApi.updateStatus(bookingRef, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update booking status", error);
      toast.error("Failed to update booking status");
    }
  };

  const handleUpdateUserStatus = async (userId: string, newStatus: DevoteeUser["status"]) => {
    try {
      // Optimitic update
      const updatedUsers = s.users.map((u) => 
        u.id === userId ? { ...u, status: newStatus } : u
      );
      setS({ ...s, users: updatedUsers });
      
      // Call the API
      await adminUserApi.updateStatus(userId, newStatus);
      toast.success(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update user status", error);
      toast.error("Failed to update user status");
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
        <Card className="relative overflow-hidden border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Registered Devotees
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.summary.total_users} Devotees
          </div>
          <div className="mt-2 text-xs text-stone-500">
            Verified accounts in database
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Online Seva Bookings
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineCreditCard />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.summary.total_orders} Bookings
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <HiOutlineCheckCircle />
            <span>All Payments Verified</span>
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

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Filter Status:</span>
              {["All", "Paid & Confirmed", "Completed", "Pending Recitation"].map((status) => (
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
                      <div className="text-[11px] text-stone-500">{b.mobile}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#3C0F1A]">{b.pujaTitle}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-amber-800">Gotra: {b.gotra}</div>
                      <div className="text-[11px] text-stone-500 truncate max-w-[160px]">{b.familyMembers}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">
                      {b.pujaSlotDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-amber-900 text-sm">₹{b.amount}</div>
                      <div className="text-[10px] text-emerald-700 font-medium">{b.paymentMode}</div>
                      <div className="text-[9px] text-stone-400 font-mono">{b.transactionId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.paymentStatus === "Completed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : b.paymentStatus === "Paid & Confirmed"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-blue-100 text-blue-900 border border-blue-300"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right flex flex-col items-end gap-1.5">
                      {b.paymentStatus === "Pending Recitation" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, b.bookingRef, "Paid & Confirmed")}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 text-amber-950 font-bold text-[11px] hover:bg-amber-600 transition-colors cursor-pointer"
                        >
                          Confirm Payment
                        </button>
                      )}
                      {b.paymentStatus === "Paid & Confirmed" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, b.bookingRef, "Completed")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}
                      {b.paymentStatus === "Completed" && (
                        <span className="text-[11px] text-stone-400 font-semibold">Done ✓</span>
                      )}
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
                    {user.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">{user.name}</h4>
                      <select
                        value={user.status}
                        onChange={(e) => handleUpdateUserStatus(user.id, e.target.value as DevoteeUser["status"])}
                        className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-950 text-[10px] font-bold border-none outline-none cursor-pointer focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Active">Active</option>
                        <option value="VIP">VIP</option>
                        <option value="Regular">Regular</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <HiOutlinePhone className="text-amber-700 shrink-0" />
                      <span>{user.mobile}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <HiOutlineMail className="text-amber-700 shrink-0" />
                      <span>{user.email}</span>
                    </div>

                    <div className="text-[11px] text-stone-500 pt-1">
                      City: <strong className="text-stone-800">{user.city}</strong> • Joined: {user.regDate}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1 shrink-0">
                  <div className="text-[10px] uppercase text-stone-400 font-bold">Total Sevas</div>
                  <div className="font-serif text-lg font-bold text-[#3C0F1A]">
                    {user.totalBookings} Bookings
                  </div>
                  <div className="text-xs font-bold text-amber-900">
                    ₹{user.totalSpent.toLocaleString("en-IN")}
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
    </div>
  );
}
