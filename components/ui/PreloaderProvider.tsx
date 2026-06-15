"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface PreloaderContextValue {
  isLoading: boolean;
  completeLoading: () => void;
  transitionHref: string | null;
  startTransition: (href: string) => void;
  completeTransition: () => void;
}

const PreloaderContext = createContext<PreloaderContextValue>({
  isLoading: true,
  completeLoading: () => {},
  transitionHref: null,
  startTransition: () => {},
  completeTransition: () => {},
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [transitionHref, setTransitionHref] = useState<string | null>(null);
  const pathname = usePathname();

  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const startTransition = useCallback((href: string) => {
    // If we're already on that page, just ignore or let default happen?
    // Actually, we'll let the user decide if they want to scroll or navigate.
    // For now, if the path matches the href (ignoring hash), we might still want to transition if it's a dynamic route, 
    // but usually we can just proceed.
    setTransitionHref(href);
  }, []);

  const completeTransition = useCallback(() => {
    setTransitionHref(null);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isLoading, completeLoading, transitionHref, startTransition, completeTransition }}>
      {children}
    </PreloaderContext.Provider>
  );
}
