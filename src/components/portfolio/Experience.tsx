import { BlurText } from "./primitives/BlurText";
import { GlassCard } from "./primitives/GlassCard";
import { sectionPad } from "./section-shell";

const exp = [
  {
    n: "01",
    company: "CMF Group Inc.",
    role: "Estimator / Steel Detailer",
    period: "Aug 2024 – Present",
    loc: "Sarnia, Ontario · On-site",
    points: [
      "Delivered $1M+ structural steel estimation package — full take-offs, CISC/AISC compliance, fabrication cost breakdowns.",
      "Shop drawings and erection plans in Autodesk Advance Steel with 3D modelling in Fusion 360.",
      "Zero non-conformance incidents across all delivered packages.",
    ],
  },
  {
    n: "02",
    company: "TechnicalNAccount",
    role: "Estimator / Quantity Surveyor",
    period: "Sep 2021 – Aug 2023",
    loc: "Sydney, Australia · Remote",
    points: [
      "Equinix SY5 Stage 2 Data Centre — full access flooring estimation, total project cost AUD $6.1M.",
      "Wee Waa High School — cost proposal AUD $473,000 with drawing mark-up and loading criteria assessment.",
      "Bluebeam Revu, PlanSwift, Buildsoft Cubit for precise material take-offs.",
    ],
  },
  {
    n: "03",
    company: "Rudra Construction Pvt. Ltd.",
    role: "Junior Site Engineer",
    period: "Sep 2021 – Mar 2022",
    loc: "Vadodara, India · On-site",
    points: [
      "On-site supervision aligned with approved drawings and project timelines.",
      "Proactive structural drawing issue identification before schedule or budget impact.",
      "Comprehensive site records: daily logs, QC reports, material tracking.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className={sectionPad}>
      <div className="font-cond text-amber text-[0.7rem] mb-6">— Professional Experience</div>
      <BlurText
        className="font-display text-foreground mb-24"
        style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.95 }}
        tokens={[
          { text: "The" },
          { node: <span className="text-amber">journey.</span>, text: "journey." },
        ]}
      />
      <div className="relative">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-1/2"
          aria-hidden
        />
        <div className="flex flex-col gap-20">
          {exp.map((e, i) => (
            <div
              key={e.n}
              className={`relative grid grid-cols-[24px_1fr] md:grid-cols-2 md:gap-16 items-start ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`hidden md:block ${i % 2 === 0 ? "text-right pr-12" : "pl-12"}`}>
                <div className="font-cond text-amber text-[0.7rem]">{e.period}</div>
                <div className="font-cond text-muted-foreground text-[0.65rem] mt-2">{e.loc}</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[5vw] md:left-1/2 md:-translate-x-1/2 top-3 w-3 h-3 rounded-full bg-amber shadow-[0_0_0_4px_var(--background)]" />
                <GlassCard className="p-8 lg:p-10 md:ml-8">
                  <div className="md:hidden font-cond text-amber text-[0.65rem] mb-2">
                    {e.period} · {e.loc}
                  </div>
                  <h3 className="font-display text-3xl text-foreground">{e.company}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{e.role}</p>
                  <ul className="mt-6 space-y-3">
                    {e.points.map((p, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[0.92rem] text-muted-foreground leading-relaxed"
                      >
                        <span className="text-amber mt-1.5 shrink-0">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
