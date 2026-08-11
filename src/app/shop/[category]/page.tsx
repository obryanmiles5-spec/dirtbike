import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BIKES_DATA } from '@/data/bikes';
import { BikeCard } from '@/components/BikeCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

const CATEGORY_NAMES: Record<string, string> = {
  'electric-dirt-bikes': 'Adult Electric Dirt Bikes',
  'electric-dirt-bikes-adults': 'Adult Electric Dirt Bikes',
  'surron-alternatives': 'Surron Rivals & E-Motos',
  'street-legal-electric-motos': 'Street Legal Electric Motorcycles',
  'e-bikes': 'E-Bikes & Scramblers',
  'accessories': 'Electric Dirt Bike Parts & Accessories',
  'battery': 'Batteries & Ultra-Fast Chargers',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'electric-dirt-bikes': 'Browse high-performance adult electric dirt bikes, 72V e-motos, and Surron rivals with 50+ mph top speeds and 1000Nm wheel torque. Free nationwide crate freight.',
  'electric-dirt-bikes-adults': 'Shop heavy-duty electric dirt bikes for adults built with aircraft-grade aluminum alloy frames, 18kW peak motors, and long-range Samsung battery cells.',
  'surron-alternatives': 'High-power e-motos engineered to outperform Surron Light Bee and Storm Bee models with superior suspension, higher voltage controllers, and 2-seater option.',
  'street-legal-electric-motos': 'DOT-compliant dual-sport electric dirt bikes and supermotos equipped with LED lighting, turn signals, mirrors, horn, and 17-digit VIN numbers.',
  'e-bikes': 'High-speed urban electric bicycles, scramblers, and 2-seater passenger e-bikes built for commuters and weekend adventure riders.',
  'accessories': 'Shop genuine replacement electric dirt bike parts and accessories. Sourced Sur-Ron Light Bee & Storm Bee batteries, 10A fast chargers, Talaria Sting 72V packs, Stark Varg chargers, off-road MX helmets, chest armour, brake pads, and tyres.',
  'battery': 'High-capacity 60V, 72V, 104V lithium-ion battery packs and 10A/15A ultra-fast smart chargers for Sur-Ron, Talaria, Stark Varg, KTM, E Ride Pro, RFN, and Revvi.',
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_NAMES).map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = CATEGORY_NAMES[category];

  if (!categoryName) {
    return {
      title: 'Category Not Found | VoltDirtBike',
      description: 'The requested product category could not be found.',
    };
  }

  const description = CATEGORY_DESCRIPTIONS[category] || `Shop ${categoryName} at VoltDirtBike with free 50-state freight delivery.`;
  const title = `${categoryName} | VoltDirtBike Official Store`;
  const canonicalUrl = `${siteUrl}/shop/${category}`;

  const categoryKeywordsMap: Record<string, string[]> = {
    'accessories': [
      'electric dirt bike parts',
      'surron parts',
      'surron light bee battery',
      'surron storm bee charger',
      'talaria sting r battery',
      'stark varg charger',
      'ktm sxe battery',
      'e ride pro battery',
      'rfn ares charger',
      'revvi 36v battery',
      'off road mx helmet',
      'motocross body armour',
      'performance brake pads',
      'electric dirt bike tyres'
    ],
    'battery': [
      'surron battery',
      'surron charger',
      'talaria battery replacement',
      '60v 38ah battery',
      '72v 40ah battery',
      'stark varg battery',
      'fast charger electric dirt bike',
      '10a charger surron'
    ]
  };

  const keywords = categoryKeywordsMap[category] || [
    categoryName,
    'electric dirt bike for adults',
    'surron bike',
    'fast electric bike',
    'street legal electric dirt bike',
    'e-bike dirt',
    '72v e-moto',
    'electric motorcycle for adults'
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = CATEGORY_NAMES[category];

  if (!categoryName) {
    notFound();
  }

  const bikes = BIKES_DATA.filter((b) => {
    if (category === 'electric-dirt-bikes' || category === 'electric-dirt-bikes-adults' || category === 'surron-alternatives') {
      return b.category === 'electric-dirt-bikes' || b.category === 'e-bikes';
    }
    if (category === 'street-legal-electric-motos') {
      return b.category === 'electric-dirt-bikes' || b.category === 'e-bikes';
    }
    if (category === 'accessories') {
      return b.category === 'accessories' || b.category === 'battery';
    }
    return b.category === category;
  });

  const canonicalUrl = `${siteUrl}/shop/${category}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${siteUrl}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoryName,
    description: CATEGORY_DESCRIPTIONS[category] || `List of ${categoryName} available at VoltDirtBike`,
    itemListElement: bikes.map((bike, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: bike.name,
        url: `${siteUrl}/product/${bike.id}`,
        image: bike.image,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: bike.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="bg-zinc-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-lime-400 transition-colors">SHOP</Link>
            <span>/</span>
            <span className="text-white font-bold uppercase">{categoryName}</span>
          </nav>

          {/* Semantic Header & Content Buffer for AI Crawlers */}
          <div className="border-b border-zinc-800 pb-6 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {categoryName}
            </h1>
            <p className="text-zinc-300 text-sm font-sans max-w-3xl leading-relaxed">
              {CATEGORY_DESCRIPTIONS[category] || `Explore our high-performance line of ${categoryName.toLowerCase()} engineered with high-voltage battery architecture, adjustable hydraulic suspension, and instant motor torque.`}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-lime-400 pt-1">
              <span className="bg-lime-400/10 border border-lime-400/30 px-2.5 py-1 rounded">FREE 50-STATE FREIGHT</span>
              <span className="bg-lime-400/10 border border-lime-400/30 px-2.5 py-1 rounded">INSTANT TORQUE</span>
              <span className="bg-lime-400/10 border border-lime-400/30 px-2.5 py-1 rounded">1-YEAR FACTORY WARRANTY</span>
            </div>
          </div>

          {bikes.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 font-mono text-sm uppercase">No Products Found in this Category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bikes.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
