import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BIKES_DATA } from '@/data/bikes';
import { BikeCard } from '@/components/BikeCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

const CATEGORY_NAMES: Record<string, string> = {
  'electric-dirt-bikes': 'Electric Dirt Bikes',
  'e-bikes': 'E-Bikes',
  'accessories': 'Accessories',
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: 'electric-dirt-bikes' },
    { category: 'e-bikes' },
    { category: 'accessories' },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = CATEGORY_NAMES[category];

  if (!categoryName) {
    return {
      title: 'Category Not Found | VOLT-X Motorsports',
      description: 'The requested product category could not be found.',
    };
  }

  const title = `${categoryName} | VOLT-X Motorsports USA`;
  const description = `Shop high-output ${categoryName} at VOLT-X Motorsports. Precision engineered off-road machines with high-voltage battery architecture and instant wheel torque. Free 50-state freight shipping.`;
  const canonicalUrl = `${siteUrl}/shop/${category}`;

  return {
    title,
    description,
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

  const bikes = BIKES_DATA.filter((b) => b.category === category);
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

          <div className="border-b border-zinc-800 pb-6">
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">
              {categoryName}
            </h1>
            <p className="text-zinc-400 text-sm font-mono mt-2">
              Explore our lineup of {categoryName.toLowerCase()} engineered for trail performance & reliability.
            </p>
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
