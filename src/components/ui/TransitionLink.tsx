"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { useTransitionContext } from "../../context/TransitionContext";

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  children: React.ReactNode;
}

export default function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const { startCapture, startTransition, cancelTransition, isTransitioning, isCapturing } = useTransitionContext();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Prevent double clicks or parallel screen captures while transitioning/capturing
    if (isTransitioning || isCapturing) return;

    try {
      // Instantly start capture feedback (loading bar triggers)
      startCapture();

      const currentScrollX = window.scrollX;
      const currentScrollY = window.scrollY;

      const canvas = await html2canvas(document.body, {
        scale: window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio, // Cap scale to prevent huge canvas on retina
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -currentScrollY,
        width: window.innerWidth,
        height: window.innerHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        logging: false, // Turn off logging for better performance
      });

      // Restore scroll position in case html2canvas forced a scroll jump
      window.scrollTo(currentScrollX, currentScrollY);
      
      const dataUrl = canvas.toDataURL("image/jpeg", 0.75); // Slightly reduce quality to speed up encoding/memory
      
      // Start the shatter animation
      startTransition(dataUrl);

      // Navigate to the new page slightly after the cracking starts,
      // so when the shards fall, the new page is already there
      setTimeout(() => {
        router.push(href);
      }, 300);

    } catch (error) {
      console.error("Failed to capture screen for transition", error);
      // Cleanly cancel transition states and unlock buttons
      cancelTransition();
      // Fallback to normal navigation
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
