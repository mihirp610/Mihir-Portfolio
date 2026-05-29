import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoader } from "./loader-context";

export function Loader() {
  const { ready, setReady } = useLoader();
  const [showMark, setShowMark] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowMark(true), 850);
    const t2 = setTimeout(() => setReady(true), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setReady]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: 140, height: 80 }}
          >
            <AnimatePresence>
              {!showMark && (
                <motion.div
                  key="line"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 120, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute h-px bg-amber"
                  style={{ boxShadow: "0 0 10px var(--primary)" }}
                />
              )}
            </AnimatePresence>

            {showMark && (
              <motion.span
                layoutId="brand-mark"
                className="bg-amber text-primary-foreground font-cond font-bold grid place-items-center clip-chip"
                initial={{ width: 2, height: 2, opacity: 0, fontSize: 0 }}
                animate={{ width: 56, height: 56, opacity: 1, fontSize: 20 }}
                transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              >
                MP
              </motion.span>
            )}
          </div>

          <motion.p
            className="absolute bottom-12 font-cond text-[0.6rem] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            Mihir Prajapati
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
