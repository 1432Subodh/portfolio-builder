"use client";

import {
  motion,
  useReducedMotion,
  type MotionProps,
  type Variants,
} from "motion/react";

const enter: Variants = {
  hidden: (custom: { y?: number; delay?: number }) => ({
    opacity: 0,
    y: custom.y ?? 32,
    transition: { duration: 0.05 },
  }),
  visible: (custom: { y?: number; delay?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: custom.delay ?? 0,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Reveal({
  children,
  delay = 0,
  y = 32,
  once = true,
  amount = 0.25,
  className,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  className?: string;
} & MotionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={enter}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      custom={{ y: reduce ? 0 : y, delay }}
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}