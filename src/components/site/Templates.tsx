"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Template = {
  name: string;
  category: string;
  author: string;
  theme: string;
  dots: string;
};

const filters = ["All", "Portfolio", "Studio", "Developer"] as const;

const templates: Template[] = [
  { name: "Aether", category: "Portfolio", author: "Studio preset", theme: "Editorial · light", dots: "bg-ink/70" },
  { name: "Volt", category: "Studio", author: "Agency preset", theme: "Bold · dark", dots: "bg-ink" },
  { name: "Signal", category: "Developer", author: "Dev preset", theme: "Terminal · dark", dots: "bg-primary" },
  { name: "Papercut", category: "Portfolio", author: "Editorial preset", theme: "Warm · paper", dots: "bg-ink-mute" },
  { name: "Monolith", category: "Studio", author: "Brand preset", theme: "Minimal · monochrome", dots: "bg-ink" },
  { name: "Drift", category: "Developer", author: "OSS preset", theme: "Mono · airy", dots: "bg-primary-deep" },
  { name: "Solstice", category: "Portfolio", author: "Creative preset", theme: "Gradient · dusk", dots: "bg-ink-2" },
];

export default function Templates() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered =
    active === "All" ? templates : templates.filter((t) => t.category === active);

  const scroll = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section id="templates" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(62,207,142,0.08),transparent_70%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.06),transparent_65%)] blur-2xl"
      />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Templates"
            title={
              <>
                Pick a direction.
                <br />
                Make it yours.
              </>
            }
            description="Seven studio-built templates, each with its own type system, spacing grammar and motion language."
          />
          <Reveal delay={0.1} className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll templates left"
              className="flex size-10 items-center justify-center rounded-md border border-hairline-strong bg-canvas-soft text-ink-mute transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll templates right"
              className="flex size-10 items-center justify-center rounded-md border border-hairline-strong bg-canvas-soft text-ink-mute transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </Reveal>
        </div>

        {/* filter pills */}
        <Reveal delay={0.12} className="mt-9 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white ${
                active === f
                  ? "border-primary bg-primary text-[#121214]"
                  : "border-hairline-strong bg-canvas-soft text-ink-mute hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>
      </div>

      {/* carousel rail */}
      <Reveal delay={0.2} className="mt-10">
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {filtered.map((t, i) => (
            <motion.a
              key={t.name}
              href="#pricing"
              onClick={(e) => e.preventDefault()}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-lg border border-hairline bg-canvas-soft transition-colors duration-200 hover:border-hairline-strong hover:elev-1 sm:w-[440px] focus-visible:outline-2 focus-visible:outline-white"
            >
              {/* preview canvas — monochrome skeleton */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-hairline bg-canvas-night">
                <div className="absolute inset-0 p-7 transition-transform duration-500 group-hover:scale-[1.02]">
                  {/* header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-3 rounded-sm border border-hairline-strong bg-canvas-soft" />
                      <span className="h-2 w-14 rounded-full bg-white/60" />
                    </div>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((n) => (
                        <span key={n} className={`size-1.5 rounded-full ${n === 0 ? "bg-white/70" : "bg-hairline-strong"}`} />
                      ))}
                    </div>
                  </div>
                  {/* hero text block */}
                  <div className="mt-8 space-y-2">
                    <div className="h-3 w-44 rounded-full bg-white/60" />
                    <div className="h-2 w-56 rounded-full bg-hairline-strong" />
                    <div className="h-2 w-48 rounded-full bg-hairline-strong" />
                  </div>
                  {/* thumbnail grid */}
                  <div className="mt-6 grid w-[62%] grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((c) => (
                      <span
                        key={c}
                        className={`aspect-[3/4] rounded-sm ${c % 2 === 0 ? "border border-hairline-strong bg-canvas" : "border border-hairline bg-canvas"}`}
                      />
                    ))}
                  </div>
                  {/* floating meta card */}
                  <div className="absolute -right-3 bottom-7 rounded-md border border-hairline bg-canvas-soft px-4 py-3 elev-2">
                    <div className="h-2 w-16 rounded-full bg-white/60" />
                    <div className="mt-1.5 h-1.5 w-10 rounded-full bg-hairline-strong" />
                    <div className="mt-2.5 flex gap-1">
                      <span className={`size-3 rounded-full ${t.dots}`} />
                      <span className="size-3 rounded-full bg-hairline-strong" />
                      <span className="size-3 rounded-full bg-hairline-strong" />
                    </div>
                  </div>
                </div>
              </div>

              {/* meta row */}
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-[17px] font-medium text-ink">{t.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-ink-mute">
                    {t.theme} · {t.author}
                  </p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-md border border-hairline-strong text-ink-mute transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </motion.a>
          ))}

          {/* tail CTA card */}
          <motion.a
            href="#pricing"
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filtered.length * 0.05 + 0.1, duration: 0.5 }}
            className="group flex w-[78vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-hairline-strong bg-canvas-soft text-center transition-colors duration-200 hover:border-primary hover:bg-canvas sm:w-[440px]"
          >
            <span className="flex size-12 items-center justify-center rounded-md border border-hairline-strong bg-canvas-soft text-ink transition-colors duration-200 group-hover:border-primary group-hover:text-primary">
              <ArrowRight className="size-5" />
            </span>
            <p className="px-6 text-lg font-medium text-ink">
              Browse all 120+ templates
            </p>
            <p className="px-6 text-sm text-ink-mute">
              Free until your first publish. No card required.
            </p>
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}