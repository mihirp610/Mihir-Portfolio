import { motion, useReducedMotion } from "framer-motion";
import { useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const EASE = [0.22, 0.65, 0.2, 1] as const;

type BaseProps = {
  label: string;
  hint?: string;
  index?: number;
};

export function AnimatedField({
  label,
  hint,
  index = 0,
  className,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <motion.div
      className={`relative pt-6 ${className ?? ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.75, delay: 0.08 + index * 0.1, ease: EASE }}
    >
      <motion.label
        htmlFor={id}
        className="absolute left-0 font-cond pointer-events-none origin-left"
        animate={{
          y: active ? -28 : 0,
          scale: active ? 0.82 : 1,
          color: focused ? "var(--color-primary)" : "var(--color-muted-foreground)",
        }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}
      >
        {label}
      </motion.label>

      <input
        id={id}
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className="w-full bg-transparent py-3.5 text-foreground text-[1.05rem] font-light tracking-wide focus:outline-none"
        style={{ letterSpacing: "0.03em" }}
      />

      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-border/50"
        style={{ width: "100%" }}
      />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : active ? 0.35 : 0 }}
        transition={{ duration: focused ? 0.45 : 0.6, ease: EASE }}
        style={{ width: "100%" }}
      />

      {hint ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: focused ? 1 : 0 }}
          className="mt-2 font-cond text-muted-foreground text-[0.6rem]"
        >
          {hint}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export function AnimatedTextarea({
  label,
  hint,
  index = 0,
  className,
  rows = 4,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <motion.div
      className={`relative pt-6 ${className ?? ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.75, delay: 0.08 + index * 0.1, ease: EASE }}
    >
      <motion.label
        htmlFor={id}
        className="absolute left-0 font-cond pointer-events-none origin-left"
        animate={{
          y: active ? -28 : 0,
          scale: active ? 0.82 : 1,
          color: focused ? "var(--color-primary)" : "var(--color-muted-foreground)",
        }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}
      >
        {label}
      </motion.label>

      <textarea
        id={id}
        rows={rows}
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className="w-full bg-transparent py-3.5 text-foreground text-[1.05rem] font-light tracking-wide focus:outline-none resize-none"
        style={{ letterSpacing: "0.03em" }}
      />

      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-border/50"
        style={{ width: "100%" }}
      />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : active ? 0.35 : 0 }}
        transition={{ duration: focused ? 0.45 : 0.6, ease: EASE }}
        style={{ width: "100%" }}
      />

      {hint ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: focused ? 1 : 0 }}
          className="mt-2 font-cond text-muted-foreground text-[0.6rem]"
        >
          {hint}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
