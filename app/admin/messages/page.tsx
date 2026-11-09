"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Head, Card } from "../admin-ui";
import { formatDateTime } from "@/src/lib/utils";
import { enquiryService, EnquiryResponse } from "@/src/services/enquiryService";
import {
  Mail,
  Phone,
  Clock,
  Loader2,
  RefreshCw,
  MessageSquare,
  Search,
  X,
  Inbox,
  User,
} from "lucide-react";

export default function MessagesAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // TanStack Query for fast, cached enquiry fetching
  const {
    data: enquiries = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<EnquiryResponse[]>({
    queryKey: ["admin-enquiries"],
    queryFn: enquiryService.getAdminEnquiries,
    staleTime: 1000 * 30, // 30 seconds cache
  });

  const totalCount = enquiries.length;

  const filteredEnquiries = useMemo(() => {
    if (!searchQuery.trim()) return enquiries;
    const q = searchQuery.toLowerCase();
    return enquiries.filter((m) => {
      const matchName = m.name?.toLowerCase().includes(q);
      const matchEmail = m.email?.toLowerCase().includes(q);
      const matchPhone = m.phone?.toLowerCase().includes(q);
      const matchSubject = m.subject?.toLowerCase().includes(q);
      const matchMessage = m.message?.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchSubject || matchMessage;
    });
  }, [enquiries, searchQuery]);

  return (
    <>
      <Head
        title="Devotee Enquiries"
        sub="List of all devotee enquiries received from the website contact form."
      />

      {/* Top Bar: Search Input + Refresh Icon */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3.5 py-1.5 rounded-xl border border-stone-200">
            Total: {totalCount} Enquiries
          </span>
          {searchQuery && (
            <span className="text-xs text-stone-500">
              Showing {filteredEnquiries.length} matching
            </span>
          )}
        </div>

        {/* Search Input with Refresh Icon on Right Side */}
        <div className="flex items-center gap-2 min-w-[260px] flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white pl-10 pr-8 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 font-sans shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                title="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Refresh button with ONLY icon on search right side */}
          <button
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            title="Refresh Enquiries List"
            aria-label="Refresh Enquiries List"
            className="size-9 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 shadow-xs transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw
              className={`size-3.5 ${isLoading || isRefetching ? "animate-spin text-amber-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Main List of Enquiries */}
      <div className="space-y-4 font-sans">
        {isLoading ? (
          <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <Loader2 className="size-8 animate-spin text-amber-500 mx-auto" />
            <p className="text-xs text-stone-500 font-medium">Loading devotee enquiries...</p>
          </div>
        ) : filteredEnquiries.length > 0 ? (
          <div className="space-y-4">
            {filteredEnquiries.map((m) => (
              <Card
                key={m.id}
                className="p-6 rounded-3xl border border-stone-200/80 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  {/* Header: Reference ID, Subject, Date */}
                  <div className="flex items-center justify-between gap-3 flex-wrap border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-stone-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                        #ENQ-{m.id.toString().padStart(5, "0")}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#3C0F1A]">
                        {m.subject}
                      </h4>
                    </div>

                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1.5 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
                      <Clock className="size-3.5 text-amber-600" />
                      {formatDateTime(m.created_at)}
                    </span>
                  </div>

                  {/* Devotee Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50/70 border border-stone-200/60">
                      <div className="size-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                        <User className="size-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-stone-400 font-medium block text-[10px]">Devotee Name</span>
                        <span className="text-stone-900 font-bold truncate block">{m.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50/70 border border-stone-200/60">
                      <div className="size-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                        <Mail className="size-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-stone-400 font-medium block text-[10px]">Email Address</span>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-amber-800 font-bold hover:underline truncate block"
                          title={m.email}
                        >
                          {m.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50/70 border border-stone-200/60">
                      <div className="size-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                        <Phone className="size-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-stone-400 font-medium block text-[10px]">Phone Number</span>
                        {m.phone ? (
                          <a
                            href={`tel:${m.phone}`}
                            className="text-stone-800 font-bold hover:underline truncate block"
                          >
                            {m.phone}
                          </a>
                        ) : (
                          <span className="text-stone-500 font-semibold">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Devotee Message Body */}
                  <div className="mt-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200/70 text-xs text-stone-800 leading-relaxed font-normal flex items-start gap-2.5">
                    <MessageSquare className="size-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 block mb-1">
                        Enquiry Message:
                      </span>
                      <p className="whitespace-pre-line text-stone-800 leading-relaxed font-sans">
                        {m.message}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <Inbox className="size-10 text-stone-300 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-stone-800">
              {searchQuery ? "No Matching Enquiries Found" : "No Devotee Enquiries Yet"}
            </h4>
            <p className="text-xs text-stone-500 font-medium max-w-sm mx-auto">
              {searchQuery
                ? `No enquiries matched "${searchQuery}". Try a different keyword.`
                : "Devotee queries submitted from the website contact form will appear here automatically."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 px-4 py-2 rounded-xl bg-[#380D12] text-amber-200 text-xs font-semibold cursor-pointer hover:bg-[#4A151C]"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
