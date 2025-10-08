// src/components/PageTransition.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-400 ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
