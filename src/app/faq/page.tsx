import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FAQS_DATA } from '@/data/faqs';
import { HelpCircle, PhoneCall, Mail } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | VOLT-X Electric Dirt Bikes',
  description: 'Answers to top electric dirt bike questions: battery range, 110V fast charging time, IP67 mud & water resistance, maintenance vs gas bikes, 2-seater models, and freight shipping.',
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: 'VOLT-X Electric Dirt Bikes FAQ',
    description: 'Got questions about e-moto range, charging, maintenance, or street legal setup? Get answers here.',
    url: `${siteUrl}/faq`,
  },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-zinc-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white font-bold uppercase">FAQ</span>
          </nav>

          {/* Header */}
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 text-lime-400 font-mono text-xs uppercase mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">
              Got Questions? We Have Answers.
            </h1>
            <p className="text-zinc-400 text-sm font-mono mt-2 max-w-2xl">
              Everything you need to know about battery range, fast charging, IP67 waterproofing, 2-seater passenger kits, and 50-state freight delivery.
            </p>
          </div>

          {/* FAQs Accordion/Grid */}
          <div className="space-y-6">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={faq.id}
                className="bg-[#0f121a] rounded-2xl border border-zinc-800/90 p-6 sm:p-8 space-y-3 hover:border-lime-400/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/10 text-lime-400 font-mono font-black text-xs shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-lime-400 uppercase tracking-widest block mb-1">
                      {faq.category}
                    </span>
                    <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                      {faq.question}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-10 border-l-2 border-lime-400/30">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Support CTA Box */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Still Have Questions?
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl mx-auto">
              Our Reno, NV technician team is standing by to help with custom 72V controller tuning, battery compatibility, or local dealer test rides.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-xs">
              <a
                href="tel:505-652-1743"
                className="px-6 py-3 rounded-xl bg-lime-400 text-zinc-950 font-black flex items-center gap-2 hover:bg-lime-300 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>CALL US: 505-652-1743</span>
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-black flex items-center gap-2 hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                <Mail className="w-4 h-4 text-lime-400" />
                <span>CONTACT US FORM</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
