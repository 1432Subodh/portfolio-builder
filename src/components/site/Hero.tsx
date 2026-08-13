"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  Eye,
  MousePointerClick,
  Play,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

function Orb({ className }: { className: string }) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -26, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

/* Mini browser-chrome preview: bar of the mock editor + avatar strip */
function PreviewCard({
  rotate,
  className,
  delay = 0,
}: {
  rotate: number;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute hidden w-56 rounded-2xl border border-white/10 bg-[#12121b]/90 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl md:block ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <span className="ml-1 h-1.5 w-24 rounded-full bg-white/10" />
        <span className="ml-auto size-2 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-indigo-400/70 to-purple-400/70" />
        <div className="h-2 w-1/2 rounded-full bg-white/15" />
        <div className="h-2 w-2/3 rounded-full bg-white/10" />
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30 text-[8px] font-semibold text-white/70">
            UI
          </div>
          <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/25 to-fuchsia-600/25 text-[8px] font-semibold text-white/70">
            BR
          </div>
          <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/35 to-blue-600/30 text-[8px] font-semibold text-white/70">
            FD
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  /* Mouse parallax -> two layers */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22 });
  const sy = useSpring(my, { stiffness: 90, damping: 22 });
  const layerA = useTransform(sx, (v) => (reduce ? 0 : v * 0.02));
  const layerB = useTransform(sy, (v) => (reduce ? 0 : v * 0.012));

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative isolate overflow-x-clip pt-36 pb-24 lg:pt-44 lg:pb-32"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Orb className="-top-24 -left-24 size-[30rem] bg-indigo-600/24" />
        <Orb className="top-20 right-[-8rem] size-[26rem] bg-purple-600/20" />
        <Orb className="bottom-[-6rem] left-1/3 size-[22rem] bg-violet-500/12" />
        {/* faint grid + noise */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(99,102,241,0.14),transparent)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        {/* Left — copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-white/70 backdrop-blur"
          >
            <Sparkles className="size-3.5 text-indigo-300" />
            Powered by the new AI Design Studio
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              New
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[72px] lg:leading-[1.04]"
          >
            A portfolio that
            <br />
            <span className="gradient-text">works as hard</span>
            <br /> as you do
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/55 lg:mx-0"
          >
            Launch a stunning, high-converting portfolio in minutes. AI drafts
            your layout, your domain connects in one click, and analytics show
            you exactly what hiring managers open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#cta"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.9)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:w-auto"
            >
              Start building — it&apos;s free
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#templates"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-white/80 backdrop-blur transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-indigo-400 sm:w-auto"
            >
              <Play className="size-4 text-indigo-300 transition-transform duration-300 group-hover:scale-110" />
              Watch the showreel
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <div className="flex -space-x-2.5">
              {["from-indigo-400 to-indigo-600", "from-purple-400 to-purple-600", "from-fuchsia-400 to-fuchsia-600", "from-indigo-300 to-purple-500"].map(
                (g, i) => (
                  <span
                    key={i}
                    className={`flex size-8 items-center justify-center rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br text-[10px] font-semibold text-white ${g}`}
                  >
                    {["AK", "MJ", "SR", "DL"][i]}
                  </span>
                )
              )}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-amber-400" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[13px] text-white/50">
                Loved by <span className="font-medium text-white/80">42,000+</span> designers &amp; developers
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — mockup */}
        <div className="relative hidden h-[540px] items-center justify-center md:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ translateY: layerA }}
            className="relative w-full max-w-[520px] rounded-3xl border border-white/10 bg-[#0d0d16]/90 p-3 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {/* Fake browser frame */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a11]">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-[#ff5f57]/70" />
                  <span className="size-3 rounded-full bg-[#febc2e]/70" />
                  <span className="size-3 rounded-full bg-[#28c840]/70" />
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] text-white/40">
                  <span className="size-3 rounded-sm bg-gradient-to-br from-indigo-500 to-purple-600" />
                  maya-chen.design
                </div>
                <div className="flex items-center gap-1.5 text-white/30">
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Fake hero inside mockup */}
              <div className="relative overflow-hidden px-7 pb-6 pt-8">
                <div className="pointer-events-none absolute -right-10 -top-16 size-44 rounded-full bg-indigo-500/25 blur-3xl" />
                <div className="flex items-center gap-4">
                  <span className="size-14 rounded-2xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-600 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)]" />
                  <div className="space-y-1.5">
                    <div className="h-2 w-32 rounded-full bg-white/70" />
                    <div className="h-2 w-20 rounded-full bg-white/25" />
                    <div className="h-2 w-16 rounded-full bg-white/15" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-[1.1fr_1fr] gap-5">
                  <div className="space-y-2.5">
                    <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300" />
                    <div className="h-2 w-11/12 rounded-full bg-white/20" />
                    <div className="h-2 w-3/4 rounded-full bg-white/20" />
                    <div className="h-2 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30"
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-[10px] font-semibold text-white">
                    View case studies
                  </span>
                  <span className="rounded-md border border-white/10 px-3 py-1.5 text-[10px] text-white/50">
                    Get in touch
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating analytics card */}
          <motion.div
            style={{ translateY: layerB }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-3 top-8 z-10 w-48 rounded-2xl border border-white/10 bg-[#12121b]/90 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-white/60">
                Portfolio views
              </p>
              <MousePointerClick className="size-3.5 text-indigo-300" />
            </div>
            <p className="mt-1 text-2xl font-semibold text-white">16,482</p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              <TrendingUp className="size-3" /> +38% this week
            </p>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[30, 46, 38, 58, 70, 52, 88, 64, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-sm bg-gradient-to-t from-indigo-500/40 to-indigo-300/80"
                />
              ))}
            </div>
          </motion.div>

          {/* Floating AI badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-2 top-40 z-10 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#12121b]/90 p-3 pr-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Sparkles className="size-4 text-white" />
            </span>
            <span>
              <span className="block text-[12px] font-semibold text-white">
                AI moodboard ready
              </span>
              <span className="block text-[11px] text-white/50">
                Drafted in 4.2 seconds
              </span>
            </span>
          </motion.div>

          {/* Floating "viewers now" pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-4 left-10 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#12121b]/90 py-2 pl-3 pr-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <span className="relative flex size-6 items-center justify-center rounded-full bg-emerald-400/15">
              <Eye className="size-3 text-emerald-300" />
              <span className="absolute right-0 top-0 size-1.5 animate-ping rounded-full bg-emerald-400" />
            </span>
            <span className="flex -space-x-1.5">
              {["from-indigo-400 to-purple-500", "from-purple-400 to-fuchsia-500", "from-indigo-300 to-purple-400"].map(
                (g, i) => (
                  <span
                    key={i}
                    className={`flex size-5 items-center justify-center rounded-full border border-[#12121b] bg-gradient-to-br text-[7px] font-semibold text-white ${g}`}
                  >
                    {["MV", "JT", "RK"][i]}
                  </span>
                )
              )}
            </span>
            <span className="text-[11px] text-white/60">
              <span className="font-medium text-white">3 recruiters</span> viewing now
            </span>
          </motion.div>

          {/* Small detached preview card silhouette left */}
          <PreviewCard
            rotate={-6}
            delay={0.7}
            className="-left-16 bottom-24"
          />
          <PreviewCard
            rotate={5}
            delay={0.85}
            className="-right-10 bottom-2"
          />
        </div>
      </div>
    </section>
  );
}