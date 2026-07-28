import { Metadata } from 'next';
import { About } from '@/views/About';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'About VOLT-X Motorsports | High-Output E-Moto Engineering',
  description: 'Discover VOLT-X Motorsports USA. Learn about our liquid-cooled FOC sine-wave controller development, high-voltage battery architecture, and US dealer network.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About VOLT-X Motorsports USA',
    description: 'High-output e-moto engineering, liquid-cooled controllers, and US dealer network.',
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return <About />;
}
