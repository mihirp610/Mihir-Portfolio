import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";

type GalleryScrollSectionProps = {
  id?: string;
  stepCount: number;
  /** Extra viewport height after last card before releasing scroll (vh units) */
  exitVh?: number;
  header?: ReactNode;
  children: (
    activeIndex: number,
    progress: number,
    jumpToStep: (index: number) => void,
  ) => ReactNode;
};

/**
 * Sticky scroll section: vertical scroll scrubs through `stepCount` gallery steps
 * before the page continues to the next section.
 */
export function GalleryScrollSection({
  id,
  stepCount,
  exitVh = 40,
  header,
  children,
}: GalleryScrollSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    if (stepCount <= 1) {
      setActiveIndex(0);
      return;
    }
    const scaled = v * stepCount;
    const idx = Math.min(stepCount - 1, Math.max(0, Math.floor(scaled)));
    setActiveIndex(idx);
  });

  const jumpToStep = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(stepCount - 1, index));
      setActiveIndex(clamped);
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const fraction = stepCount > 1 ? clamped / (stepCount - 1) : 0;
      const top = el.offsetTop + fraction * scrollable;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [stepCount],
  );

  const totalVh = stepCount * 100 + exitVh;

  return (
    <section
      id={id}
      ref={ref}
      className="relative"
      style={{ height: `${totalVh}vh` }}
      aria-label={id ? `${id} gallery` : "Gallery"}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {header}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {children(activeIndex, progress, jumpToStep)}
        </div>
        <div className="absolute bottom-[6vh] left-[5vw] right-[5vw] flex items-center justify-between pointer-events-none">
          <span className="font-cond text-[0.65rem] text-muted-foreground tracking-widest">
            {String(activeIndex + 1).padStart(2, "0")} / {String(stepCount).padStart(2, "0")}
          </span>
          <span className="font-cond text-[0.6rem] text-muted-foreground/70">
            Scroll to explore
          </span>
        </div>
        <div className="absolute bottom-[4vh] left-[5vw] right-[5vw] h-px bg-border/40 overflow-hidden">
          <motion.div className="h-full bg-amber origin-left" style={{ scaleX: progress }} />
        </div>
      </div>
    </section>
  );
}
