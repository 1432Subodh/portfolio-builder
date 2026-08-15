"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Download,
  GraduationCap,
  Palette,
  Rocket,
  Terminal,
  Wand2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const SWAP_MS = 5000;

type Variant = "editorial" | "terminal" | "steps" | "stats" | "members";

const solutions = [
  {
    id: "designers",
    variant: "editorial" as Variant,
    icon: Palette,
    label: "Designers",
    index: "01",
    headline: "Portfolios that lead with craft",
    blurb:
      "Editorial layouts, big imagery and type pairings tuned to make your visual taste impossible to ignore.",
    points: [
      "Case-study blocks with before & after",
      "Auto-sync from Dribbble and Behance",
    ],
    cta: "Browse designer templates",
  },
  {
    id: "developers",
    variant: "terminal" as Variant,
    icon: Terminal,
    label: "Developers",
    index: "02",
    headline: "Ship a portfolio like you ship code",
    blurb:
      "Markdown-driven projects, live code samples and a headless API — your portfolio is a repo-friendly citizen.",
    points: [
      "GitHub auto-import for repositories",
      "Syntax-highlighted code blocks",
    ],
    cta: "Explore developer features",
  },
  {
    id: "students",
    variant: "steps" as Variant,
    icon: GraduationCap,
    label: "Students",
    index: "03",
    headline: "Prove potential, not just GPA",
    blurb:
      "Turn classwork into case studies in minutes with guided prompts — and stay free until you graduate.",
    points: [
      "Resume-to-site single import",
      "Guided project-writing prompts",
    ],
    cta: "Start for students",
  },
  {
    id: "freelancers",
    variant: "stats" as Variant,
    icon: Briefcase,
    label: "Freelancers",
    index: "04",
    headline: "Win the brief before the call",
    blurb:
      "A portfolio that doubles as a sales asset — proof links, services and testimonials that quietly close deals.",
    points: [
      "Client-proof share links with expiry",
      "Testimonial collection built in",
    ],
    cta: "Get client-ready",
  },
  {
    id: "studios",
    variant: "members" as Variant,
    icon: Building2,
    label: "Studios",
    index: "05",
    headline: "One brand, dozens of voices",
    blurb:
      "Give every teammate a portfolio on shared brand rails — themes, domains and CMS control in one place.",
    points: [
      "Multi-member portfolios",
      "Shared brand kits and themes",
    ],
    cta: "Talk to sales",
  },
];

function EditorialLayout({ active }: { active: (typeof solutions)[number] }) {
  return (
    <div className="grid min-h-0 flex-1 gap-4 sm:grid-cols-[1.15fr_1fr] lg:gap-5">
      {/* left — big typographic block */}
      <div className="flex min-h-0 flex-col justify-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
          Editorial · 04:05
        </p>
        <h3 className="mt-2 text-[22px] font-medium leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
          {active.headline}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute [line-clamp:3]">
          {active.blurb}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {active.points.map((p) => (
            <span
              key={p}
              className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11px] text-ink-mute"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* right — bento preview grid */}
      <div className="grid min-h-0 grid-cols-2 gap-2 sm:h-full">
        <div className="col-span-2 flex h-20 items-end rounded-md border border-hairline bg-canvas p-3 sm:h-[40%]">
          <div className="space-y-1.5">
            <div className="h-2 w-24 rounded-full bg-white/60" />
            <div className="h-1.5 w-16 rounded-full bg-hairline-strong" />
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-md border border-hairline bg-canvas p-2.5">
          <div className="h-1.5 w-8 rounded-full bg-white/40" />
          <div className="h-8 rounded-sm border border-hairline bg-canvas-night" />
        </div>
        <div className="flex flex-col justify-between rounded-md border border-hairline bg-canvas p-2.5">
          <div className="h-1.5 w-8 rounded-full bg-white/40" />
          <div className="h-8 rounded-sm border border-primary/40 bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

function TerminalLayout({ active }: { active: (typeof solutions)[number] }) {
  return (
    <div className="grid min-h-0 flex-1 gap-4 sm:grid-cols-2 lg:gap-5">
      {/* left — checklist */}
      <div className="flex min-h-0 flex-col justify-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
          Developer · 02:01
        </p>
        <h3 className="mt-2 text-[22px] font-medium leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
          {active.headline}
        </h3>
        <ul className="mt-4 grid gap-2">
          {active.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 text-[12.5px] text-ink-mute"
            >
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Check className="size-2.5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* right — terminal fills full height */}
      <div className="flex min-h-0 flex-col overflow-hidden rounded-md border border-hairline bg-canvas-night">
        <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-1.5">
          <span className="size-2 rounded-full bg-ink-mute-2" />
          <span className="size-2 rounded-full bg-ink-mute-2" />
          <span className="size-2 rounded-full bg-ink-mute-2" />
          <span className="ml-2 font-mono text-[10px] text-ink-faint">
            zsh — 80×24
          </span>
        </div>
        <pre className="flex-1 overflow-hidden p-3 font-mono text-[11px] leading-5 text-ink-mute">
          <span className="text-primary">➜</span> <span className="text-ink">portfolio</span>
          {"\n"}
          <span className="text-primary">$</span> import from github{"\n"}
          <span className="text-ink-mute-2">✓ synced 24 repos · 12s</span>
          {"\n"}
          <span className="text-primary">$</span> build markdown{"\n"}
          <span className="text-ink-mute-2">✓ compiled in 0.8s</span>
          {"\n"}
          <span className="text-primary">$</span> deploy --prod{"\n"}
          <span className="text-primary">✓</span>{" "}
          <span className="text-ink">https://you.port.folio live</span>
        </pre>
      </div>
    </div>
  );
}

function StepsLayout({ active }: { active: (typeof solutions)[number] }) {
  const steps = [
    { icon: Download, title: "Import resume", text: "One PDF in, portfolio out." },
    { icon: Wand2, title: "AI drafts sections", text: "Guided prompts shape your story." },
    { icon: Rocket, title: "Publish & share", text: "Go live and apply with a link." },
  ];
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
        Student · 03:01
      </p>
      <h3 className="mt-2 text-[22px] font-medium leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
        {active.headline}
      </h3>
      <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-ink-mute [line-clamp:2]">
        {active.blurb}
      </p>

      {/* horizontal flow */}
      <div className="mt-auto grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="relative flex flex-col rounded-md border border-hairline bg-canvas p-3.5 sm:p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-ink-faint">
                  0{i + 1}
                </span>
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 text-[13px] font-medium text-ink sm:mt-3 sm:block">
                {s.title}
              </p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-mute sm:mt-1">
                {s.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatsLayout({ active }: { active: (typeof solutions)[number] }) {
  return (
    <div className="grid min-h-0 flex-1 gap-4 sm:grid-cols-[1.1fr_1fr] lg:gap-5">
      {/* left — big stats */}
      <div className="flex min-h-0 flex-col justify-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
          Freelancer · 03:04
        </p>
        <h3 className="mt-2 text-[22px] font-medium leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
          {active.headline}
        </h3>
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[
            ["38%", "more inbound"],
            ["2.4×", "reply rate"],
            ["9 days", "faster close"],
          ].map(([val, label]) => (
            <div
              key={label}
              className="rounded-md border border-hairline bg-canvas p-3 text-center"
            >
              <p className="text-xl font-medium tracking-tight text-primary">
                {val}
              </p>
              <p className="mt-0.5 text-[10.5px] text-ink-mute">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {active.points.map((p) => (
            <span
              key={p}
              className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11px] text-ink-mute"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* right — testimonial fills height */}
      <div className="flex min-h-0 flex-col rounded-md border border-hairline bg-canvas p-4">
        <span className="flex size-7 items-center justify-center rounded-full border border-hairline-strong bg-canvas-soft text-[10px] font-medium text-ink">
          KR
        </span>
        <p className="mt-3 text-[13px] leading-relaxed text-ink">
          “The share link alone booked me three briefs this month. It feels
          like having a sales team.”
        </p>
        <p className="mt-auto pt-3 text-[11.5px] text-ink-mute">
          Katya R., UX freelancer
        </p>
      </div>
    </div>
  );
}

function MembersLayout({ active }: { active: (typeof solutions)[number] }) {
  const members = ["MK", "AR", "SL", "JP", "TW", "DE"];
  return (
    <div className="grid min-h-0 flex-1 gap-4 sm:grid-cols-2 lg:gap-5">
      {/* left — headline + brand bar */}
      <div className="flex min-h-0 flex-col">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">
          Studio · 01:05
        </p>
        <h3 className="mt-2 text-[22px] font-medium leading-[1.18] tracking-[-0.02em] text-ink sm:text-[24px]">
          {active.headline}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute [line-clamp:3]">
          {active.blurb}
        </p>
        <div className="mt-auto rounded-md border border-hairline bg-canvas-night p-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-sm bg-primary" />
            <span className="h-1.5 w-20 rounded-full bg-white/50" />
            <span className="ml-auto size-1.5 rounded-full bg-hairline-strong" />
          </div>
          <p className="mt-2 font-mono text-[10px] text-ink-faint">
            brand.folio/studio — 6/6 synced
          </p>
        </div>
      </div>

      {/* right — team grid fills height */}
      <div className="grid min-h-0 grid-cols-3 grid-rows-2 gap-2">
        {members.map((m, i) => (
          <div
            key={m}
            className="flex flex-col items-center justify-center gap-1.5 rounded-md border border-hairline bg-canvas p-2"
          >
            <span
              className={`flex size-8 items-center justify-center rounded-full border border-hairline-strong bg-canvas-soft text-[10px] font-medium text-ink ${i % 2 ? "border-primary/50 text-primary" : ""}`}
            >
              {m}
            </span>
            <div className="h-1 w-10 rounded-full bg-hairline" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Solutions() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tablistRef = useRef<HTMLDivElement>(null);

  /* keep the active tab in view on the mobile icon row */
  useEffect(() => {
    const list = tablistRef.current;
    const active = list?.children[index] as HTMLElement | undefined;
    if (!list || !active) return;
    list.scrollTo({
      left: active.offsetLeft - 24,
      behavior: "smooth",
    });
  }, [index]);

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
    <section
      id="solutions"
      className="relative scroll-mt-24 py-14 sm:py-16 border-b"
    >
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
          className="mt-14 flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left — selector */}
          <div className="lg:col-span-5">
            <Reveal>
              {/* Desktop — single vertical list */}
              <div role="tablist" aria-label="Solutions" className="hidden flex-col gap-1 md:flex">
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
                      className={`group flex items-center gap-4 rounded-md border px-4 py-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white ${isActive
                        ? "border-hairline bg-canvas-soft elev-1"
                        : "border-transparent hover:bg-white/[0.03]"
                        }`}
                    >
                      <span className="font-mono text-[13px] text-ink-faint">
                        {s.index}
                      </span>
                      <span
                        className={`flex size-9 items-center justify-center rounded-md border transition-colors duration-200 ${isActive
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

              {/* Mobile — duplicated row for infinite scroll */}
              <div ref={tablistRef} role="tablist" aria-label="Solutions" className="flex gap-2 overflow-x-auto no-scrollbar md:hidden">
                {Array.from({ length: 3 }).flatMap((_, r) =>
                  solutions.map((s, i) => {
                    const isActive = i === index;
                    const Icon = s.icon;
                    return (
                      <button
                        key={`${r}-${s.id}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`sol-panel-${s.id}`}
                        onClick={() => {
                          setPaused(true);
                          setIndex(i);
                        }}
                        className={`group flex shrink-0 flex-col items-center justify-center gap-2 rounded-md border px-4 py-2.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white ${isActive
                          ? "border-hairline bg-canvas-soft elev-1"
                          : "border-transparent hover:bg-white/[0.03]"
                          }`}
                      >
                        <span
                          className={`flex size-10 items-center justify-center rounded-md border transition-colors duration-200 ${isActive
                            ? "border-primary/60 bg-primary/10 text-primary"
                            : "border-hairline-strong bg-canvas text-ink-mute"
                            }`}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="text-[11px] font-medium text-ink">
                          {s.label}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </Reveal>
          </div>

          {/* Right — active panel, same card design across all tabs */}
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
                    className="relative flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-hairline bg-canvas-soft p-5 elev-2 sm:p-6 lg:h-[380px] lg:min-h-0"
                  >
                    {/* identity row */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
                          <ActiveIcon className="size-4.5" />
                        </span>
                        <span className="font-mono text-[11px] text-ink-faint">
                          0{index + 1} · {active.label}
                        </span>
                      </span>
                      <p className="flex items-center gap-2 text-[11px] text-ink-faint">
                        <span className={`size-1.5 rounded-full ${paused ? "bg-hairline-strong" : "animate-pulse bg-primary"}`} aria-hidden />
                        {paused ? "Paused" : `Auto-rotating in ${SWAP_MS / 1000}s`}
                      </p>
                    </div>

                    {/* per-solution layout — owns the whole card body */}
                    <div key={`body-${active.id}`} className="mt-4 flex min-h-0 flex-1 flex-col">
                      {active.variant === "editorial" && (
                        <EditorialLayout active={active} />
                      )}
                      {active.variant === "terminal" && (
                        <TerminalLayout active={active} />
                      )}
                      {active.variant === "steps" && <StepsLayout active={active} />}
                      {active.variant === "stats" && <StatsLayout active={active} />}
                      {active.variant === "members" && (
                        <MembersLayout active={active} />
                      )}
                    </div>

                    <a
                      href="#pricing"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector("#pricing")
                          ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                      }}
                      className="group/cta mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13px] font-medium text-on-primary transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-white"
                    >
                      {active.cta}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </a>
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