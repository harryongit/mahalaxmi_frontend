"use client";

import { useQuery } from "@tanstack/react-query";
import { Head, Card } from "../admin-ui";
import { enquiryService, EnquiryResponse } from "@/src/services/enquiryService";
import { Mail, Phone, Clock, Loader2, Sparkles, RefreshCw, MessageSquare } from "lucide-react";

export default function MessagesAdminPage() {
  // TanStack Query integration for fast, cached enquiry fetching
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

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6 font-sans">
        <Head title="Devotee Enquiries List" sub="List of all enquiries received from the website contact form." />
        <button
          onClick={() => refetch()}
          disabled={isLoading || isRefetching}
          className="py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-amber-400 font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`size-3.5 ${isLoading || isRefetching ? "animate-spin text-amber-500" : ""}`} />
          <span>Refresh List</span>
        </button>
      </div>

      <div className="space-y-4 font-sans">
        {isLoading ? (
          <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <Loader2 className="size-8 animate-spin text-amber-500 mx-auto" />
            <p className="text-xs text-stone-500 font-medium">Fetching enquiries using TanStack Query...</p>
          </div>
        ) : enquiries.length > 0 ? (
          <div className="space-y-4">
            {enquiries.map((m) => (
              <Card
                key={m.id}
                className="p-6 rounded-3xl border-2 border-amber-200/80 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  {/* Header Badge & Date */}
                  <div className="flex items-center justify-between gap-3 flex-wrap border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                        #ENQ-{m.id.toString().padStart(5, "0")}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#3C0F1A]">
                        {m.subject}
                      </span>
                    </div>

                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1.5 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
                      <Clock className="size-3.5 text-amber-600" />
                      {new Date(m.created_at).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Devotee Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold pt-1">
                    <div>
                      <span className="text-stone-400 font-normal block text-[10px]">Devotee Name:</span>
                      <span className="text-stone-900 font-bold">{m.name}</span>
                    </div>

                    <div>
                      <span className="text-stone-400 font-normal block text-[10px]">Email Address:</span>
                      <a href={`mailto:${m.email}`} className="text-amber-800 font-bold hover:underline flex items-center gap-1">
                        <Mail className="size-3 text-amber-600" />
                        <span>{m.email}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-stone-400 font-normal block text-[10px]">Phone Number:</span>
                      <span className="text-stone-700 font-bold flex items-center gap-1">
                        <Phone className="size-3 text-stone-500" />
                        <span>{m.phone || "N/A"}</span>
                      </span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="mt-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200/70 text-xs text-stone-800 leading-relaxed font-normal flex items-start gap-2.5">
                    <MessageSquare className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>"{m.message}"</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-2 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <Sparkles className="size-8 text-amber-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-stone-800">No Devotee Enquiries Yet</h4>
            <p className="text-xs text-stone-500 font-medium">Enquiries submitted from the public contact form will appear here automatically.</p>
          </div>
        )}
      </div>
    </>
  );
}
