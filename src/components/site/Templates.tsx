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
  tint: string;
  meta: string;
  overlay: string;
  bars: string;
};

const filters = ["All", "Portfolio", "Studio", "Developer"] as const;

const templates: Template[] = [
  {
    name: "Aether",
    category: "Portfolio",
    author: "Studio preset",
    theme: "Editorial · light",
    tint: "from-sky-500/40 to-indigo-600/40",
    meta: "from-sky-400 to-indigo-600",
    overlay: "bg-sky-950",
    bars: "bg-sky-200",
  },
  {
    name: "Volt",
    category: "Studio",
    author: "Agency preset",
    theme: "Bold · dark",
    tint: "from-fuchsia-500/40 to-purple-600/40",
    meta: "from-fuchsia-400 to-purple-600",
    overlay: "bg-fuchsia-950",
    bars: "bg-fuchsia-200",
  },
  {
    name: "Signal",
    category: "Developer",
    author: "Dev preset",
    theme: "Terminal · dark",
    tint: "from-emerald-500/40 to-teal-600/40",
    meta: "from-emerald-400 to-teal-600",
    overlay: "bg-emerald-950",
    bars: "bg-emerald-200",
  },
  {
    name: "Papercut",
    category: "Portfolio",
    author: "Editorial preset",
    theme: "Warm · paper",
    tint: "from-amber-500/40 to-orange-600/40",
    meta: "from-amber-400 to-orange-600",
    overlay: "bg-amber-950",
    bars: "bg-amber-200",
  },
  {
    name: "Monolith",
    category: "Studio",
    author: "Brand preset",
    theme: "Minimal · monochrome",
    tint: "from-slate-400/40 to-indigo-500/40",
    meta: "from-slate-300 to-indigo-500",
    overlay: "bg-slate-900",
    bars: "bg-slate-200",
  },
  {
    name: "Drift",
    category: "Developer",
    author: "OSS preset",
    theme: "Mono · airy",
    tint: "from-cyan-500/40 to-blue-600/40",
    meta: "from-cyan-400 to-blue-600",
    overlay: "bg-cyan-950",
    bars: "bg-cyan-200",
  },
  {
    name: "Solstice",
    category: "Portfolio",
    author: "Creative preset",
    theme: "Gradient · dusk",
    tint: "from-rose-500/40 to-purple-600/40",
    meta: "from-rose-400 to-purple-600",
    overlay: "bg-rose-950",
    bars: "bg-rose-200",
  },
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
      {/* soft ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Templates"
            title={
              <>
                Pick a direction.
                <br />
                <span className="gradient-text">Make it yours.</span>
              </>
            }
            description="Seven studio-built templates, each with its own type system, spacing grammar and motion language."
          />
          <Reveal delay={0.1} className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll templates left"
              className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll templates right"
              className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
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
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                active === f
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.7)]"
                  : "border border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
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
              href="#cta"
              onClick={(e) => e.preventDefault()}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0e0e16] card-shadow transition-colors duration-300 hover:border-white/[0.16] sm:w-[440px] focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              {/* preview canvas */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${t.tint}`} />
                {/* fake template skeleton */}
                <div className="absolute inset-0 opacity-70 transition-transform duration-500 group-hover:scale-[1.03]">
                  <div className={`absolute left-10 top-8 h-9 w-40 rounded-lg bg-white/20 backdrop-blur-sm ${t.bars}`}>
                    <div className="h-full w-2/3 rounded-lg bg-black/20" />
                  </div>
                  {/* nav dots */}
                  <div className="absolute right-10 top-8 flex gap-1.5">
                    {[0, 1, 2].map((n) => (
                      <span
                        key={n}
                        className={`size-1.5 rounded-full ${n === 0 ? "opacity-100" : "opacity-40"} bg-white/70`}
                      />
                    ))}
                  </div>
                  {/* hero text block */}
                  <div className="absolute left-10 top-[42%] space-y-2.5">
                    <div className="h-3.5 w-40 rounded-full bg-white/90" />
                    <div className="h-3 w-52 rounded-full bg-white/50" />
                    <div className="h-3 w-44 rounded-full bg-white/30" />
                  </div>
                  {/* thumbnail grid */}
                  <div className="absolute bottom-8 left-10 grid w-[68%] grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((c) => (
                      <span
                        key={c}
                        className={`aspect-[3/4] rounded-md ${c % 2 === 0 ? "bg-white/70" : "bg-white/35"}`}
                      />
                    ))}
                  </div>
                  {/* floating meta pill */}
                  <div className={`absolute -right-2 bottom-8 rounded-xl border border-white/10 bg-[#0b0b12]/85 px-4 py-3 backdrop-blur-xl`}>
                    <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${t.meta}`} />
                    <div className="mt-1.5 h-1.5 w-10 rounded-full bg-white/25" />
                    <div className="mt-3 flex gap-1">
                      {[0, 1, 2].map((n) => (
                        <span key={n} className={`size-4 rounded-full ${["bg-rose-400", "bg-amber-400", "bg-indigo-400"][n]}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* gradient overlay */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${t.overlay}/70 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-10`} />
              </div>

              {/* meta row */}
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-[17px] font-semibold text-white">{t.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-white/45">
                    {t.theme} · {t.author}
                  </p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </motion.a>
          ))}

          {/* tail CTA card */}
          <motion.a
            href="#cta"
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filtered.length * 0.05 + 0.1, duration: 0.5 }}
            className="group flex w-[78vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-white/15 bg-white/[0.02] text-center transition-colors duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/[0.06] sm:w-[440px]"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_16px_40px_-10px_rgba(139,92,246,0.8)] transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="size-6" />
            </span>
            <p className="px-6 text-lg font-semibold text-white">
              Browse all 120+ templates
            </p>
            <p className="px-6 text-sm text-white/50">Free until your first publish. No card required.</p>
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}