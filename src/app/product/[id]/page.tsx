import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BIKES_DATA } from '@/data/bikes';
import { BikeCard } from '@/components/BikeCard';
import { formatImageUrl } from '@/lib/imageUtils';
import { Star, ShieldCheck, Truck, Zap, Check, ArrowLeft, SlidersHorizontal, ShoppingCart } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return BIKES_DATA.map((bike) => ({
    id: bike.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const bike = BIKES_DATA.find((b) => b.id === id);

  if (!bike) {
    return {
      title: 'Product Not Found | VOLT-X Motorsports',
      description: 'The requested electric dirt bike model could not be found.',
    };
  }

  const isAccessory = bike.category === 'accessories' || bike.category === 'battery';
  const title = `${bike.name} | ${bike.categoryLabel} – VoltTrail & VOLT-X`;
  const description = isAccessory
    ? `${bike.description.slice(0, 150)}... Sourced for ${bike.name}. ${bike.specs.batteryCapacity ? `Compatibility: ${bike.specs.batteryCapacity}.` : ''} Free delivery.`
    : `${bike.description.slice(0, 155)}... Specs: ${bike.specs.batteryVoltage}V ${bike.specs.batteryAh}Ah Battery, ${bike.specs.peakPowerKW}kW Peak Power, ${bike.specs.topSpeedMph} MPH top speed. Free 50-state freight.`;
  const canonicalUrl = `${siteUrl}/product/${bike.id}`;
  const imageUrl = formatImageUrl(bike.image);

  const productKeywords = [
    bike.name,
    bike.categoryLabel,
    bike.specs.frameType || '',
    'electric dirt bike parts',
    'surron parts',
    'surron battery',
    'talaria accessories',
    'stark varg charger',
    'ktm sxe battery',
    'e-moto accessories',
    'replacement battery pack',
    'fast charger',
    'mx helmet',
    'off road riding gear',
    'knobbly tyres',
    'performance brake pads'
  ].filter(Boolean);

  return {
    title,
    description,
    keywords: productKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: bike.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const bike = BIKES_DATA.find((b) => b.id === id);

  if (!bike) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/product/${bike.id}`;
  const formattedMainImage = formatImageUrl(bike.image);

  // Schema JSON-LD
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bike.name,
    image: [formattedMainImage, ...(bike.galleryImages || []).map((img) => formatImageUrl(img))],
    description: bike.description,
    sku: bike.id,
    mpn: bike.id,
    category: bike.categoryLabel,
    brand: {
      '@type': 'Brand',
      name: bike.specs.frameType || 'VoltTrail',
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'USD',
      price: bike.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: bike.stockCount > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'VOLT-X Motorsports USA Inc.',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: bike.rating,
      reviewCount: bike.reviewCount,
    },
  };

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
        name: bike.categoryLabel,
        item: `${siteUrl}/shop/${bike.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: bike.name,
        item: canonicalUrl,
      },
    ],
  };

  const relatedBikes = BIKES_DATA.filter((b) => b.id !== bike.id && b.category === bike.category).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-zinc-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-lime-400 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-lime-400 transition-colors">SHOP</Link>
            <span>/</span>
            <Link href={`/shop/${bike.category}`} className="hover:text-lime-400 transition-colors uppercase">{bike.categoryLabel}</Link>
            <span>/</span>
            <span className="text-white font-bold truncate uppercase">{bike.name}</span>
          </nav>

          {/* Product Header / Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden group">
                <img
                  src={formattedMainImage}
                  alt={bike.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {bike.isBestSeller && (
                    <span className="px-3 py-1 bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider rounded-md">
                      BEST SELLER
                    </span>
                  )}
                  {bike.isNew && (
                    <span className="px-3 py-1 bg-lime-400 text-zinc-950 text-xs font-black uppercase tracking-wider rounded-md">
                      2026 EDITION
                    </span>
                  )}
                </div>
              </div>

              {/* Gallery thumbnails */}
              {bike.galleryImages && bike.galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {bike.galleryImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                      <img
                        src={formatImageUrl(imgUrl)}
                        alt={`${bike.name} detail view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Product Info Section */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-black text-lime-400 uppercase tracking-widest font-mono">
                  {bike.categoryLabel}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
                  {bike.name}
                </h1>
                <p className="text-zinc-400 text-sm font-mono mt-1">
                  {bike.tagline}
                </p>

                {/* Star Ratings */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">{bike.rating.toFixed(2)}</span>
                  <span className="text-xs text-zinc-500 font-mono">({bike.reviewCount} verified buyer reviews)</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-white font-mono tracking-tight">
                    ${bike.price.toLocaleString()}
                  </span>
                  {bike.originalPrice && (
                    <span className="text-lg text-zinc-500 line-through font-mono">
                      ${bike.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-lime-400 font-mono flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  {bike.category === 'accessories' || bike.category === 'battery'
                    ? 'Free Shipping on Accessories'
                    : bike.category === 'electric-dirt-bikes'
                    ? '$250 50-State Crate Freight Shipping'
                    : '$150 US Freight Shipping'}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  <span>2-Year Factory Battery & Controller Protection</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-sm font-black text-white uppercase tracking-wider font-mono">Overview</h2>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {bike.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h2 className="text-sm font-black text-white uppercase tracking-wider font-mono">Key Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {bike.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                      <Check className="w-4 h-4 text-lime-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs Grid */}
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-black text-white uppercase tracking-wider font-mono">Technical Specifications</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">PEAK POWER</span>
                    <span className="text-white font-bold text-sm">{bike.specs.peakPowerKW} kW</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">TOP SPEED</span>
                    <span className="text-white font-bold text-sm">{bike.specs.topSpeedMph} MPH</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">BATTERY</span>
                    <span className="text-white font-bold text-sm">{bike.specs.batteryVoltage}V {bike.specs.batteryAh}Ah</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">EST. RANGE</span>
                    <span className="text-white font-bold text-sm">{bike.specs.rangeMilesMin}-{bike.specs.rangeMilesMax} Mi</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">WEIGHT</span>
                    <span className="text-white font-bold text-sm">{bike.specs.weightLbs} LBS</span>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">CHARGE TIME</span>
                    <span className="text-white font-bold text-sm">{bike.specs.chargeTimeHours} HRS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Models */}
          {relatedBikes.length > 0 && (
            <div className="pt-12 border-t border-zinc-900 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Related Off-Road Machines
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Compare similar models in our {bike.categoryLabel} lineup
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBikes.map((relatedBike) => (
                  <BikeCard key={relatedBike.id} bike={relatedBike} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
