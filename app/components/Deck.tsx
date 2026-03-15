"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp, Heart, X } from "lucide-react";

interface DeckProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onSwipe: (item: T, direction: "left" | "right") => void;
  emptyState: React.ReactNode;
  onSwipeUp?: (item: T) => void;
}

export default function Deck<T extends { id: string }>({
  items,
  renderItem,
  onSwipe,
  emptyState,
  onSwipeUp,
}: DeckProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localItems, setLocalItems] = useState(items);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null,
  );

  // Sync local items when items prop changes
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  // Reset index when items change significantly
  useEffect(() => {
    if (items.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex > 0 && currentIndex >= items.length) {
      // Wait for the exit animation to finish before looping back to the start
      const timer = setTimeout(() => {
        setCurrentIndex(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [items.length, currentIndex]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-280, 280], [-11, 11]);
  const likeOpacity = useTransform(x, [18, 110], [0, 1]);
  const passOpacity = useTransform(x, [-110, -18], [1, 0]);
  const detailOpacity = useTransform(y, [-170, -50], [1, 0]);
  const detailScale = useTransform(y, [-170, -50], [1.06, 0.92]);

  const resetCardPosition = () => {
    const spring = {
      type: "spring" as const,
      stiffness: 340,
      damping: 30,
      mass: 0.78,
    };

    void animate(x, 0, spring);
    void animate(y, 0, spring);
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
  ) => {
    const horizontalThreshold = 138;
    const horizontalVelocity = 760;
    const minimumTravelForFlick = 64;
    const upwardThreshold = -110;
    const upwardVelocity = -520;

    const currentItem = localItems[currentIndex];

    if (!currentItem) {
      resetCardPosition();
      return;
    }

    const isUpSwipe =
      onSwipeUp &&
      Math.abs(info.offset.x) < 110 &&
      (info.offset.y < upwardThreshold || info.velocity.y < upwardVelocity);

    if (isUpSwipe) {
      onSwipeUp(currentItem);
      resetCardPosition();
      return;
    }

    if (
      info.offset.x > horizontalThreshold ||
      (info.offset.x > minimumTravelForFlick &&
        info.velocity.x > horizontalVelocity)
    ) {
      setExitDirection("right");
      onSwipe(currentItem, "right");
      setCurrentIndex((prev) => prev + 1);
    } else if (
      info.offset.x < -horizontalThreshold ||
      (info.offset.x < -minimumTravelForFlick &&
        info.velocity.x < -horizontalVelocity)
    ) {
      setExitDirection("left");
      onSwipe(currentItem, "left");
      setCurrentIndex((prev) => prev + 1);
    } else {
      resetCardPosition();
    }
  };

  // define variants right before return statement
  const cardVariants: Variants = {
    initial: (customValues: { scale: number; yOffset: number }) => ({
      scale: customValues.scale - 0.05,
      opacity: 1,
      y: customValues.yOffset + 20,
    }),
    active: (customValues: { scale: number; yOffset: number }) => ({
      scale: customValues.scale,
      opacity: 1,
      y: customValues.yOffset,
      transition: {
        type: "spring" as const,
        stiffness: 430,
        damping: 30,
        mass: 0.82,
      },
    }),
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? -1000 : 1000,
      rotate: direction === "left" ? -26 : 26,
      scale: 1.03,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 220,
        damping: 22,
        mass: 0.9,
      },
    }),
  };

  return (
    <div className="relative mx-auto flex h-[calc(100dvh-12rem)] max-h-[44rem] min-h-[31rem] w-full max-w-[23rem] items-center justify-center perspective-[1500px] sm:h-[min(74dvh,41rem)] sm:max-h-none sm:min-h-[34rem] sm:max-w-[29rem] md:h-[min(78dvh,46rem)] md:min-h-[38rem] md:max-w-[33rem]">
      {/* Empty State Layer - Always rendered behind */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 animate-in fade-in duration-700">
        {emptyState}
      </div>

      {/* Card Stack - Rendered on top */}
      <AnimatePresence initial={false} custom={exitDirection}>
        {currentIndex < localItems.length &&
          localItems
            .slice(currentIndex, currentIndex + 3)
            .reverse()
            .map((item, index) => {
              const stackIndex =
                localItems.slice(currentIndex, currentIndex + 3).length -
                1 -
                index;
              const isTop = stackIndex === 0;

              const scale = isTop ? 1 : 1 - stackIndex * 0.04;
              const yOffset = isTop ? 0 : stackIndex * 12;

              return (
                <motion.div
                  key={item.id}
                  drag={isTop}
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.16}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02 }}
                  style={{
                    x: isTop ? x : 0,
                    y: isTop ? y : 0,
                    rotate: isTop ? rotate : 0,
                    zIndex: 100 - stackIndex,
                    transformOrigin: "bottom center",
                    touchAction: "none",
                    willChange: isTop ? "transform" : "auto",
                  }}
                  custom={{
                    scale,
                    yOffset,
                    direction: exitDirection || "right",
                  }}
                  variants={cardVariants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  className="absolute h-full w-full cursor-grab touch-none transform-gpu [backface-visibility:hidden] active:cursor-grabbing"
                >
                  {isTop && (
                    <>
                      <motion.div
                        style={{ opacity: likeOpacity }}
                        className="absolute top-8 left-6 z-[110] px-4 py-1.5 border-4 border-emerald-500/80 rounded-lg -rotate-12 pointer-events-none bg-neutral-900/40 shadow-sm backdrop-blur-sm"
                      >
                        <span className="text-xl font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                          <Heart className="fill-emerald-500 w-5 h-5" /> YES
                        </span>
                      </motion.div>
                      <motion.div
                        style={{ opacity: passOpacity }}
                        className="absolute top-8 right-6 z-[110] px-4 py-1.5 border-4 border-rose-500/80 rounded-lg rotate-12 pointer-events-none bg-neutral-900/40 shadow-sm backdrop-blur-sm"
                      >
                        <span className="text-xl font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                          <X className="w-6 h-6" /> NOPE
                        </span>
                      </motion.div>
                      {onSwipeUp ? (
                        <motion.div
                          style={{ opacity: detailOpacity, scale: detailScale }}
                          className="pointer-events-none absolute inset-x-0 bottom-8 z-[110] flex justify-center"
                        >
                          <span className="inline-flex items-center gap-2 rounded-full border-2 border-sky-400/75 bg-neutral-900/60 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-sky-300 shadow-sm backdrop-blur-sm">
                            <ChevronUp className="h-4 w-4" />
                            DETAILS
                          </span>
                        </motion.div>
                      ) : null}
                    </>
                  )}
                  <div
                    className={`w-full h-full transition-all duration-300 ${isTop ? "shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "shadow-none"}`}
                  >
                    {renderItem(item)}
                  </div>
                </motion.div>
              );
            })}
      </AnimatePresence>
    </div>
  );
}
