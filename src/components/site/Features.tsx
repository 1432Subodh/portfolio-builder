"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  Globe,
  Rocket,
  Search,
  Share2,
  Sparkles,
  Wand2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Typewriter from "./Typewriter";
import { Reveal } from "@/components/motion/Reveal";

/* -------- bento cell primitive — flat card, hairline, hover lift ----- */

function Cell({
  children,
  className = "",
  interactiveLabel,
  onHoverStart,
  onHoverEnd,
}: {
  children: React.ReactNode;
  className?: string;
  interactiveLabel?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`group relative flex flex-col rounded-lg border border-hairline bg-canvas-soft p-7 transition-colors duration-300 hover:border-hairline-strong ${className}`}
    >
      {interactiveLabel && (
        <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-mute transition-opacity duration-200 group-hover:text-primary">
          {interactiveLabel}
          <ArrowUpRight className="size-3.5" />
        </div>
      )}
      {children}
    </div>
  );
}

const logos = ["NORDWIND", "HELIX LABS", "CRITICAL MASS", "OBSIDIAN", "FERRO", "LUMA & CO", "VANTA"];

const floatingBars = [26, 40, 34, 55, 46, 70, 58, 84, 66, 92, 60, 78];

export default function Features() {
  const [analyticsHovered, setAnalyticsHovered] = useState(false);

  return (
    <section id="features" className="relative scroll-mt-24 py-14 sm:py-16 border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(62,207,142,0.08),transparent_70%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.06),transparent_65%)] blur-2xl"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Folioforge"
          title={
            <>
              Everything between you
              <br className="hidden sm:block" /> and a yes
            </>
          }
          description="Stop stitching together themes, hosts and trackers. One workspace that drafts, publishes and proves your work — beautifully."
        />

        {/* social proof strip */}
        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-hairline py-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              Teams from
            </span>
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-medium uppercase tracking-[0.12em] text-ink-mute-2 transition-colors duration-200 hover:text-ink"
              >
                {logo}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Bento grid */}
        <Reveal delay={0.15} className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(180px,1fr)]">
            {/* Featured cell — AI design studio */}
            <Cell
              className="sm:col-span-2 lg:row-span-2 lg:col-span-2"
              interactiveLabel="Try the studio"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex size-11 items-center justify-center rounded-md border border-hairline-strong bg-canvas-soft">
                  <Wand2 className="size-5 text-primary" />
                  <span className="absolute -right-0.5 -top-0.5 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-3 rounded-full bg-primary" />
                  </span>
                </span>
                <h3 className="text-xl font-medium text-ink">AI Design Studio</h3>
              </div>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-mute">
                Describe your craft and watch Folioforge generate a bespoke
                layout — color system, type scale and motion baked in. Refine
                it with natural language, not dials.
              </p>
              <ul className="mt-5 grid max-w-md gap-2.5 text-[13.5px] text-ink-mute">
                {[
                  "Generate from a text prompt or moodboard",
                  "Auto-suggest project copy and case-study titles",
                  "One-click re-theme that updates every page",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2.5">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                    {l}
                  </li>
                ))}
              </ul>
              {/* mini prompt bar */}
              <div className="mt-auto hidden items-center gap-2 border-t border-hairline pt-5 lg:flex">
                <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-md border border-hairline bg-canvas px-3 py-2.5">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  <Typewriter />
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  className="flex size-9 items-center justify-center rounded-md bg-primary text-ink transition-colors hover:bg-primary-deep"
                  aria-label="Generate with AI"
                >
                  <Rocket className="size-4" />
                </motion.button>
              </div>
            </Cell>

            {/* Custom domains */}
            <Cell className="lg:col-span-1">
              <span className="flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas text-ink-mute transition-colors duration-200 group-hover:border-primary/50 group-hover:text-primary">
                <Globe className="size-5" />
              </span>
              <h4 className="mt-4 text-[16px] font-medium text-ink">
                Custom domains
              </h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-mute">
                Connect{" "}
                <span className="font-medium text-ink">maya.design</span> in one
                click. SSL, DNSSEC and mail forwarding thrown in.
              </p>
              <p className="mt-auto pt-4 font-mono text-[11px] text-ink-faint">
                DNS · auto-configured
              </p>
            </Cell>

            {/* SEO tools */}
            <Cell className="lg:col-span-1">
              <span className="flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas text-ink-mute transition-colors duration-200 group-hover:border-primary/50 group-hover:text-primary">
                <Search className="size-5" />
              </span>
              <h4 className="mt-4 text-[16px] font-medium text-ink">
                On-page SEO
              </h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-mute">
                Meta, schema and sitemaps generated so Google surfaces your work,
                not your competition.
              </p>
              <p className="mt-auto pt-4 font-mono text-[11px] text-ink-faint">
                Lighthouse · 98+ median
              </p>
            </Cell>

            {/* Analytics */}
            <Cell
              className="lg:col-span-1"
              onHoverStart={() => setAnalyticsHovered(true)}
              onHoverEnd={() => setAnalyticsHovered(false)}
            >
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas text-ink-mute transition-colors duration-200 group-hover:border-primary/50 group-hover:text-primary">
                  <BarChart3 className="size-5" />
                </span>
                <span className="text-[11px] font-medium text-ink-faint">
                  Last 7 days
                </span>
              </div>
              <div className="mt-3 flex h-14 items-end gap-1.5">
                {floatingBars.map((h, i) => (
                  <motion.div
                    key={`${h}-${i}`}
                    animate={{
                      height: analyticsHovered ? `${h}%` : "18%",
                      opacity: analyticsHovered ? [0.5, 1] : 0.3,
                    }}
                    transition={
                      analyticsHovered
                        ? { duration: 2, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }
                        : { duration: 0.4, ease: "easeOut" }
                    }
                    className="w-full rounded-sm bg-white/20"
                  />
                ))}
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-mute">
                Know who opens, where they click, and what gets you replies.
              </p>
            </Cell>

            {/* Social integration */}
            <Cell className="lg:col-span-1">
              <div className="flex h-full items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-hairline bg-canvas text-ink-mute transition-colors duration-200 group-hover:border-primary/50 group-hover:text-primary">
                  <Share2 className="size-5" />
                </span>
                <div>
                  <h4 className="text-[16px] font-medium text-ink">
                    Cross-post anywhere
                  </h4>
                  <p className="mt-1 text-[13px] leading-snug text-ink-mute">
                    Push to Dribbble, Behance, LinkedIn and X — auto-formatted.
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