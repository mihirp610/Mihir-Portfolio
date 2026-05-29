import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { sectionPad } from "./section-shell";

const stats = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 8, prefix: "$", suffix: "M+", label: "Projects Estimated" },
  { value: 3, label: "Countries of Practice" },
  { text: "M.Eng", label: "University of Windsor" },
];

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (inView) animate(mv, to, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1] });
  }, [inView, mv, to]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className={`section-tone-1 w-screen relative left-1/2 -translate-x-1/2 ${sectionPad}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8 max-w-[1400px] mx-auto">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div
              className="font-display text-amber leading-none"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            >
              {s.text ? s.text : <Counter to={s.value!} prefix={s.prefix} suffix={s.suffix} />}
            </div>
            <div className="font-cond text-muted-foreground text-[0.7rem] mt-4">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
