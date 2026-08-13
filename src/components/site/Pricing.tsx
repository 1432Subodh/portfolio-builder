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
    name: "Starter",
    tagline: "For your first page on the internet.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    features: [
      "1 published portfolio",
      "Folioforge subdomain",
      "All core templates",
      "1 GB storage",
      "Folioforge badge",
    ],
  },
  {
    name: "Pro",
    tagline: "For serious candidates and careers.",
    monthly: 12,
    yearly: 9,
    cta: "Go Pro",
    popular: true,
    features: [
      "Unlimited portfolios",
      "Custom domain + SSL",
      "AI Design Studio",
      "Full analytics & heatmaps",
      "Export to React / PDF",
      "Priority support",
    ],
  },
  {
    name: "Team",
    tagline: "For studios shipping at scale.",
    monthly: 39,
    yearly: 29,
    cta: "Contact sales",
    features: [
      "Everything in Pro",
      "5 team seats included",
      "Live co-editing",
      "Brand kits & shared themes",
      "SSO + audit logs",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple pricing, <span className="gradient-text">serious results</span>
            </>
          }
          description="Start free, upgrade when your portfolio starts doing the talking. Prices in USD."
        />

        {/* billing toggle */}
        <Reveal delay={0.1} className="mt-10 flex items-center justify-center gap-3">
          <span
            className={`text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-white/40"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className={`relative h-8 w-14 rounded-full border border-white/10 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-indigo-400 ${
              yearly ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-white/10"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={`absolute top-1 size-6 rounded-full bg-white shadow-lg ${yearly ? "left-7" : "left-1"}`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${yearly ? "text-white" : "text-white/40"}`}
          >
            Yearly
            <span className="ml-2 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              2 months free
            </span>
          </span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[24px] p-8 ${
                  plan.popular
                    ? "border border-transparent bg-[#0e0e16] shadow-[0_0_60px_-16px_rgba(139,92,246,0.55)] [background:linear-gradient(#0e0e16,#0e0e16)_padding-box,linear-gradient(140deg,#6366f1,#8b5cf6)_border-box] lg:-my-3 lg:py-11"
                    : "border border-white/[0.08] bg-[#0e0e16] card-shadow"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-[0_8px_24px_-6px_rgba(139,92,246,0.8)]">
                    <Sparkles className="size-3" />
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-[13.5px] text-white/45">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={`${plan.name}-${yearly}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-5xl font-semibold tracking-[-0.03em] text-white"
                    >
                      ${plan.monthly === 0 ? "0" : yearly ? plan.yearly : plan.monthly}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-white/40">
                    {plan.monthly === 0 ? "forever" : "/mo"}
                  </span>
                </div>
                {plan.monthly !== 0 && (
                  <p className="mt-1 text-[12.5px] text-white/40">
                    {yearly ? "billed yearly" : "billed monthly"}
                  </p>
                )}

                <a
                  href="#cta"
                  onClick={(e) => e.preventDefault()}
                  className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-[0_0_36px_-8px_rgba(139,92,246,0.9)] hover:brightness-110"
                      : "border border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/65">
                      <span
                        className={`mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                            : "bg-white/10 text-indigo-300"
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

        <Reveal delay={0.15} className="mt-10 text-center">
          <p className="text-[13.5px] text-white/40">
            All plans include unlimited published pages and GDPR-ready hosting.{" "}
            <a href="#" className="font-medium text-indigo-300 hover:text-indigo-200">
              See full comparison →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}