import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Ticket, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "VIP Darshan Pass Booking | Mahalaxmi Temple Kolhapur",
  description:
    "Book your VIP darshan e-pass for Shree Karveer Niwasini Ambabai Mahalaxmi Temple Kolhapur. Skip the regular queue and get special entry.",
  alternates: { canonical: "/vip-darshan" },
  openGraph: {
    type: "website",
    title: "VIP Darshan Pass - Mahalaxmi Temple Kolhapur",
    description:
      "Skip the queue with a VIP darshan e-pass for Mahalaxmi Temple Kolhapur.",
    url: `${SITE_URL}/vip-darshan`,
  },
};

const passBenefits = [
  "Dedicated VIP entry gate separate from the regular queue.",
  "Significantly reduced waiting time (usually under 30 minutes).",
  "Closer proximity to the Garbhagriha (inner sanctum) during darshan.",
  "Assistance provided for senior citizens and pregnant women.",
];

export default function VipDarshanPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does the Mahalaxmi temple Kolhapur VIP pass price cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The VIP Darshan pass price varies by season but is generally nominal to help manage crowd control while funding temple maintenance.",
        },
      },
      {
        "@type": "Question",
        name: "How to book the e-pass online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book the e-pass through the official online booking portal or by booking a special puja which often includes VIP darshan access.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Temple Services"
          badge="Skip the Queue"
          title="VIP Darshan &"
          titleGold="E-Pass Booking"
          description="Book a VIP darshan pass to avoid long queues during festivals and weekends at Shree Karveer Niwasini Ambabai Mahalaxmi Temple Kolhapur."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-12">
          
          <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-200/50">
            <div className="text-center mb-8">
              <Ticket className="mx-auto size-10 text-amber-800 mb-4" />
              <h2 className="font-serif text-3xl font-bold text-stone-900">Why Book a VIP Pass?</h2>
              <p className="text-sm text-stone-600 mt-2 max-w-xl mx-auto">
                During weekends, public holidays, and the Navratri festival, the regular darshan queue can take anywhere from 2 to 4 hours. The VIP pass provides a smooth, fast-tracked spiritual experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {passBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-700 font-medium leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#3C0F1A] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock className="size-24" />
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold text-amber-200 mb-3">Darshan Timings</h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  VIP passes are valid during specific slots in the morning and evening darshan hours. Make sure to arrive 15 minutes before your booked slot.
                </p>
                <Link
                  href="/darshan-timings"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-100 transition-colors"
                >
                  Check Timings <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200 relative overflow-hidden">
              <h3 className="font-serif text-2xl font-bold text-amber-950 mb-3">Include a Puja?</h3>
              <p className="text-sm text-stone-700 leading-relaxed mb-6">
                Did you know? If you book a special online puja (like Kumkumarchan or Abhishek), priority VIP darshan access for your family is often included.
              </p>
              <Link
                href="/online-puja"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors"
              >
                Explore Online Pujas <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 text-center">
            <AlertCircle className="mx-auto size-8 text-amber-600 mb-3" />
            <h2 className="font-serif text-2xl text-stone-900 mb-2">Book Your Pass</h2>
            <p className="text-sm text-stone-600 mb-6 max-w-lg mx-auto">
              Please note that a strict dress code applies even for VIP pass holders. Traditional, modest clothing is mandatory.
            </p>
            <Link
              href="/checkout?puja=s1"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white font-bold text-sm px-8 py-3.5 hover:opacity-95 shadow-md transition-all"
            >
              Book VIP Pass / Puja <ArrowRight className="size-4 text-amber-400" />
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
