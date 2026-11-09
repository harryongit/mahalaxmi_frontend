"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useAdmin } from "../admin-context";
import { Head, Card } from "../admin-ui";
import { adminContentApi } from "@/src/lib/api";
import {
  Loader2,
  Plus,
  Gift,
  Trash2,
  Edit,
  Clock,
  ImageIcon,
  HelpCircle,
  Star,
  Heart,
  BookOpen,
  Sparkles,
  UploadCloud,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

// The 4 allowed Service Types (Darshan & Events removed as requested)
const SERVICE_CATEGORIES = [
  { id: 1, name: "Puja", slug: "puja", icon: "🕉️", color: "border-amber-400 bg-amber-50 text-amber-900" },
  { id: 2, name: "Chadhava", slug: "chadhava", icon: "📿", color: "border-rose-400 bg-rose-50 text-rose-900" },
  { id: 3, name: "Naivadya", slug: "naivadya", icon: "🍃", color: "border-emerald-400 bg-emerald-50 text-emerald-900" },
  { id: 4, name: "Other", slug: "other", icon: "🙏", color: "border-indigo-400 bg-indigo-50 text-indigo-900" },
];

const DEFAULT_SERVICE_IMAGE = "/assets/default-service.jpg";
function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setUploading(true);
    try {
      const res = await adminContentApi.uploadImage(file);
      const imageUrl = res?.url || res?.data?.url;
      const backendMsg = res?.message || res?.data?.message;

      if (imageUrl) {
        onChange(imageUrl);
        if (backendMsg) {
          toast.success(backendMsg);
        }
      } else {
        toast.error(backendMsg || "Upload failed");
      }
    } catch (err: any) {
      const errorMsg = err?.message || err?.detail || err?.data?.message || "Upload failed";
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {value ? (
        <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50/60 to-orange-50/40 p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 border-2 border-amber-400/80 bg-stone-100 shadow-md">
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  DEFAULT_SERVICE_IMAGE;
              }}
            />
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              <span>Image Uploaded & Ready</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              This preview will be displayed on public puja cards and the booking page.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="size-3.5 animate-spin text-amber-700" />
                ) : (
                  <UploadCloud className="size-3.5 text-amber-700" />
                )}
                <span>Change Image</span>
              </button>
              <button
                type="button"
                disabled={uploading}
                onClick={() => onChange("")}
                className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors cursor-pointer"
              >
                <Trash2 className="size-3.5 inline mr-1" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-300 hover:border-amber-600 rounded-2xl p-6 bg-amber-50/30 hover:bg-amber-50/70 transition-all flex flex-col items-center justify-center gap-2.5 cursor-pointer group text-center"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="size-8 animate-spin text-amber-700" />
              <p className="font-bold text-stone-800 text-xs">Uploading your image, please wait...</p>
            </div>
          ) : (
            <>
              <div className="size-14 rounded-2xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center text-amber-800 transition-colors shadow-2xs">
                <UploadCloud className="size-7" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-stone-800 text-sm group-hover:text-amber-950">
                  Click to upload service image
                </p>
                <p className="text-xs text-stone-500">
                  Select a photo from your computer (JPG, PNG, WEBP). Preview appears automatically.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
  onSave,
}: {
  service: any;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}) {
  const isEdit = Boolean(service?.id);

  // Parse helper for initial array fields
  const parseArray = (val: any) => {
    if (!val) return [];
    if (typeof val === "string") {
      try { return JSON.parse(val); } catch { return []; }
    }
    return Array.isArray(val) ? val : [];
  };

  const [modalTab, setModalTab] = useState<
    "overview" | "benefits" | "process" | "gallery" | "reviews" | "faqs"
  >("overview");

  const [data, setData] = useState<any>({
    title: "",
    subtitle: "",
    price: 551,
    time: "Daily • 07:00 AM & 05:00 PM",
    image: "",
    description: "",
    tag: "",
    icon: "🕉️",
    is_active: true,
    category_id: 1,
    category: "Puja",
    ...service,
    benefits: parseArray(service?.benefits),
    process: parseArray(service?.process),
    gallery: parseArray(service?.gallery),
    reviews: parseArray(service?.reviews),
    faqs: parseArray(service?.faqs),
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Benefit inputs
  const [bTitle, setBTitle] = useState("");
  const [bDesc, setBDesc] = useState("");

  // Process inputs
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");

  // Gallery inputs
  const [gUploading, setGUploading] = useState(false);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  // Review inputs
  const [rName, setRName] = useState("");
  const [rLocation, setRLocation] = useState("");
  const [rRating, setRRating] = useState(5);
  const [rText, setRText] = useState("");

  // FAQ inputs
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");

  const handleCategoryChange = (catId: number) => {
    const selectedCat = SERVICE_CATEGORIES.find((c) => c.id === catId);
    setData({
      ...data,
      category_id: catId,
      category: selectedCat ? selectedCat.name : "Puja",
      icon: selectedCat ? selectedCat.icon : "🕉️",
    });
  };

  // Add Item Handlers
  const handleAddBenefit = () => {
    if (!bTitle.trim()) {
      toast.error("Please enter a benefit title");
      return;
    }
    const current = Array.isArray(data.benefits) ? data.benefits : [];
    setData({
      ...data,
      benefits: [...current, { title: bTitle.trim(), desc: bDesc.trim() }],
    });
    setBTitle("");
    setBDesc("");
    toast.success("Benefit added");
  };

  const handleRemoveBenefit = (idx: number) => {
    setData({
      ...data,
      benefits: data.benefits.filter((_: any, i: number) => i !== idx),
    });
  };

  const handleLoadBenefitTemplates = () => {
    setData({
      ...data,
      benefits: [
        {
          title: "Divine Wealth & Prosperity",
          desc: "Invokes Goddess Mahalaxmi's grace for debt clearance, business growth, and enduring financial stability.",
        },
        {
          title: "Gotra & Family Sankalpa",
          desc: "Authentic Vedic sankalpa chanted with devotee's Gotra and family names by head temple priests.",
        },
        {
          title: "Domestic Peace & Removal of Obstacles",
          desc: "Alleviates planetary doshas, brings mental peace, and protects the home from negative energies.",
        },
        {
          title: "Sanctified Prasadam Delivery",
          desc: "Blessed kumkum, raksha sutra thread, dry prasad, and coin delivered safely to your home.",
        },
      ],
    });
    toast.success("Temple benefit templates loaded");
  };

  const handleAddProcess = () => {
    if (!pTitle.trim()) {
      toast.error("Please enter a step title");
      return;
    }
    const current = Array.isArray(data.process) ? data.process : [];
    setData({
      ...data,
      process: [
        ...current,
        {
          step: current.length + 1,
          title: pTitle.trim(),
          desc: pDesc.trim(),
        },
      ],
    });
    setPTitle("");
    setPDesc("");
    toast.success("Step added to process");
  };

  const handleRemoveProcess = (idx: number) => {
    const remaining = data.process.filter((_: any, i: number) => i !== idx);
    const reindexed = remaining.map((item: any, i: number) => ({
      ...item,
      step: i + 1,
    }));
    setData({ ...data, process: reindexed });
  };

  const handleLoadProcessTemplates = () => {
    setData({
      ...data,
      process: [
        {
          step: 1,
          title: "Gotra & Name Sankalpa",
          desc: "Priests sit at the sanctum sanctorum and recite your Gotra and family names in sacred Vedic resolve.",
        },
        {
          step: 2,
          title: "Sacred Snan & Abhishek Ritual",
          desc: "Consecrated bathing of the deity with sacred water, milk, honey, and fragrant sandal paste.",
        },
        {
          step: 3,
          title: "Kumkumarchan & Shringar Aarti",
          desc: "108 Lakshmi name recitation with pure saffron vermilion and deep aarti at the holy sanctum.",
        },
        {
          step: 4,
          title: "Prasad Consecration & Dispatch",
          desc: "Holy prasad packed with care and dispatched to your postal address with tracking details sent on WhatsApp.",
        },
      ],
    });
    toast.success("4-Step Vedic process loaded");
  };

  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGUploading(true);
    try {
      const res = await adminContentApi.uploadImage(file);
      const url = res?.url || res?.data?.url;
      if (url) {
        const current = Array.isArray(data.gallery) ? data.gallery : [];
        setData({ ...data, gallery: [...current, url] });
        toast.success("Gallery image uploaded");
      }
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setGUploading(false);
    }
  };

  const handleRemoveGallery = (idx: number) => {
    setData({
      ...data,
      gallery: data.gallery.filter((_: any, i: number) => i !== idx),
    });
  };

  const handleLoadSanctumGallery = () => {
    setData({
      ...data,
      gallery: [
        "/assets/g1.jpg",
        "/assets/g2.jpg",
        "/assets/g3.jpg",
        "/assets/g4.jpg",
        "/assets/g5.jpg",
        "/assets/g6.jpg",
      ],
    });
    toast.success("Sanctum photo assets loaded");
  };

  const handleAddReview = () => {
    if (!rName.trim() || !rText.trim()) {
      toast.error("Please enter devotee name and review text");
      return;
    }
    const current = Array.isArray(data.reviews) ? data.reviews : [];
    setData({
      ...data,
      reviews: [
        ...current,
        {
          name: rName.trim(),
          location: rLocation.trim() || "India",
          rating: rRating,
          date: "Recently",
          text: rText.trim(),
        },
      ],
    });
    setRName("");
    setRLocation("");
    setRText("");
    toast.success("Review added");
  };

  const handleRemoveReview = (idx: number) => {
    setData({
      ...data,
      reviews: data.reviews.filter((_: any, i: number) => i !== idx),
    });
  };

  const handleLoadReviewTemplates = () => {
    setData({
      ...data,
      reviews: [
        {
          name: "Dr. Rohit Deshmukh",
          location: "Mumbai, Maharashtra",
          rating: 5,
          date: "Recently",
          text: "Very blissful experience. Received WhatsApp photos of our Gotra sankalpa and the prasad arrived safely at our home.",
        },
        {
          name: "Smt. Sunita Kulkarni",
          location: "Bangalore, Karnataka",
          rating: 5,
          date: "Recently",
          text: "Booked this seva for my family. Felt immense peace and positive divine vibrations throughout the week.",
        },
        {
          name: "Mahesh Joshi",
          location: "Pune, Maharashtra",
          rating: 5,
          date: "Recently",
          text: "Authentic temple rituals conducted by senior pandits. The video proof gave our whole family divine darshan.",
        },
      ],
    });
    toast.success("Sample reviews loaded");
  };

  const handleAddFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) {
      toast.error("Please enter both question and answer");
      return;
    }
    const current = Array.isArray(data.faqs) ? data.faqs : [];
    setData({
      ...data,
      faqs: [...current, { q: faqQ.trim(), a: faqA.trim() }],
    });
    setFaqQ("");
    setFaqA("");
    toast.success("FAQ added");
  };

  const handleRemoveFaq = (idx: number) => {
    setData({
      ...data,
      faqs: data.faqs.filter((_: any, i: number) => i !== idx),
    });
  };

  const handleLoadFaqTemplates = () => {
    setData({
      ...data,
      faqs: [
        {
          q: "Do I need to be physically present at the temple during the seva?",
          a: "No, physical presence is not required. The Vedic panditjis perform the puja remotely on your behalf with your Gotra and family names chanted during the Sankalpa.",
        },
        {
          q: "How will I receive the seva photos and video proof?",
          a: "Photos and videos of your Gotra sankalpa and ritual will be shared on your registered WhatsApp number on the same day the seva is completed.",
        },
        {
          q: "How long does it take for Prasadam to arrive at home?",
          a: "Blessed kumkum, sacred thread, and dry prasad are dispatched via courier within 24-48 hours. Delivery takes 3 to 6 business days across India.",
        },
        {
          q: "Can I include my whole family in the Gotra recitation?",
          a: "Yes, you can enter up to 6 family members during checkout so each person's name is chanted in the holy sankalpa.",
        },
      ],
    });
    toast.success("Standard temple FAQs loaded");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!data.title?.trim()) {
      const msg = "Please enter a service title.";
      setErrorMsg(msg);
      toast.error(msg);
      setModalTab("overview");
      return;
    }
    if (!data.price || data.price <= 0) {
      const msg = "Please enter a valid dakshina amount.";
      setErrorMsg(msg);
      toast.error(msg);
      setModalTab("overview");
      return;
    }
    if (!data.category_id) {
      const msg = "Please select a service type.";
      setErrorMsg(msg);
      toast.error(msg);
      setModalTab("overview");
      return;
    }
    if (!data.image || !data.image.trim()) {
      const msg = "Service image is mandatory. Please upload an image.";
      setErrorMsg(msg);
      toast.error(msg);
      setModalTab("overview");
      return;
    }

    setSaving(true);
    try {
      await onSave(data);
      onClose();
    } catch (e: any) {
      const msg = e?.message || e?.detail || "Failed to save service";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const timePresets = [
    "Daily • 07:00 AM & 05:00 PM",
    "Daily • Morning & Evening",
    "Weekly • Friday Special",
    "Navratri & Special Days",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs overflow-y-auto p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col border border-stone-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
              {SERVICE_CATEGORIES.find((c) => c.id === data.category_id)?.icon || "🕉️"}
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-amber-950">
                {isEdit ? `Edit Service: ${data.title}` : "Add New Sacred Service"}
              </h2>
              <p className="text-[11px] text-stone-500">
                Configure full details, benefits, ritual process, gallery, reviews, and FAQs.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 font-bold text-sm size-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-stone-200 px-6 bg-stone-50/70 overflow-x-auto scrollbar-none gap-1 shrink-0">
          {[
            { id: "overview", label: "Overview", icon: BookOpen, count: null },
            { id: "benefits", label: "Benefits", icon: Heart, count: data.benefits?.length || 0 },
            { id: "process", label: "Process Steps", icon: Sparkles, count: data.process?.length || 0 },
            { id: "gallery", label: "Gallery", icon: ImageIcon, count: data.gallery?.length || 0 },
            { id: "reviews", label: "Reviews", icon: Star, count: data.reviews?.length || 0 },
            { id: "faqs", label: "FAQs", icon: HelpCircle, count: data.faqs?.length || 0 },
          ].map((tab) => {
            const isSelected = modalTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setModalTab(tab.id as any)}
                className={`px-3.5 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "border-amber-800 text-amber-950 bg-white shadow-2xs"
                    : "border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
              <XCircle className="size-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {modalTab === "overview" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Category */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-stone-50 to-orange-50/40 border border-amber-200/80 space-y-2">
                <label className="font-bold text-stone-900 block text-xs">
                  Select Service Type (Category) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const isSelected = data.category_id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-amber-600 bg-white shadow-md ring-2 ring-amber-400/50"
                            : "border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300"
                        }`}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <span className="block font-bold text-stone-900 text-xs">{cat.name}</span>
                          <span className="block text-[10px] text-stone-500">
                            {cat.name === "Puja"
                              ? "Vedic Archana"
                              : cat.name === "Chadhava"
                              ? "Otee & Saree"
                              : cat.name === "Naivadya"
                              ? "Bhog & Prasad"
                              : "Gou Seva & Other"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    placeholder="e.g. Kumkumarchan Seva"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Subtitle (Brief Hook)</label>
                  <input
                    type="text"
                    value={data.subtitle || ""}
                    onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    placeholder="e.g. Sacred Saffron & Vermilion Offering"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Price & Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Dakshina Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={data.price}
                    onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Ritual Time Slot</label>
                  <input
                    type="text"
                    value={data.time || ""}
                    onChange={(e) => setData({ ...data, time: e.target.value })}
                    placeholder="e.g. Daily • 07:00 AM & 05:00 PM"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {timePresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setData({ ...data, time: preset })}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 transition-colors border border-stone-200 cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badge Tag */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Badge Tag (Optional)</label>
                <input
                  type="text"
                  value={data.tag || ""}
                  onChange={(e) => setData({ ...data, tag: e.target.value })}
                  placeholder="e.g. Most Popular / Special Offering"
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Service Image */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-stone-800 block text-xs">
                    Service Image <span className="text-red-500 font-bold">* (Mandatory)</span>
                  </label>
                  {!data.image ? (
                    <span className="text-[10px] text-red-600 bg-red-50 font-bold px-2 py-0.5 rounded-md border border-red-200">
                      Upload Required
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                      Image Uploaded ✓
                    </span>
                  )}
                </div>
                <ImageUploader
                  value={data.image}
                  onChange={(url: string) => {
                    setData({ ...data, image: url });
                    if (url) setErrorMsg("");
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={data.description || ""}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Describe the ritual, holy significance, sankalpa blessings, and materials offered to the Goddess..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Status Visibility */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">Status Visibility</label>
                <div
                  onClick={() => setData({ ...data, is_active: !data.is_active })}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                    data.is_active ? "border-emerald-300 bg-emerald-50/70" : "border-stone-300 bg-stone-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {data.is_active ? (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    ) : (
                      <XCircle className="size-4 text-stone-400" />
                    )}
                    <div>
                      <span className={`font-bold text-xs block ${data.is_active ? "text-emerald-800" : "text-stone-600"}`}>
                        {data.is_active ? "Active (Visible on Website)" : "Inactive (Hidden from Website)"}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {data.is_active ? "Devotees can see and book this service online" : "Service is saved as draft"}
                      </span>
                    </div>
                  </div>
                  <div className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${data.is_active ? "bg-emerald-600" : "bg-stone-300"}`}>
                    <div className={`size-4 rounded-full bg-white transition-transform ${data.is_active ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BENEFITS */}
          {modalTab === "benefits" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    Spiritual Benefits of this Seva
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Add divine blessings devotees receive by booking this ritual.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadBenefitTemplates}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-[11px] hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                >
                  ✨ Load Temple Templates
                </button>
              </div>

              {/* Added Benefits List */}
              <div className="space-y-2">
                {data.benefits?.map((b: any, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="size-6 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs shrink-0">
                        0{i + 1}
                      </span>
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs">{b.title}</h5>
                        {b.desc && <p className="text-[11px] text-stone-500 mt-0.5">{b.desc}</p>}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(i)}
                      className="text-stone-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Benefit Form */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <h5 className="font-bold text-stone-800 text-xs">+ Add New Benefit</h5>
                <input
                  type="text"
                  value={bTitle}
                  onChange={(e) => setBTitle(e.target.value)}
                  placeholder="Benefit Title (e.g. Financial Abundance & Prosperity)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-medium"
                />
                <textarea
                  rows={2}
                  value={bDesc}
                  onChange={(e) => setBDesc(e.target.value)}
                  placeholder="Benefit Description (e.g. Invokes Goddess Mahalaxmi's grace for debt relief and prosperity...)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-normal"
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  + Add Benefit to Service
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PROCESS */}
          {modalTab === "process" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    Step-by-Step Ritual Procedure
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Explain how temple priests perform this puja with gotra recitation and prasad dispatch.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadProcessTemplates}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-[11px] hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                >
                  ✨ Load 4-Step Vedic Process
                </button>
              </div>

              {/* Added Steps */}
              <div className="space-y-2">
                {data.process?.map((p: any, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="size-6 rounded-lg bg-[#3C0F1A] text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {p.step || i + 1}
                      </span>
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs">{p.title}</h5>
                        {p.desc && <p className="text-[11px] text-stone-500 mt-0.5">{p.desc}</p>}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProcess(i)}
                      className="text-stone-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Step Form */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <h5 className="font-bold text-stone-800 text-xs">+ Add New Ritual Step</h5>
                <input
                  type="text"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  placeholder="Step Title (e.g. Sankalpa & Gotra Uccharan)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-medium"
                />
                <textarea
                  rows={2}
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  placeholder="Step Description (e.g. Priests recite your Gotra and family names before starting the ritual...)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-normal"
                />
                <button
                  type="button"
                  onClick={handleAddProcess}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  + Add Step to Process
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {modalTab === "gallery" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    Ritual & Sanctum Photo Gallery
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Upload holy photos of the ritual, shringar, or temple sanctum.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSanctumGallery}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-[11px] hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                >
                  ✨ Load Sanctum Photos
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.gallery?.map((img: any, i: number) => {
                  const url = typeof img === "string" ? img : img.url;
                  return (
                    <div
                      key={i}
                      className="relative h-28 rounded-xl overflow-hidden border border-stone-200 group bg-stone-100"
                    >
                      <img src={url} alt="Gallery" className="size-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGallery(i)}
                        className="absolute top-1.5 right-1.5 size-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 cursor-pointer shadow-sm"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Upload Image Only */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={galleryFileRef}
                  className="hidden"
                  onChange={handleGalleryFileUpload}
                />
                <button
                  type="button"
                  disabled={gUploading}
                  onClick={() => galleryFileRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  {gUploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <UploadCloud className="size-4" />
                  )}
                  <span>{gUploading ? "Uploading photo..." : "Upload Photo from PC"}</span>
                </button>
                <span className="text-[11px] text-stone-500">
                  Upload photos directly from your device (JPG, PNG, WEBP).
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {modalTab === "reviews" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    Devotee Reviews & Experiences
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Add genuine devotee feedback and 5-star ratings for this offering.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadReviewTemplates}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-[11px] hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                >
                  ✨ Load Sample Reviews
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-2">
                {data.reviews?.map((r: any, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-xs">{r.name}</span>
                        <span className="text-[10px] text-stone-500">({r.location || "India"})</span>
                        <span className="text-amber-500 text-[11px]">
                          {"★".repeat(r.rating || 5)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 italic mt-1 leading-relaxed">
                        "{r.text || r.review}"
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveReview(i)}
                      className="text-stone-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <h5 className="font-bold text-stone-800 text-xs">+ Add New Devotee Review</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">Devotee Name</label>
                    <input
                      type="text"
                      value={rName}
                      onChange={(e) => setRName(e.target.value)}
                      placeholder="e.g. Smt. Rohini Patil"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">City / State</label>
                    <input
                      type="text"
                      value={rLocation}
                      onChange={(e) => setRLocation(e.target.value)}
                      placeholder="e.g. Pune, Maharashtra"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">Rating</label>
                    <select
                      value={rRating}
                      onChange={(e) => setRRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-bold text-amber-900"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={rText}
                  onChange={(e) => setRText(e.target.value)}
                  placeholder="Review comment (e.g. Very peaceful abhishek, received prasad at home in 3 days...)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddReview}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  + Add Review to Service
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: FAQS */}
          {modalTab === "faqs" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-950">
                    Frequently Asked Questions (FAQs)
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Answer questions about Gotra sankalpa, proof on WhatsApp, timing, and prasad.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadFaqTemplates}
                  className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-[11px] hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                >
                  ✨ Load Standard FAQs
                </button>
              </div>

              {/* FAQs List */}
              <div className="space-y-2">
                {data.faqs?.map((faq: any, i: number) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <h5 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                        <span className="text-amber-800 font-serif font-bold">Q:</span>
                        <span>{faq.q || faq.question}</span>
                      </h5>
                      <p className="text-[11px] text-stone-600 mt-1 leading-relaxed pl-4 border-l-2 border-amber-200">
                        {faq.a || faq.answer}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(i)}
                      className="text-stone-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add FAQ Form */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <h5 className="font-bold text-stone-800 text-xs">+ Add New FAQ</h5>
                <input
                  type="text"
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  placeholder="Question (e.g. Do I need to be physically present at the temple?)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-medium"
                />
                <textarea
                  rows={2}
                  value={faqA}
                  onChange={(e) => setFaqA(e.target.value)}
                  placeholder="Answer (e.g. No, this seva is performed remotely with your Gotra sankalpa...)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-amber-500 font-normal"
                />
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  + Add FAQ to Service
                </button>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-stone-200 pt-4 pb-2 flex items-center justify-between gap-3 z-10">
            <span className="text-[11px] text-stone-500 hidden sm:inline">
              Tabs with items: {data.benefits?.length ? "Benefits, " : ""}{data.process?.length ? "Process, " : ""}{data.gallery?.length ? "Gallery, " : ""}{data.reviews?.length ? "Reviews, " : ""}{data.faqs?.length ? "FAQs" : ""}
            </span>

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-stone-300 rounded-xl font-bold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-700 to-amber-900 text-white font-bold rounded-xl flex items-center gap-2 hover:from-amber-800 hover:to-amber-950 shadow-md cursor-pointer disabled:opacity-50 transition-all"
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                <span>{isEdit ? "Update Service & Details" : "Save & Publish Service"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RitualsAdminPage() {
  const { s, setS } = useAdmin();
  const [editingService, setEditingService] = useState<any>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [togglingId, setTogglingId] = useState<number | string | null>(null);

  const services: any[] = s.services || [];

  // Categorize
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: services.length,
      Puja: 0,
      Chadhava: 0,
      Naivadya: 0,
      Other: 0,
    };
    services.forEach((svc) => {
      const cat = (svc.category || "").toLowerCase();
      if (cat.includes("puja") || cat.includes("pooja") || svc.category_id === 1) counts.Puja++;
      else if (cat.includes("chadhava") || svc.category_id === 2) counts.Chadhava++;
      else if (cat.includes("naivadya") || cat.includes("naivedya") || svc.category_id === 3)
        counts.Naivadya++;
      else counts.Other++;
    });
    return counts;
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      // 1. Category Filter
      if (activeCategoryFilter !== "All") {
        const cat = (svc.category || "").toLowerCase();
        if (activeCategoryFilter === "Puja" && !(cat.includes("puja") || cat.includes("pooja") || svc.category_id === 1))
          return false;
        if (activeCategoryFilter === "Chadhava" && !(cat.includes("chadhava") || svc.category_id === 2))
          return false;
        if (
          activeCategoryFilter === "Naivadya" &&
          !(cat.includes("naivadya") || cat.includes("naivedya") || svc.category_id === 3)
        )
          return false;
        if (
          activeCategoryFilter === "Other" &&
          (cat.includes("puja") ||
            cat.includes("pooja") ||
            cat.includes("chadhava") ||
            cat.includes("naivadya") ||
            cat.includes("naivedya") ||
            [1, 2, 3].includes(svc.category_id))
        )
          return false;
      }

      // 2. Status Filter
      if (statusFilter === "active" && svc.is_active === false) return false;
      if (statusFilter === "inactive" && svc.is_active !== false) return false;

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (svc.title || "").toLowerCase().includes(q);
        const subMatch = (svc.subtitle || "").toLowerCase().includes(q);
        const timeMatch = (svc.time || "").toLowerCase().includes(q);
        if (!titleMatch && !subMatch && !timeMatch) return false;
      }

      return true;
    });
  }, [services, activeCategoryFilter, statusFilter, searchQuery]);

  const activeCount = services.filter((svc) => svc.is_active !== false).length;
  const inactiveCount = services.length - activeCount;

  // Save (Create or Update)
  const saveService = async (serviceData: any) => {
    if (serviceData.id) {
      const updated = await adminContentApi.updateService(serviceData.id, serviceData);
      setS((p) => ({
        ...p,
        services: p.services.map((svc: any) => (svc.id === updated.id ? { ...svc, ...updated } : svc)),
      }));
      const msg = updated?.message || updated?.data?.message;
      if (msg) toast.success(msg);
    } else {
      const created = await adminContentApi.createService(serviceData);
      setS((p) => ({
        ...p,
        services: [...(p.services || []), created],
      }));
      const msg = created?.message || created?.data?.message;
      if (msg) toast.success(msg);
    }
  };

  // Toggle active / inactive status in one click
  const toggleServiceStatus = async (svc: any) => {
    const nextStatus = !svc.is_active;
    setTogglingId(svc.id);
    try {
      const updated = await adminContentApi.updateService(svc.id, { is_active: nextStatus });
      setS((p) => ({
        ...p,
        services: p.services.map((item: any) =>
          item.id === svc.id ? { ...item, is_active: nextStatus, ...updated } : item
        ),
      }));
      const msg = updated?.message || updated?.data?.message;
      if (msg) toast.success(msg);
    } catch (err: any) {
      const errMsg = err?.message || err?.detail || "Failed to update service status";
      toast.error(errMsg);
    } finally {
      setTogglingId(null);
    }
  };

  // Delete
  const deleteService = async (id: string | number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      try {
        const res = await adminContentApi.deleteService(id);
        setS((p) => ({
          ...p,
          services: p.services.filter((svc: any) => svc.id !== id),
        }));
        const msg = res?.message || res?.data?.message;
        if (msg) toast.success(msg);
      } catch (err: any) {
        const errMsg = err?.message || err?.detail || "Failed to delete service";
        toast.error(errMsg);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Header */}
      <Head
        title="Puja & Services Management"
        sub="Add, edit, activate/deactivate, and organize offerings across Puja, Chadhava, Naivadya, and Other categories."
        action={
          <button
            onClick={() =>
              setEditingService({
                title: "",
                subtitle: "",
                price: 551,
                time: "Daily • 07:00 AM & 05:00 PM",
                is_active: true,
                category_id: 1,
                category: "Puja",
              })
            }
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white font-bold text-xs flex items-center gap-2 hover:from-amber-800 hover:to-amber-950 shadow-md transition-all cursor-pointer"
          >
            <Plus className="size-4" />
            <span>+ Add Service</span>
          </button>
        }
      />

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Total Services
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
              {services.length}
            </h3>
          </div>
          <div className="size-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 font-bold">
            🕉️
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              Active / Visible
            </span>
            <h3 className="font-serif text-2xl font-bold text-emerald-700 mt-0.5">
              {activeCount}
            </h3>
          </div>
          <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Eye className="size-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Inactive / Hidden
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-600 mt-0.5">
              {inactiveCount}
            </h3>
          </div>
          <div className="size-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500">
            <EyeOff className="size-5" />
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        {/* Category Tabs: All, Puja, Chadhava, Naivadya, Other */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 pb-3">
          {[
            { id: "All", name: "All Services", icon: "✨", count: categoryCounts.All },
            { id: "Puja", name: "Puja", icon: "🕉️", count: categoryCounts.Puja },
            { id: "Chadhava", name: "Chadhava", icon: "📿", count: categoryCounts.Chadhava },
            { id: "Naivadya", name: "Naivadya", icon: "🍃", count: categoryCounts.Naivadya },
            { id: "Other", name: "Other", icon: "🙏", count: categoryCounts.Other },
          ].map((tab) => {
            const isSelected = activeCategoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 size-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by title, subtitle, slot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[11px] font-bold text-stone-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-800 font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="all">All ({services.length})</option>
              <option value="active">Active Only ({activeCount})</option>
              <option value="inactive">Inactive Only ({inactiveCount})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services List Display */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-3">
          <div className="size-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-2xl">
            🕉️
          </div>
          <h4 className="font-serif text-lg font-bold text-stone-800">No Services Found</h4>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {searchQuery
              ? `No services match your search "${searchQuery}".`
              : "No services are available in this category yet. Click '+ Add Service' to create one."}
          </p>
          <button
            onClick={() =>
              setEditingService({
                title: "",
                subtitle: "",
                price: 551,
                time: "Daily • 07:00 AM & 05:00 PM",
                is_active: true,
                category_id:
                  activeCategoryFilter === "Chadhava"
                    ? 2
                    : activeCategoryFilter === "Naivadya"
                    ? 3
                    : activeCategoryFilter === "Other"
                    ? 4
                    : 1,
              })
            }
            className="px-4 py-2 bg-amber-800 text-white font-bold text-xs rounded-xl hover:bg-amber-900 transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="size-3.5" />
            <span>Create First {activeCategoryFilter === "All" ? "Puja" : activeCategoryFilter} Service</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredServices.map((r: any) => {
            const isActive = r.is_active !== false;
            const categoryObj =
              SERVICE_CATEGORIES.find(
                (c) =>
                  c.id === r.category_id ||
                  c.name.toLowerCase() === (r.category || "").toLowerCase()
              ) || SERVICE_CATEGORIES[0];

            return (
              <Card key={r.id}>
                <div
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-1 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-75"
                  }`}
                >
                  {/* Left: Thumbnail & Main Info */}
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative size-16 sm:size-20 rounded-2xl overflow-hidden shrink-0 border border-amber-200/80 bg-stone-100 shadow-2xs">
                      <img
                        src={r.image || DEFAULT_SERVICE_IMAGE}
                        alt={r.title}
                        className="size-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_SERVICE_IMAGE;
                        }}
                      />
                      {!isActive && (
                        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center">
                          <EyeOff className="size-5 text-white/90" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${categoryObj.color}`}
                        >
                          <span>{categoryObj.icon}</span>
                          <span>{categoryObj.name}</span>
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-stone-200 text-stone-700 border border-stone-300"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              isActive ? "bg-emerald-500 animate-pulse" : "bg-stone-400"
                            }`}
                          />
                          <span>{isActive ? "Active" : "Inactive"}</span>
                        </span>

                        {r.tag && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900">
                            {r.tag}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-stone-900 text-base leading-tight truncate">
                        {r.title}
                      </h4>

                      {r.subtitle && (
                        <p className="text-xs font-medium text-amber-900/80 line-clamp-1">
                          {r.subtitle}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 pt-0.5">
                        <span className="font-bold text-stone-900 flex items-center gap-1">
                          <span className="text-[var(--gold)] font-serif text-sm">₹{r.price}</span>
                          <span className="text-[10px] text-stone-500 font-normal">Dakshina</span>
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-stone-500">
                          <Clock className="size-3 text-amber-700" />
                          <span>{r.time || "Daily Hours"}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Status Switch */}
                  <div className="flex items-center gap-2 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                    {/* Toggle Active / Inactive Button */}
                    <button
                      onClick={() => toggleServiceStatus(r)}
                      disabled={togglingId === r.id}
                      title={isActive ? "Click to set Inactive" : "Click to set Active"}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                          : "bg-stone-100 border-stone-300 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {togglingId === r.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : isActive ? (
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="size-3.5 text-stone-500" />
                      )}
                      <span>{isActive ? "Active" : "Inactive"}</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => setEditingService(r)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Edit className="size-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteService(r.id, r.title)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl cursor-pointer transition-colors"
                      title="Delete service"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {editingService && (
        <ServiceModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={saveService}
        />
      )}
    </div>
  );
}
