import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { ClientAppShell } from '@/components/ClientAppShell';

export const metadata: Metadata = {
  title: 'VOLT-X Electric Dirt Bikes | High-Performance Off-Road E-Motos',
  description: 'E-Commerce store for high-performance electric dirt bikes with advanced battery, range & motor power search filters, bike comparison, and secure checkout.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
