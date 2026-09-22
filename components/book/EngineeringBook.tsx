"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { MONOGRAPH_PLATES } from "@/data/portfolio-data";
import { BookPage } from "./BookSpreads";

const TOTAL_PLATES = MONOGRAPH_PLATES.length;

interface EngineeringBookProps {
  onInspectProject?: (projectId: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function EngineeringBook({
  onInspectProject,
  onNavigateSection,
}: EngineeringBookProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [targetIdx, setTargetIdx] = useState<number | null>(null);
  const [mobileSide, setMobileSide] = useState<"left" | "right">("left");
  const touchStartXRef = useRef<number | null>(null);

  // Sync mobile side back to left when turning plate
  useEffect(() => {
    setMobileSide("left");
  }, [currentIdx]);

  const handleMobileTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleMobileTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (deltaX < -45) {
      if (mobileSide === "left") {
        setMobileSide("right");
      } else {
        nextPage();
      }
    } else if (deltaX > 45) {
      if (mobileSide === "right") {
        setMobileSide("left");
      } else {
        prevPage();
      }
    }
  };

  // Motion values for physical 3D rotation
  const flipAngle = useMotionValue(0); // 0 to -180 for next, 0 to 180 for prev
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const bookContainerRef = useRef<HTMLDivElement | null>(null);

  // Parallax tilt motion values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Dynamic shadow opacities during page lift
  const leafShadowNext = useTransform(flipAngle, [0, -90, -180], [0, 0.45, 0]);
  const leafShadowPrev = useTransform(flipAngle, [0, 90, 180], [0, 0.45, 0]);
  const spineShade = useTransform(
    flipAngle,
    [-180, -90, 0, 90, 180],
    [0.1, 0.5, 0.15, 0.5, 0.1]
  );

  /* ─────────────────────────────────────────────────────────────
     Orchestrated Page Turn Execution
  ───────────────────────────────────────────────────────────── */
  const turnToPage = useCallback(
    (toIndex: number, dir: "next" | "prev") => {
      if (isFlipping || toIndex === currentIdx) return;
      setIsFlipping(true);
      setFlipDir(dir);
      setTargetIdx(toIndex);

      const targetAngle = dir === "next" ? -180 : 180;
      flipAngle.set(0);

      const controls = animate(flipAngle, targetAngle, {
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1], // Smooth physical editorial cubic-bezier
        onComplete: () => {
          setCurrentIdx(toIndex);
          setTargetIdx(null);
          setIsFlipping(false);
          flipAngle.set(0);
        },
      });

      return () => controls.stop();
    },
    [isFlipping, currentIdx, flipAngle]
  );

  const nextPage = useCallback(() => {
    const next = (currentIdx + 1) % TOTAL_PLATES;
    turnToPage(next, "next");
  }, [currentIdx, turnToPage]);

  const prevPage = useCallback(() => {
    const prev = (currentIdx - 1 + TOTAL_PLATES) % TOTAL_PLATES;
    turnToPage(prev, "prev");
  }, [currentIdx, turnToPage]);

  const jumpToPlate = useCallback(
    (target: number) => {
      if (target === currentIdx || isFlipping) return;
      const dir = target > currentIdx ? "next" : "prev";
      turnToPage(target, dir);
    },
    [currentIdx, isFlipping, turnToPage]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      e.preventDefault();
      if (e.key === "ArrowRight") nextPage();
      else prevPage();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextPage, prevPage]);

  /* ─────────────────────────────────────────────────────────────
     Interactive Drag to Turn Gesture
  ───────────────────────────────────────────────────────────── */
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isFlipping || e.button !== 0 || !bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const isRightHalf = e.clientX - rect.left > rect.width * 0.5;

    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    const dir = isRightHalf ? "next" : "prev";
    const dest = isRightHalf
      ? (currentIdx + 1) % TOTAL_PLATES
      : (currentIdx - 1 + TOTAL_PLATES) % TOTAL_PLATES;

    setFlipDir(dir);
    setTargetIdx(dest);
    setIsFlipping(true);
    flipAngle.set(0);

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartXRef.current;
    const halfW = rect.width * 0.5;

    if (flipDir === "next") {
      // Dragging left (negative deltaX)
      const progress = Math.max(0, Math.min(1, -deltaX / (halfW * 0.9)));
      flipAngle.set(-progress * 180);
    } else {
      // Dragging right (positive deltaX)
      const progress = Math.max(0, Math.min(1, deltaX / (halfW * 0.9)));
      flipAngle.set(progress * 180);
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const cur = flipAngle.get();
    const destIdx = targetIdx ?? currentIdx;

    if (flipDir === "next") {
      if (cur < -55) {
        // Complete flip forward
        animate(flipAngle, -180, {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          onComplete: () => {
            setCurrentIdx(destIdx);
            setTargetIdx(null);
            setIsFlipping(false);
            flipAngle.set(0);
          },
        });
      } else {
        // Cancel and snap back
        animate(flipAngle, 0, {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
          onComplete: () => {
            setTargetIdx(null);
            setIsFlipping(false);
            flipAngle.set(0);
          },
        });
      }
    } else {
      if (cur > 55) {
        // Complete flip backward
        animate(flipAngle, 180, {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          onComplete: () => {
            setCurrentIdx(destIdx);
            setTargetIdx(null);
            setIsFlipping(false);
            flipAngle.set(0);
          },
        });
      } else {
        // Cancel and snap back
        animate(flipAngle, 0, {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
          onComplete: () => {
            setTargetIdx(null);
            setIsFlipping(false);
            flipAngle.set(0);
          },
        });
      }
    }
  };

  // Subtle Mouse Parallax Hover
  const handleStagePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || isDraggingRef.current || !bookContainerRef.current) return;
    const r = bookContainerRef.current.getBoundingClientRect();
    if (!r.width) return;
    const nx = (e.clientX - (r.left + r.width / 2)) / (r.width * 0.5);
    const ny = (e.clientY - (r.top + r.height / 2)) / (r.height * 0.5);
    tiltY.set(Math.max(-5, Math.min(5, nx * 5)));
    tiltX.set(Math.max(-3.5, Math.min(3.5, -ny * 3.5)));
  };

  const handleStagePointerLeave = () => {
    animate(tiltX, 0, { duration: 0.5 });
    animate(tiltY, 0, { duration: 0.5 });
  };

  const activePlate = MONOGRAPH_PLATES[currentIdx];
  const nextTargetPlate = targetIdx !== null ? targetIdx : currentIdx;

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#EDE4D9] bg-gradient-to-b from-[#FAF6F1] via-[#FDFCFA] to-[#FAF6F1]">
      <div className="max-w-7xl mx-auto">
        {/* ── Top Masthead Information Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#EDE4D9] text-[11px] font-sans uppercase tracking-[0.22em] text-[#7A746D]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C4604A] animate-pulse" />
            <span className="font-semibold text-[#1A1816]">Vol. I · Opus Nº 2026</span>
            <span className="hidden sm:inline text-[#E2D5C6]">/</span>
            <span className="hidden sm:inline">The Engineer&apos;s Monograph</span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[#5E5854]">
            <span>Distributed Systems</span>
            <span className="text-[#E2D5C6]">•</span>
            <span>Real-time APIs</span>
            <span className="text-[#E2D5C6]">•</span>
            <span>Low-Latency Architectures</span>
          </div>

          <div className="flex items-center gap-2 font-script text-base text-[#C4604A] lowercase tracking-normal">
            <span>{TOTAL_PLATES} architectural plates in archive</span>
          </div>
        </div>

        {/* ── Monograph Hero Title & Mission ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3ECE4] border border-[#E2D5C6] text-xs font-semibold text-[#7A746D] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C4604A]" />
            <span>Interactive Engineering Ledger</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#1A1816] tracking-tight leading-[0.98]">
            The Digital Monograph of{" "}
            <span className="italic font-serif font-normal text-[#C4604A] block sm:inline">
              Resilient Systems
            </span>{" "}
            & Distributed Craft.
          </h1>

          <p className="font-script text-xl sm:text-2xl text-[#C4604A] mt-2">
            drag or click the pages to turn · press arrow keys (← / →)
          </p>
        </div>

        {/* ── 3D Physical Book Stage (Dual Mode: Desktop 3D Spread / Mobile Single-Page Leaf) ── */}
        <div className="flex flex-col items-center gap-6 w-full">
          
          {/* 1. DESKTOP STAGE (≥ md: Dual-Page 3D Open Book) */}
          <div
            className="hidden md:flex items-center justify-center w-full max-w-6xl relative select-none"
            onPointerMove={handleStagePointerMove}
            onPointerLeave={handleStagePointerLeave}
          >
            {/* Left Chevron Button */}
            <button
              onClick={prevPage}
              disabled={isFlipping}
              className="p-3 text-[#928B87] hover:text-[#1A1816] disabled:opacity-30 transition-colors rounded-full hover:bg-[#F3ECE4] z-30 mr-2 md:mr-4 shrink-0"
              aria-label="Previous Page"
              title="Previous Plate (Left Arrow)"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* The Hardcover Open Book Container */}
            <div className="w-full max-w-5xl [perspective:1800px]">
              <motion.div
                ref={bookContainerRef}
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: "preserve-3d",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-md shadow-paper-lg border border-[#EDE4D9] bg-[#FAF6F1] overflow-hidden cursor-grab active:cursor-grabbing select-none"
              >
                {/* ── 1. STATIC UNDERNEATH SPREAD ── */}
                <div className="absolute inset-0 grid grid-cols-2 z-0">
                  {/* Left Slot */}
                  <div className="h-full w-full overflow-hidden">
                    <BookPage
                      plateIndex={isFlipping && flipDir === "prev" ? nextTargetPlate : currentIdx}
                      side="left"
                      onInspectProject={onInspectProject}
                    />
                  </div>

                  {/* Right Slot */}
                  <div className="h-full w-full overflow-hidden">
                    <BookPage
                      plateIndex={isFlipping && flipDir === "next" ? nextTargetPlate : currentIdx}
                      side="right"
                      onInspectProject={onInspectProject}
                    />
                  </div>
                </div>

                {/* ── 2. DYNAMIC TURNING LEAF (3D FLIPPING PAGE) ── */}
                {isFlipping && flipDir === "next" && (
                  <motion.div
                    style={{
                      rotateY: flipAngle,
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                    }}
                    className="absolute top-0 bottom-0 left-1/2 w-1/2 z-20 shadow-2xl overflow-visible pointer-events-none"
                  >
                    {/* Front Face of Turning Leaf (Right half of Current Spread) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden bg-[#FDFCFA]">
                      <BookPage
                        plateIndex={currentIdx}
                        side="right"
                        onInspectProject={onInspectProject}
                      />
                      <motion.div
                        style={{ opacity: leafShadowNext }}
                        className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none"
                      />
                    </div>

                    {/* Back Face of Turning Leaf (Left half of Target Spread) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden bg-[#FAF6F1]">
                      <BookPage
                        plateIndex={nextTargetPlate}
                        side="left"
                        onInspectProject={onInspectProject}
                      />
                      <motion.div
                        style={{ opacity: leafShadowNext }}
                        className="absolute inset-0 bg-gradient-to-l from-white/30 via-transparent to-black/20 pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── 3. DYNAMIC TURNING LEAF (PREVIOUS PAGE) ── */}
                {isFlipping && flipDir === "prev" && (
                  <motion.div
                    style={{
                      rotateY: flipAngle,
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                    }}
                    className="absolute top-0 bottom-0 left-0 w-1/2 z-20 shadow-2xl overflow-visible pointer-events-none"
                  >
                    {/* Front Face of Turning Leaf (Left half of Current Spread) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden bg-[#FAF6F1]">
                      <BookPage
                        plateIndex={currentIdx}
                        side="left"
                        onInspectProject={onInspectProject}
                      />
                      <motion.div
                        style={{ opacity: leafShadowPrev }}
                        className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent pointer-events-none"
                      />
                    </div>

                    {/* Back Face of Turning Leaf (Right half of Target Spread) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(-180deg)] overflow-hidden bg-[#FDFCFA]">
                      <BookPage
                        plateIndex={nextTargetPlate}
                        side="right"
                        onInspectProject={onInspectProject}
                      />
                      <motion.div
                        style={{ opacity: leafShadowPrev }}
                        className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/20 pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── 4. CENTER SPINE CREASE & SHADOW ── */}
                <motion.div
                  style={{ opacity: spineShade }}
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 z-25 pointer-events-none bg-gradient-to-r from-black/20 via-black/40 to-black/20"
                />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px z-30 pointer-events-none bg-[#D4C3AF]" />
              </motion.div>
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={nextPage}
              disabled={isFlipping}
              className="p-3 text-[#928B87] hover:text-[#1A1816] disabled:opacity-30 transition-colors rounded-full hover:bg-[#F3ECE4] z-30 ml-2 md:mr-4 shrink-0"
              aria-label="Next Page"
              title="Next Plate (Right Arrow)"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* 2. MOBILE STAGE (< md: Single-Page Leaf Presentation with Touch Swiping) */}
          <div className="block md:hidden w-full max-w-lg mx-auto">
            <div
              className="w-full rounded-lg shadow-paper-lg border-2 border-[#D4C3AF] bg-[#FAF6F1] overflow-hidden"
              onTouchStart={handleMobileTouchStart}
              onTouchEnd={handleMobileTouchEnd}
            >
              {/* Top Mobile Plate Bar with Side Toggle Switch */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F3ECE4] border-b border-[#EDE4D9] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C4604A] animate-pulse" />
                  <span className="font-bold text-[#1A1816] text-[11px]">
                    {activePlate.plateNumber}
                  </span>
                </div>

                {/* Page Switcher Pill */}
                <div className="inline-flex rounded-full bg-[#EDE4D9] p-0.5 text-[10px]">
                  <button
                    onClick={() => setMobileSide("left")}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      mobileSide === "left"
                        ? "bg-[#1A1816] text-[#FAF6F1] shadow-xs"
                        : "text-[#5E5854] hover:text-[#1A1816]"
                    }`}
                  >
                    Page A · Left
                  </button>
                  <button
                    onClick={() => setMobileSide("right")}
                    className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                      mobileSide === "right"
                        ? "bg-[#1A1816] text-[#FAF6F1] shadow-xs"
                        : "text-[#5E5854] hover:text-[#1A1816]"
                    }`}
                  >
                    Page B · Right
                  </button>
                </div>
              </div>

              {/* Mobile Page Content Leaf with Smooth Transition */}
              <div className="min-h-[460px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentIdx}-${mobileSide}`}
                    initial={{ opacity: 0, x: mobileSide === "right" ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mobileSide === "right" ? -12 : 12 }}
                    transition={{ duration: 0.22 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <BookPage
                      plateIndex={currentIdx}
                      side={mobileSide}
                      onInspectProject={onInspectProject}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Touch Swipe and Nav Tip */}
              <div className="px-3 py-2 bg-[#F3ECE4]/80 border-t border-[#EDE4D9] flex items-center justify-between text-[10.5px] font-mono text-[#7A746D]">
                <span>← Swipe to turn →</span>
                <span className="text-[#C4604A] font-medium">
                  {mobileSide === "left" ? "Side A" : "Side B"} of Plate {currentIdx + 1}
                </span>
              </div>
            </div>

            {/* Mobile Controls: Previous / Counter / Next */}
            <div className="flex items-center justify-between gap-3 mt-4 w-full">
              <button
                onClick={prevPage}
                disabled={isFlipping}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-[#F3ECE4] hover:bg-[#E2D5C6] active:bg-[#D4C3AF] text-[#1A1816] border border-[#EDE4D9] text-xs font-mono font-semibold transition-colors disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4 text-[#C4604A]" />
                <span>Prev Plate</span>
              </button>

              <div className="px-3 py-2 rounded-md bg-[#FAF6F1] border border-[#EDE4D9] text-center shrink-0">
                <span className="font-mono text-xs font-bold text-[#C4604A]">
                  {String(currentIdx + 1).padStart(2, "0")} / {TOTAL_PLATES}
                </span>
              </div>

              <button
                onClick={nextPage}
                disabled={isFlipping}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-[#F3ECE4] hover:bg-[#E2D5C6] active:bg-[#D4C3AF] text-[#1A1816] border border-[#EDE4D9] text-xs font-mono font-semibold transition-colors disabled:opacity-40"
              >
                <span>Next Plate</span>
                <ChevronRight className="w-4 h-4 text-[#C4604A]" />
              </button>
            </div>
          </div>

          {/* ── Active Plate Title & Position ── */}
          <div className="flex flex-col items-center justify-center text-center mt-2 px-4">
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#C4604A]">
              {activePlate.plateNumber} · {activePlate.category}
            </span>
            <p className="font-serif font-bold text-lg sm:text-xl text-[#1A1816] mt-0.5">
              {activePlate.title}
            </p>
            <p className="text-xs text-[#5E5854] mt-1 max-w-md">
              {activePlate.subtitle}
            </p>
          </div>

          {/* ── Plate Index Navigation Tabs (Scrollable on Mobile, Centered on Desktop) ── */}
          <div className="flex items-center justify-start md:justify-center gap-1.5 max-w-4xl mx-auto pt-2 overflow-x-auto no-scrollbar w-full px-2 py-1">
            {MONOGRAPH_PLATES.map((p, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={p.id}
                  onClick={() => jumpToPlate(idx)}
                  disabled={isFlipping}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all shrink-0 ${
                    isActive
                      ? "bg-[#1A1816] text-[#FAF6F1] font-bold shadow-sm ring-1 ring-[#C4604A]"
                      : "bg-[#F3ECE4] text-[#5E5854] hover:bg-[#E2D5C6] hover:text-[#1A1816]"
                  }`}
                >
                  <span className="text-[#C4604A] font-bold mr-1.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{p.slug.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}