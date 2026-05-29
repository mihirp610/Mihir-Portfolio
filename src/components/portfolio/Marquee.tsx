const items = [
  "STRUCTURAL STEEL",
  "CNC LASER",
  "QUANTITY SURVEYING",
  "CISC / AISC",
  "ADVANCE STEEL",
  "COST PLANNING",
  "ONTARIO CANADA",
  "M.ENG",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative py-6 overflow-hidden">
      <div className="flex whitespace-nowrap marquee-track marquee-slow">
        {row.concat(row).map((s, i) => (
          <span
            key={i}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] mx-10 text-muted-foreground/15 inline-flex items-center gap-10"
          >
            {s} <span className="text-amber/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
