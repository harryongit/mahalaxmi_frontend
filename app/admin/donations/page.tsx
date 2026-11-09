"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAdmin, uid } from "../admin-context";
import { Head, Card } from "../admin-ui";
import { adminContentApi, DonationItem } from "@/src/lib/api";
import { toast } from "sonner";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Copy,
  Check,
  Receipt,
  Coins,
  Users,
  ShieldCheck,
  TrendingUp,
  X,
  Printer,
  Calendar,
  Phone,
  Mail,
  Heart,
  Landmark,
} from "lucide-react";

export default function DonationsAdminPage() {
  const { s, setS } = useAdmin();

  // Search, filter & sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "amount_desc" | "amount_asc">("newest");

  // Loading & refresh state
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<DonationItem | null>(null);
  const [receiptDonation, setReceiptDonation] = useState<DonationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  // Add/Edit Form State
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    purpose: "Maha Annadanam",
    date: new Date().toISOString().slice(0, 10),
    payment_id: "",
    email: "",
    phone: "",
  });

  // Fetch fresh donations from backend API
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const data = await adminContentApi.getDonations();
      if (Array.isArray(data)) {
        setS((prev) => ({
          ...prev,
          donations: data.map((d) => ({
            id: d.id,
            name: d.name || "Anonymous Devotee",
            amount: Number(d.amount) || 0,
            purpose: d.purpose || "General Seva",
            date: d.date || new Date().toISOString().slice(0, 10),
            payment_id: d.payment_id || null,
            email: d.email || null,
            phone: d.phone || null,
          })),
        }));
      }
    } catch (err) {
      console.error("Failed to load donations from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Delete donation handler
  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this donation record?")) return;
    setDeletingId(id);
    try {
      let res: any;
      if (typeof id === "number" || !isNaN(Number(id))) {
        res = await adminContentApi.deleteDonation(id);
      }
      setS((prev) => ({
        ...prev,
        donations: prev.donations.filter((d) => d.id !== id),
      }));
      toast.success(res?.message || "Donation record deleted successfully.");
    } catch (err: any) {
      console.error("Failed to delete donation:", err);
      toast.error(err?.message || "Failed to delete donation from backend.");
    } finally {
      setDeletingId(null);
    }
  };

  // Open modal for editing
  const handleOpenEdit = (d: any) => {
    setEditingDonation(d);
    setFormData({
      name: d.name || "",
      amount: String(d.amount || ""),
      purpose: d.purpose || "Maha Annadanam",
      date: d.date || new Date().toISOString().slice(0, 10),
      payment_id: d.payment_id || "",
      email: d.email || "",
      phone: d.phone || "",
    });
    setIsAddModalOpen(true);
  };

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingDonation(null);
    setFormData({
      name: "",
      amount: "",
      purpose: "Maha Annadanam",
      date: new Date().toISOString().slice(0, 10),
      payment_id: `CASH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      email: "",
      phone: "",
    });
    setIsAddModalOpen(true);
  };

  // Save donation (create or update)
  const handleSaveDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(formData.amount, 10);
    if (isNaN(parsedAmount) || parsedAmount < 1) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    try {
      if (editingDonation) {
        // Update
        const payload = {
          name: formData.name.trim() || "Anonymous Devotee",
          amount: parsedAmount,
          purpose: formData.purpose,
          date: formData.date,
          payment_id: formData.payment_id.trim() || undefined,
          email: formData.email.trim() || undefined,
          phone: formData.phone.trim() || undefined,
        };

        let res: any;
        if (typeof editingDonation.id === "number" || !isNaN(Number(editingDonation.id))) {
          res = await adminContentApi.updateDonation(editingDonation.id, payload);
        }

        setS((prev) => ({
          ...prev,
          donations: prev.donations.map((d) =>
            d.id === editingDonation.id
              ? { ...d, ...payload }
              : d
          ),
        }));
        toast.success(res?.message || "Donation record updated successfully!");
      } else {
        // Create
        const payload = {
          name: formData.name.trim() || "Anonymous Devotee",
          amount: parsedAmount,
          purpose: formData.purpose,
          date: formData.date,
          payment_id: formData.payment_id.trim() || undefined,
          email: formData.email.trim() || undefined,
          phone: formData.phone.trim() || undefined,
        };

        const res = await adminContentApi.createDonation(payload);

        setS((prev) => ({
          ...prev,
          donations: [
            {
              id: res?.id || uid(),
              ...payload,
            },
            ...prev.donations,
          ],
        }));
        toast.success((res as any)?.message || "Donation record created successfully!");
      }

      setIsAddModalOpen(false);
      setEditingDonation(null);
    } catch (err: any) {
      console.error("Save donation error:", err);
      toast.error(err?.message || "Failed to save donation.");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (s.donations.length === 0) {
      alert("No donation records to export.");
      return;
    }

    const headers = ["ID", "Devotee Name", "Amount (INR)", "Purpose", "Date", "Payment ID", "Phone", "Email"];
    const rows = s.donations.map((d) => [
      d.id,
      `"${(d.name || "").replace(/"/g, '""')}"`,
      d.amount,
      `"${(d.purpose || "").replace(/"/g, '""')}"`,
      d.date || "",
      `"${(d.payment_id || "").replace(/"/g, '""')}"`,
      `"${(d.phone || "").replace(/"/g, '""')}"`,
      `"${(d.email || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mahalaxmi_Donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed summary metrics
  const totalAmount = useMemo(() => s.donations.reduce((sum, d) => sum + (d.amount || 0), 0), [s.donations]);
  const totalDonors = s.donations.length;
  const razorpayVerifiedCount = useMemo(() => s.donations.filter((d) => d.payment_id && d.payment_id.startsWith("pay_")).length, [s.donations]);
  const avgDonation = totalDonors > 0 ? Math.round(totalAmount / totalDonors) : 0;

  // Unique purposes for filter
  const uniquePurposes = useMemo(() => {
    const set = new Set<string>();
    s.donations.forEach((d) => {
      if (d.purpose) set.add(d.purpose);
    });
    return Array.from(set);
  }, [s.donations]);

  // Filtered and sorted donations
  const filteredDonations = useMemo(() => {
    return s.donations
      .filter((d) => {
        // Purpose filter
        if (selectedPurpose !== "ALL" && d.purpose !== selectedPurpose) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (d.name || "").toLowerCase().includes(q);
          const matchPurpose = (d.purpose || "").toLowerCase().includes(q);
          const matchPayment = (d.payment_id || "").toLowerCase().includes(q);
          const matchPhone = (d.phone || "").toLowerCase().includes(q);
          const matchEmail = (d.email || "").toLowerCase().includes(q);
          if (!matchName && !matchPurpose && !matchPayment && !matchPhone && !matchEmail) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "amount_desc") return b.amount - a.amount;
        if (sortBy === "amount_asc") return a.amount - b.amount;
        if (sortBy === "oldest") return (a.date || "").localeCompare(b.date || "");
        // newest default
        return (b.date || "").localeCompare(a.date || "") || Number(b.id) - Number(a.id);
      });
  }, [s.donations, searchQuery, selectedPurpose, sortBy]);

  // Badge color helper for purpose
  const getPurposeBadgeClass = (purpose: string) => {
    const p = (purpose || "").toLowerCase();
    if (p.includes("anna")) return "bg-amber-100 text-amber-800 border-amber-300";
    if (p.includes("gou") || p.includes("cow")) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (p.includes("deep") || p.includes("jyot")) return "bg-orange-100 text-orange-800 border-orange-300";
    if (p.includes("jirn") || p.includes("restor")) return "bg-purple-100 text-purple-800 border-purple-300";
    return "bg-stone-100 text-stone-800 border-stone-200";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Head
        title="Donations & Danam"
        sub={`Total Seva offerings received: ₹${totalAmount.toLocaleString("en-IN")} across ${totalDonors} offerings.`}
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchDonations}
              disabled={loading}
              className="py-2.5 px-4 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh from database"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin text-amber-600" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="py-2.5 px-4 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="bg-[#380D12] text-amber-200 hover:bg-[#4A151C] hover:text-white font-semibold text-xs py-2.5 px-5 rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="size-3.5 stroke-[3]" />
              <span>Record Counter Donation</span>
            </button>
          </div>
        }
      />

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Total Danam</span>
            <div className="size-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Coins className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-[#380D12]">
            ₹{totalAmount.toLocaleString("en-IN")}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">All Seva collections</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Sacred Donors</span>
            <div className="size-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-800">
            {totalDonors}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">Devotees contributed</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Razorpay Online</span>
            <div className="size-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-emerald-700">
            {razorpayVerifiedCount}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">Verified gateway payments</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Avg. Danam</span>
            <div className="size-8 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-stone-800">
            ₹{avgDonation.toLocaleString("en-IN")}
          </div>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">Per sacred offering</p>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by devotee name, phone, email, purpose, or payment ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/70 text-xs text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Purpose Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="size-3.5 text-stone-400" />
            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2 text-xs text-stone-700 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
            >
              <option value="ALL">All Seva Purposes</option>
              {uniquePurposes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2 text-xs text-stone-700 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="amount_desc">Amount: High to Low</option>
              <option value="amount_asc">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Donations Table */}
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[840px] text-sm text-left">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
              <th className="p-4 pl-6">Devotee Name</th>
              <th className="p-4">Seva Purpose</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4">Payment Ref / ID</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredDonations.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-stone-400 text-xs">
                  <Receipt className="size-8 mx-auto mb-2 text-stone-300" />
                  <p className="font-semibold text-stone-600">No donation records found</p>
                  <p className="text-stone-400 mt-1">Try clearing filters or recording a new counter donation</p>
                </td>
              </tr>
            ) : (
              filteredDonations.map((d) => {
                const isRzp = d.payment_id && d.payment_id.startsWith("pay_");
                return (
                  <tr key={d.id} className="hover:bg-amber-50/30 transition-colors">
                    {/* Devotee */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-gradient-to-tr from-[#380D12] to-amber-900 text-amber-200 flex items-center justify-center text-xs font-bold shrink-0">
                          {d.name ? d.name.slice(0, 1).toUpperCase() : "D"}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-800 text-xs">
                            {d.name || "Anonymous Devotee"}
                          </div>
                          {d.name && d.name.toLowerCase().includes("anonymous") && (
                            <span className="text-[10px] text-stone-400 font-medium">Gupt Daan 🙏</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Purpose */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getPurposeBadgeClass(
                          d.purpose
                        )}`}
                      >
                        {d.purpose || "General Seva"}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="p-4 text-xs text-stone-600">
                      {d.phone ? (
                        <div className="flex items-center gap-1 text-[11px]">
                          <Phone className="size-3 text-stone-400" />
                          <span>{d.phone}</span>
                        </div>
                      ) : null}
                      {d.email ? (
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 truncate max-w-[140px]">
                          <Mail className="size-3 text-stone-400 shrink-0" />
                          <span className="truncate">{d.email}</span>
                        </div>
                      ) : null}
                      {!d.phone && !d.email && <span className="text-[11px] text-stone-400 italic">Not provided</span>}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-xs text-stone-600 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="size-3 text-stone-400" />
                        <span>{d.date || "N/A"}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4 text-right">
                      <span className="font-serif font-bold text-sm text-[#380D12] bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                        ₹{Number(d.amount).toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Payment ID */}
                    <td className="p-4">
                      {d.payment_id ? (
                        <button
                          type="button"
                          onClick={() => handleCopy(d.payment_id!, String(d.id))}
                          className="font-mono text-[11px] text-stone-600 hover:text-amber-800 flex items-center gap-1 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                          title="Click to copy Payment ID"
                        >
                          <span className="truncate max-w-[110px]">{d.payment_id}</span>
                          {copiedId === String(d.id) ? (
                            <Check className="size-3 text-emerald-600" />
                          ) : (
                            <Copy className="size-3 text-stone-400" />
                          )}
                        </button>
                      ) : (
                        <span className="text-[11px] text-stone-400 italic">Direct Counter</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      {isRzp ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <ShieldCheck className="size-3 text-emerald-600" />
                          <span>Razorpay</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          <Check className="size-3 text-blue-600" />
                          <span>Verified</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setReceiptDonation(d as any)}
                          className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-[#380D12] transition-colors"
                          title="View Official Receipt"
                        >
                          <Eye className="size-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(d)}
                          className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-amber-700 transition-colors"
                          title="Edit Record"
                        >
                          <Edit3 className="size-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(d.id)}
                          disabled={deletingId === d.id}
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors disabled:opacity-50"
                          title="Delete Record"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>

      {/* ADD / EDIT DONATION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-amber-900/20 bg-white p-6 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-xl font-bold text-[#380D12]">
                {editingDonation ? "Edit Donation Record" : "Record Counter / Offline Donation"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:bg-stone-100 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Devotee Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kulkarni (or leave blank for Anonymous)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="1100"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-bold focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Seva Purpose</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Maha Annadanam">Maha Annadanam (Pilgrim Meals)</option>
                  <option value="Gou Seva & Fodder">Gou Seva & Fodder (Gaushala)</option>
                  <option value="Akhand Deepam Jyot">Akhand Deepam Jyot (Eternal Lamp)</option>
                  <option value="Mandir Jirnoddhar">Mandir Jirnoddhar (Stone Restoration)</option>
                  <option value="Pushpalankar & Archana">Pushpalankar & Archana</option>
                  <option value="General Temple Dan">General Temple Dan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Mobile (WhatsApp)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Email (For 80G)</label>
                  <input
                    type="email"
                    placeholder="devotee@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Payment ID / Receipt Ref</label>
                <input
                  type="text"
                  placeholder="e.g. CASH-1204, NEFT-8392, or pay_..."
                  value={formData.payment_id}
                  onChange={(e) => setFormData({ ...formData, payment_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#380D12] text-amber-200 hover:bg-[#4A151C] hover:text-white text-xs font-bold shadow-md"
                >
                  {editingDonation ? "Save Changes" : "Record Donation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFICIAL TEMPLE RECEIPT VIEW MODAL */}
      {receiptDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-amber-900/30 bg-white p-6 sm:p-8 shadow-2xl relative text-stone-800">
            {/* Close button */}
            <button
              onClick={() => setReceiptDonation(null)}
              className="absolute right-5 top-5 p-1 rounded-full text-stone-400 hover:bg-stone-100 transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Receipt Header */}
            <div className="text-center pb-4 border-b border-dashed border-stone-200">
              <div className="size-12 rounded-full bg-[#380D12] text-amber-300 flex items-center justify-center mx-auto mb-2 text-xl font-serif">
                🕉
              </div>
              <h4 className="font-serif text-lg font-bold text-[#380D12]">
                Shri Karveer Nivasini Ambabai Mandir
              </h4>
              <p className="text-[11px] text-stone-500 font-medium">Kolhapur, Maharashtra · Official Seva Receipt</p>
              <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                Section 80G Tax Exempted
              </div>
            </div>

            {/* Receipt Content */}
            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                <span className="text-stone-500 font-semibold">Total Danam</span>
                <span className="font-serif text-xl font-bold text-[#380D12]">
                  ₹{Number(receiptDonation.amount).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Devotee Name:</span>
                <span className="font-bold text-stone-900">{receiptDonation.name || "Anonymous Devotee"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Seva Purpose:</span>
                <span className="font-bold text-[#380D12]">{receiptDonation.purpose || "General Seva"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Date Received:</span>
                <span className="font-medium text-stone-800">{receiptDonation.date || "N/A"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Transaction ID:</span>
                <span className="font-mono text-[11px] text-stone-700 font-medium">
                  {receiptDonation.payment_id || "Direct Cash"}
                </span>
              </div>

              {receiptDonation.phone && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Contact Mobile:</span>
                  <span className="font-medium text-stone-800">{receiptDonation.phone}</span>
                </div>
              )}

              {receiptDonation.email && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-medium text-stone-800">{receiptDonation.email}</span>
                </div>
              )}
            </div>

            {/* Footer Blessing */}
            <div className="pt-3 border-t border-dashed border-stone-200 text-center text-[10px] text-stone-500">
              <p className="italic">"Shubham Bhavatu — May Goddess Mahalaxmi bless your family with prosperity."</p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-2">

              <button
                type="button"
                onClick={() => setReceiptDonation(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#380D12] hover:bg-[#4A151C] text-amber-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
