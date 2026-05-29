import { CircularGalleryEngine } from "./CircularGalleryEngine";

export type GalleryPlate = {
  title: string;
  caption: string;
  tone: 0 | 1 | 2;
};

function PlateArt({ tone }: { tone: 0 | 1 | 2 }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0"
        style={{
          background:
            tone === 0
              ? "linear-gradient(160deg, #1a140c 0%, #0a0806 55%, #050504 100%)"
              : tone === 1
                ? "linear-gradient(160deg, #121820 0%, #080c10 55%, #040608 100%)"
                : "linear-gradient(160deg, #181410 0%, #0c0a08 55%, #050404 100%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 75% 20%, rgba(232,160,32,0.18), transparent 55%)",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {tone === 0 && (
          <g stroke="var(--primary)" fill="none" strokeWidth="0.7" opacity="0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={50 + i * 45}
                x2={400}
                y2={50 + i * 45}
                strokeWidth="0.35"
              />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={50 + i * 40}
                y1={0}
                x2={50 + i * 40}
                y2={500}
                strokeWidth="0.35"
              />
            ))}
          </g>
        )}
        {tone === 1 && (
          <g stroke="var(--primary)" fill="none" strokeWidth="0.9" opacity="0.55">
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x={50 + i * 55} y={60} width="30" height="380" />
            ))}
            <line x1="0" y1="440" x2={400} y2="440" />
          </g>
        )}
        {tone === 2 && (
          <g stroke="var(--primary)" fill="none" strokeWidth="0.5" opacity="0.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={i} x1={0} y1={i * 36} x2={400} y2={i * 36 + 80} />
            ))}
          </g>
        )}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
    </div>
  );
}

type PhotoGallery3DProps = {
  plates: GalleryPlate[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  scrollDriven?: boolean;
};

export function PhotoGallery3D({
  plates,
  activeIndex,
  onActiveChange,
  scrollDriven,
}: PhotoGallery3DProps) {
  return (
    <CircularGalleryEngine
      items={plates}
      getKey={(p) => p.title}
      activeIndex={activeIndex}
      onActiveChange={onActiveChange}
      scrollDriven={scrollDriven}
      cardWidthClass="w-[clamp(280px,72vw,840px)] sm:w-[clamp(320px,50vw,720px)] md:w-[clamp(360px,36vw,640px)] lg:w-[clamp(320px,24vw,520px)]"
      aspectClass="aspect-[4/5]"
      hint={scrollDriven ? "Scroll through build phases" : undefined}
      renderCard={(plate, i, isActive) => (
        <>
          <PlateArt tone={plate.tone} />
          <div
            className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 pointer-events-none transition-all duration-500 ${
              isActive ? "opacity-100" : "opacity-85"
            }`}
          >
            <div className="max-w-[min(60ch,44rem)] w-full">
              <span className="font-cond text-[0.62rem] text-amber/70 mb-2 block">
                {String(i + 1).padStart(2, "0")} / {String(plates.length).padStart(2, "0")}
              </span>
              <span
                className={`font-cond text-[0.7rem] md:text-[0.85rem] transition-all duration-500 block ${
                  isActive ? "text-muted-foreground blur-0" : "text-muted-foreground/60 blur-[3px]"
                }`}
                style={{ lineHeight: 1.35 }}
              >
                {plate.caption}
              </span>
              <h3
                className={`font-display text-foreground mt-2 leading-tight transition-all duration-500 ${
                  isActive
                    ? "text-[clamp(1.45rem,3.4vw,2.25rem)] md:text-[clamp(2rem,4.5vw,3.25rem)] blur-0"
                    : "text-[clamp(1.15rem,2.6vw,1.6rem)] md:text-[clamp(1.6rem,3.6vw,2.35rem)] blur-[4px] opacity-80"
                }`}
                style={{ lineHeight: 1.05, maxWidth: "100%", wordBreak: "break-word" }}
              >
                {plate.title}
              </h3>
            </div>
          </div>
        </>
      )}
    />
  );
}

export default PhotoGallery3D;
