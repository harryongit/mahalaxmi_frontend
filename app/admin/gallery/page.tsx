"use client";

import { useState, useEffect, useRef } from "react";
import { Head, Card } from "../admin-ui";
import {
  UploadCloud,
  Trash2,
  Eye,
  EyeOff,
  Video,
  Image as ImageIcon,
  Play,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Sparkles,
  RefreshCw,
  Maximize2,
  Tag,
  Landmark,
  Flame,
  Clock,
  Filter,
  Check,
} from "lucide-react";
import {
  adminContentApi,
  getMediaUrl,
  GalleryItem,
} from "@/src/lib/api";
import { toast as sonnerToast } from "sonner";

const CATEGORIES = [
  "Sanctum",
  "Architecture",
  "Festivals",
  "Rituals",
  "Video",
  "Others",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sanctum: Sparkles,
  Architecture: Landmark,
  Festivals: Flame,
  Rituals: Clock,
  Video: Video,
  Others: Tag,
};

function getCategoryBadgeStyle(category?: string | null, isVideo?: boolean) {
  const cat = (category || (isVideo ? "Video" : "Sanctum")).toLowerCase();
  switch (cat) {
    case "sanctum":
      return "bg-amber-100 text-amber-900 border-amber-300";
    case "architecture":
      return "bg-stone-100 text-stone-900 border-stone-300";
    case "festivals":
      return "bg-emerald-100 text-emerald-900 border-emerald-300";
    case "rituals":
      return "bg-orange-100 text-orange-900 border-orange-300";
    case "video":
      return "bg-rose-100 text-rose-900 border-rose-300";
    default:
      return "bg-purple-100 text-purple-900 border-purple-300";
  }
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryType>("Sanctum");
  const [uploading, setUploading] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previewModal, setPreviewModal] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    if (type === "success") {
      sonnerToast.success(text);
    } else {
      sonnerToast.error(text);
    }
    setTimeout(() => setToast(null), 4000);
  };

  const loadGallery = async () => {
    setLoading(true);
    try {
      const data = await adminContentApi.getGallery();
      setItems(data || []);
    } catch (err: any) {
      console.error("Failed to load gallery items", err);
      showToast(err?.message || "Failed to load gallery items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // Handle local file selection from device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      showToast("File is too large. Please select a file under 100MB.", "error");
      return;
    }

    const isVideo =
      file.type.startsWith("video/") ||
      Boolean(file.name.match(/\.(mp4|webm|mov|mkv|ogg)$/i));

    setSelectedFile(file);
    if (!title) {
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      setTitle(nameWithoutExt);
    }

    if (isVideo) {
      setCategory("Video");
    } else if (category === "Video") {
      setCategory("Sanctum");
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setTitle("");
    setCategory("Sanctum");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Upload file from device with category
  const handleUpload = async () => {
    if (!selectedFile) {
      showToast("Please choose an image or video file from your device first.", "error");
      return;
    }

    setUploading(true);
    try {
      const newMedia = await adminContentApi.uploadGalleryFile(
        selectedFile,
        title.trim(),
        category
      );
      showToast(
        `${newMedia.media_type === "video" ? "Video" : "Photo"} uploaded under category "${category}"!`,
        "success"
      );
      clearSelectedFile();
      await loadGallery();
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast(err?.message || "Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  // Toggle active/inactive
  const handleToggle = async (item: GalleryItem) => {
    setTogglingId(item.id);
    try {
      const updated = await adminContentApi.toggleGalleryStatus(item.id);
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, is_active: updated.is_active } : it))
      );
      showToast(
        `Item marked as ${updated.is_active ? "Active (Visible on Landing Page)" : "Inactive (Hidden)"}.`
      );
    } catch (err: any) {
      console.error("Toggle error:", err);
      showToast(err?.message || "Failed to update item status.", "error");
    } finally {
      setTogglingId(null);
    }
  };

  // Delete item
  const handleDelete = async (item: GalleryItem) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${item.title || "this item"}"? This will permanently remove it from the database and server.`
      )
    ) {
      return;
    }

    setDeletingId(item.id);
    try {
      await adminContentApi.deleteGalleryImage(item.id);
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      showToast("Gallery item deleted successfully.");
    } catch (err: any) {
      console.error("Delete error:", err);
      showToast(err?.message || "Failed to delete item.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter items by category, status, and search query
  const filteredItems = items.filter((item) => {
    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchUrl = item.url?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      if (!matchTitle && !matchUrl && !matchCat) return false;
    }

    // 2. Status filter
    if (selectedStatus === "active" && !item.is_active) return false;
    if (selectedStatus === "inactive" && item.is_active) return false;

    // 3. Category filter
    if (selectedCategory !== "all") {
      const itemCat = item.category || (item.media_type === "video" ? "Video" : "Sanctum");
      if (itemCat.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    return true;
  });

  const isVideoFile =
    selectedFile?.type.startsWith("video/") ||
    Boolean(selectedFile?.name.match(/\.(mp4|webm|mov|mkv|ogg)$/i));

  const totalCount = items.length;
  const isFiltered = selectedCategory !== "all" || selectedStatus !== "all" || searchQuery.trim() !== "";

  return (
    <>
      <Head
        title="Gallery Management"
        sub="Upload photos and videos directly from device, categorize into Sanctum, Architecture, Festivals, Rituals, Video, and Others, and control visibility."
      />

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-md transition-all ${toast.type === "success"
            ? "bg-emerald-900/90 text-emerald-100 border border-emerald-500/30"
            : "bg-rose-900/90 text-rose-100 border border-rose-500/30"
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="size-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.text}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* 1. UPLOAD MEDIA SECTION */}
      <Card className="mb-8 border-2 border-amber-500/20 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/20">
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 rounded-xl bg-[#380D12] text-amber-300">
            <UploadCloud className="size-5" />
          </span>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#380D12]">
              Upload Media from Device
            </h3>
            <p className="text-xs text-stone-500">
              Select temple photos or videos from your computer, assign a category, and publish to the landing page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* File Picker & Form Fields */}
          <div className="md:col-span-7">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              id="gallery-file-input"
            />

            {!selectedFile ? (
              <label
                htmlFor="gallery-file-input"
                className="flex flex-col items-center justify-center border-2 border-dashed border-amber-300 hover:border-amber-500 bg-white/70 hover:bg-amber-50/50 rounded-2xl p-8 cursor-pointer transition-all group text-center"
              >
                <div className="size-16 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <UploadCloud className="size-8" />
                </div>
                <p className="text-sm font-bold text-stone-800">
                  Click to select photo or video from device
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Supports JPG, PNG, WEBP, MP4, WEBM, MOV (Max 100MB)
                </p>
                <span className="mt-4 px-4 py-2 rounded-xl bg-[#380D12] text-amber-200 text-xs font-semibold group-hover:bg-[#4A151C] transition-colors">
                  Browse Device
                </span>
              </label>
            ) : (
              <div className="border border-amber-200 rounded-2xl bg-white p-4 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-2.5 rounded-xl ${isVideoFile ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {isVideoFile ? <Video className="size-5" /> : <ImageIcon className="size-5" />}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-stone-800 truncate max-w-[280px]">
                        {selectedFile.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                        {isVideoFile ? "Video media" : "Image media"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearSelectedFile}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                    title="Remove file"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Title / Caption Field */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Title / Caption
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Navratri Mahapuja, Sunrise Darshan..."
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 font-sans"
                    />
                  </div>

                  {/* Category Selection Dropdown */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Upload Actions */}
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex-1 bg-[#380D12] text-amber-200 hover:bg-[#4A151C] hover:text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {uploading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin" />
                        Uploading to Server & Database...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="size-4" />
                        Save & Publish ({category})
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearSelectedFile}
                    disabled={uploading}
                    className="px-4 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Preview Area */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-stone-200 bg-stone-900/5 p-3 flex flex-col items-center justify-center min-h-[220px]">
              <div className="flex items-center justify-between w-full mb-2 px-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                  Live Preview
                </span>
                {selectedFile && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                    Category: {category}
                  </span>
                )}
              </div>
              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-md">
                  {isVideoFile ? (
                    <video
                      src={previewUrl}
                      controls
                      playsInline
                      className="size-full object-contain"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="size-full object-cover"
                    />
                  )}
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                    {isVideoFile ? "Video Preview" : "Image Preview"}
                  </span>
                </div>
              ) : (
                <div className="text-center py-8 text-stone-400">
                  <ImageIcon className="size-10 mx-auto stroke-1 text-stone-300 mb-1" />
                  <p className="text-xs">No media selected yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 2. GALLERY MANAGEMENT & DEDICATED CATEGORY FILTER BAR */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#380D12]">
              Media Library & Category Filters
            </h3>
            <p className="text-xs text-stone-500">
              Filter by category or visibility status to manage temple images and videos.
            </p>
          </div>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
            Total: {totalCount} Items
          </span>
        </div>

        {/* ROW 1: DEDICATED CATEGORY FILTER CHIPS */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 flex items-center gap-1.5">
              <Filter className="size-3 text-amber-700" />
              Filter by Category
            </span>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* 'All' button */}
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${selectedCategory === "all"
                ? "bg-[#380D12] text-amber-200 border-[#380D12] shadow-md ring-2 ring-amber-500/20"
                : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-amber-300"
                }`}
            >
              <span>All Categories</span>
              <span
                className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${selectedCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-stone-200 text-stone-700"
                  }`}
              >
                {totalCount}
              </span>
            </button>

            {/* Individual Category Buttons */}
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const Icon = CATEGORY_ICONS[cat] || Tag;
              const count = items.filter((i) => {
                const itemCat = i.category || (i.media_type === "video" ? "Video" : "Sanctum");
                return itemCat.toLowerCase() === cat.toLowerCase();
              }).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${active
                    ? "bg-[#380D12] text-amber-200 border-[#380D12] shadow-md ring-2 ring-amber-500/20"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-amber-300"
                    }`}
                >
                  <Icon className="size-3.5" />
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${active
                      ? "bg-white/20 text-white"
                      : "bg-stone-200 text-stone-700"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 2: VISIBILITY STATUS TABS + SEARCH INPUT WITH REFRESH BUTTON */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Segmented Buttons */}
          <div className="inline-flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${selectedStatus === "all"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
                }`}
            >
              All Status ({totalCount})
            </button>
            <button
              onClick={() => setSelectedStatus("active")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${selectedStatus === "active"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
                }`}
            >
              <Eye className="size-3" />
              Active ({items.filter((i) => i.is_active).length})
            </button>
            <button
              onClick={() => setSelectedStatus("inactive")}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${selectedStatus === "inactive"
                ? "bg-stone-700 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
                }`}
            >
              <EyeOff className="size-3" />
              Inactive ({items.filter((i) => !i.is_active).length})
            </button>
          </div>

          {/* Search Input with Refresh Icon on Right Side */}
          <div className="flex items-center gap-2 min-w-[260px] flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by title, filename, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-stone-200/90 bg-white pl-10 pr-8 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 font-sans shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Refresh Button displaying ONLY icon on right side of search */}
            <button
              onClick={loadGallery}
              disabled={loading}
              title="Refresh Gallery"
              aria-label="Refresh Gallery"
              className="size-9 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 shadow-xs transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin text-amber-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Filter Summary Pill Bar */}
        {isFiltered && (
          <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 px-4 py-2 rounded-xl text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <span className="font-bold">Active Filter:</span>
              {selectedCategory !== "all" && (
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-semibold">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedStatus !== "all" && (
                <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-900 font-semibold capitalize">
                  Status: {selectedStatus}
                </span>
              )}
              {searchQuery.trim() && (
                <span className="px-2 py-0.5 rounded-md bg-white text-stone-800 font-semibold border border-amber-200">
                  Search: "{searchQuery}"
                </span>
              )}
              <span className="text-stone-500">
                — Showing {filteredItems.length} of {totalCount} items
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedStatus("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-amber-900 hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* 3. MEDIA CARDS GRID */}
        {loading ? (
          <div className="py-20 text-center text-stone-500 font-medium flex flex-col items-center justify-center gap-2">
            <RefreshCw className="size-6 animate-spin text-amber-600" />
            <p className="text-xs">Loading media library...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-3">
            <ImageIcon className="size-10 mx-auto text-stone-300" />
            <p className="font-serif text-base font-bold text-stone-700">No media items found</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {isFiltered
                ? "No items match your active category, status, or search filters. Try resetting the filters."
                : "No media items uploaded yet. Select a photo or video above to upload."}
            </p>
            {isFiltered && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#380D12] text-amber-200 text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              const fullMediaUrl = getMediaUrl(item.url);
              const isVideo =
                item.media_type === "video" ||
                Boolean(item.url?.match(/\.(mp4|webm|mov|mkv|ogg)$/i));
              const itemCategory = item.category || (isVideo ? "Video" : "Sanctum");
              const CategoryIcon = CATEGORY_ICONS[itemCategory] || Tag;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border transition-all overflow-hidden bg-white shadow-sm hover:shadow-xl flex flex-col ${item.is_active
                    ? "border-emerald-300/80 hover:border-emerald-500"
                    : "border-stone-200 hover:border-stone-400 opacity-80"
                    }`}
                >
                  {/* Media Visual Preview */}
                  <div
                    onClick={() => setPreviewModal(item)}
                    className="relative aspect-video w-full bg-stone-950 overflow-hidden cursor-pointer"
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={fullMediaUrl}
                          muted
                          preload="metadata"
                          playsInline
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="size-11 rounded-full bg-black/60 border border-amber-300/80 text-amber-300 flex items-center justify-center backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="size-5 ml-0.5" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={fullMediaUrl}
                        alt={item.title || "Gallery photo"}
                        loading="lazy"
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      {/* Distinct Category Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md border ${getCategoryBadgeStyle(
                          itemCategory,
                          isVideo
                        )}`}
                      >
                        <CategoryIcon className="size-2.5" />
                        {itemCategory}
                      </span>

                      {/* Active/Inactive Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider shadow-sm ${item.is_active
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-800 text-stone-300"
                          }`}
                      >
                        {item.is_active ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute bottom-2.5 right-2.5 size-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="size-3.5 text-amber-300" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        className="text-xs font-bold text-stone-800 line-clamp-1 title"
                        title={item.title || "Untitled media"}
                      >
                        {item.title || "Untitled Media"}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-stone-500 font-mono">
                          ID: #{item.id}
                        </span>
                        <span className="text-[10px] text-stone-300">•</span>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {itemCategory}
                        </span>
                        <span className="text-[10px] text-stone-300">•</span>
                        <span className="text-[10px] text-stone-500">
                          {isVideo ? "Video" : "Photo"}
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      {/* Active/Inactive Toggle Button */}
                      <button
                        onClick={() => handleToggle(item)}
                        disabled={togglingId === item.id}
                        className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${item.is_active
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200"
                          }`}
                        title={
                          item.is_active
                            ? "Click to deactivate and hide from landing page"
                            : "Click to activate and show on landing page"
                        }
                      >
                        {togglingId === item.id ? (
                          <RefreshCw className="size-3 animate-spin" />
                        ) : item.is_active ? (
                          <>
                            <Eye className="size-3 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="size-3 text-stone-400" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item.id}
                        className="grid size-8 place-items-center rounded-xl bg-rose-50 border border-rose-200/60 text-rose-600 hover:bg-rose-100 transition-colors shadow-sm cursor-pointer"
                        title="Delete from server & database"
                      >
                        {deletingId === item.id ? (
                          <RefreshCw className="size-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {previewModal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setPreviewModal(null)}
        >
          <button
            onClick={() => setPreviewModal(null)}
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
          >
            <X className="size-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-4xl text-center space-y-3 w-full"
          >
            {previewModal.media_type === "video" ||
              previewModal.url.match(/\.(mp4|webm|mov|mkv|ogg)$/i) ? (
              <video
                src={getMediaUrl(previewModal.url)}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] w-auto max-w-full mx-auto rounded-2xl border-2 border-amber-300/40 shadow-2xl bg-black"
              />
            ) : (
              <img
                src={getMediaUrl(previewModal.url)}
                alt={previewModal.title || "Preview"}
                className="max-h-[75vh] w-auto max-w-full mx-auto rounded-2xl border-2 border-amber-300/40 shadow-2xl object-contain"
              />
            )}
            <div className="text-white">
              <h4 className="font-serif text-base font-bold text-amber-200">
                {previewModal.title || "Untitled Media"}
              </h4>
              <p className="text-xs text-stone-400 font-mono mt-1">
                Category: {previewModal.category || "Sanctum"} • Status:{" "}
                {previewModal.is_active ? "Active (Visible Publicly)" : "Inactive (Hidden)"} • ID: #{previewModal.id}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
