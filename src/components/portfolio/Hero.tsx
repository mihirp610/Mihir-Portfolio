import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShaderLines } from "./shader/ShaderLines";
import { TextScramble } from "./primitives/TextScramble";

const ROLES = ["Construction Estimator", "Quantity Surveyor", "Project Coordinator"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex items-end"
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: bgOpacity, willChange: "opacity" }}
      >
        <ShaderLines />
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(8,8,8,0.35) 50%, rgba(8,8,8,0.88) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 px-[5vw] pb-[10vh] pt-[18vh] w-full"
        style={{ y: titleY, opacity: titleOpacity, willChange: "transform" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-cond text-amber text-[0.7rem] mb-8"
        >
          Ontario, Canada · Civil Estimator · Open to Relocation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display leading-[0.88] text-foreground"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 11rem)",
            minHeight: "1.15em",
            minWidth: "min(100%, 22ch)",
          }}
        >
          <TextScramble
            defaultText="MIHIR PRAJAPATI"
            phrases={ROLES}
            className="uppercase tracking-[0.02em]"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
          className="mt-6 font-cond text-muted-foreground text-[0.72rem] tracking-[0.18em] uppercase"
        >
          Hover name to explore roles
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 flex flex-wrap gap-6 items-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 font-cond text-foreground text-[0.85rem]"
          >
            <span className="amber-link">View Selected Work</span>
            <span className="text-amber transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="#contact" className="font-cond text-muted-foreground text-[0.78rem] amber-link">
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
