import { motion } from "framer-motion";
import { BlurText } from "./primitives/BlurText";
import { sectionPad } from "./section-shell";

const items = [
  {
    n: "01",
    deg: "Master of Engineering – Civil Engineering",
    inst: "University of Windsor",
    loc: "Windsor, Ontario, Canada",
    period: "Sep 2023 – Dec 2024",
    grade: "75% · Focus: Structural Engineering, Construction Management",
  },
  {
    n: "02",
    deg: "Bachelor of Engineering – Civil Engineering",
    inst: "Gujarat Technological University",
    loc: "Gujarat, India",
    period: "Jul 2017 – Jul 2021",
    grade: "CGPA 8.47/10 — Distinction · Graduated with Honours",
  },
];

export function Education() {
  return (
    <section className={sectionPad}>
      <div className="font-cond text-amber text-[0.7rem] mb-6">— Academic Foundation</div>
      <BlurText
        className="font-display text-foreground mb-20"
        style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.95 }}
        tokens={[
          { text: "Edu" },
          { node: <span className="text-amber">cation.</span>, text: "cation." },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {items.map((e, i) => (
          <motion.div
            key={e.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="font-cond text-amber/70 text-[0.65rem] mb-4">{e.n}</div>
            <div className="font-cond text-amber text-[0.7rem]">{e.period}</div>
            <h3 className="font-display text-3xl mt-3 text-foreground leading-tight">{e.deg}</h3>
            <p className="text-foreground mt-3 text-lg">{e.inst}</p>
            <p className="font-cond text-muted-foreground text-[0.7rem] mt-1">{e.loc}</p>
            <p className="text-muted-foreground text-sm mt-6 leading-relaxed">{e.grade}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
