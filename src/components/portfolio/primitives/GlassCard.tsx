import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Bundled-2073 style: frosted glass, cursor glow, soft lift, top shimmer.
 */
export function GlassCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8%" }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.9, ease: [0.22, 0.6, 0.2, 1] }}
      className={`relative overflow-hidden rounded-sm ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklab, var(--color-surface-1) 72%, transparent) 0%, color-mix(in oklab, var(--color-surface-2) 45%, transparent) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: hovered
          ? "0 1px 0 color-mix(in oklab, var(--color-foreground) 10%, transparent) inset, 0 40px 80px -35px rgba(0,0,0,0.75)"
          : "0 1px 0 color-mix(in oklab, var(--color-foreground) 6%, transparent) inset, 0 24px 48px -28px rgba(0,0,0,0.55)",
        border: "1px solid color-mix(in oklab, var(--color-foreground) 7%, transparent)",
        ...style,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-px glass-shimmer"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-400"
        style={{
          opacity: hovered ? 1 : 0.65,
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--color-primary) ${hovered ? 22 : 14}%, transparent), transparent 58%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-sm opacity-40"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 15%, transparent), transparent 40%, transparent 60%, color-mix(in oklab, var(--color-primary) 8%, transparent))",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
