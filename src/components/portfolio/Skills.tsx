import { BlurText } from "./primitives/BlurText";
import { TiltedSkillsGrid } from "./skills/TiltedSkillsGrid";
import { sectionPad } from "./section-shell";

const skills = [
  { group: "QS", name: "Structural Steel Estimation" },
  { group: "QS", name: "Quantity Take-Offs" },
  { group: "QS", name: "Cost Planning" },
  { group: "QS", name: "Value Engineering" },
  { group: "QS", name: "Bid Preparation" },
  { group: "Software", name: "Advance Steel" },
  { group: "Software", name: "Fusion 360" },
  { group: "Software", name: "AutoCAD 2D/3D" },
  { group: "Software", name: "Revit" },
  { group: "Software", name: "Bluebeam Revu" },
  { group: "Software", name: "PlanSwift" },
  { group: "Software", name: "Buildsoft Cubit" },
  { group: "Software", name: "MS Project" },
  { group: "Standards", name: "CISC / AISC" },
  { group: "Coordination", name: "RFI Management" },
  { group: "Coordination", name: "Change Orders" },
  { group: "Coordination", name: "Contract Admin" },
  { group: "Coordination", name: "Subcontractor Mgmt" },
  { group: "Coordination", name: "Drawing Analysis" },
  { group: "Standards", name: "Site QA / QC" },
];

export function Skills() {
  return (
    <section id="skills" className={sectionPad}>
      <div className="font-cond text-amber text-[0.7rem] mb-6">— Technical Arsenal</div>
      <BlurText
        className="font-display text-foreground mb-20"
        style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.95 }}
        tokens={[
          { text: "Tools" },
          { text: "of" },
          { text: "the" },
          { node: <span className="text-amber">trade.</span>, text: "trade." },
        ]}
      />
      <TiltedSkillsGrid skills={skills} />
    </section>
  );
}
