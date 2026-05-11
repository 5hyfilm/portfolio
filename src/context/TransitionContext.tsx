"use client";

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode, useEffect } from "react";

interface TransitionContextType {
  isTransitioning: boolean;
  isCapturing: boolean;
  screenshotUrl: string | null;
  startCapture: () => void;
  startTransition: (screenshotDataUrl: string) => void;
  endTransition: () => void;
  cancelTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  
  // Keep refs for timers to cleanly clear them on unmount
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const unmountTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    if (unmountTimeoutRef.current) {
      clearTimeout(unmountTimeoutRef.current);
      unmountTimeoutRef.current = null;
    }
  }, []);

  const startCapture = useCallback(() => {
    clearTimers();
    setIsCapturing(true);
    
    // Safety fallback: if capture hangs, auto-cancel after 3 seconds
    safetyTimeoutRef.current = setTimeout(() => {
      setIsCapturing(false);
      setIsTransitioning(false);
      setScreenshotUrl(null);
    }, 3000);
  }, [clearTimers]);

  const startTransition = useCallback((url: string) => {
    clearTimers();
    setIsCapturing(false);
    setScreenshotUrl(url);
    setIsTransitioning(true);

    // Safety fallback: if transition gets stuck, auto-unlock after 3.5 seconds
    safetyTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setScreenshotUrl(null);
    }, 3500);
  }, [clearTimers]);

  const endTransition = useCallback(() => {
    clearTimers();
    setIsTransitioning(false);
    setIsCapturing(false);
    
    unmountTimeoutRef.current = setTimeout(() => {
      setScreenshotUrl(null);
    }, 600); // Wait for animations to finish
  }, [clearTimers]);

  const cancelTransition = useCallback(() => {
    clearTimers();
    setIsCapturing(false);
    setIsTransitioning(false);
    setScreenshotUrl(null);
  }, [clearTimers]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        isCapturing,
        screenshotUrl,
        startCapture,
        startTransition,
        endTransition,
        cancelTransition,
      }}
    >
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
