import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type CircularGalleryEngineProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderCard: (item: T, index: number, isActive: boolean) => ReactNode;
  aspectClass?: string;
  cardWidthClass?: string;
  showControls?: boolean;
  hint?: string;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  scrollDriven?: boolean;
};

const EASE = [0.22, 0.62, 0.2, 1] as const;

function cardStepForViewport(width: number) {
  if (width < 640) return width * 0.76;
  if (width < 1024) return width * 0.54;
  return width * 0.34;
}

export function CircularGalleryEngine<T>({
  items,
  getKey,
  renderCard,
  aspectClass = "aspect-[3/4]",
  cardWidthClass = "w-[clamp(280px,78vw,960px)] sm:w-[clamp(320px,58vw,820px)] md:w-[clamp(360px,44vw,720px)] lg:w-[clamp(320px,30vw,520px)]",
  showControls = true,
  hint = "Scroll · Drag · Click to focus",
  activeIndex: controlledActive,
  onActiveChange,
  scrollDriven = false,
}: CircularGalleryEngineProps<T>) {
  const reduceMotion = useReducedMotion();
  const [internalActive, setInternalActive] = useState(0);
  const [cardStep, setCardStep] = useState(320);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [dragDir, setDragDir] = useState<0 | 1 | -1>(0);

  const active = controlledActive ?? internalActive;

  const setActive = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      if (controlledActive === undefined) setInternalActive(clamped);
      onActiveChange?.(clamped);
    },
    [controlledActive, items.length, onActiveChange],
  );

  useEffect(() => {
    // Measure an example card's width and compute spacing (cardStep) from it.
    const el = measureRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.offsetWidth || cardStepForViewport(window.innerWidth);
      // Add a small gap multiplier so cards don't overlap when scaled
      setCardStep(Math.max(160, Math.round(w * 1.04)));
    };

    compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    const onWin = () => compute();
    window.addEventListener("resize", onWin);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onWin);
    };
  }, []);

  const goToIndex = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(items.length - 1, i));
      setDragDir(next > active ? 1 : next < active ? -1 : 0);
      setActive(next);
    },
    [active, items.length, setActive],
  );

  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (scrollDriven) return;
    const threshold = 48;
    const vx = info.velocity.x;
    const ox = info.offset.x;
    if (ox < -threshold || vx < -400) goToIndex(active + 1);
    else if (ox > threshold || vx > 400) goToIndex(active - 1);
  };

  const spring = reduceMotion
    ? { duration: 0.35, ease: EASE }
    : { type: "spring" as const, stiffness: 118, damping: 21, mass: 0.72 };

  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-hidden touch-pan-y"
        style={{ perspective: "2000px", perspectiveOrigin: "50% 50%" }}
      >
        <motion.div
          className="relative mx-auto w-full min-h-[min(68vh,580px)] flex items-center justify-center py-8"
          drag={scrollDriven ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={onDragEnd}
        >
          <div className="relative w-0 h-0" style={{ transformStyle: "preserve-3d" }}>
              {/* measurement element to compute card width for spacing */}
              <div
                ref={measureRef}
                aria-hidden
                className={`absolute left-0 top-0 pointer-events-none invisible ${cardWidthClass} ${aspectClass}`}
                style={{ transformStyle: "preserve-3d" }}
              />
              {items.map((item, i) => {
              const offset = i - active;
              const distance = Math.abs(offset);
              const arcY = distance * distance * 28;
              const rotateY = offset * -18;
              const translateZ = -distance * 110;
              const scale = 1 - Math.min(distance, 4) * 0.11;
              const opacity = 1 - Math.min(distance, 3) * 0.24;
              const blurPx = distance === 0 ? 0 : Math.min(4 + distance * 5, 16);
              const isActive = i === active;
              const shuffleDelay = reduceMotion
                ? 0
                : Math.min(distance, 3) * 0.045 +
                  (dragDir !== 0 && Math.sign(offset) === dragDir ? 0.02 : 0);

              return (
                <motion.div
                  key={getKey(item, i)}
                  className="absolute left-0 top-0 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: 50 - distance + (isActive ? 12 : 0),
                    pointerEvents: distance > 2 ? "none" : "auto",
                  }}
                  initial={false}
                  animate={{
                    x: offset * cardStep,
                    y: arcY,
                    rotateY,
                    rotateZ: offset * 1.5,
                    scale,
                    z: translateZ,
                    opacity,
                    filter: `blur(${blurPx}px)`,
                  }}
                  transition={{
                    ...spring,
                    delay: shuffleDelay,
                  }}
                  onClick={() => goToIndex(i)}
                >
                  <article
                    className={`relative -translate-x-1/2 -translate-y-1/2 origin-center ${cardWidthClass} ${aspectClass}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden transition-[box-shadow] duration-500"
                      style={{
                        transformStyle: "preserve-3d",
                        boxShadow: isActive
                          ? "0 60px 120px -45px rgba(0,0,0,0.9), 0 0 80px -20px rgba(232,160,32,0.14), 0 0 0 1px rgba(232,160,32,0.12)"
                          : "0 25px 50px -30px rgba(0,0,0,0.75)",
                      }}
                    >
                      {renderCard(item, i, isActive)}
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {showControls && (
        <>
          <div className="flex justify-center gap-3 mt-2">
            {items.map((item, i) => (
              <button
                key={getKey(item, i)}
                type="button"
                onClick={() => goToIndex(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className="flex items-center p-2"
              >
                <span
                  className="h-px transition-all duration-400"
                  style={{
                    width: i === active ? 52 : 12,
                    background: i === active ? "var(--color-primary)" : "var(--color-muted)",
                    opacity: i === active ? 1 : 0.4,
                  }}
                />
              </button>
            ))}
          </div>
          {hint ? (
            <p className="text-center mt-2 font-cond text-[0.65rem] text-muted-foreground tracking-[0.2em] uppercase">
              {hint}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
