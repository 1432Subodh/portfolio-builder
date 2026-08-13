"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Globe,
  Rocket,
  Search,
  Send,
  Share2,
  Sparkles,
  Wand2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/* -------- bento cell primitive with hover lift + gradient wash -------- */

function Cell({
  children,
  className = "",
  gradient = "from-indigo-500/15 to-purple-600/15",
  interactiveLabel,
  onMouseEnter,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  interactiveLabel?: string;
  onMouseEnter?: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0e0e16] card-shadow transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(99,102,241,0.45)] ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="pointer-events-none absolute inset-px rounded-[23px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_40%)]" />
      {interactiveLabel && (
        <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/60 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          {interactiveLabel}
          <ArrowUpRight className="size-3.5" />
        </div>
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

const logos = ["NORDWIND", "HELIX LABS", "CRITICAL MASS", "OBSIDIAN", "FERRO", "LUMA & CO", "VANTA"];

const floatingBars = [26, 40, 34, 55, 46, 70, 58, 84, 66, 92, 60, 78];

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Folioforge"
          title={
            <>
              Everything between you
              <br className="hidden sm:block" /> and{" "}
              <span className="gradient-text">a yes</span>
            </>
          }
          description="Stop stitching together themes, hosts and trackers. One workspace that drafts, publishes and proves your work — beautifully."
        />

        {/* social proof strip */}
        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">
              Teams from
            </span>
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-semibold uppercase tracking-[0.12em] text-white/25 transition-colors duration-300 hover:text-white/60"
              >
                {logo}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Bento grid */}
        <Reveal delay={0.15} className="mt-14">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(180px,1fr)]">
            {/* Featured cell — AI design studio */}
            <Cell
              className="sm:col-span-2 lg:row-span-2 lg:col-span-2"
              gradient="from-indigo-500/[0.22] via-transparent to-purple-600/[0.2]"
              interactiveLabel="Try the studio"
            >
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <span className="relative flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_12px_32px_-8px_rgba(139,92,246,0.7)]">
                    <Wand2 className="size-5 text-white" />
                    <span className="absolute -right-0.5 -top-0.5 flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
                    </span>
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    AI Design Studio
                  </h3>
                </div>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
                  Describe your craft and watch Folioforge generate a bespoke
                  layout — color system, type scale and motion baked in. Refine
                  it with natural language, not dials.
                </p>
                <ul className="mt-5 grid max-w-md gap-2.5 text-[13.5px] text-white/70">
                  {[
                    "Generate from a text prompt or moodboard",
                    "Auto-suggest project copy and case-study titles",
                    "One-click re-theme that updates every page",
                  ].map((l) => (
                    <li key={l} className="flex items-start gap-2.5">
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-indigo-300" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              {/* mini AI prompt animation */}
              <div className="mt-auto hidden items-center gap-3 border-t border-white/[0.06] px-8 py-5 lg:flex">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5">
                  <span className="size-1.5 rounded-full bg-emerald-400/80" />
                  <span className="truncate text-[12.5px] text-white/70">
                    &quot;I&apos;m a product designer. Bold, editorial, lots of whitespace.&quot;
                  </span>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_8px_24px_-6px_rgba(139,92,246,0.7)]"
                  aria-label="Generate with AI"
                >
                  <Rocket className="size-4.5" />
                </motion.button>
                </div>
            </Cell>

            {/* Custom domains */}
            <Cell
              className="lg:col-span-1"
              gradient="from-blue-500/[0.16] to-cyan-500/[0.1]"
              interactiveLabel="Connect"
            >
              <div className="flex h-full flex-col p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/25 to-cyan-500/25 text-blue-300 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Globe className="size-5" />
                </span>
                <h4 className="mt-4 text-[16px] font-semibold text-white">
                  Custom domains
                </h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">
                  Connect <span className="text-white/80">maya.design</span> in
                  one click. SSL, DNSSEC and mail forwarding thrown in.
                </p>
                <p className="mt-auto pt-4 font-mono text-[11px] text-white/35">
                  DNS · auto-configured
                </p>
              </div>
            </Cell>

            {/* SEO tools */}
            <Cell
              className="lg:col-span-1"
              gradient="from-emerald-500/[0.14] to-teal-500/[0.1]"
              interactiveLabel="Rank higher"
            >
              <div className="flex h-full flex-col p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-500/25 text-emerald-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Search className="size-5" />
                </span>
                <h4 className="mt-4 text-[16px] font-semibold text-white">
                  On-page SEO
                </h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">
                  Meta, schema and sitemaps generated so Google surfaces your
                  work, not your competition.
                </p>
                <p className="mt-auto pt-4 font-mono text-[11px] text-white/35">
                  Lighthouse · 98+ median
                </p>
              </div>
            </Cell>

            {/* Analytics */}
            <Cell
              className="lg:col-span-1"
              gradient="from-purple-500/[0.16] to-fuchsia-500/[0.1]"
              interactiveLabel="Explore"
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/25 to-fuchsia-500/25 text-purple-300 transition-transform duration-300 group-hover:scale-110">
                    <BarChart3 className="size-5" />
                  </span>
                  <span className="text-[11px] font-medium text-white/45">
                    Last 7 days
                  </span>
                </div>
                <div className="mt-3 flex h-14 items-end gap-1.5">
                  {floatingBars.map((h, i) => (
                    <motion.div
                      key={`${h}-${i}`}
                      animate={{ height: `${h}%`, opacity: [0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                      className="w-full rounded-sm bg-gradient-to-t from-purple-500/40 to-fuchsia-400/80"
                    />
                  ))}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/50">
                  Know who opens, where they click, and what gets you replies.
                </p>
              </div>
            </Cell>

            {/* Social integration */}
            <Cell
              className="lg:col-span-1"
              gradient="from-pink-500/[0.14] to-rose-500/[0.1]"
            >
              <div className="flex h-full items-center gap-4 p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-rose-500/25 text-pink-300 transition-transform duration-300 group-hover:scale-110">
                  <Share2 className="size-5" />
                </span>
                <div>
                  <h4 className="text-[16px] font-semibold text-white">
                    Cross-post anywhere
                  </h4>
                  <p className="mt-1 text-[13px] leading-snug text-white/50">
                    Push to Dribbble, Behance, LinkedIn and X — auto-formatted.
                  </p>
                </div>
              </div>
            </Cell>

            {/* Export */}
            <Cell
              className="lg:col-span-1"
              gradient="from-amber-500/[0.14] to-orange-500/[0.1]"
            >
              <div className="flex h-full items-center gap-4 p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/25 to-orange-500/25 text-amber-300 transition-transform duration-300 group-hover:scale-110">
                  <Send className="size-5" />
                </span>
                <div>
                  <h4 className="text-[16px] font-semibold text-white">
                    Export anything
                  </h4>
                  <p className="mt-1 text-[13px] leading-snug text-white/50">
                    React, PDFs and clean HTML — your work, on your terms.
                  </p>
                </div>
              </div>
            </Cell>
          </div>
        </Reveal>
      </div>
    </section>
  );
}