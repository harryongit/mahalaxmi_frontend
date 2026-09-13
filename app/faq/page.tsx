import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQs – Online Puja, Darshan & Seva at Mahalaxmi Temple Kolhapur",
  description:
    "Answers to the most common questions about online puja booking, darshan timings, prasadam delivery, Rainbow verification and seva at Shri Mahalakshmi (Ambabai) Temple Kolhapur.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    title: "FAQs – Mahalaxmi Temple Kolhapur",
    description:
      "Frequently asked questions about online puja, darshan timings and seva booking at Ambabai Mahalaxmi Temple.",
    url: `${SITE_URL}/faq`,
  },
};

const faqs = [
  {
    q: "How does online puja booking at Mahalaxmi Temple Kolhapur work?",
    a: "You select a puja or seva, choose an auspicious date, and complete payment securely on our website. The temple office confirms your booking, and on the date, Vedic pujaris perform the ritual in your family's name with your Gotra recitation. You receive photo/video proof on WhatsApp and consecrated prasadam by courier.",
  },
  {
    q: "Is the online puja performed at the actual Mahalakshmi temple?",
    a: "Yes. All online pujas and sevas are performed inside Shri Mahalakshmi (Ambabai) Temple, Kolhapur by hereditary temple pujaris exactly the way they would be performed for a devotee visiting in person.",
  },
  {
    q: "What are the darshan and aarti timings at Ambabai Temple?",
    a: "The temple is open for darshan in two shifts: morning 05:00 AM to 12:30 PM and evening 04:00 PM to 09:30 PM. All five daily aartis — Kakad, Sakal, Madhyahn, Sandhya and Shej — are performed every day. See the full schedule on our Darshan Timings page.",
  },
  {
    q: "How will I get photo or video proof of my puja?",
    a: "After your puja is performed, photos and a short video clip are dispatched directly to your WhatsApp number within 24–48 hours, along with your booking receipt.",
  },
  {
    q: "How is prasadam delivered and how long does it take?",
    a: "Consecrated prasadam is packed hygienically and shipped via courier to your address anywhere in India. Delivery typically takes 3–7 business days depending on your location. You can also add a courier service to your booking if it is not included.",
  },
  {
    q: "Can I book a puja for someone else or on behalf of my family?",
    a: "Absolutely. During booking you provide the names of all family members and your Gotra. The Sankalpa (intention) is recited in the names of every participant, whether they are physically near or far.",
  },
  {
    q: "What is the refund or cancellation policy?",
    a: "If your puja has not yet been performed, you can request a full refund or a reschedule by contacting the temple office within the cancellation window. Once a ritual is performed, standard booking terms apply as mentioned in our Terms & Conditions.",
  },
  {
    q: "Can I make a donation for Annadan, Gou Seva or temple restoration online?",
    a: "Yes. You can sponsor Annadan Mahaseva (feeding pilgrims), Goushala Gou Seva (cow feed and care), Brahman Bhojan, and festival sevas online through our seva booking pages. A receipt is generated for every contribution.",
  },
  {
    q: "Is there a VIP darshan pass to avoid long queues?",
    a: "Yes, we offer a VIP Priority Darshan Pass for a small fee which lets you skip the regular queue for a peaceful darshan. A special assisted-entry pass is also available for senior citizens, pregnant women and infants.",
  },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="FAQs"
          badge="Need Help?"
          title="Frequently Asked"
          titleGold="Questions"
          description="Everything you need to know about online puja booking, darshan timings, prasadam delivery and seva at Shri Ambabai Mahalaxmi Temple."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-3xl mx-auto w-full space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden open:shadow-md transition-shadow"
            >
              <summary className="cursor-pointer flex items-center justify-between gap-4 p-5 list-none">
                <span className="flex items-center gap-3">
                  <HelpCircle className="size-5 text-amber-800 shrink-0" />
                  <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {f.q}
                  </h2>
                </span>
                <ArrowRight className="size-4 text-amber-800 shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-5 pl-13 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                {f.a}
              </div>
            </details>
          ))}

          <section className="rounded-2xl bg-amber-50/70 border border-amber-200/70 p-6 text-center mt-8">
            <h2 className="font-serif text-xl text-amber-950">Still have a question?</h2>
            <p className="text-sm text-stone-600 mt-2">
              Our team is happy to help you choose the right puja.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#3C0F1A] text-white font-bold text-sm px-6 py-3 hover:opacity-90 transition-all"
            >
              Contact the Temple Office <ArrowRight className="size-4" />
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}