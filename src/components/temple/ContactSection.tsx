"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { enquiryService } from "@/src/services/enquiryService";

const SUBJECT_OPTIONS = [
  "General Darshan Enquiry",
  "Online Puja & Gotra Seva",
  "Special Darshan & VIP Pass",
  "Kirnotsav Festival Timings",
  "Annadan & Seva Donation",
  "Prasadam Courier Tracking",
  "Other Temple Query",
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<{
    id?: number;
    name: string;
    subject: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please write your message or prayer enquiry.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await enquiryService.createEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
      });

      setSubmittedEnquiry({
        id: res?.id,
        name: name.trim(),
        subject: subject.trim(),
      });

      // Clear form inputs
      setName("");
      setEmail("");
      setPhone("");
      setSubject(SUBJECT_OPTIONS[0]);
      setMessage("");
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      const detail =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to send enquiry. Please try again or call the temple helpline.";
      setError(typeof detail === "string" ? detail : JSON.stringify(detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-amber-50/30">
      {/* Ambient background ornamentation */}
      <div className="absolute top-0 right-0 size-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 size-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/90 text-amber-900 border border-amber-300/80 mb-3">
            <Sparkles className="size-3 text-amber-600" />
            <span>Devotee Helpline & Enquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#380D12] tracking-tight">
            Connect with the Mandir Office
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed font-sans">
            Have questions about daily Darshan timings, Special Pujas, Kirnotsav, or Prasadam dispatch? Send your enquiry directly to the temple cell.
          </p>
        </div>

        {/* Two-Column Grid: Contact Details & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Temple Helpdesk & Timings Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-amber-900/10 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-serif text-xl font-bold text-[#380D12] mb-1">
                Temple Office & Helpline
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Our devotee assistance desk is at your service during temple operating hours.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Direct Helpline
                    </span>
                    <a
                      href="tel:+914412345678"
                      className="text-sm font-bold text-stone-800 hover:text-amber-800 transition-colors"
                    >
                      +91 44 1234 5678
                    </a>
                    <p className="text-[11px] text-stone-500">Available 5:00 AM – 9:30 PM Daily</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Email Desk
                    </span>
                    <a
                      href="mailto:hello@ambabaimahalaxmi.org"
                      className="text-sm font-bold text-stone-800 hover:text-amber-800 transition-colors"
                    >
                      hello@ambabaimahalaxmi.org
                    </a>
                    <p className="text-[11px] text-stone-500">For Sevas, Donations & Grievances</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Sanctum Address
                    </span>
                    <p className="text-sm font-bold text-stone-800 leading-snug">
                      Mahalaxmi Temple Road, Kolhapur
                    </p>
                    <p className="text-[11px] text-stone-500">Maharashtra 416012, India</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                      Temple Timings
                    </span>
                    <p className="text-sm font-bold text-stone-800">
                      5:00 AM – 12:30 PM &nbsp;•&nbsp; 4:00 PM – 9:30 PM
                    </p>
                    <p className="text-[11px] text-stone-500">Open on all 365 days of the year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust reassurance badge */}
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 flex items-center gap-3">
              <ShieldCheck className="size-6 text-amber-800 shrink-0" />
              <p className="text-xs text-amber-950 font-medium">
                Enquiries submitted through this form are logged securely into the Mandir Admin Cell and addressed promptly by our Sevaks.
              </p>
            </div>
          </div>

          {/* Column 2: Interactive Devotee Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-amber-900/10 bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow">
              {submittedEnquiry ? (
                /* Success Confirmation State */
                <div className="py-8 text-center space-y-4">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block">
                      Jai Shree Mahalakshmi!
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#380D12] mt-1">
                      Enquiry Received Successfully
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto mt-2">
                      Thank you, <span className="font-bold text-stone-800">{submittedEnquiry.name}</span>. Your enquiry regarding <span className="font-semibold text-stone-800">"{submittedEnquiry.subject}"</span> has been logged with reference ID <span className="font-mono font-bold text-amber-800">#ENQ-{submittedEnquiry.id ? submittedEnquiry.id.toString().padStart(5, "0") : "RECEIVED"}</span>.
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Our temple office will review and get in touch with you shortly.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmittedEnquiry(null)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#380D12] text-amber-200 hover:text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  <div className="border-b border-stone-100 pb-3 mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#380D12]">
                      Submit Your Enquiry or Prayer Request
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Please enter your contact details and query below.
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                      <AlertCircle className="size-4 shrink-0 text-rose-600" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. devotee@example.com"
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                        Topic / Subject <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-2.5 text-xs text-stone-800 font-semibold focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all cursor-pointer"
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                      Your Message / Enquiry Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please write your questions regarding Puja dates, Gotra recitation, Darshan passes, or travel guidance..."
                      className="w-full rounded-2xl border border-stone-200/90 bg-stone-50/60 focus:bg-white px-4 py-3 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all resize-y min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#380D12] text-amber-200 hover:bg-[#4A151C] hover:text-white font-semibold text-xs py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-4 animate-spin text-amber-400" />
                          <span>Submitting Devotee Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          <span>Send Devotee Enquiry to Mandir Office</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
