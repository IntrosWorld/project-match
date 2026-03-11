"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";

interface DeckProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onSwipe: (item: T, direction: "left" | "right") => void;
  emptyState: React.ReactNode;
}

export default function Deck<T extends { id: string }>({
  items,
  renderItem,
  onSwipe,
  emptyState,
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
  const rotate = useTransform(x, [-250, 250], [-25, 25]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-20, -120], [0, 1]);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const threshold = 100;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 300) {
      setExitDirection("right");
      onSwipe(localItems[currentIndex], "right");
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x < -threshold || velocity < -300) {
      setExitDirection("left");
      onSwipe(localItems[currentIndex], "left");
      setCurrentIndex((prev) => prev + 1);
    }
    x.set(0);
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
        stiffness: 500,
        damping: 35,
        mass: 0.8,
      },
    }),
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? -1000 : 1000,
      rotate: direction === "left" ? -45 : 45,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <div className="relative w-full max-w-[360px] mx-auto h-[440px] sm:h-[500px] flex items-center justify-center perspective-[1500px]">
      {/* Empty State Layer - Always rendered behind */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 animate-in fade-in duration-700">
        {emptyState}
      </div>

      {/* Card Stack - Rendered on top */}
      <AnimatePresence mode="popLayout" custom={exitDirection}>
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
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  style={{
                    x: isTop ? x : 0,
                    rotate: isTop ? rotate : 0,
                    zIndex: 100 - stackIndex,
                    transformOrigin: "bottom center",
                    touchAction: "none",
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
                  className="absolute w-full h-full cursor-grab active:cursor-grabbing"
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
