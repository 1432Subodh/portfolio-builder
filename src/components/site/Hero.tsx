"use client";

import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import ExpandableCaseStudies from "./case-studies/ExpandableCaseStudies";
import { caseStudies } from "./case-studies/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-x-clip pb-20 pt-32 lg:pb-20 lg:pt-30"
    >
      {/* faint technical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(var(--color-hairline-cool)_1px,transparent_1px),linear-gradient(90deg,var(--color-hairline-cool)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),transparent_75%)]"
      />

      <div className="mx-auto flex max-w-[860px] flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas-soft px-4 py-1.5 text-[13px] text-ink-mute"
        >
          <Sparkles className="size-3.5 text-primary" />
          Powered by the new AI Design Studio
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
            New
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-balance text-5xl font-medium leading-[1.1] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[72px]"
        >
          A portfolio that works
          <br className="hidden sm:block" /> as hard as you do
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-mute"
        >
          Launch a stunning, high-converting portfolio in minutes. AI drafts
          your layout, your domain connects in one click, and analytics show
          you exactly what hiring managers open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="#pricing"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-[14px] font-medium text-ink transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-primary sm:w-auto"
          >
            Start building — it&apos;s free
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#templates"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-md border border-hairline-strong bg-canvas-soft px-6 py-3 text-[14px] font-medium text-ink transition-colors duration-150 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-white sm:w-auto"
          >
            <Play className="size-4 text-primary transition-transform duration-300 group-hover:scale-110" />
            Watch the showreel
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <div className="flex -space-x-2">
            {["bg-ink", "bg-ink-mute", "bg-ink-mute-2", "bg-ink-2"].map(
              (g, i) => (
                <span
                  key={i}
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-[#121214] text-[10px] font-medium text-[#121214] ${g}`}
                >
                  {["AK", "MJ", "SR", "DL"][i]}
                </span>
              )
            )}
          </div>
          <div className="text-left">
            <div className="flex gap-0.5 text-ink" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current text-ink" />
              ))}
            </div>
            <p className="text-[13px] text-ink-mute">
              Loved by{" "}
              <span className="font-medium text-ink">42,000+</span> designers
              &amp; developers
            </p>
          </div>
        </motion.div>
      </div>

      {/* Expandable case-study carousel */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6 lg:px-8"
      >
        <ExpandableCaseStudies items={caseStudies} />
      </motion.div>
    </section>
  );
}