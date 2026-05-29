import { CircularGalleryEngine } from "./CircularGalleryEngine";

export type GalleryItem = {
  n: string;
  name: string;
  loc: string;
  value: string;
  scope: string;
  tags: string[];
  accent: number;
};

function ProjectArt({ idx }: { idx: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #141414 0%, #0a0a0a 100%)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, rgba(232,160,32,0.22), transparent 60%)",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {idx % 3 === 0 && (
          <g stroke="var(--primary)" fill="none" strokeWidth="0.6">
            {Array.from({ length: 14 }).map((_, i) => (
              <rect
                key={i}
                x={30 + i * 26}
                y={80}
                width="18"
                height="360"
                opacity={0.25 + (i % 4) * 0.15}
              />
            ))}
            <line x1="0" y1="440" x2="400" y2="440" strokeWidth="1" />
          </g>
        )}
        {idx % 3 === 1 && (
          <g stroke="var(--primary)" fill="none" strokeWidth="0.7">
            <polygon points="200,60 340,180 340,400 200,460 60,400 60,180" opacity="0.55" />
            <line x1="200" y1="60" x2="200" y2="460" strokeWidth="0.4" />
            <line x1="60" y1="280" x2="340" y2="280" strokeWidth="0.4" />
          </g>
        )}
        {idx % 3 === 2 && (
          <g stroke="var(--primary)" fill="none" strokeWidth="0.5">
            {Array.from({ length: 10 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={30 + c * 44}
                  y={50 + r * 42}
                  width="40"
                  height="38"
                  opacity={0.2 + ((r + c) % 3) * 0.18}
                />
              )),
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

type CircularGalleryProps = {
  items: GalleryItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  scrollDriven?: boolean;
};

export function CircularGallery({
  items,
  activeIndex,
  onActiveChange,
  scrollDriven,
}: CircularGalleryProps) {
  return (
    <CircularGalleryEngine
      items={items}
      getKey={(it) => it.n}
      activeIndex={activeIndex}
      onActiveChange={onActiveChange}
      scrollDriven={scrollDriven}
      hint={scrollDriven ? "Scroll to view each project" : undefined}
      renderCard={(it, _i, isActive) => (
        <>
          <ProjectArt idx={it.accent} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none" />
          <div className="absolute top-6 left-6 font-cond text-[0.65rem] text-amber/70">
            {it.n} / {String(items.length).padStart(2, "0")}
          </div>
          <div className="absolute top-6 right-6 font-cond text-[0.65rem] text-amber bg-amber/10 px-3 py-1.5">
            {it.value}
          </div>
          <div
            className={`absolute left-6 right-6 bottom-6 transition-all duration-500 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
            }`}
          >
            <div className="font-cond text-[0.62rem] text-muted-foreground mb-2">{it.loc}</div>
            <h3
              className={`font-display text-foreground leading-tight ${
                isActive ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
              }`}
            >
              {it.name}
            </h3>
            <p
              className={`text-muted-foreground text-sm mt-3 leading-relaxed line-clamp-3 transition-all duration-500 ${
                isActive ? "opacity-100 blur-0" : "opacity-60 blur-[2px]"
              }`}
            >
              {it.scope}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {it.tags.map((t) => (
                <span key={t} className="font-cond text-[0.6rem] text-muted-foreground/80">
                  — {t}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    />
  );
}
