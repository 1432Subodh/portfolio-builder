"use client";

import { useEffect, useState } from "react";

const LINES = [
  "I'm a product designer. Bold, editorial, lots of whitespace.",
  "I'm a motion designer. Playful, punchy, always in motion.",
  "I'm an illustrator. Warm, textured, story-driven work.",
  "I'm a brand strategist. Sharp, minimal, no filler.",
];

export default function Typewriter() {
  const [lineIdx, setLineIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = LINES[lineIdx];

    if (!deleting && chars < current.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 38);
      return () => clearTimeout(t);
    }

    if (!deleting && chars === current.length) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }

    if (deleting && chars > 0) {
      const t = setTimeout(() => setChars((c) => c - 1), 16);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDeleting(false);
      setLineIdx((i) => (i + 1) % LINES.length);
    }, 300);
    return () => clearTimeout(t);
  }, [chars, deleting, lineIdx]);

  return (
    <span className="flex items-center gap-1 font-mono text-[12px] text-ink-mute">
      <span className="min-w-0">
        &quot;{LINES[lineIdx].slice(0, chars)}
        <span
          aria-hidden
          className="inline-block h-[14px] w-[2px] translate-y-[2px] animate-pulse bg-primary"
        />
        &quot;
      </span>
    </span>
  );
}