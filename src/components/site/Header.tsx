"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Globe,
  LayoutTemplate,
  LineChart,
  Menu,
  MessageSquare,
  Palmtree,
  Plus,
  Rss,
  Sparkles,
  Users,
  X,
} from "lucide-react";

type OpenMenu = "product" | "resources" | null;

type DropdownItemDef = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  tag?: string;
};

/* ------------------------------------------------------------------ */
/* Product mega-menu                                                   */
/* ------------------------------------------------------------------ */

const productItems: DropdownItemDef[] = [
  {
    title: "Portfolio Templates",
    desc: "100+ studio-grade designs, tuned by AI",
    icon: LayoutTemplate,
    href: "#templates",
  },
  {
    title: "Domain Connect",
    desc: "Bring your own domain, SSL included",
    icon: Globe,
    href: "#",
  },
  {
    title: "Analytics Dashboard",
    desc: "Know every view, click and referral",
    icon: LineChart,
    href: "#",
  },
  {
    title: "Team Collaboration",
    desc: "Invite your crew to co-build live",
    icon: Users,
    href: "#",
  },
];

/* Featured product card */
const featuredProduct = {
  title: "AI Design Studio",
  desc: "Describe your vibe and Folioforge drafts an entire portfolio — layout, type scale and motion included.",
  href: "#",
};

const resourcesItems: DropdownItemDef[] = [
  {
    title: "Documentation",
    desc: "Guides, API and headless export",
    icon: BookOpen,
    href: "#",
  },
  {
    title: "Tutorials",
    desc: "Step-by-step video walkthroughs",
    icon: Plus,
    href: "#",
  },
  {
    title: "Blog",
    desc: "Career, craft and design systems",
    icon: Rss,
    href: "#",
  },
  {
    title: "Community",
    desc: "Join 40k+ builders on Discord",
    icon: MessageSquare,
    href: "#",
  },
];

const featuredArticle = {
  tag: "Featured",
  title: "The 2026 portfolio teardown: what recruiters actually read",
  minute: "9 min read",
  href: "#",
};

const navItems: (
  | { label: string; type: "dropdown"; key: OpenMenu }
  | { label: string; type: "link"; href: string }
)[] = [
  { label: "Product", type: "dropdown", key: "product" },
  { label: "Solutions", type: "link", href: "#solutions" },
  { label: "Resources", type: "dropdown", key: "resources" },
  { label: "Pricing", type: "link", href: "#pricing" },
];

/* Dropdown container style — glass panel */
const panelCls =
  "absolute left-1/2 top-[calc(100%+14px)] -translate-x-1/2 w-[min(680px,calc(100vw-32px))] origin-top rounded-2xl border border-white/10 bg-[#0c0c14]/90 p-3 backdrop-blur-2xl shadow-[0_24px_80px_-16px_rgba(0,0,0,0.85)]";

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inline-flex"
    >
      <ChevronDown className="size-3.5" />
    </motion.span>
  );
}

function DropdownItem({ item, index, onNavigate }: {
  item: DropdownItemDef;
  index: number;
  onNavigate: (href: string) => void;
}) {
  const Icon = item.icon;
  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.href);
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-white/[0.06] hover:shadow-[0_0_32px_-10px_rgba(99,102,241,0.35)] focus-visible:outline-2 focus-visible:outline-indigo-400"
    >
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          {item.title}
          {item.tag && (
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              {item.tag}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-white/50">
          {item.desc}
        </span>
      </span>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [open, setOpen] = useState<OpenMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("scroll", close, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("scroll", close);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const navigate = (href: string) => {
    setOpen(null);
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  const transition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setOpen(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0a0f]/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("#hero");
          }}
          className="focus-visible:outline-2 focus-visible:outline-indigo-400"
          aria-label="Folioforge home"
        >
          <span className="group relative inline-flex items-center gap-2">
            <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 transition-shadow duration-300 group-hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.7)]">
              <Sparkles className="size-4 text-white" />
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent,45%,rgba(255,255,255,0.55),55%,transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-white">
              Folio<span className="gradient-text">forge</span>
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden items-center gap-1 lg:flex"
          onMouseEnter={() => setOpen((prev) => prev)}
        >
          {navItems.map((item) =>
            item.type === "dropdown" ? (
              <div
                key={item.key}
                onMouseEnter={() => setOpen(item.key)}
                className="relative"
              >
                <button
                  type="button"
                  aria-expanded={open === item.key}
                  aria-controls={`menu-${item.key}`}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
                >
                  {item.label}
                  <Chevron open={open === item.key} />
                </button>

                <AnimatePresence>
                  {open === item.key && (
                    <motion.div
                      id={`menu-${item.key}`}
                      role="dialog"
                      aria-label={`${item.label} menu`}
                      initial={{ opacity: 0, y: -14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={transition}
                      className={panelCls}
                    >
                      {item.key === "product" ? (
                        <div className="grid grid-cols-2 gap-1">
                          {/* Featured */}
                          <motion.a
                            href={featuredProduct.href}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("#features");
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative col-span-2 overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/[0.14] via-transparent to-purple-500/[0.14] p-4 transition-colors duration-300 hover:border-indigo-400/30 hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.5)]"
                          >
                            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-purple-500/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                              <Sparkles className="size-3.5" />
                              Featured
                            </p>
                            <p className="mt-2 text-base font-semibold text-white">
                              {featuredProduct.title}
                            </p>
                            <p className="mt-1 max-w-md text-[13px] leading-relaxed text-white/55">
                              {featuredProduct.desc}
                            </p>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-indigo-300 transition-colors duration-200 group-hover:text-indigo-200">
                              See it in action
                              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                            </p>
                          </motion.a>

                          {productItems.map((it, i) => (
                            <DropdownItem
                              key={it.title}
                              item={it}
                              index={i}
                              onNavigate={navigate}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-[1.15fr_1fr] gap-1">
                          <div className="flex flex-col">
                            {resourcesItems.map((it, i) => (
                              <DropdownItem
                                key={it.title}
                                item={it}
                                index={i}
                                onNavigate={navigate}
                              />
                            ))}
                          </div>
                          {/* Featured article */}
                          <motion.a
                            href={featuredArticle.href}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("#how-it-works");
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/[0.18] to-purple-600/[0.18] p-5 transition-all duration-300 hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.55)]"
                          >
                            <div className="pointer-events-none absolute inset-0 opacity-0 [background:linear-gradient(0deg,transparent,rgba(255,255,255,0.06))] transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="w-fit rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                              {featuredArticle.tag}
                            </span>
                            <p className="mt-4 text-[15px] font-medium leading-snug text-white">
                              {featuredArticle.title}
                            </p>
                            <span className="mt-3 flex items-center gap-2 text-xs text-white/45">
                              <Palmtree className="size-3.5" />
                              {featuredArticle.minute}
                              <span className="ml-auto inline-flex items-center gap-1 text-indigo-300 transition-colors group-hover:text-indigo-200">
                                Read
                                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                              </span>
                            </span>
                          </motion.a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href ?? "#");
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("#pricing");
            }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-400"
          >
            Sign In
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("#cta");
            }}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.8)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-indigo-400"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          aria-controls={`menu-${menuId}`}
          className="inline-flex size-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/5 hover:text-white lg:hidden focus-visible:outline-2 focus-visible:outline-indigo-400"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={`menu-${menuId}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-b border-white/[0.06] bg-[#0a0a0f]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.key}>
                    <button
                      type="button"
                      onClick={() => navigate(`#${item.key === "product" ? "features" : "how-it-works"}`)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
                    >
                      {item.label}
                      <span className="text-white/40">
                        {item.key === "product" ? "Templates" : "Guides"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href ?? "#");
                    }}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => navigate("#pricing")}
                  className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/5"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate("#cta")}
                  className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}