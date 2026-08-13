"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Download, PenLine, Rocket, Wand2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: Wand2,
    n: "01",
    title: "Tell us about you",
    body: "Drop your resume, Dribbble or a moodboard — or type a sentence. Our AI drafts your portfolio structure and picks a complementary layout.",
    points: ["Smart import from LinkedIn, Behance & X", "Personality-first questionnaire (2 min)"],
    accent: "from-indigo-400 to-indigo-600",
  },
  {
    icon: PenLine,
    n: "02",
    title: "Shape every detail",
    body: "Swap sections, drag blocks and edit copy at the block level. Your entire site rebuilds live — no code, no context switches.",
    points: ["240+ craft-built blocks", "Global themes update in one click"],
    accent: "from-purple-400 to-purple-600",
  },
  {
    icon: Download,
    n: "03",
    title: "Connect & publish",
    body: "Bind your custom domain, one-click deploy, and push updates from any device. SEO, sitemap and social previews handled for you.",
    points: ["Zero-downtime deploys", "SSL + DNSSEC included"],
    accent: "from-fuchsia-400 to-purple-600",
  },
  {
    icon: Rocket,
    n: "04",
    title: "Prove with analytics",
    body: "See views, sources and clicks the moment recruiters land. Iterate with confidence and turn visits into conversations.",
    points: ["Real-time view portal", "Weekly email digest"],
    accent: "from-emerald-400 to-teal-600",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  const flip = useTransform(scrollYProgress, [0, 0.5, 1], [0, 12, 24]);

  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[420px] rounded-full bg-indigo-600/10 blur-[120px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Live in <span className="gradient-text">under five minutes</span>
            </>
          }
          description="Four steps between you and a portfolio that ships itself."
        />

        <div ref={trackRef} className="relative mx-auto mt-16 max-w-5xl">
          {/* center line (desktop) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/[0.07] lg:block"
          >
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-400"
            />
          </div>
          {/* mobile line */}
          <div
            aria-hidden
            className="absolute left-[22px] top-0 h-full w-px bg-white/[0.07] lg:hidden"
          >
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-400"
            />
          </div>

          <div className="space-y-10 lg:space-y-16">
            {steps.map((step, i) => {
              const leftSide = i % 2 === 0;
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative lg:grid lg:grid-cols-2 lg:items-center">
                  {/* node */}
                  <motion.span
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-[22px] top-2 z-10 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_32px_-6px_rgba(139,92,246,0.8)] lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                  >
                    <Icon className="size-5" />
                  </motion.span>

                  {/* card */}
                  <Reveal
                    delay={0.05}
                    className={leftSide ? "lg:col-start-1 lg:pr-16" : "lg:col-start-2 lg:pl-16"}
                  >
                    <div
                      className={`ml-14 rounded-2xl border border-white/[0.07] bg-[#0e0e16] p-6 card-shadow sm:p-7 lg:ml-0`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl font-semibold tracking-tight text-white/25">
                          {step.n}
                        </span>
                        <span className={`h-px flex-1 bg-gradient-to-r ${step.accent} opacity-50`} />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-white/55">
                        {step.body}
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {step.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-[13px] text-white/50">
                            <span className={`size-1.5 rounded-full bg-gradient-to-r ${step.accent}`} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

        {/* center hint gauge */}
        <Reveal delay={0.1} className="mt-14 hidden justify-center lg:flex">
          <button
            type="button"
            onClick={() => document.querySelector("#hero")?.scrollIntoView()}
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[13px] font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
          >
            Start step one — it&apos;s free
            <motion.span style={{ x: flip }} className="text-indigo-300">
              →
            </motion.span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}