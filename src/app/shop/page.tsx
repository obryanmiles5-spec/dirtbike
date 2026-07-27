'use client';
import { Suspense } from 'react';
import { Shop } from '@/views/Shop';

export default function ShopPage(props: any) {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-lime-400 font-mono">LOADING SHOP...</div>}>
      <Shop {...props} />
    </Suspense>
  );
}
