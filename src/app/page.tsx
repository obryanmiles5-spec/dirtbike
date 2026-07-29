import { Metadata } from 'next';
import { Home } from '@/views/Home';
import { BIKES_DATA } from '@/data/bikes';
import { FAQS_DATA } from '@/data/faqs';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voltdirtbike.com';

export const metadata: Metadata = {
  title: 'VoltDirtBike | High-Performance Adult Electric Dirt Bikes & Surron Rivals',
  description: 'Shop high-performance adult electric dirt bikes, 72V e-motos, street legal electric motorcycles, pit bikes, and 2-seater passenger e-bikes with 50+ mph top speed and free nationwide freight shipping.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'VoltDirtBike | High-Performance Adult Electric Dirt Bikes & Surron Rivals',
    description: 'Shop high-performance electric dirt bikes for adults, 72V e-motos, and street legal electric motorcycles. Instant torque, 50+ mph top speed, and free crate delivery.',
    url: siteUrl,
    type: 'website',
  },
};

export default function HomePage(props: any) {
  const featuredBikes = BIKES_DATA.filter((b) => b.isBestSeller || b.featuredOrder).slice(0, 4);

  // ItemList Schema for Featured E-Motos
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Adult Electric Dirt Bikes & E-Motos',
    description: 'Top-selling adult electric dirt bikes, 72V e-motos, and Surron rivals at VoltDirtBike.',
    itemListElement: featuredBikes.map((bike, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: bike.name,
        url: `${siteUrl}/product/${bike.id}`,
        image: bike.image,
        description: bike.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: bike.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  // FAQPage Schema for Homepage High-Intent Queries
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Home {...props} />
    </>
  );
}
