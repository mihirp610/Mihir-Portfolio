import { BlurText } from "./primitives/BlurText";
import { GalleryScrollSection } from "./gallery/GalleryScrollSection";
import { PhotoGallery3D, type GalleryPlate } from "./gallery/PhotoGallery3D";

const plates: GalleryPlate[] = [
  { title: "Foundation Pour", caption: "Concrete grid — Level B2", tone: 0 },
  { title: "Steel Rise", caption: "Primary columns — Q2 install", tone: 1 },
  { title: "Roof Deck", caption: "Bar joists & metal decking", tone: 2 },
  { title: "Skin", caption: "Curtain wall — south elevation", tone: 0 },
  { title: "Mech. Floor", caption: "Cable trays & HVAC rough-in", tone: 1 },
];

export function FeaturedBuild() {
  return (
    <GalleryScrollSection
      stepCount={plates.length}
      exitVh={50}
      header={
        <div className="px-[5vw] pb-4 shrink-0">
          <div className="font-cond text-amber text-[0.7rem] mb-4">— Featured Build</div>
          <BlurText
            as="h2"
            className="font-display text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.95 }}
            tokens={[
              { text: "Equinix" },
              { text: "SY5" },
              { text: "Stage 2", className: "text-amber" },
              { text: "—" },
              { text: "Data" },
              { text: "Centre." },
            ]}
          />
          <p className="mt-6 text-muted-foreground max-w-xl leading-relaxed text-sm md:text-base">
            AUD $6.1M data centre fit-out, Alexandria NSW. Multi-level access flooring estimation,
            full bid package with material specs and engineered alternatives.
          </p>
        </div>
      }
    >
      {(activeIndex, _progress, jumpToStep) => (
        <PhotoGallery3D
          plates={plates}
          activeIndex={activeIndex}
          onActiveChange={jumpToStep}
          scrollDriven
        />
      )}
    </GalleryScrollSection>
  );
}
