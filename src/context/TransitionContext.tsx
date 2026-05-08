"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface TransitionContextType {
  isTransitioning: boolean;
  screenshotUrl: string | null;
  startTransition: (screenshotDataUrl: string) => void;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const startTransition = useCallback((url: string) => {
    setScreenshotUrl(url);
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
    setTimeout(() => {
      setScreenshotUrl(null);
    }, 500); // Wait for unmount animations to finish
  }, []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, screenshotUrl, startTransition, endTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransitionContext must be used within a TransitionProvider");
  }
  return context;
}
