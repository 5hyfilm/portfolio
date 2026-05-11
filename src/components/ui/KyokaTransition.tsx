"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTransitionContext } from "../../context/TransitionContext";

const SHARDS = [
  "polygon(0% 0%, 30% 0%, 45% 40%, 0% 20%)",
  "polygon(30% 0%, 75% 0%, 45% 40%)",
  "polygon(75% 0%, 100% 0%, 100% 20%, 45% 40%)",
  "polygon(100% 20%, 100% 80%, 45% 40%)",
  "polygon(100% 80%, 100% 100%, 60% 100%, 45% 40%)",
  "polygon(60% 100%, 15% 100%, 45% 40%)",
  "polygon(15% 100%, 0% 100%, 0% 70%, 45% 40%)",
  "polygon(0% 70%, 0% 20%, 45% 40%)",
];

export default function KyokaTransition() {
  const { isTransitioning, isCapturing, screenshotUrl, endTransition } = useTransitionContext();
  const [phase, setPhase] = useState<"idle" | "cracking" | "shattering">("idle");

  useEffect(() => {
    let crackTimer: NodeJS.Timeout | null = null;
    let shatterTimer: NodeJS.Timeout | null = null;

    if (isTransitioning && screenshotUrl) {
      setPhase("cracking");
      
      // Wait a tiny bit for the crack effect, then shatter
      crackTimer = setTimeout(() => {
        setPhase("shattering");
        
        // End transition after shards fall (1.2s animation + buffer)
        shatterTimer = setTimeout(() => {
          endTransition();
        }, 1500);
      }, 300); // 300ms of cracking
    } else {
      setPhase("idle");
    }

    return () => {
      if (crackTimer) clearTimeout(crackTimer);
      if (shatterTimer) clearTimeout(shatterTimer);
    };
  }, [isTransitioning, screenshotUrl, endTransition]);

  // Render nothing if we are completely idle
  if (!isTransitioning && !isCapturing) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Dynamic, ultra-premium neon-purple progress bar while capturing the screen */}
      {isCapturing && (
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-purple-950 z-[99999] overflow-hidden pointer-events-none">
          <div className="h-full bg-gradient-to-r from-purple-500 via-purple-300 to-purple-600 animate-loading-bar" style={{ width: "100%" }} />
          <style jsx>{`
            @keyframes loading-bar {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(-10%); }
              100% { transform: translateX(100%); }
            }
            .animate-loading-bar {
              animation: loading-bar 1.2s infinite linear;
            }
          `}</style>
        </div>
      )}

      {/* 2. Shards falling/shattering phase */}
      {isTransitioning && screenshotUrl && phase === "shattering" && (
        <>
          {SHARDS.map((clipPath, index) => {
            // Randomize movement for each shard
            const randomX = (Math.random() - 0.5) * 400; // -200px to 200px
            const randomY = Math.random() * 500 + 300; // 300px to 800px downwards
            const randomRotate = (Math.random() - 0.5) * 60; // -30deg to 30deg
            const delay = Math.random() * 0.1; // slight stagger

            return (
              <motion.div
                key={`shard-${index}`}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: randomX,
                  y: randomY,
                  rotate: randomRotate,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.32, 0, 0.67, 0], // easeInCubic-ish for gravity fall
                  delay,
                }}
                className="absolute inset-0 bg-left-top bg-no-repeat bg-[length:100%_100%]"
                style={{
                  backgroundImage: `url(${screenshotUrl})`,
                  clipPath,
                  // Slightly darken/brighten shards and add purple shadows for 3D depth on white pages
                  filter: `brightness(${1 + (Math.random() * 0.2 - 0.1)}) drop-shadow(0px 12px 24px rgba(124, 58, 237, 0.35))`,
                }}
              />
            );
          })}
        </>
      )}

      {/* 3. Cracking overlay phase */}
      {isTransitioning && screenshotUrl && phase === "cracking" && (
        <div 
          className="absolute inset-0 bg-left-top bg-no-repeat bg-[length:100%_100%]"
          style={{ backgroundImage: `url(${screenshotUrl})` }}
        >
          {/* Glowing purple and white crack lines overlay using SVG */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {/* Outer neon purple glow */}
            <g stroke="#7c3aed" strokeWidth="3" opacity="0.4" style={{ filter: "blur(2px)" }}>
              <line x1="45%" y1="40%" x2="0%" y2="20%" />
              <line x1="45%" y1="40%" x2="30%" y2="0%" />
              <line x1="45%" y1="40%" x2="75%" y2="0%" />
              <line x1="45%" y1="40%" x2="100%" y2="20%" />
              <line x1="45%" y1="40%" x2="100%" y2="80%" />
              <line x1="45%" y1="40%" x2="60%" y2="100%" />
              <line x1="45%" y1="40%" x2="15%" y2="100%" />
              <line x1="45%" y1="40%" x2="0%" y2="70%" />
            </g>
            {/* Inner bright lavender core */}
            <g stroke="#c084fc" strokeWidth="1.5" opacity="0.95">
              <line x1="45%" y1="40%" x2="0%" y2="20%" />
              <line x1="45%" y1="40%" x2="30%" y2="0%" />
              <line x1="45%" y1="40%" x2="75%" y2="0%" />
              <line x1="45%" y1="40%" x2="100%" y2="20%" />
              <line x1="45%" y1="40%" x2="100%" y2="80%" />
              <line x1="45%" y1="40%" x2="60%" y2="100%" />
              <line x1="45%" y1="40%" x2="15%" y2="100%" />
              <line x1="45%" y1="40%" x2="0%" y2="70%" />
            </g>
            {/* Bright white specular center line */}
            <g stroke="#ffffff" strokeWidth="0.75" opacity="0.9">
              <line x1="45%" y1="40%" x2="0%" y2="20%" />
              <line x1="45%" y1="40%" x2="30%" y2="0%" />
              <line x1="45%" y1="40%" x2="75%" y2="0%" />
              <line x1="45%" y1="40%" x2="100%" y2="20%" />
              <line x1="45%" y1="40%" x2="100%" y2="80%" />
              <line x1="45%" y1="40%" x2="60%" y2="100%" />
              <line x1="45%" y1="40%" x2="15%" y2="100%" />
              <line x1="45%" y1="40%" x2="0%" y2="70%" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
