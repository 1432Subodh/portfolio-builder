"use client";

import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./testimonials/TestimonialCard";
import type { Testimonial } from "./testimonials/data";

const COLUMN_OFFSETS = [0, 32, 64, 32, 0];
const COLUMN_COUNT = COLUMN_OFFSETS.length;

type Origin =
  | "top-left"
  | "top"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const ORIGINS: Origin[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom-right",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

export default function TestimonialWall({
  items,
  limit = 15,
  gap = 5,
}: {
  items: Testimonial[];
  limit?: number;
  gap?: number;
}) {
  const [current, setCurrent] = useState(items.slice(0, limit));
  const [origin, setOrigin] = useState<Origin>("top-left");
  const [tick, setTick] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const refresh = () => {
      setCurrent(pickRandom(items, limit));
      setOrigin("top-left");
      setTick((t) => t + 1);
    };

    // Randomize immediately after mount to get unique subset
    refresh();

    timer.current = setInterval(() => {
      setCurrent(pickRandom(items, limit));
      setOrigin((prev) => {
        const idx = ORIGINS.indexOf(prev);
        return ORIGINS[(idx + 1) % ORIGINS.length];
      });
      setTick((t) => t + 1);
    }, 5500);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [items, limit]);

  const columns: Testimonial[][] = Array.from(
    { length: COLUMN_COUNT },
    () => [],
  );
  current.forEach((t, i) => columns[i % COLUMN_COUNT].push(t));

  /* Distance-based stagger: cards closest to the origin go first, and the
     ripple spreads outward like a butterfly (butterfly effect). */
  const maxRows = Math.max(...columns.map((c) => c.length)) - 1;
  const originCoords: Record<Origin, { x: number; y: number }> = {
    "top-left": { x: 0, y: 0 },
    top: { x: Math.floor((COLUMN_COUNT - 1) / 2), y: 0 },
    "top-right": { x: COLUMN_COUNT - 1, y: 0 },
    "bottom-left": { x: 0, y: maxRows },
    "bottom-right": { x: COLUMN_COUNT - 1, y: maxRows },
  };
  const o = originCoords[origin];
  const STAGGER = 15;

  return (
    <>
    <div className="relative">
      {/* glow emerging from behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.09),transparent_62%)] blur-3xl"
      />
      <div
        className="wall-fade-edges relative grid h-[510px] w-full grid-cols-2 items-start overflow-hidden md:grid-cols-3 lg:grid-cols-5"
        style={{ columnGap: gap }}
      >
        {columns.map((col, ci) => (
          <div
            key={ci}
            style={{ marginTop: COLUMN_OFFSETS[ci] }}
            className="flex flex-col gap-[5px]"
          >
            {col.map((t, ri) => {
              const distance = Math.abs(ci - o.x) + Math.abs(ri - o.y);
              const delay = distance * STAGGER;
              return (
                <div
                  key={`${tick}-${t.handle}-${ci}-${ri}`}
                  className="fx-rise"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <TestimonialCard {...t} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}