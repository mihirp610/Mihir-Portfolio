import { Reveal } from "./motion-primitives";
import { BlurText } from "./primitives/BlurText";
import { GlassCard } from "./primitives/GlassCard";
import { sectionPad } from "./section-shell";

const features = [
  {
    n: "01",
    tag: "Multi-Jurisdictional",
    title: "Global Experience",
    body: "Canada · Australia · India across commercial, industrial, and data centre projects.",
  },
  {
    n: "02",
    tag: "Full Lifecycle",
    title: "End-to-End Delivery",
    body: "Pre-tender analysis through contract administration, RFIs, change orders, and project closeout.",
  },
  {
    n: "03",
    tag: "Technical Precision",
    title: "CISC / AISC Certified",
    body: "Zero non-conformance incidents; Autodesk Advance Steel, Fusion 360, Bluebeam, PlanSwift.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className={`${sectionPad} grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32`}
    >
      <div>
        <div className="font-cond text-amber text-[0.7rem] mb-6">— Who I Am</div>
        <BlurText
          className="font-display leading-[0.92] text-foreground"
          style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
          tokens={[
            { text: "Where" },
            { text: "precision" },
            { text: "meets" },
            { node: <span className="text-amber">ambition.</span>, text: "ambition." },
          ]}
        />
        <Reveal delay={0.2}>
          <p className="mt-12 text-muted-foreground text-lg leading-relaxed max-w-xl">
            Results-driven Civil Engineer and Quantity Surveyor with 3+ years of progressive,
            multi-jurisdictional experience spanning Canada, Australia, and India. Specializing in
            structural steel estimation, quantity take-offs, and multi-million-dollar project
            coordination — from pre-tender analysis through contract closeout.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 font-cond text-foreground text-[0.8rem] group"
          >
            <span className="amber-link">Let's connect</span>
            <span className="text-amber transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>

      <div className="flex flex-col gap-5">
        {features.map((f) => (
          <GlassCard key={f.n} className="p-8 lg:p-10">
            <div className="font-cond text-amber/80 text-[0.65rem] mb-3">
              {f.n} — {f.tag}
            </div>
            <h3 className="font-display text-3xl text-foreground mb-3">{f.title}</h3>
            <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{f.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
