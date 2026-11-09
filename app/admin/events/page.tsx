"use client";

import { useAdmin, uid } from "../admin-context";
import { Head, AddBtn, upd, del } from "../admin-ui";
import { adminContentApi, contentApi, getMediaUrl, EventItem } from "@/src/lib/api";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  Upload,
  Image as ImageIcon,
  Trash2,
  Save,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  ExternalLink,
} from "lucide-react";

export default function EventsAdminPage() {
  const { s, setS } = useAdmin();
  const [savingId, setSavingId] = useState<string | number | null>(null);
  const [uploadingId, setUploadingId] = useState<string | number | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load fresh events from backend on mount
  useEffect(() => {
    async function loadFreshEvents() {
      try {
        const events = await contentApi.getEvents();
        if (events && Array.isArray(events) && events.length > 0) {
          setS((prev) => ({
            ...prev,
            events: events.map((ev: any) => ({
              id: ev.id,
              title: ev.title || ev.name || "",
              name: ev.name || ev.title || "",
              from_date: ev.from_date || (ev.date && !ev.date.includes("–") ? ev.date : "") || "",
              to_date: ev.to_date || "",
              date: ev.date || "",
              time: ev.time || "",
              description: ev.description || ev.note || "",
              note: ev.note || ev.description || "",
              image: ev.image || "",
              tag: ev.tag || "Festival",
            })),
          }));
        }
      } catch (err) {
        console.error("Failed to load events from backend:", err);
      }
    }
    loadFreshEvents();
  }, [setS]);

  // Dismiss notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCreateNewEvent = () => {
    const newId = uid();
    const newEvent = {
      id: newId,
      title: "New Temple Festival",
      name: "New Temple Festival",
      from_date: new Date().toISOString().slice(0, 10),
      to_date: "",
      date: new Date().toISOString().slice(0, 10),
      time: "06:00 AM – 09:30 PM",
      description: "Sacred festival celebrations honoring Goddess Mahalaxmi.",
      note: "Sacred festival celebrations honoring Goddess Mahalaxmi.",
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800",
      tag: "Major Utsav",
    };

    setS((prev) => ({
      ...prev,
      events: [newEvent, ...prev.events],
    }));
  };

  const handleFileUpload = async (eventId: string | number, file: File) => {
    setUploadingId(eventId);
    try {
      const res = await adminContentApi.uploadImage(file);
      if (res && res.url) {
        upd(setS, "events", String(eventId), { image: res.url });
        setNotification({ type: "success", message: "Festival image uploaded successfully!" });
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (err: any) {
      console.error("Image upload error:", err);
      setNotification({
        type: "error",
        message: err?.message || "Failed to upload image. Please try again.",
      });
    } finally {
      setUploadingId(null);
    }
  };

  const saveEvent = async (e: any) => {
    setSavingId(e.id);
    try {
      const fromD = (e.from_date || "").trim();
      const toD = (e.to_date || "").trim();
      
      // Calculate display date string
      let computedDate = fromD;
      if (fromD && toD && fromD !== toD) {
        computedDate = `${fromD} – ${toD}`;
      } else if (!fromD && e.date) {
        computedDate = e.date;
      }

      const payload = {
        title: (e.title || e.name || "Festival").trim(),
        name: (e.title || e.name || "Festival").trim(),
        from_date: fromD,
        to_date: toD !== fromD ? toD : "",
        date: computedDate,
        time: (e.time || "").trim(),
        description: (e.description || e.note || "").trim(),
        note: (e.description || e.note || "").trim(),
        image: (e.image || "").trim(),
        tag: (e.tag || "Festival").trim(),
      };

      if (typeof e.id === "string" && isNaN(Number(e.id))) {
        // Create new event on backend
        const created = await adminContentApi.createEvent(payload);
        upd(setS, "events", e.id, { ...payload, id: created.id });
        setNotification({ type: "success", message: "New festival created successfully!" });
      } else {
        // Update existing event on backend
        await adminContentApi.updateEvent(e.id, payload);
        upd(setS, "events", String(e.id), payload);
        setNotification({ type: "success", message: "Festival updated successfully!" });
      }
    } catch (err: any) {
      console.error("Event save error:", err);
      setNotification({
        type: "error",
        message: err?.message || "Failed to save festival. Please check fields.",
      });
    } finally {
      setSavingId(null);
    }
  };

  const deleteEvent = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this festival/event?")) return;

    if (typeof id === "number" || !isNaN(Number(id))) {
      try {
        await adminContentApi.deleteEvent(id);
        setNotification({ type: "success", message: "Festival removed from calendar." });
      } catch (err: any) {
        console.error("Event delete error:", err);
      }
    }
    del(setS, "events", String(id));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <Head
        title="Events & Festivals Management"
        sub="Configure sacred Mandir Utsavs, festival date ranges or single-day events, timings, and banners."
        action={
          <AddBtn onClick={handleCreateNewEvent}>
            Add Festival / Event
          </AddBtn>
        }
      />

      {/* Floating Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-lg transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="size-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-black/5 rounded-full"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {(!s.events || s.events.length === 0) && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 shadow-sm p-8 space-y-4">
          <Calendar className="size-12 text-amber-800 mx-auto opacity-70" />
          <h3 className="font-serif text-xl font-bold text-stone-900">No Events Configured</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Click the button below to schedule your first temple celebration or annual utsav.
          </p>
          <button
            onClick={handleCreateNewEvent}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3C0F1A] text-white font-bold text-xs hover:bg-[#4E1624] transition-all cursor-pointer shadow-md"
          >
            <Plus className="size-4 text-amber-300" />
            <span>Add First Festival</span>
          </button>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {s.events.map((e: any, index: number) => {
          const fromD = (e.from_date || "").trim();
          const toD = (e.to_date || "").trim();
          const isDateRange = Boolean(fromD && toD && fromD !== toD);
          const isSingleDate = Boolean(fromD && (!toD || toD === fromD));
          const mediaUrl = getMediaUrl(e.image);

          return (
            <div
              key={e.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Card Header Strip */}
              <div className="bg-stone-50/90 px-6 py-3.5 border-b border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="size-6 rounded-full bg-[#3C0F1A] text-white text-[11px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-serif text-base font-bold text-stone-900">
                    {e.title || e.name || "Untitled Festival"}
                  </span>

                  {/* Date Scope Badge */}
                  {isDateRange ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                      Multi-Day Range: {fromD} – {toD}
                    </span>
                  ) : isSingleDate ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Single Day Event: {fromD}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-700">
                      {e.date || "Date Pending"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveEvent(e)}
                    disabled={savingId === e.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3C0F1A] hover:bg-[#4E1624] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {savingId === e.id ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin text-amber-300" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="size-3.5 text-amber-300" />
                        <span>Save Festival</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteEvent(e.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Main Card Body */}
              <div className="p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Form: Fields (8 Cols) */}
                <div className="lg:col-span-8 space-y-4">
                  {/* 1. Title & Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                        Festival / Event Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kirnotsav Sun Rays Miracle or Sharadiya Navratri Utsav"
                        value={e.title || e.name || ""}
                        onChange={(ev) =>
                          upd(setS, "events", String(e.id), {
                            title: ev.target.value,
                            name: ev.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white text-xs font-bold text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                        Badge / Tag
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Major Utsav, Annual Yatra"
                        value={e.tag || ""}
                        onChange={(ev) =>
                          upd(setS, "events", String(e.id), { tag: ev.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white text-xs text-stone-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                      />
                    </div>
                  </div>

                  {/* 2. From Date & To Date (Single Date vs Date Range) */}
                  <div className="p-4 rounded-2xl border border-amber-200/80 bg-amber-50/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-amber-900 flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-amber-700" />
                        <span>Event Dates (Single Date or Date Range)</span>
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {toD && toD !== fromD ? "Multi-Day Festival Period" : "Single-Day Celebration"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                          From Date (Start Date) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2026-09-22 or Sep 22, 2026"
                          value={e.from_date || ""}
                          onChange={(ev) =>
                            upd(setS, "events", String(e.id), { from_date: ev.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                          To Date (Optional - Leave blank if only 1 day)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. 2026-10-02 or Oct 02, 2026"
                            value={e.to_date || ""}
                            onChange={(ev) =>
                              upd(setS, "events", String(e.id), { to_date: ev.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-amber-500 pr-7"
                          />
                          {e.to_date && (
                            <button
                              type="button"
                              onClick={() =>
                                upd(setS, "events", String(e.id), { to_date: "" })
                              }
                              className="absolute right-2 top-2.5 text-stone-400 hover:text-stone-600"
                              title="Clear To Date (Make Single Day)"
                            >
                              <X className="size-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-stone-500 italic">
                      💡 Tip: For 1-day events (e.g. Rathotsav, Deepotsav), specify only <strong>From Date</strong>. For multi-day utsavs (e.g. Navratri, Kirnotsav), fill both <strong>From Date</strong> and <strong>To Date</strong>.
                    </p>
                  </div>

                  {/* 3. Event Timings */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Event Timing <span className="text-stone-400 font-normal">(Hours / Aarti timings)</span>
                    </label>
                    <div className="relative">
                      <Clock className="size-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. 05:00 AM – 12:30 PM & 04:00 PM – 09:30 PM (or 06:00 PM onwards)"
                        value={e.time || ""}
                        onChange={(ev) =>
                          upd(setS, "events", String(e.id), { time: ev.target.value })
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white text-xs text-stone-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                      />
                    </div>
                  </div>

                  {/* 4. Description */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Festival Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Detailed spiritual description of the festival, historic significance, and rituals performed for devotees..."
                      value={e.description || e.note || ""}
                      onChange={(ev) =>
                        upd(setS, "events", String(e.id), {
                          description: ev.target.value,
                          note: ev.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white text-xs text-stone-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                    />
                  </div>
                </div>

                {/* Right Column: Image Upload & Preview (4 Cols) */}
                <div className="lg:col-span-4 space-y-3">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500">
                    Festival Banner Image <span className="text-rose-500">*</span>
                  </label>

                  {/* Image Preview Window */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-inner group">
                    {mediaUrl ? (
                      <img
                        src={mediaUrl}
                        alt={e.title || "Festival Preview"}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="size-full flex flex-col items-center justify-center text-stone-400 gap-1.5">
                        <ImageIcon className="size-8 stroke-1" />
                        <span className="text-[10px]">No Image Selected</span>
                      </div>
                    )}

                    {uploadingId === e.id && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white gap-2">
                        <Loader2 className="size-6 animate-spin text-amber-300" />
                        <span className="text-xs font-bold">Uploading Image...</span>
                      </div>
                    )}
                  </div>

                  {/* Direct File Upload Button */}
                  <div className="flex gap-2">
                    <label className="flex-1 py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs">
                      <Upload className="size-3.5 text-amber-800" />
                      <span>Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(ev) => {
                          const file = ev.target.files?.[0];
                          if (file) handleFileUpload(e.id, file);
                        }}
                      />
                    </label>

                    {e.image && (
                      <button
                        type="button"
                        onClick={() =>
                          upd(setS, "events", String(e.id), { image: "" })
                        }
                        className="p-2.5 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Image"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Manual Image URL Input */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                      Or Paste Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={e.image || ""}
                      onChange={(ev) =>
                        upd(setS, "events", String(e.id), { image: ev.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50/50 text-[11px] text-stone-700 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
