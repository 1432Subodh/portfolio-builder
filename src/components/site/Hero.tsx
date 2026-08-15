"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
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
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(var(--color-ink-faint)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-faint)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),transparent_80%)]"
      />
      {/* depth overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(62,207,142,0.08),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.06),transparent_65%)] blur-2xl"
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
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-on-primary">
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
          <Link
            href="/signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-[14px] font-medium text-on-primary transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-primary sm:w-auto"
          >
            Start building — it&apos;s free
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="#templates"
            className="group hidden min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md border border-hairline-strong bg-canvas-soft px-4 py-3 text-[13.5px] font-medium text-ink transition-colors duration-150 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-white sm:inline-flex sm:w-auto sm:flex-none sm:gap-2 sm:px-6 sm:text-[14px]"
          >
            <Play className="size-3.5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110 sm:size-4" />
            Watch the showreel
          </a>
        </motion.div>

       
      </div>

      {/* Expandable case-study carousel */}
      <div className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <ExpandableCaseStudies items={caseStudies} />
      </div>
    </section>
  );
}