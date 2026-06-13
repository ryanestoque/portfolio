"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { usePreloader } from './PreloaderProvider';
import { useEffect } from 'react';

function LenisLocker() {
  const lenis = useLenis();
  const { isLoading } = usePreloader();

  useEffect(() => {
    if (!lenis) return;
    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isLoading]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <LenisLocker />
      {children}
    </ReactLenis>
  );
}