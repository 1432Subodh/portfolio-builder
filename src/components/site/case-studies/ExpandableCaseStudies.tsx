"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export type CaseStudy = {
  id: number;
  company: string;
  logo: string;
  description: string;
  testimonial: string;
  person: string;
  role: string;
  avatar: string;
  background: string;
};

const ACTIVE_WEIGHT = 11;
const SWIPE_GAP = 12;

const spring = (reduce: boolean) =>
  reduce
    ? { duration: 0.001 }
    : { type: "spring" as const, stiffness: 240, damping: 32, mass: 0.9 };

function LogoBadge({ item }: { item: CaseStudy }) {
  return (
    <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300">
      <Image
        src={item.logo}
        alt={`Logo of ${item.company}`}
        width={64}
        height={64}
        className="size-full object-contain invert p-2.5"
      />
    </span>
  );
}

function ActiveCaseStudy({
  item,
  reduced,
}: {
  item: CaseStudy;
  reduced: boolean;
}) {
  const avatarUrl = `https://i.pravatar.cc/300?u=${encodeURIComponent(
    item.avatar
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={
        reduced
          ? { duration: 0.001 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }
      }
      className="absolute inset-0 flex flex-col p-4"
    >
      <div className="flex items-center gap-3.5">
        <LogoBadge item={item} />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold tracking-tight text-white">
            {item.company}
          </p>
          <p className="truncate text-[12.5px] text-white/65">
            {item.description}
          </p>
        </div>
      </div>

      <blockquote className="mt-auto max-w-[530px] pt-10 text-[22px] font-medium leading-snug tracking-[-0.01em] text-white sm:text-[26px]">
        “{item.testimonial}”
      </blockquote>

      <div className="mt-7 flex items-center gap-3">
        <span className="size-10 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10">
          <Image
            src={avatarUrl}
            alt={`Avatar of ${item.person}`}
            width={40}
            height={40}
            className="size-full object-cover"
          />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-white">
            {item.person}
          </p>
          <p className="truncate text-[12px] text-white/60">{item.role}</p>
        </div>
      </div>

      <a
        href="#pricing"
        className="group mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[13px] font-semibold text-[#121214] transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-white"
      >
        Read the story
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

function CollapsedCaseStudy({ item }: { item: CaseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex flex-col items-center justify-start p-4"
    >
      <span className="flex max-h-16 items-center">
        <LogoBadge item={item} />
      </span>
      
    </motion.div>
  );
}

export default function ExpandableCaseStudies({
  items,
  defaultActive = 0,
}: {
  items: CaseStudy[];
  defaultActive?: number;
}) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const touchY = useRef<number | null>(null);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % items.length),
      3000
    );
    return () => clearInterval(id);
  }, [paused, reduce, items.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    const target = el?.children[activeIndex] as HTMLElement | undefined;
    if (el && target) {
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

  const goTo = (i: number) => {
    setActiveIndex(i);
    const el = scrollerRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) {
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.children.length === 0) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + SWIPE_GAP;
    const next = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(next, 0), items.length - 1));
  };

  const springT = spring(!!reduce);

  return (
    <div className="w-full">
      {/* Desktop / tablet — fluid accordion */}
      <div
        role="tablist"
        aria-label="Customer case studies"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="hidden h-[480px] gap-3 md:flex lg:h-[520px]"
      >
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={item.id}
              role="tab"
              tabIndex={0}
              aria-selected={isActive}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(i);
                }
              }}
              animate={{ flexGrow: isActive ? ACTIVE_WEIGHT : 1 }}
              transition={springT}
              className={`group relative basis-0 cursor-pointer overflow-hidden rounded-lg border transition-[filter,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-white ${
                isActive
                  ? "border-white/15"
                  : "border-white/[0.07] hover:border-white/20 hover:brightness-110"
              }`}
              style={{ background: item.background }}
            >
              <div className="pointer-events-none absolute inset-0">
                <AnimatePresence initial={false} mode="wait">
                  {isActive ? (
                    <ActiveCaseStudy
                      key="active"
                      item={item}
                      reduced={!!reduce}
                    />
                  ) : (
                    <CollapsedCaseStudy key="collapsed" item={item} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile — swipeable, one card at a time */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          onTouchStart={(e) => {
            setPaused(true);
            touchY.current = e.touches[0].clientY;
          }}
          onTouchEnd={() => setPaused(false)}
          onTouchMove={(e) => {
            if (touchY.current === null) return;
            const dy = Math.abs(e.touches[0].clientY - touchY.current);
            if (dy > 8) (e.target as HTMLElement).closest("[data-scroller]")?.scrollTo({ top: 0 });
          }}
          data-scroller
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative h-[440px] w-[85%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10"
              style={{ background: item.background }}
            >
              <ActiveCaseStudy item={item} reduced={!!reduce} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`View story ${i + 1}`}
              aria-current={i === activeIndex}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}