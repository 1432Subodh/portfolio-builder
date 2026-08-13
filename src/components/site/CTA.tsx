"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const floaters = [
  { cls: "left-[8%] top-[18%] size-3 bg-indigo-400", dur: 5.5 },
  { cls: "left-[16%] bottom-[22%] size-2 bg-fuchsia-400", dur: 6.5 },
  { cls: "right-[12%] top-[24%] size-4 bg-purple-400", dur: 7 },
  { cls: "right-[22%] bottom-[18%] size-2.5 bg-emerald-400", dur: 5 },
];

export default function CTA() {
  const reduce = useReducedMotion();
  return (
    <section id="cta" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 p-10 text-center sm:p-16 lg:p-20">
          {/* animated gradient bg */}
          <motion.div
            aria-hidden
            animate={
              reduce
                ? undefined
                : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -z-10 bg-[length:220%_220%] bg-[linear-gradient(120deg,#312e81,#4c1d95,#6d28d9,#4c1d95,#312e81)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:22px_22px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.12),transparent)]"
          />

          {/* floating shapes */}
          {floaters.map((f, i) => (
            <motion.span
              key={i}
              aria-hidden
              animate={reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut" }}
              className={`pointer-events-none absolute hidden rounded-full ${f.cls} lg:block`}
            />
          ))}

          <motion.span
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/20 backdrop-blur"
          >
            <Sparkles className="size-6" />
          </motion.span>

          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.03em] text-white sm:text-6xl">
            Your next role is already reading
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/70">
            Every day you wait is a day your work stays invisible. Publish a
            portfolio that sells you while you sleep — free to start.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-indigo-700 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)] focus-visible:outline-2 focus-visible:outline-white sm:w-auto"
            >
              Build my portfolio free
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#templates"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition-colors duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white sm:w-auto"
            >
              Browse templates
            </a>
          </div>

          <p className="mt-6 text-[13px] text-white/55">
            No credit card · 2-minute setup · Cancel anytime
          </p>
        </div>
      </Reveal>
    </section>
  );
}