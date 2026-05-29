import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AnimatedField, AnimatedTextarea } from "./AnimatedField";
import { AnimatedSubmit } from "./AnimatedSubmit";

const EASE = [0.22, 0.65, 0.2, 1] as const;

type FormStatus = "idle" | "sending" | "sent";

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), reduceMotion ? 200 : 900);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="space-y-2">
        <div className="grid sm:grid-cols-2 sm:gap-x-10">
          <AnimatedField
            label="Your name"
            name="name"
            type="text"
            required
            autoComplete="name"
            index={0}
          />
          <AnimatedField
            label="Email address"
            name="email"
            type="email"
            required
            autoComplete="email"
            index={1}
            hint="We'll only use this to reply."
          />
        </div>
        <AnimatedTextarea
          label="Your message"
          name="message"
          required
          rows={5}
          index={2}
          hint="Role type, timeline, or project scope — whatever helps."
        />
      </div>

      <AnimatedSubmit status={status} disabled={status === "sent"} />

      <motion.p
        role="status"
        aria-live="polite"
        className="sr-only"
        animate={{ opacity: status === "sent" ? 1 : 0 }}
      >
        {status === "sent" ? "Form submitted successfully." : ""}
      </motion.p>
    </motion.form>
  );
}
