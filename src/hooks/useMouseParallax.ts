"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Mouse-parallax hook. Attach `ref`/handlers to a container, then drive
 * layers with the returned `y` motion value (scaled by `strength`).
 */
export function useMouseParallax(strength = 14) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.6 });
  const y = useTransform(spring, (v) => (reduce ? 0 : (v / 100) * strength));

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    raw.set(e.clientY - rect.top - rect.height / 2);
  };

  const onMouseLeave = () => raw.set(0);

  return { ref, y, onMouseMove, onMouseLeave };
}