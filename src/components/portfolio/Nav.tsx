import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoader } from "./loader-context";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { ready } = useLoader();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[110] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(8,8,8,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-[5vw] py-5">
          <a href="#top" className="flex items-center gap-3">
            {ready ? (
              <motion.span
                layoutId="brand-mark"
                className="bg-amber text-primary-foreground font-cond font-bold w-8 h-8 grid place-items-center text-sm"
                transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
              >
                MP
              </motion.span>
            ) : (
              <span className="w-8 h-8" />
            )}
            <span className="hidden md:inline-flex items-center gap-2 font-cond text-[0.7rem] text-muted-foreground">
              <span className="relative inline-block w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
              </span>
              <span className="text-amber">Currently at CMF Group Inc.</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-cond text-[0.78rem] text-muted-foreground hover:text-foreground amber-link transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 font-cond text-[0.78rem] text-foreground group"
          >
            <span className="amber-link">Hire Me</span>
            <span className="text-amber transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden font-cond text-foreground"
            aria-label="Menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
        {open && (
          <div className="md:hidden bg-background border-t border-border px-[5vw] py-8 flex flex-col gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
