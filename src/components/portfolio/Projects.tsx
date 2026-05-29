import { BlurText } from "./primitives/BlurText";
import { CircularGallery, type GalleryItem } from "./gallery/CircularGallery";
import { GalleryScrollSection } from "./gallery/GalleryScrollSection";

const projects: GalleryItem[] = [
  {
    n: "01",
    name: "Equinix SY5 Stage 2 Data Centre",
    loc: "Alexandria, NSW, Australia",
    value: "AUD $6.1M",
    scope:
      "Full access flooring estimation across multiple levels; complete bid package with material specs and alternatives.",
    tags: ["Data Centre", "Commercial", "Estimation"],
    accent: 0,
  },
  {
    n: "02",
    name: "Structural Steel – Multi-Residential",
    loc: "New South Wales, Australia",
    value: "AUD $108,700",
    scope:
      "Complete estimates for 19 Belair Ave, Caringbah South (AUD $12,900) and 26-28 Station Street, Menangle (AUD $95,800); materials, labour, cutting, galvanization.",
    tags: ["Structural Steel", "Residential", "QS"],
    accent: 1,
  },
  {
    n: "03",
    name: "Wee Waa High School",
    loc: "NSW, Australia",
    value: "AUD $473,000",
    scope:
      "Raised access flooring evaluation and cost proposal including drawing mark-up, loading criteria assessment, and detailed scope breakdown.",
    tags: ["Institutional", "Educational", "Cost Planning"],
    accent: 2,
  },
];

export function Projects() {
  return (
    <GalleryScrollSection
      id="projects"
      stepCount={projects.length}
      exitVh={50}
      header={
        <div className="px-[5vw] pb-6 shrink-0">
          <div className="font-cond text-amber text-[0.7rem] mb-4">— Projects in Motion</div>
          <BlurText
            className="font-display text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95 }}
            tokens={[
              { text: "Work" },
              { text: "that" },
              { text: "speaks" },
              { text: "for" },
              { node: <span className="text-amber">itself.</span>, text: "itself." },
            ]}
          />
        </div>
      }
    >
      {(activeIndex, _progress, jumpToStep) => (
        <CircularGallery
          items={projects}
          activeIndex={activeIndex}
          onActiveChange={jumpToStep}
          scrollDriven
        />
      )}
    </GalleryScrollSection>
  );
}
