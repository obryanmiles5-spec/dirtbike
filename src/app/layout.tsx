import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { ClientAppShell } from '@/components/ClientAppShell';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'VOLT-X Electric Dirt Bikes | High-Performance Off-Road E-Motos & Surron Rivals',
    template: '%s | VOLT-X Motorsports USA',
  },
  description: 'Shop high-performance adult electric dirt bikes, 72V e-motos, pit bikes, and 2-seater passenger e-bikes with 50+ mph top speed, instant 1000Nm wheel torque, and free 50-state freight delivery.',
  keywords: [
    'ebike',
    'surron',
    'dirt bike',
    'electric dirt bike',
    'electric motorcycle',
    'bike mini bike',
    'surron e bike',
    'bikes dirt bikes dirt bikes',
    'surron bike',
    'rawrr',
    'electric dirtbike',
    'motor bike dirt',
    'electric dirt bike for adults',
    'electric dirt bikes',
    'electric mini bike motorcycle',
    'fast electric cycle',
    'pit bike',
    'rawrr mantis',
    'rtr e bike',
    'sur ron bicycle',
    'e dirt bike',
    'suron',
    'adult electric bike',
    'dirt bikes that are electric',
    'e moto',
    'e-bike dirt',
    'electric dirt bike for kids',
    'electric motorcycle for adults',
    'motorcycle electronic',
    'rtr ebike',
    'stark varg electric dirt bike',
    'sur ron',
    'surron ebike',
    'surron hyper bee',
    'surronster',
    'e motorcycle',
    'electric motorcycles',
    'freego x2',
    'razor electric dirt bike',
    'surron electric bike',
    'surron storm bee',
    'emoto',
    'budget friendly electric dirt bike',
    'electric bike for adults 50 mph',
    'electric bike for sale',
    'electric pit bike',
    'gt73 electric dirt bike',
    'happyrun g300',
    'high performance electric bicycle',
    'kids electric dirt bike',
    'mini dirt bike',
    'mini dirt bikes',
    'surron light bee s',
    'surron price',
    'surron x',
    'surrons',
    'ultra bee surron',
    'best electric dirt bike',
    'e bike price',
    'e dirtbike',
    'electric motocross bike',
    'fast electric bike',
    'happyrun ebike',
    'ciron electric bike',
    'e bike motorcycle',
    'e-bike electric',
    'ktm dirtbike',
    'surron for sale',
    'cheap surron'
  ],
  authors: [{ name: 'VOLT-X Motorsports USA' }],
  creator: 'VOLT-X Motorsports USA',
  publisher: 'VOLT-X Motorsports USA',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'VOLT-X Motorsports USA',
    title: 'VOLT-X Electric Dirt Bikes | High-Performance Off-Road E-Motos',
    description: 'Shop high-performance electric dirt bikes, 72V e-motos, and 2-seater e-bikes with instant 1000Nm torque and free 50-state freight delivery.',
    images: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0801/4456/4441/files/X7_2.jpg?v=1784892259',
        width: 1200,
        height: 630,
        alt: 'VOLT-X High-Performance Electric Dirt Bikes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VOLT-X Electric Dirt Bikes | High-Performance Off-Road E-Motos',
    description: 'Shop high-performance electric dirt bikes, 72V e-motos, and 2-seater e-bikes.',
    images: ['https://cdn.shopify.com/s/files/1/0801/4456/4441/files/X7_2.jpg?v=1784892259'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  verification: {
    google: 'jqZfPwtEpMdsdqyu2ullp5OXkLzbTiEz-LJTPksB6mo',
    other: {
      'msvalidate.01': 'CCB4AF44321543F2BCED8895FF28FB40',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VOLT-X Motorsports USA Inc.',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-505-652-1743',
      contactType: 'customer service',
      email: 'contact@voltdirtbike.com',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1040 Electric Ridge Highway',
      addressLocality: 'Reno',
      addressRegion: 'NV',
      postalCode: '89502',
      addressCountry: 'US',
    },
    sameAs: [
      'https://youtube.com',
      'https://instagram.com',
      'https://tiktok.com',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VOLT-X Motorsports',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/shop?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'VOLT-X Motorsports USA',
    image: `${siteUrl}/hero-cover.jpg`,
    url: siteUrl,
    telephone: '+1-505-652-1743',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1040 Electric Ridge Highway',
      addressLocality: 'Reno',
      addressRegion: 'NV',
      postalCode: '89502',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1248',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="jqZfPwtEpMdsdqyu2ullp5OXkLzbTiEz-LJTPksB6mo" />
        <meta name="msvalidate.01" content="CCB4AF44321543F2BCED8895FF28FB40" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-lime-400 selection:text-zinc-950">
        <Providers>
          <ClientAppShell>{children}</ClientAppShell>
        </Providers>
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a682e0004c7581d45fedb50/1jujf7d1l';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
