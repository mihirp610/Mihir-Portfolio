import { motion, useReducedMotion } from "framer-motion";
import { BlurText } from "./primitives/BlurText";
import { Reveal, RevealItem, RevealStagger } from "./motion-primitives";
import { ContactForm } from "./forms/ContactForm";
import { sectionPad } from "./section-shell";

const EASE = [0.22, 0.65, 0.2, 1] as const;

const socials = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mihir-prajapati-a25282155",
    href: "https://linkedin.com/in/mihir-prajapati-a25282155",
  },
  { label: "Phone", value: "+1 519-984-6368", href: "tel:+15199846368" },
  { label: "Location", value: "Ontario, Canada · Open to relocation", href: "#" },
];

function SocialLink({ label, value, href }: { label: string; value: string; href: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className="group block py-2"
      whileHover={reduceMotion ? undefined : { x: 6 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="font-cond text-muted-foreground text-[0.65rem]">{label}</div>
      <div className="relative mt-1.5 inline-block overflow-hidden">
        <span className="text-foreground group-hover:text-amber transition-colors duration-300 text-[0.95rem] font-light tracking-wide">
          {value}
        </span>
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-px bg-primary origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ width: "100%" }}
        />
      </div>
    </motion.a>
  );
}

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className={sectionPad}>
      <div className="max-w-6xl">
        <div className="font-cond text-amber text-[0.7rem] mb-6">— Let's Build Something</div>
        <BlurText
          className="font-display text-foreground"
          style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", lineHeight: 0.92 }}
          tokens={[
            { text: "Get" },
            { text: "in" },
            { node: <span className="text-amber">touch.</span>, text: "touch." },
          ]}
        />

        <div className="mt-16 lg:mt-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-16 lg:gap-20 xl:gap-28 items-start">
          <div>
            <Reveal delay={0.05}>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-light tracking-wide">
                Open to new opportunities across Canada. Full-time, contract, or project-based —
                remote, hybrid, or on-site.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-12">
              <motion.a
                href="mailto:prajapatimihir24@gmail.com"
                className="group inline-block"
                whileHover={reduceMotion ? undefined : { x: 4 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span
                  className="font-display text-foreground block transition-colors duration-300 group-hover:text-amber"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", lineHeight: 1.05 }}
                >
                  prajapatimihir24@gmail.com
                </span>
                <span className="font-cond text-amber text-[0.7rem] mt-4 inline-flex items-center gap-2">
                  <motion.span className="inline-block" initial={false} whileHover={{ x: 4 }}>
                    Send email →
                  </motion.span>
                </span>
              </motion.a>
            </Reveal>

            <RevealStagger className="mt-14 space-y-1 border-t border-border/40 pt-10">
              {socials.map((it) => (
                <RevealItem key={it.label}>
                  <SocialLink {...it} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          <motion.div
            className="relative p-8 sm:p-10 lg:p-12"
            initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(10px)" }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
            style={{
              background:
                "linear-gradient(155deg, color-mix(in oklab, var(--color-surface-1) 88%, transparent) 0%, color-mix(in oklab, var(--color-surface-2) 55%, transparent) 100%)",
              border: "1px solid color-mix(in oklab, var(--color-foreground) 8%, transparent)",
              boxShadow:
                "0 1px 0 color-mix(in oklab, var(--color-foreground) 6%, transparent) inset, 0 32px 64px -40px rgba(0,0,0,0.65)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 right-0 h-px glass-shimmer"
            />

            <motion.div
              className="mb-10"
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              <h3
                className="font-display text-foreground"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Send a message
              </h3>
              <p className="mt-3 text-muted-foreground text-[0.95rem] font-light max-w-sm leading-relaxed">
                Prefer a quick intro? Drop your details below — or email directly.
              </p>
            </motion.div>

            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
