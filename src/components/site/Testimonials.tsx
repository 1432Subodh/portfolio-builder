"use client";

import { motion, useReducedMotion } from "motion/react";
import { Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  accent: string;
  border: string;
  tall?: boolean;
};

const items: Testimonial[] = [
  {
    quote:
      "I had zero web skills and a demo-ready interview in 3 days. Folioforge wrote my project descriptions better than I could. The recruiter literally opened it on my phone screen.",
    name: "Maya Chen",
    role: "Product Designer · Vercel",
    avatar: "MC",
    accent: "from-indigo-400 to-indigo-600",
    border: "border-l-indigo-500",
  },
  {
    quote:
      "The analytics alone are worth it. I can see exactly which case study gets opened — pure gold for tailoring my pitch per interview.",
    name: "Jordan Teo",
    role: "Frontend Engineer · Linear",
    avatar: "JT",
    accent: "from-purple-400 to-purple-600",
    border: "border-l-purple-500",
    tall: true,
  },
  {
    quote:
      "Tried every builder. This is the first one that doesn't make my work look template-y. It honestly looks more polished than most agency sites.",
    name: "Sana Rathore",
    role: "Brand Designer · Freelance",
    avatar: "SR",
    accent: "from-fuchsia-400 to-fuchsia-600",
    border: "border-l-fuchsia-500",
  },
  {
    quote:
      "Published my portfolio at 11pm, domain was live and indexed by morning. Support replied in four minutes.",
    name: "Diego Luna",
    role: "Data Scientist · Reforge",
    avatar: "DL",
    accent: "from-emerald-400 to-teal-500",
    border: "border-l-emerald-500",
  },
  {
    quote:
      "AI Design Studio nailed the editorial vibe I kept failing to build in CSS for years. Shipped in an afternoon instead of a month.",
    name: "Priya Nair",
    role: "UX Engineer · Stripe",
    avatar: "PN",
    accent: "from-amber-400 to-orange-500",
    border: "border-l-amber-500",
    tall: true,
  },
  {
    quote:
      "Our whole design team migrated. Co-editing a portfolio live in Figma-meets-Notion was the clincher.",
    name: "Tomás Vidal",
    role: "Design Lead · NORDWIND",
    avatar: "TV",
    accent: "from-sky-400 to-blue-500",
    border: "border-l-sky-500",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 size-[420px] rounded-full bg-fuchsia-600/10 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Wall of love"
          title={
            <>
              The people who got <span className="gradient-text">the call</span>
            </>
          }
          description="42,000+ builders trust Folioforge to put their work — and themselves — in front of the right people."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 3) * 0.08}
              y={26}
              amount={0.15}
              className="h-full"
            >
              <motion.figure
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex h-full flex-col rounded-2xl border border-white/[0.07] border-l-[3px] ${t.border} bg-[#0e0e16] p-7 card-shadow transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(99,102,241,0.5)]`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-current" />
                    ))}
                  </span>
                  <span className={`rounded-xl bg-gradient-to-br ${t.accent} p-2 text-white/90 transition-transform duration-300 group-hover:scale-110`}>
                    <Quote className="size-3.5" />
                  </span>
                </div>

                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span
                    className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${t.accent} text-[12px] font-semibold text-white`}
                  >
                    {t.avatar}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {t.name}
                    </span>
                    <span className="block text-[12.5px] text-white/45">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}