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
  const { startTransition, isTransitioning } = useTransitionContext();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isTransitioning) return; // Prevent double clicks

    try {
      // Hide the navbar during capture if we want, or just capture everything
      // It's usually better to capture the whole document.body
      const currentScrollX = window.scrollX;
      const currentScrollY = window.scrollY;

      const canvas = await html2canvas(document.body, {
        scale: window.devicePixelRatio,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -currentScrollY,
        width: window.innerWidth,
        height: window.innerHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });

      // Restore scroll position in case html2canvas forced a scroll jump
      window.scrollTo(currentScrollX, currentScrollY);
      
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      
      // Start the shatter animation
      startTransition(dataUrl);

      // Navigate to the new page slightly after the cracking starts,
      // so when the shards fall, the new page is already there
      setTimeout(() => {
        router.push(href);
      }, 300);

    } catch (error) {
      console.error("Failed to capture screen for transition", error);
      // Fallback to normal navigation if it fails
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
