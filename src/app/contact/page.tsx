import { Metadata } from 'next';
import { Contact } from '@/views/Contact';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'Contact VOLT-X Motorsports USA | Reno HQ & Dealer Support',
  description: 'Get in touch with VOLT-X USA. Call 505-652-1743 or email contact@voltdirtbike.com for dealer test rides, order tracking, parts dispatch, or technical support.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact VOLT-X Motorsports USA',
    description: 'Contact our Reno, NV headquarters for support, dealer test rides, or order status.',
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return <Contact />;
}
