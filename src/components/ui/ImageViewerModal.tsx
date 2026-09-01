// src/components/ui/ImageViewerModal.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ZoomInIcon, ZoomOutIcon, ResetZoomIcon } from "./Icons";

export interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string | string[];
  initialIndex?: number;
  title?: string;
  onIndexChange?: (newIndex: number) => void;
}

const getImagePath = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return imagePath;
  return `/${imagePath}`;
};

export default function ImageViewerModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title,
  onIndexChange,
}: ImageViewerModalProps) {
  const imageList = Array.isArray(images) ? images : [images];
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < imageList.length ? initialIndex : 0);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      positionRef.current = { x: 0, y: 0 };
    }
  }, [isOpen, initialIndex, imageList.length]);

  // Keep positionRef in sync
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
  }, []);

  const handleNext = useCallback(() => {
    if (imageList.length <= 1) return;
    const nextIdx = (currentIndex + 1) % imageList.length;
    setCurrentIndex(nextIdx);
    resetTransform();
    onIndexChange?.(nextIdx);
  }, [currentIndex, imageList.length, onIndexChange, resetTransform]);

  const handlePrev = useCallback(() => {
    if (imageList.length <= 1) return;
    const prevIdx = (currentIndex - 1 + imageList.length) % imageList.length;
    setCurrentIndex(prevIdx);
    resetTransform();
    onIndexChange?.(prevIdx);
  }, [currentIndex, imageList.length, onIndexChange, resetTransform]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const nextScale = Math.max(prev - 0.5, 1);
      if (nextScale === 1) {
        setPosition({ x: 0, y: 0 });
        positionRef.current = { x: 0, y: 0 };
      }
      return nextScale;
    });
  }, []);

  const handleDoubleClick = useCallback(() => {
    setScale((prev) => {
      if (prev > 1) {
        setPosition({ x: 0, y: 0 });
        positionRef.current = { x: 0, y: 0 };
        return 1;
      }
      return 2.5;
    });
  }, []);

  // Keyboard navigation & controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        resetTransform();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev, handleZoomIn, handleZoomOut, resetTransform]);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.2, 4));
    } else {
      setScale((prev) => {
        const nextScale = Math.max(prev - 0.2, 1);
        if (nextScale === 1) {
          setPosition({ x: 0, y: 0 });
          positionRef.current = { x: 0, y: 0 };
        }
        return nextScale;
      });
    }
  };

  // Drag & Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || imageList.length === 0) return null;

  const currentImage = imageList[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between select-none overflow-hidden bg-black/90 backdrop-blur-xl transition-all duration-300 animate-fadeIn"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Bar / Header */}
      <div className="relative z-10 flex w-full items-center justify-between px-4 py-4 md:px-8 text-white/90">
        <div className="flex items-center gap-3 max-w-[70%]">
          {title && (
            <h3 className="text-sm md:text-base font-semibold truncate text-white drop-shadow">
              {title}
            </h3>
          )}
          {imageList.length > 1 && (
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80 backdrop-blur border border-white/10">
              {currentIndex + 1} / {imageList.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/25 hover:text-white transition-all backdrop-blur focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      <div
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden p-2 md:p-6"
        onWheel={handleWheel}
        onClick={(e) => {
          if (e.target === e.currentTarget && scale === 1) {
            onClose();
          }
        }}
      >
        {/* Navigation Arrows for Multiple Images */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/15 shadow-xl hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95 transition-all"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/15 shadow-xl hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95 transition-all"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </>
        )}

        {/* Scalable & Draggable Image Container */}
        <div
          className={`relative max-w-full max-h-full flex items-center justify-center transition-transform ${
            isDragging ? "duration-0" : "duration-200"
          } ${
            scale > 1
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
          }`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
        >
          <div className="relative h-[70vh] w-[85vw] md:h-[78vh] md:w-[80vw] max-w-6xl">
            <Image
              src={getImagePath(currentImage)}
              alt={title || `Image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain pointer-events-none drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Floating Control Bar & Thumbnails */}
      <div className="relative z-10 flex flex-col items-center gap-3 pb-6 px-4">
        {/* Floating Toolbar */}
        <div className="flex items-center gap-1 md:gap-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2 shadow-2xl text-white">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 1}
            title="Zoom Out (-)"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent transition"
          >
            <ZoomOutIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={resetTransform}
            title="Reset Zoom (0)"
            className="px-2.5 py-1 text-xs md:text-sm font-semibold text-white/90 hover:text-white hover:bg-white/15 rounded-md transition"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 4}
            title="Zoom In (+)"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent transition"
          >
            <ZoomInIcon className="h-5 w-5" />
          </button>

          <div className="mx-1 h-5 w-px bg-white/20" />

          <button
            type="button"
            onClick={resetTransform}
            title="Fit to Screen"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 transition"
          >
            <ResetZoomIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Thumbnail Preview Strip for Multi-Image */}
        {imageList.length > 1 && (
          <div className="flex items-center gap-2 max-w-[90vw] overflow-x-auto p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 scrollbar-none">
            {imageList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  resetTransform();
                  onIndexChange?.(idx);
                }}
                className={`relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden border transition-all duration-200 ${
                  currentIndex === idx
                    ? "ring-2 ring-violet-400 border-transparent scale-105 opacity-100"
                    : "border-white/20 opacity-50 hover:opacity-90"
                }`}
              >
                <Image
                  src={getImagePath(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
