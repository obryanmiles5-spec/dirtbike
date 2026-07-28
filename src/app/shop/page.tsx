import { Metadata } from 'next';
import { Suspense } from 'react';
import { Shop } from '@/views/Shop';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'Shop Electric Dirt Bikes & E-Motos | High-Voltage Search & Filters',
  description: 'Filter high-performance electric dirt bikes by voltage (60V, 72V, 80V), peak motor power (3kW-20kW+), top speed, and rider seat capacity. Free 50-state crate shipping.',
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: 'Shop VOLT-X Electric Dirt Bikes',
    description: 'Filter high-performance electric dirt bikes by voltage, motor power, top speed, and seat capacity.',
    url: `${siteUrl}/shop`,
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-lime-400 font-mono">LOADING SHOP...</div>}>
      <Shop />
    </Suspense>
  );
}
