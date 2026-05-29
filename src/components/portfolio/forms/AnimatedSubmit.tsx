import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.65, 0.2, 1] as const;

type Status = "idle" | "sending" | "sent";

export function AnimatedSubmit({ status, disabled }: { status: Status; disabled?: boolean }) {
  const reduceMotion = useReducedMotion();
  const isSent = status === "sent";
  const isSending = status === "sending";

  return (
    <motion.button
      type="submit"
      disabled={disabled || isSending || isSent}
      className="group relative mt-4 inline-flex items-center gap-4 overflow-hidden disabled:cursor-default"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
      whileHover={!isSent && !isSending && !reduceMotion ? { x: 4 } : undefined}
      whileTap={!isSent && !isSending && !reduceMotion ? { scale: 0.98 } : undefined}
    >
      <span
        className="relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300"
        style={{
          borderColor: isSent
            ? "color-mix(in oklab, var(--color-primary) 55%, transparent)"
            : "color-mix(in oklab, var(--color-foreground) 18%, transparent)",
          background: isSent
            ? "color-mix(in oklab, var(--color-primary) 12%, transparent)"
            : "transparent",
        }}
      >
        <AnimatePresence mode="wait">
          {isSent ? (
            <motion.svg
              key="check"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-amber"
              initial={{ pathLength: 0, opacity: 0, scale: 0.6 }}
              animate={{ pathLength: 1, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              />
            </motion.svg>
          ) : (
            <motion.span
              key="arrow"
              className="font-cond text-amber text-lg leading-none"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.25 }}
            >
              →
            </motion.span>
          )}
        </AnimatePresence>

        {isSending ? (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ borderTopColor: "var(--color-primary)" }}
          />
        ) : null}
      </span>

      <span className="text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            className="block font-cond text-[0.8rem] tracking-[0.12em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ color: isSent ? "var(--color-primary)" : "var(--color-foreground)" }}
          >
            {isSent ? "Message sent" : isSending ? "Sending…" : "Send message"}
          </motion.span>
        </AnimatePresence>
        <span className="block mt-1 text-muted-foreground text-[0.65rem] font-light normal-case tracking-normal">
          {isSent ? "Thanks — I'll get back to you soon." : "Typically replies within 24–48 hours"}
        </span>
      </span>
    </motion.button>
  );
}
