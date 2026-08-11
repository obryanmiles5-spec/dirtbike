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
    'dirt bike',
    'electric dirt bike',
    'surron',
    'electric motorcycle',
    'surron e bike',
    'e moto',
    'surron bike',
    'stark varg electric dirt bike',
    'surron hyper bee',
    'surron storm bee',
    'freego x2',
    'razor electric dirt bike',
    'gt73 electric dirt bike',
    'happyrun g300',
    'stark electric dirt bike',
    'ktm dirtbike',
    'qronge x1 spark',
    'rawrr mantis x',
    'razor mx350',
    'razor mx650',
    'tomofree m3pro',
    'electric dirt bike for adults',
    'electric mini bike motorcycle',
    'adult electric bike',
    'dirt bikes that are electric',
    'e-bike dirt',
    'electric motorcycle for adults',
    'surron ebitke',
    'electric motorcycles',
    'budget friendly electric dirt bike',
    'electric bike for adults 50 mph',
    'electric bike for sale',
    'electric pit bike',
    'high performance electric bicycle',
    'surron price',
    'best electric dirt bike',
    'bike electric',
    'e bike price',
    'e dirtbike',
    'electric dirt bike adult',
    'electric motocross bike',
    'electric motorbike',
    'fast e bicycle',
    'fast electric bike',
    'happy run ebike',
    'happyrun ebike',
    'e bike motorcycle',
    'e-bike electric',
    'surron electric dirt bike',
    'surron for sale',
    'adult electric bikes',
    'best electric motorcycle',
    'cheap surron',
    'dirt bike for adults',
    'e bike dirt bike',
    'ebike dirt bike',
    'electric electric motorcycle',
    'electric motorcycles for adults',
    'fast ebike',
    'fast ebikes',
    'off road electric bike',
    'street legal electric motorcycle',
    'sur ron bike',
    'sur ron light bee',
    '70 mph electric bike for sale',
    'adult dirt bike',
    'adult electric dirt bike',
    'cheapest surron',
    'e bike surron',
    'e dirt bikes',
    'ebike for adults',
    'ebike motorcycle',
    'electric bike for sale near me',
    'electric bike price',
    'electric dirt bikes for adults',
    'electric motor bike',
    'electric motorbikes',
    'electric motorcycle for sale',
    'street legal electric dirt bike',
    'sur ron electric bike',
    'sur ron electric dirt bike',
    'sur-ron x',
    'suron electric dirt bike',
    'surron dirt bike',
    'electric dirt bikes for sale',
    'electric off road bike',
    'electric street bike',
    'ev motorcycle',
    'off road ebike',
    'are electric dirt bikes street legal',
    'what are the best electric bikes',
    'what is a surron',
    'what is the fastest surron',
    'what is the best electric dirt bike',
    'where to buy surron',
    'electric dirt bike parts',
    'surron parts and accessories',
    'surron replacement battery',
    'surron fast charger',
    'talaria parts',
    'stark varg battery pack',
    'stark varg charger',
    'ktm sxe charger',
    'e ride pro 72v battery',
    'rfn ares battery',
    'revvi battery charger',
    'razor electric dirt bike battery',
    'off road mx helmet',
    'motocross body armour',
    'mx anti fog goggles',
    'motocross boots',
    'electric dirt bike tyres',
    'shinko 241 tyre',
    'chain sprocket kit',
    'performance brake pads'
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
      'https://www.tiktok.com/@voltelectricbike?_r=1&_t=ZT-98PkqFjXC86',
      'https://v.lemon8-app.com/s/OghSrbkcNY',
      'https://x.com/voltdirtbike?s=21',
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
        <Script id="crisp-widget" strategy="afterInteractive">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="7c107d15-7f45-4369-aa62-aa91e43a2b9b";
            (function(){
              d=document;s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
