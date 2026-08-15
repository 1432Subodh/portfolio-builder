"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  yearly: number | null;
  cta: string;
  popular?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Free",
    tagline: "For your first page on the internet.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    features: ["1 published portfolio", "Profilio subdomain", "All core templates"],
  },
  {
    name: "Pro",
    tagline: "For serious candidates and careers.",
    monthly: 12,
    yearly: 9,
    cta: "Go Pro",
    features: ["Unlimited portfolios", "Custom domain + SSL", "AI Design Studio", "Full analytics & heatmaps"],
  },
  {
    name: "Studio",
    tagline: "For freelancers winning bigger briefs.",
    monthly: 24,
    yearly: 19,
    cta: "Start Studio",
    features: ["Everything in Pro", "Client proof links", "Brand kits & custom themes", "No Profilio badge"],
  },
  {
    name: "Team",
    tagline: "For studios shipping at scale.",
    monthly: 39,
    yearly: 29,
    cta: "Contact sales",
    popular: true,
    features: ["Everything in Studio", "5 team seats included", "Live co-editing", "SSO + audit logs"],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative scroll-mt-24 py-14 sm:py-16 border-b">
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(62,207,142,0.08),transparent_70%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.06),transparent_65%)] blur-2xl"
      /> */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple pricing, serious results
            </>
          }
          description="Start free, upgrade when your portfolio starts doing the talking. Prices in USD."
        />

        {/* billing toggle */}
        <Reveal delay={0.1} className="mt-10 flex items-center justify-center gap-3">
          <span
            className={`text-sm font-medium transition-colors ${!yearly ? "text-ink" : "text-ink-mute-2"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white ${yearly ? "bg-primary" : "border border-hairline-strong bg-canvas-soft"
              }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={`absolute top-0.5 size-6 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${yearly ? "left-[22px] bg-background" : "left-0.5 bg-ink border border-hairline-strong"
                }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${yearly ? "text-ink" : "text-ink-mute-2"}`}
          >
            Yearly
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-on-primary">
              2 months free
            </span>
          </span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-lg p-8 ${plan.popular
                  ? "border border-primary/30 bg-[#17171a] text-white shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                  : "border border-hairline bg-canvas-soft elev-1"
                  }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-canvas-night px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink elev-1">
                    <Sparkles className="size-3 text-primary" />
                    Most popular
                  </span>
                )}

                <h3 className={`text-lg font-medium ${plan.popular ? "text-white" : "text-ink"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-[13.5px] ${plan.popular ? "text-white/60" : "text-ink-mute"}`}>
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={`${plan.name}-${yearly}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`text-5xl font-medium tracking-[-0.03em] ${plan.popular ? "text-white" : "text-ink"}`}
                    >
                      ${plan.monthly === 0 ? "0" : yearly ? plan.yearly : plan.monthly}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-sm ${plan.popular ? "text-white/50" : "text-ink-mute"}`}>
                    {plan.monthly === 0 ? "forever" : "/mo"}
                  </span>
                </div>

                <a
                  href="#pricing"
                  onClick={(e) => e.preventDefault()}
                  className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[14px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-white ${plan.popular
                    ? "bg-primary text-on-primary hover:bg-primary-deep"
                    : "border border-hairline-strong bg-canvas-soft text-ink hover:bg-white/[0.05]"
                    }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-[13.5px] ${plan.popular ? "text-white/70" : "text-ink-mute"}`}>
                      <span
                        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${plan.popular ? "bg-primary text-on-primary" : "bg-canvas text-primary border border-primary/40"
                          }`}
                      >
                        <Check className="size-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-10 text-center">
          <p className="text-[13.5px] text-ink-mute">
            All plans include unlimited published pages and GDPR-ready hosting.{" "}
            <a href="#" className="font-medium text-ink underline underline-offset-4 hover:text-primary">
              See full comparison →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}