import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const CHARSET = "!<>-_\\/[]{}—=+*^?#________";

type TextScrambleProps = {
  defaultText: string;
  phrases: string[];
  className?: string;
  style?: CSSProperties;
  frameMs?: number;
  holdMs?: number;
};

function scrambleFrame(from: string, to: string, progress: number): string {
  const targetLen = Math.max(from.length, to.length);
  const paddedFrom = from.padEnd(targetLen);
  const paddedTo = to.padEnd(targetLen);
  let out = "";

  for (let i = 0; i < targetLen; i++) {
    const targetChar = paddedTo[i];
    if (targetChar === " ") {
      out += " ";
      continue;
    }
    if (i < progress) {
      out += targetChar;
    } else {
      out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
    }
  }

  return out.replace(/\s+$/, "");
}

export function TextScramble({
  defaultText,
  phrases,
  className,
  style,
  frameMs = 32,
  holdMs = 2400,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(defaultText);
  const displayRef = useRef(defaultText);
  const hoveredRef = useRef(false);
  const rafRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);
  const phraseIndexRef = useRef(0);

  const setDisplayBoth = (text: string) => {
    displayRef.current = text;
    setDisplay(text);
  };

  const cancelAnim = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timeoutRef.current);
  }, []);

  const runScramble = useCallback(
    (from: string, to: string, onDone: () => void) => {
      cancelAnimationFrame(rafRef.current);
      const maxLen = Math.max(from.length, to.length);
      const totalSteps = maxLen + 10;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(totalSteps, Math.floor((elapsed / frameMs) * 1.15));
        const frame = scrambleFrame(from, to, progress);
        setDisplayBoth(frame);

        if (progress < totalSteps) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayBoth(to);
          onDone();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [frameMs],
  );

  const scheduleNextPhrase = useCallback(() => {
    if (!hoveredRef.current || phrases.length === 0) return;

    const idx = phraseIndexRef.current % phrases.length;
    const next = phrases[idx];
    phraseIndexRef.current += 1;

    const from = displayRef.current;
    runScramble(from, next, () => {
      if (!hoveredRef.current) return;
      timeoutRef.current = setTimeout(scheduleNextPhrase, holdMs);
    });
  }, [phrases, holdMs, runScramble]);

  const handleEnter = () => {
    hoveredRef.current = true;
    phraseIndexRef.current = 0;
    cancelAnim();
    runScramble(displayRef.current, phrases[0] ?? defaultText, () => {
      if (!hoveredRef.current) return;
      phraseIndexRef.current = 1;
      timeoutRef.current = setTimeout(scheduleNextPhrase, holdMs);
    });
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    cancelAnim();
    const from = displayRef.current;
    runScramble(from, defaultText, () => {});
  };

  useEffect(() => () => cancelAnim(), [cancelAnim]);

  return (
    <span
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`inline-block cursor-default outline-none focus-visible:ring-1 focus-visible:ring-amber/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background ${className ?? ""}`}
      style={style}
    >
      <span className="sr-only">{defaultText}</span>
      <span aria-hidden className="inline-block">
        {display}
      </span>
    </span>
  );
}
