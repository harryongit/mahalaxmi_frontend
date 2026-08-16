"use client";

import { useState } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Train,
  Plane,
  Bus,
  ChevronDown,
} from "lucide-react";
import { IMG } from "@/src/components/temple/images";
import { enquiryService } from "@/src/services/enquiryService";

export default function ContactPage() {
  useLenis();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // POST http://localhost:8000/api/v1/enquiries/
      await enquiryService.createEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
      });

      setSubmitted(true);
      // Reset Form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      const errorDetail =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Failed to submit enquiry. Please try again.";
      setError(typeof errorDetail === "string" ? errorDetail : JSON.stringify(errorDetail));
    } finally {
      setLoading(false);
    }
  };

  const contactFaqs = [
    {
      q: "What are the best times to visit for peaceful Darshan?",
      a: "Early morning hours between 5:30 AM and 7:00 AM during Usha Kala Puja offer the most peaceful and serene Darshan experience with minimal waiting time.",
    },
    {
      q: "How can I book VIP Darshan or Special Pujas online?",
      a: "You can book online Pujas and VIP Darshan passes directly through our website by navigating to the Rituals or Checkout page. Instant booking confirmation with a reference ID will be generated.",
    },
    {
      q: "Is parking facility available near the temple complex?",
      a: "Yes, dedicated paid parking facilities managed by the Municipal Corporation are available at Bhavani Mandap and Bhausingji Road, within 300 meters of the temple gate.",
    },
    {
      q: "How will I receive photos, videos, and Prasadam for online Puja?",
      a: "Live photo and video proof of Panditji chanting your Gotra will be sent to your WhatsApp number. Consecrated Prasadam will be packed in a sacred box and delivered to your address via courier.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb="Contact Us"
        badge="24/7 Devotee Assistance"
        title="Get in Touch with"
        titleGold="Temple Sansthan"
        description="Have questions about visiting Kolhapur Mahalaxmi Mandir, ritual timings, online booking, or donations? We are here to assist you."
      />

      <main className="flex-1 py-12 px-4 sm:px-6 space-y-16 max-w-6xl mx-auto w-full">
        
        {/* TOP QUICK CONTACT INFO CARDS (4 CARDS GRID) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <MapPin className="size-6" />
            </div>
            <strong className="font-serif text-lg font-bold text-stone-900 block">Temple Address</strong>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012, India
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Clock className="size-6" />
            </div>
            <strong className="font-serif text-lg font-bold text-stone-900 block">Temple Timings</strong>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              5:00 AM – 12:30 PM &nbsp;·&nbsp; 4:00 PM – 9:30 PM (Daily Aarti)
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Phone className="size-6" />
            </div>
            <strong className="font-serif text-lg font-bold text-stone-900 block">Helpline Numbers</strong>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              +91 98765 43210<br />+91 231 265 4321
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl border-2 border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 shadow-md hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-3"
          >
            <div className="size-12 rounded-2xl bg-[#3C0F1A] text-[var(--gold)] flex items-center justify-center font-bold shadow-md border border-[var(--gold)]/30">
              <Mail className="size-6" />
            </div>
            <strong className="font-serif text-lg font-bold text-stone-900 block">Email Inquiries</strong>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              info@mahalaxmikolhapur.com<br />hello@ambabaimahalaxmi.org
            </p>
          </motion.div>
        </section>

        {/* TWO COLUMN CONTACT FORM & MAP LOCATION SECTION */}
        <section className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column — Send Us a Message Form */}
          <div className="rounded-3xl border-2 border-amber-300/80 bg-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Our committee responds to devotee inquiries within 24 hours.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="size-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 p-6"
              >
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-300 shadow-md">
                  <CheckCircle2 className="size-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Enquiry Sent Successfully!
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed font-medium">
                  Your query has been saved to the Mahalaxmi Temple office registry. A confirmation email has been dispatched to your email address.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow-md hover:bg-emerald-900 cursor-pointer transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-800 block mb-1">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1">Phone / Mobile Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">Subject *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Lakshmi Puja Booking for Navratri"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="I would like to book a Lakshmi Puja for Navratri..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/30"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin text-[var(--gold)]" />
                      <span>Sending Enquiry to Sansthan...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="size-4 text-[var(--gold)]" />
                      <span>Send Message to Sansthan</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column — Map Banner & VIP Helpline Card */}
          <div className="space-y-6">
            
            {/* Map Visual Banner */}
            <div className="rounded-3xl border-2 border-amber-300/80 bg-white overflow-hidden shadow-xl relative aspect-[16/10]">
              <img
                src={IMG.location}
                alt="Kolhapur Mahalaxmi Temple Map Location"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <strong className="font-serif text-base font-bold text-amber-300 block">
                    Shri Mahalaxmi Mandir, Kolhapur
                  </strong>
                  <span className="text-[11px] text-white/80">Mahalaxmi Temple Road, Kolhapur 416012</span>
                </div>
                
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[var(--gold)] text-stone-950 font-bold text-xs shadow-md shrink-0 hover:brightness-110"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Devotee Assistance Box */}
            <div className="rounded-3xl border-2 border-amber-300/80 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[var(--gold)]" />
                <h4 className="font-serif text-lg font-bold text-gradient-gold">
                  Devotee Helpline & Assistance
                </h4>
              </div>
              <p className="text-xs text-amber-100/80 leading-relaxed font-normal">
                For urgent inquiries regarding online Puja bookings, Kirnotsav schedules, or Prasadam dispatch tracking, contact our helpline cell directly.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs font-bold text-[var(--gold)]">
                <Phone className="size-4" />
                <span>Call Center: +91 98765 43210 (06:00 AM – 09:00 PM)</span>
              </div>
            </div>

          </div>

        </section>

        {/* HOW TO REACH KOLHAPUR TEMPLE GUIDE */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Pilgrim Travel Guide
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              How to Reach Kolhapur
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Convenient connectivity by train, flight, and road from all major cities in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-white space-y-3 shadow-md">
              <div className="size-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Train className="size-6 text-amber-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">By Railway</h3>
              <p className="text-stone-600 leading-relaxed">
                <strong>Kolhapur CSMT Station (KOP)</strong> is located just 3 km from the temple. Direct express trains run daily from Mumbai, Pune, Bengaluru, and Tirupati.
              </p>
            </div>

            <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-white space-y-3 shadow-md">
              <div className="size-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Plane className="size-6 text-amber-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">By Air</h3>
              <p className="text-stone-600 leading-relaxed">
                <strong>Kolhapur Airport (KLH)</strong> is 10 km from the temple with regular flights from Hyderabad & Tirupati. Nearby major airports are Pune (230 km) & Goa (210 km).
              </p>
            </div>

            <div className="p-6 rounded-3xl border-2 border-amber-200/90 bg-white space-y-3 shadow-md">
              <div className="size-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Bus className="size-6 text-amber-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">By Road</h3>
              <p className="text-stone-600 leading-relaxed">
                Kolhapur is directly connected on <strong>NH-48 highway</strong>. Frequent MSRTC Volvo & luxury sleeper buses operate from Mumbai, Pune, Goa, and Hubballi.
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED CONTACT QUESTIONS (ACCORDION) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Devotee FAQ
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {contactFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-amber-200/90 bg-white overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-serif text-sm sm:text-base font-bold text-stone-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-5 text-amber-800 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
