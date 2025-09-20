// src/app/template.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <style jsx global>{`
        .page-enter {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          filter: blur(2px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .page-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        /* Elegant purple overlay */
        .minimal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.08) 0%,
            rgba(168, 85, 247, 0.05) 50%,
            rgba(196, 181, 253, 0.08) 100%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.6s ease;
          z-index: 9999;
          backdrop-filter: blur(1px);
        }

        .minimal-overlay.active {
          opacity: 1;
        }

        /* Subtle Geass symbol - minimal version */
        .geass-minimal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          z-index: 10001;
          opacity: 0;
          animation: geassMinimal 1s ease-in-out;
        }

        .geass-ring {
          width: 60px;
          height: 60px;
          border: 2px solid rgba(168, 85, 247, 0.4);
          border-radius: 50%;
          position: relative;
          animation: subtleRotate 1.2s ease-out;
        }

        .geass-ring::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: rgba(168, 85, 247, 0.6);
          border-radius: 50%;
          animation: subtlePulse 1s ease-out;
        }

        /* Elegant scan line */
        .scan-minimal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(168, 85, 247, 0.8) 50%,
            transparent 100%
          );
          z-index: 10002;
          animation: scanMinimal 1.2s ease-out;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
        }

        /* Subtle floating particles */
        .particle-minimal {
          position: absolute;
          width: 1px;
          height: 1px;
          background: rgba(168, 85, 247, 0.6);
          border-radius: 50%;
          opacity: 0;
          animation: floatMinimal 2s ease-out;
        }

        /* Keyframe animations - refined */
        @keyframes geassMinimal {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes subtleRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(90deg) scale(1);
          }
        }

        @keyframes subtlePulse {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.4);
          }
        }

        @keyframes scanMinimal {
          0% {
            top: 0;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 100vh;
            opacity: 0;
          }
        }

        @keyframes floatMinimal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .geass-minimal {
            width: 40px;
            height: 40px;
          }

          .geass-ring {
            width: 40px;
            height: 40px;
          }

          .geass-ring::before {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>

      {/* Minimal transition effects */}
      {isLoading && (
        <>
          {/* Elegant overlay */}
          <div className={`minimal-overlay ${isLoading ? "active" : ""}`} />

          {/* Subtle scan line */}
          <div className="scan-minimal" />

          {/* Minimal Geass symbol */}
          <div className="geass-minimal">
            <div className="geass-ring"></div>
          </div>

          {/* Few floating particles */}
          <div
            className="particle-minimal"
            style={{
              top: "30%",
              left: "20%",
              animationDelay: "0.3s",
            }}
          />
          <div
            className="particle-minimal"
            style={{
              top: "70%",
              right: "25%",
              animationDelay: "0.8s",
            }}
          />
          <div
            className="particle-minimal"
            style={{
              bottom: "40%",
              left: "60%",
              animationDelay: "1.2s",
            }}
          />
        </>
      )}

      {/* Main content with refined transition */}
      <div className={`page-enter ${!isLoading ? "page-enter-active" : ""}`}>
        {children}
      </div>
    </>
  );
}
