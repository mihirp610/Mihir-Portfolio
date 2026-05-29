import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Token = { text: string; node?: ReactNode; className?: string };

type BlurTextProps = {
  text?: string;
  tokens?: Token[];
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  blur?: number;
  y?: number;
  once?: boolean;
  animate?: boolean;
  /** char = per-character blur (hero); word = per-token blur (section titles) */
  mode?: "char" | "word";
};

const EASE = [0.22, 0.6, 0.2, 1] as const;

function expandTokens(tokens: Token[], mode: "char" | "word"): Token[] {
  if (mode === "word") return tokens;
  const out: Token[] = [];
  for (const t of tokens) {
    if (t.node) {
      out.push(t);
      continue;
    }
    for (const ch of t.text.split("")) {
      out.push({ text: ch === " " ? "\u00a0" : ch, className: t.className });
    }
  }
  return out;
}

export function BlurText({
  text,
  tokens,
  className,
  style,
  as = "h2",
  delay = 0,
  stagger = 0.05,
  blur = 14,
  y = 18,
  once = true,
  animate = false,
  mode = "word",
}: BlurTextProps) {
  const baseTokens: Token[] = tokens ?? (text ?? "").split(" ").map((w) => ({ text: w }));

  const parts = mode === "char" ? expandTokens(baseTokens, "char") : baseTokens;
  const itemStagger = mode === "char" ? stagger * 0.35 : stagger;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: itemStagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
  };

  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      {...(animate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once, margin: "-10% 0px -10% 0px" } })}
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          variants={child}
          className={`inline-block ${p.className ?? ""}`}
          style={{
            marginRight:
              mode === "char" && p.text === " " ? "0.35em" : mode === "word" ? "0.25em" : "0.02em",
            willChange: "filter, transform, opacity",
          }}
        >
          {p.node ?? p.text}
        </motion.span>
      ))}
    </Tag>
  );
}
