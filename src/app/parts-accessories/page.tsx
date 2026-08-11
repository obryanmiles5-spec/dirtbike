import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BIKES_DATA } from '@/data/bikes';
import { BikeCard } from '@/components/BikeCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'Electric Dirt Bike Parts & Accessories | Sur-Ron, Talaria, Stark Varg, KTM',
  description: 'Shop official electric dirt bike parts and accessories. Sourced Sur-Ron Light Bee & Storm Bee replacement batteries, 10A fast chargers, Talaria Sting R 72V packs, Stark Varg 3.3kW chargers, off-road MX helmets, body armour, performance brake pads, heavy-duty tyres, and chain upgrade kits. Free delivery.',
  keywords: [
    'electric dirt bike parts',
    'surron parts',
    'surron light bee battery',
    'surron storm bee charger',
    'surron ultra bee parts',
    'talaria sting r battery',
    'talaria 72v battery',
    'stark varg battery pack',
    'stark varg charger',
    'ktm sx-e battery',
    'e ride pro 72v charger',
    'rfn ares battery',
    'revvi 36v battery',
    'razor 24v charger',
    'off road mx helmet',
    'kids motocross helmet',
    'body armour chest protector',
    'mx goggles anti fog',
    'motocross boots',
    'performance brake pads',
    'chain sprocket kit',
    'shinko 241 tyre',
    'electric dirt bike tyres'
  ],
  alternates: {
    canonical: `${siteUrl}/parts-accessories`,
  },
  openGraph: {
    title: 'Electric Dirt Bike Parts & Accessories – Official VoltTrail & VOLT-X Catalog',
    description: 'Browse complete electric dirt bike parts, batteries, chargers, MX gear, and performance upgrades for Sur-Ron, Talaria, Stark Varg, KTM, E Ride Pro, RFN, and Revvi.',
    url: `${siteUrl}/parts-accessories`,
    type: 'website',
  },
};

export default function PartsAccessoriesPage() {
  const accessories = BIKES_DATA.filter(
    (item) => item.category === 'accessories' || item.category === 'battery'
  );

  const canonicalUrl = `${siteUrl}/parts-accessories`;

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
        name: 'Parts & Accessories',
        item: canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Electric Dirt Bike Parts & Accessories',
    description: 'Complete catalog of electric dirt bike batteries, chargers, helmets, protection, performance upgrades, tyres and wheels.',
    numberOfItems: accessories.length,
    itemListElement: accessories.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        url: `${siteUrl}/product/${item.id}`,
        image: item.image,
        description: item.description,
        sku: item.id,
        brand: {
          '@type': 'Brand',
          name: item.specs.frameType || 'VoltTrail',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: item.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
    })),
  };

  // Extract all brands for keyword indexing tags
  const brandsList = [
    'Sur-Ron',
    'Talaria',
    'Stark Varg',
    'KTM',
    'E Ride Pro',
    'RFN',
    'Revvi',
    'Razor'
  ];

  const popularKeywords = [
    'Sur-Ron Light Bee 60V Battery',
    'Sur-Ron Storm Bee 104V Fast Charger',
    'Talaria Sting R 60V 45Ah Pack',
    'Stark Varg 6.5kWh Battery',
    'Stark Varg 3.3kW Charger',
    'KTM PowerPack 907Wh',
    'E Ride Pro 72V Replacement Battery',
    'RFN Ares OEM Charger',
    'Off-Road MX Helmet Adult & Kids',
    'Chest & Back Body Armour Set',
    'Performance Brake Pads & Sprockets',
    'Shinko 241 Dual-Sport Tyre 19in'
  ];

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
            <span className="text-white font-bold uppercase">PARTS & ACCESSORIES</span>
          </nav>

          {/* Header Banner & SEO Text Buffer */}
          <div className="border-b border-zinc-800 pb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black text-lime-400 uppercase tracking-widest font-mono">
                  VOLTTRAIL & VOLT-X OFFICIAL PARTS CATALOG
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
                  Electric Dirt Bike Parts & Accessories
                </h1>
              </div>
              <div className="text-right font-mono text-xs text-zinc-400">
                <span className="text-lime-400 font-bold">{accessories.length}</span> Products Sourced & Indexed
              </div>
            </div>

            <p className="text-zinc-300 text-sm max-w-4xl leading-relaxed">
              Explore our complete inventory of factory replacement parts, high-capacity lithium-ion battery packs, ultra-fast chargers, safety body armour, off-road MX helmets, performance brake pads, and heavy-duty knobbly tyres compatible with Sur-Ron, Talaria, Stark Varg, KTM, E Ride Pro, RFN, Revvi, and Razor models. All orders ship with free delivery and factory backing.
            </p>

            {/* Keyword Index Chips for Crawlers & Shoppers */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Indexed Model Compatibility:</span>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                {brandsList.map((brand, i) => (
                  <span key={i} className="bg-zinc-900 text-lime-400 border border-zinc-800 px-3 py-1 rounded-md font-bold">
                    {brand} Compatible Parts
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {accessories.map((item) => (
                <BikeCard key={item.id} bike={item} />
              ))}
            </div>
          </div>

          {/* SEO Search Index Footer Panel */}
          <div className="mt-16 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tight font-mono">
              Indexed Parts & Accessories Directory
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our parts database indexes genuine OEM components and aftermarket performance upgrades across all major electric dirt bike platforms. Whether you need a replacement 60V 38Ah or 72V 40Ah battery pack, a 10A fast charger, heavy-duty 19-inch tyres, high-friction brake pads, or full chest & back protection, all components are tested and verified for direct plug-and-play installation.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-zinc-300 font-mono block mb-2">High-Volume Search Keywords Index:</span>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                {popularKeywords.map((kw, idx) => (
                  <span key={idx} className="bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
