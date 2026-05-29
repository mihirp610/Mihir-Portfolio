export function Footer() {
  return (
    <footer className="px-[5vw] py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div className="flex items-center gap-3">
          <span className="bg-amber text-primary-foreground font-cond font-bold w-8 h-8 grid place-items-center text-sm">
            MP
          </span>
          <span className="font-cond text-foreground text-sm">Mihir Prajapati</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {["About", "Experience", "Projects", "Skills", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-cond text-muted-foreground text-[0.7rem] hover:text-amber transition"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="font-display text-amber md:text-right text-[1rem] tracking-[0.14em] opacity-80">
          PRECISION. AMBITION. BUILT TO LAST.
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-3">
        <p className="font-cond text-muted-foreground text-[0.65rem]">
          © 2026 Mihir Prajapati · All rights reserved
        </p>
        <p className="font-cond text-muted-foreground text-[0.65rem]">
          Open to relocation across Canada
        </p>
      </div>
    </footer>
  );
}
