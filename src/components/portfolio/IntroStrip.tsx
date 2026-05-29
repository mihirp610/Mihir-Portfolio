import { motion } from "framer-motion";

export function IntroStrip() {
  return (
    <section
      id="intro"
      className="relative min-h-[30vh] flex flex-col items-center justify-center px-[5vw] py-16"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-cond font-light tracking-normal normal-case"
      >
        Construction Estimator · Quantity Surveyor · Project Coordinator
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-16 flex items-center gap-3"
        aria-hidden
      >
        <span className="font-cond text-[0.65rem] text-muted-foreground">Scroll</span>
        <div className="w-16 h-px bg-muted relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 bg-amber"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
