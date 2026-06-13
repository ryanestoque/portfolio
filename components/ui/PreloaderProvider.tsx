"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface PreloaderContextValue {
  isLoading: boolean;
  completeLoading: () => void;
}

const PreloaderContext = createContext<PreloaderContextValue>({
  isLoading: true,
  completeLoading: () => {},
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <PreloaderContext value={{ isLoading, completeLoading }}>
      {children}
    </PreloaderContext>
  );
}
