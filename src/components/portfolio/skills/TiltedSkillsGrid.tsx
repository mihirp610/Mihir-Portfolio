import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Skill = { name: string; group: string };

function SkillCard({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6, rotateX: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22, duration: 0.8 }}
      className="relative w-full min-w-0 p-5 md:p-6 overflow-hidden group"
      style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--color-primary) 12%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, color-mix(in oklab, var(--color-surface-1) 55%, transparent), color-mix(in oklab, var(--color-surface-2) 25%, transparent))",
          borderTop: "1px solid color-mix(in oklab, var(--color-foreground) 8%, transparent)",
        }}
      />
      <div className="relative">
        <div className="font-cond text-amber text-[0.6rem]">{skill.group}</div>
        <div className="font-display text-foreground text-lg md:text-xl mt-2 leading-tight">
          {skill.name}
        </div>
        <div className="mt-4 h-px w-8 bg-amber/70 group-hover:w-14 transition-all duration-400" />
      </div>
    </motion.div>
  );
}

export function TiltedSkillsGrid({ skills }: { skills: Skill[] }) {
  const isMobile = useIsMobile();

  return (
    <div
      className="py-4 overflow-hidden"
      style={{ perspective: "2200px", perspectiveOrigin: "50% 30%" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: isMobile ? 10 : 16, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="grid w-full grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(3,minmax(0,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] lg:grid-cols-[repeat(5,minmax(0,1fr))] gap-2 md:gap-3"
        style={{ transformStyle: "preserve-3d", transformOrigin: "center 40%" }}
      >
        {skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} />
        ))}
      </motion.div>
    </div>
  );
}
