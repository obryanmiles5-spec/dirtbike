import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

const LEGAL_TITLES: Record<string, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  shipping: 'Shipping & Returns Policy',
};

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'privacy' },
    { slug: 'terms' },
    { slug: 'shipping' },
  ];
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = LEGAL_TITLES[slug];

  if (!title) {
    return {
      title: 'Policy Not Found | VOLT-X Motorsports',
      description: 'The requested policy document could not be found.',
    };
  }

  const canonicalUrl = `${siteUrl}/legal/${slug}`;

  return {
    title: `${title} | VOLT-X Motorsports USA`,
    description: `Official ${title} for VOLT-X Motorsports USA Inc. Covering order dispatch, battery warranty, 30-day trail guarantee, and 256-bit SSL encrypted checkout security.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LegalPolicyPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const title = LEGAL_TITLES[slug];

  if (!title) {
    notFound();
  }

  return (
    <div className="bg-zinc-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Link href="/" className="hover:text-lime-400 transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-white font-bold uppercase">{title}</span>
        </nav>

        <div className="border-b border-zinc-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-zinc-400 text-xs font-mono mt-1">
            Last Updated: July 2026 | VOLT-X Motors USA Inc.
          </p>
        </div>

        <div className="bg-[#0f121a] rounded-2xl border border-zinc-800 p-6 sm:p-10 text-zinc-300 text-xs sm:text-sm leading-relaxed space-y-6">
          {slug === 'privacy' && (
            <>
              <h2 className="text-lg font-bold text-white uppercase font-mono">1. Information We Collect</h2>
              <p>VOLT-X Motorsports collects user details when placing orders or contacting customer service, including your full name, shipping destination address, telephone number, and payment preferences. All payments are securely handled via 256-bit SSL encrypted gateways.</p>
              
              <h2 className="text-lg font-bold text-white uppercase font-mono">2. How We Use Information</h2>
              <p>Your details are used strictly to coordinate 50-state heavy freight crate shipping, generate Manufacturer Statement of Origin (MSO) titles for state DMV registration, and dispatch battery warranty updates.</p>

              <h2 className="text-lg font-bold text-white uppercase font-mono">3. Data Security & Encryption</h2>
              <p>We do not store complete raw credit card numbers. Payment processing is tokenized directly through accredited PCI-DSS compliant payment networks including Fincra, Apple Pay, and secure bank wire partners.</p>
            </>
          )}

          {slug === 'terms' && (
            <>
              <h2 className="text-lg font-bold text-white uppercase font-mono">1. Agreement to Terms</h2>
              <p>By purchasing from VOLT-X Motorsports or utilizing our e-commerce store, you agree to abide by all local, state, and federal off-road vehicle guidelines. Off-road electric dirt bikes are intended for controlled trail, track, and private property riding unless equipped with DOT street-legal kits and DMV registration.</p>

              <h2 className="text-lg font-bold text-white uppercase font-mono">2. 2-Year Factory Battery Warranty</h2>
              <p>Every VOLT-X electric dirt bike includes a 24-month manufacturer warranty covering battery cells, BMS circuit boards, FOC controllers, and mid-drive brushless IPM motors against defects.</p>
            </>
          )}

          {slug === 'shipping' && (
            <>
              <h2 className="text-lg font-bold text-white uppercase font-mono">1. Freight Crate Delivery</h2>
              <p>All complete electric dirt bikes are packed in reinforced steel cages and heavy-duty cardboard crates. Every shipment is 100% insured against transit damage and dispatched directly to your residential driveway via lift-gate freight carriers.</p>

              <h2 className="text-lg font-bold text-white uppercase font-mono">2. 30-Day Trail Test Guarantee</h2>
              <p>Test your bike on your favorite trails for up to 30 days. If you are not completely satisfied with power delivery or handling, contact our Reno HQ team for return authorization.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
