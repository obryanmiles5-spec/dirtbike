import type { Metadata } from 'next';
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
      </body>
    </html>
  );
}
