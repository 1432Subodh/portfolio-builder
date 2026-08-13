"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Palette,
  Terminal,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const solutions = [
  {
    id: "designers",
    icon: Palette,
    label: "Designers",
    index: "01",
    headline: "Portfolios that lead with craft",
    blurb:
      "Editorial layouts, big imagery and type pairings tuned to make your visual taste impossible to ignore.",
    points: [
      "Case-study blocks with before & after",
      "Cinematic image grids and video embeds",
      "Custom type and spacing systems",
      "Auto-sync from Dribbble and Behance",
    ],
    cta: "Browse designer templates",
  },
  {
    id: "developers",
    icon: Terminal,
    label: "Developers",
    index: "02",
    headline: "Ship a portfolio like you ship code",
    blurb:
      "Markdown-driven projects, live code samples and a headless API — your portfolio is a repo-friendly citizen.",
    points: [
      "GitHub auto-import for repositories",
      "Syntax-highlighted code blocks",
      "Deploy times shown right in the page",
      "Headless API for your own tooling",
    ],
    cta: "Explore developer features",
  },
  {
    id: "students",
    icon: GraduationCap,
    label: "Students",
    index: "03",
    headline: "Prove potential, not just GPA",
    blurb:
      "Turn classwork into case studies in minutes with guided prompts — and stay free until you graduate.",
    points: [
      "Resume-to-site single import",
      "Guided project-writing prompts",
      "Built-in portfolio course",
      "Free forever with a .edu address",
    ],
    cta: "Start for students",
  },
  {
    id: "freelancers",
    icon: Briefcase,
    label: "Freelancers",
    index: "04",
    headline: "Win the brief before the call",
    blurb:
      "A portfolio that doubles as a sales asset — proof links, services and testimonials that quietly close deals.",
    points: [
      "Client-proof share links with expiry",
      "Testimonial collection built in",
      "Services and pricing pages",
      "Follow-up alerts on new views",
    ],
    cta: "Get client-ready",
  },
  {
    id: "studios",
    icon: Building2,
    label: "Studios",
    index: "05",
    headline: "One brand, dozens of voices",
    blurb:
      "Give every teammate a portfolio on shared brand rails — themes, domains and CMS control in one place.",
    points: [
      "Multi-member portfolios",
      "Shared brand kits and themes",
      "CMS that powers 50+ sites",
      "Bulk custom domains and SSO",
    ],
    cta: "Talk to sales",
  },
];

const SWAP_MS = 5000;

export default function Solutions() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % solutions.length),
      SWAP_MS
    );
    return () => clearInterval(id);
  }, [reduce, paused]);

  const active = solutions[index];
  const ActiveIcon = active.icon;

  return (
    <section id="solutions" className="relative scroll-mt-24 py-24 sm:py-28">
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
          eyebrow="Solutions"
          title={
            <>
              Built for how you actually work
            </>
          }
          description="Five ways in. Pick your seat — the toolkit adapts to your craft, not the other way around."
        />

        <div
          className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left — selector */}
          <div className="lg:col-span-5">
            <Reveal>
              <div role="tablist" aria-label="Solutions" className="flex flex-col gap-1">
                {solutions.map((s, i) => {
                  const isActive = i === index;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      id={`sol-tab-${s.id}`}
                      aria-selected={isActive}
                      aria-controls={`sol-panel-${s.id}`}
                      onClick={() => {
                        setPaused(true);
                        setIndex(i);
                      }}
                      className={`group flex items-center gap-4 rounded-md border border-transparent px-4 py-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white ${
                        isActive
                          ? "border-hairline bg-canvas-soft elev-1"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="font-mono text-[13px] text-ink-faint">
                        {s.index}
                      </span>
                      <span
                        className={`flex size-9 items-center justify-center rounded-md border transition-colors duration-200 ${
                          isActive
                            ? "border-primary/60 bg-primary/10 text-primary"
                            : "border-hairline-strong bg-canvas text-ink-mute"
                        }`}
                      >
                        <Icon className="size-4.5" />
                      </span>
                      <span className="flex-1 text-[15px] font-medium text-ink">
                        {s.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="sol-active-dot"
                          className="size-2 rounded-full bg-primary"
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right — active panel */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1} className="h-full">
              <div className="relative h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    role="tabpanel"
                    id={`sol-panel-${active.id}`}
                    aria-labelledby={`sol-tab-${active.id}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-hairline bg-canvas-soft p-8 elev-2 sm:p-10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
                        <ActiveIcon className="size-6" />
                      </span>
                      <span className="rounded-full border border-hairline bg-canvas px-3 py-1 text-[11px] font-medium text-ink-mute">
                        {active.label} · 0{index + 1}/0{solutions.length}
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-md text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-ink">
                      {active.headline}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-mute">
                      {active.blurb}
                    </p>

                    <ul className="mt-7 grid max-w-md gap-3 sm:grid-cols-2">
                      {active.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 text-[13.5px] text-ink-mute"
                        >
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                            <Check className="size-3" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
                      <a
                        href="#pricing"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .querySelector("#pricing")
                            ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                        }}
                        className="group inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-[13px] font-medium text-[#121214] transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-white"
                      >
                        {active.cta}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                      <p className="flex items-center gap-2 text-[11.5px] text-ink-faint">
                        <span className={`size-1.5 rounded-full ${paused ? "bg-hairline-strong" : "animate-pulse bg-primary"}`} aria-hidden />
                        {paused ? "Paused — your move" : `Auto-rotating in ${SWAP_MS / 1000}s`}
                      </p>
                    </div>

                    {/* mini site preview mock */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-2 hidden w-56 rotate-6 rounded-md border border-hairline bg-canvas-night p-4 elev-3 xl:block"
                    >
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-sm bg-primary" />
                        <span className="h-1.5 w-14 rounded-full bg-white/50" />
                        <span className="ml-auto size-1.5 rounded-full bg-hairline-strong" />
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="h-2 w-32 rounded-full bg-white/45" />
                        <div className="h-1.5 w-24 rounded-full bg-hairline-strong" />
                        <div className="h-1.5 w-20 rounded-full bg-hairline" />
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-1.5">
                        {[0, 1, 2].map((c) => (
                          <span
                            key={c}
                            className={`aspect-[3/4] rounded-sm ${c === index % 3 ? "border border-primary/50 bg-primary/15" : "border border-hairline-strong bg-canvas"}`}
                          />
                        ))}
                      </div>
                      <div className="mt-3 flex gap-1">
                        <span className="size-2 rounded-full bg-primary" />
                        <span className="size-2 rounded-full bg-hairline-strong" />
                        <span className="size-2 rounded-full bg-hairline-strong" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}