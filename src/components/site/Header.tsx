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

/* Dropdown panel — dark canvas, hairline, elevation 2 */
const panelCls =
  "absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 w-[min(680px,calc(100vw-32px))] origin-top rounded-lg border border-hairline bg-canvas-night p-3 elev-3";

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
      transition={{ delay: 0.06 + index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-3 rounded-md p-3 transition-colors duration-150 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-white"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-canvas-soft text-ink-mute transition-colors duration-150 group-hover:border-primary/60 group-hover:text-primary">
        <Icon className="size-4.5" />
      </span>
      <span>
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          {item.title}
          {item.tag && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
              {item.tag}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-ink-mute">
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
      document.removeEventListener("pointerdown", onPointer);
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
      className={`fixed inset-x-0 top-0 z-50 bg-[#121214] transition-all duration-300 ${
        scrolled ? "border-b border-hairline elev-1" : "border-b border-hairline-cool"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("#hero");
          }}
          className="focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Folioforge home"
        >
          <span className="inline-flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md border border-hairline-strong bg-canvas-soft">
              <Sparkles className="size-4 text-primary" />
            </span>
            <span className="text-[17px] font-medium tracking-tight text-ink">
              Folioforge
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
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
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
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
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
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
                            className="group col-span-2 flex flex-col justify-between rounded-md border border-hairline bg-canvas-soft p-5 transition-colors duration-150 hover:bg-canvas-night hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-white"
                          >
                            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary">
                              <Sparkles className="size-3.5" />
                              Featured
                            </p>
                            <p className="mt-2 text-[16px] font-medium text-ink">
                              {featuredProduct.title}
                            </p>
                            <p className="mt-1 max-w-md text-[13px] leading-relaxed text-ink-mute">
                              {featuredProduct.desc}
                            </p>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors duration-150 group-hover:text-primary">
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
                              navigate("#solutions");
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative flex flex-col justify-between rounded-md border border-hairline bg-canvas-soft p-5 transition-colors duration-150 hover:bg-canvas-night hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-white"
                          >
                            <span className="w-fit rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-ink">
                              {featuredArticle.tag}
                            </span>
                            <p className="mt-4 text-[15px] font-medium leading-snug text-ink">
                              {featuredArticle.title}
                            </p>
                            <span className="mt-3 flex items-center gap-2 text-xs text-ink-mute">
                              <BookOpen className="size-3.5" />
                              {featuredArticle.minute}
                              <span className="ml-auto inline-flex items-center gap-1 text-ink transition-colors group-hover:text-primary">
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
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("#pricing");
            }}
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
          >
            Sign In
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("#pricing");
            }}
            className="group inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-primary"
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
            className="inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-white/[0.04] lg:hidden focus-visible:outline-2 focus-visible:outline-white"
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
            className="border-b border-hairline bg-[#121214] lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.key}>
                    <button
                      type="button"
                      onClick={() => navigate(`#${item.key === "product" ? "features" : "how-it-works"}`)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-white/[0.04]"
                    >
                      {item.label}
                      <span className="text-ink-mute">
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
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-white/[0.04]"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => navigate("#pricing")}
                  className="flex-1 rounded-md border border-hairline-strong px-4 py-2.5 text-sm font-medium text-ink hover:bg-white/[0.04]"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate("#pricing")}
                  className="flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-ink hover:bg-primary-deep"
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