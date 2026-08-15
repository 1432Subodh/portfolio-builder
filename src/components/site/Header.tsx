"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  desc: "Describe your vibe and Profilio drafts an entire portfolio — layout, type scale and motion included.",
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
  { label: "Resources", type: "dropdown", key: "resources" },
  { label: "Solutions", type: "link", href: "#solutions" },
  { label: "Pricing", type: "link", href: "#pricing" },
];

/* ------------------------------------------------------------------ */
/* Shared dropdown panel                                               */
/* ------------------------------------------------------------------ */

const panelCls =
  "fixed origin-top w-[min(680px,calc(100vw-32px))] rounded-lg border border-hairline bg-canvas-night  elev-3 z-50";

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      <ChevronDown className="size-3.5" />
    </motion.span>
  );
}

function Logo({ className = "size-7" }: { className?: string }) {
  return (
    <div className="relative inline-flex items-center">
      <Image
        src="/logo/logo-light.png"
        alt="Profilio"
        width={512}
        height={512}
        quality={50}
        priority
        className={`${className} logo-light rounded-md object-contain w-[100px] h-[80px] scale-[1.3]`}
        suppressHydrationWarning
      />
      <Image
        src="/logo/logo-dark.png"
        alt="Profilio"
        width={512}
        height={512}
        quality={50}
        priority
        className={`${className} logo-dark rounded-md object-contain w-[100px] h-[80px] scale-[1.3]`}
        suppressHydrationWarning
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dropdown content renderers                                          */
/* ------------------------------------------------------------------ */

function ProductContent({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      <motion.a
        href={featuredProduct.href}
        onClick={(e) => {
          e.preventDefault();
          onNavigate("#features");
        }}
        className="group flex flex-col justify-between border-hairline bg-canvas-soft p-5 transition-colors duration-150  hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-white"
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

      <div className="grid grid-cols-2 gap-1 p-1">
        {productItems.map((it, i) => (
          <DropdownItem
            key={it.title}
            item={it}
            index={i}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

function ResourcesContent({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="grid grid-cols-[1.15fr_1fr] gap-1 overflow-hidden">
      <div className="flex flex-col p-1">
        {resourcesItems.map((it, i) => (
          <DropdownItem
            key={it.title}
            item={it}
            index={i}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <motion.a
        href={featuredArticle.href}
        onClick={(e) => {
          e.preventDefault();
          onNavigate("#solutions");
        }}
        className="group relative flex flex-col justify-between bg-canvas-soft p-5 transition-colors duration-150  hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-white"
      >
        <span className="w-fit rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-on-primary">
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
  );
}

function DropdownItem({ item, index, onNavigate }: {
  item: DropdownItemDef;
  index: number;
  onNavigate: (href: string) => void;
}) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.href);
      }}
      className="group flex items-start gap-3 rounded-md p-3 transition-colors duration-150 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-white"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-canvas-soft text-ink-mute transition-colors duration-150 group-hover:border-primary/60 group-hover:text-primary">
        <Icon className="size-4.5" />
      </span>
      <span>
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          {item.title}
          {item.tag && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-on-primary">
              {item.tag}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-ink-mute">
          {item.desc}
        </span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile slide-in menu                                                */
/* ------------------------------------------------------------------ */

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.18 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* Animated hamburger: menu icon morphs into an X */
function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block size-5">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="x"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <X className="size-5" />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Menu className="size-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function MobileLinkRow({ item, onNavigate }: {
  item: { label: string; type: "link"; href: string };
  onNavigate: (href: string) => void;
}) {
  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.href);
      }}
      variants={listItemVariants}
      className="group flex items-center justify-between rounded-xl px-4 py-4 transition-colors duration-150 hover:bg-white/[0.04]"
    >
      <span className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-canvas-soft text-ink-mute transition-colors duration-150 group-hover:bg-primary/15 group-hover:text-primary">
          <ArrowRight className="size-4 -rotate-45" />
        </span>
        <span className="text-[15px] font-medium tracking-tight text-ink">{item.label}</span>
      </span>
    </motion.a>
  );
}

/* Expandable group inside the drawer (Product / Resources) */
function MobileGroup({ def, open, onToggle, onNavigate }: {
  def: { key: Exclude<OpenMenu, null>; label: string; icon: React.ComponentType<{ className?: string }> };
  open: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}) {
  const Icon = def.icon;
  const items = def.key === "product" ? productItems : resourcesItems;
  return (
    <div className="px-2">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        variants={listItemVariants}
        className="group flex w-full items-center justify-between rounded-xl px-2 py-4 text-left transition-colors duration-150 hover:bg-white/[0.04]"
      >
        <span className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-canvas-soft text-ink-mute transition-colors duration-150 group-hover:bg-primary/15 group-hover:text-primary">
            <Icon className="size-4" />
          </span>
          <span className="text-[15px] font-medium tracking-tight text-ink">{def.label}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex size-6 items-center justify-center rounded-full text-ink-mute"
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              className="ml-5 border-l border-hairline pl-3 pb-3"
            >
              {items.map((it) => {
                return (
                  <motion.a
                    key={it.title}
                    href={it.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(it.href);
                    }}
                    variants={{
                      hidden: { opacity: 0, x: 12 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
                      },
                    }}
                    className="group flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-ink-mute transition-colors duration-150 hover:bg-white/[0.04] hover:text-ink"
                  >
                    <span className="size-1 rounded-full bg-ink-faint transition-colors duration-150 group-hover:bg-primary" />
                    <span>
                      {it.title}
                      {it.tag && (
                        <span className="ml-2 rounded-full bg-primary/15 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-primary">
                          {it.tag}
                        </span>
                      )}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, onClose, onNavigate, reduce }: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  reduce: boolean | null;
}) {
  const [expanded, setExpanded] = useState<Exclude<OpenMenu, null>>("product");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeAndNav = (href: string) => {
    onClose();
    onNavigate(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sliding drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ x: "100%", transition: { duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-hidden border-l border-hairline bg-canvas-night sm:max-w-[400px]"
          >
            {/* Layered glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 z-[1] size-72 rounded-full bg-primary/20 blur-[100px]" />
            <div className="pointer-events-none absolute -left-24 top-1/3 z-[1] size-56 rounded-full bg-primary/10 blur-[80px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Drawer header */}
            <div className="relative z-[2] flex h-16 shrink-0 items-center justify-between border-b border-hairline px-4 sm:px-5">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  closeAndNav("#hero");
                }}
                className="focus-visible:outline-2 focus-visible:outline-primary"
                aria-label="Profilio home"
              >
                <span className="inline-flex items-center gap-2">
                  <Logo />
                </span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full text-ink transition-all duration-150 hover:rotate-90 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Hamburger open />
              </button>
            </div>

            {/* Nav */}
            <motion.nav
              key="nav"
              initial="hidden"
              animate="show"
              variants={listVariants}
              aria-label="Mobile"
              className="relative z-[2] flex-1 overflow-y-auto py-4 no-scrollbar"
            >
              <p className="mb-1 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                Menu
              </p>

              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <MobileGroup
                    key={item.key}
                    def={{
                      key: item.key ?? "product",
                      label: item.label,
                      icon: item.key === "product" ? LayoutTemplate : BookOpen,
                    }}
                    open={expanded === item.key}
                    onToggle={() =>
                      setExpanded((prev) =>
                        prev === item.key ? "product" : (item.key ?? "product"),
                      )
                    }
                    onNavigate={closeAndNav}
                  />
                ) : (
                  <MobileLinkRow
                    key={item.label}
                    item={item}
                    onNavigate={closeAndNav}
                  />
                ),
              )}

              {/* Featured card */}
              <motion.div
                variants={listItemVariants}
                className="px-4 pt-6"
              >
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Spotlight
                </p>
                <a
                  href={featuredProduct.href}
                  onClick={(e) => {
                    e.preventDefault();
                    closeAndNav("#features");
                  }}
                  className="group relative block overflow-hidden rounded-xl border border-hairline bg-gradient-to-br from-canvas-soft to-canvas-night p-4 transition-colors duration-150 hover:border-primary/40"
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    <Sparkles className="size-3" />
                    Featured
                  </p>
                  <p className="mt-1.5 text-[16px] font-medium tracking-tight text-ink">
                    {featuredProduct.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-mute">
                    {featuredProduct.desc}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-ink transition-colors group-hover:text-primary">
                    See it in action
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </a>
              </motion.div>
            </motion.nav>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="relative z-[2] shrink-0 space-y-2 border-t border-hairline p-4 sm:p-5"
            >
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signup"
                  onClick={onClose}
                  className="group flex items-center justify-center gap-1 rounded-xl bg-primary px-3 py-3 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Get Started
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/signin"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-xl border border-hairline-strong bg-canvas-soft px-3 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [open, setOpen] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelRect, setPanelRect] = useState<{ top: number; left: number } | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const router = useRouter();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDropdownHovered = useRef(false);
  const prevOpenRef = useRef<OpenMenu>(null);
  const [direction, setDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setPanelRect(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  /* Clamp the dropdown panel inside the viewport, centered on its trigger */
  const recalcPanelPosition = useCallback(() => {
    if (!open || !panelRect) return;
    const btn = document.getElementById(`menu-trigger-${open}`);
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const panelW = Math.min(680, window.innerWidth - 32);
    const left = Math.min(
      Math.max(r.left + r.width / 2 - panelW / 2, 8),
      window.innerWidth - panelW - 8,
    );
    setPanelRect({ top: r.bottom + 10, left });
  }, [open, panelRect]);

  useEffect(() => {
    if (!open || !panelRect) return;
    window.addEventListener("resize", recalcPanelPosition);
    return () => window.removeEventListener("resize", recalcPanelPosition);
  }, [open, panelRect, recalcPanelPosition]);

  /* Close the mobile drawer when switching to desktop breakpoint */
  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const navigate = (href: string) => {
    setOpen(null);
    setPanelRect(null);
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        return;
      }
      router.push("/" + href);
    }
  };

  const openMenu = (key: OpenMenu) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (prevOpenRef.current && prevOpenRef.current !== key) {
      const prevIdx = navItems.findIndex((i) => i.type === "dropdown" && i.key === prevOpenRef.current);
      const nextIdx = navItems.findIndex((i) => i.type === "dropdown" && i.key === key);
      setDirection(nextIdx > prevIdx ? "left" : "right");
    }
    prevOpenRef.current = key;
    setOpen(key);
    const btn = document.getElementById(`menu-trigger-${key}`);
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const panelW = Math.min(680, window.innerWidth - 32);
    const left = Math.min(
      Math.max(r.left + r.width / 2 - panelW / 2, 8),
      window.innerWidth - panelW - 8,
    );
    setPanelRect({ top: r.bottom + 10, left });
  };

  const scheduleClose = () => {
    if (isDropdownHovered.current) return;
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(null);
      setPanelRect(null);
      closeTimeoutRef.current = null;
    }, 120);
  };

  const cancelScheduleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const onHeaderMouseLeave = () => {
    scheduleClose();
  };

  const onDropdownMouseEnter = () => {
    isDropdownHovered.current = true;
    cancelScheduleClose();
  };

  const onDropdownMouseLeave = () => {
    isDropdownHovered.current = false;
    scheduleClose();
  };

  const openTransition = reduce
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
  const closeTransition = reduce
    ? { duration: 0 }
    : { duration: 0.14, ease: [0.22, 1, 0.36, 1] as const };
  const contentTransition = reduce
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header
      ref={headerRef}
      onMouseLeave={onHeaderMouseLeave}
      className={`fixed inset-x-0 top-0 z-50 overflow-x-clip bg-background transition-all duration-300 w-[100vw] ${
        scrolled ? "border-b border-hairline elev-1" : "border-b border-hairline-cool"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("#hero");
          }}
          className="focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Profilio home"
        >
          <span className="inline-flex items-center gap-2">
            <Logo />
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="relative hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.type === "dropdown" ? (
              <div
                key={item.key}
                onMouseEnter={() => openMenu(item.key)}
              >
                <button
                  type="button"
                  id={`menu-trigger-${item.key}`}
                  aria-expanded={open === item.key}
                  aria-controls="desktop-dropdown"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {item.label}
                  <Chevron open={open === item.key} />
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
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="flex size-10 items-center justify-center rounded-md  text-ink transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary lg:hidden"
          >
            <Hamburger open={mobileOpen} />
          </button>

          <Link
            href="/signin"
            className="hidden rounded-md px-2 py-1 text-sm font-medium text-ink-mute transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary border border-hairline-strong sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="group hidden items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-sm  text-on-primary transition-colors duration-150 hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-primary border border-hairline-strong lg:inline-flex"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Shared dropdown container — single mounted shell            */}
      {/* ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            id="desktop-dropdown"
            role="dialog"
            aria-label={open === "product" ? "Product menu" : "Resources menu"}
            onMouseEnter={onDropdownMouseEnter}
            onMouseLeave={onDropdownMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={open ? openTransition : closeTransition}
            style={{
              top: panelRect?.top ?? "calc(100% + 10px)",
              left: panelRect?.left ?? 0,
            }}
            className={panelCls}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {open === "product" && (
                <motion.div
                  key="product"
                  initial={{ opacity: 0, x: direction === "left" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductContent onNavigate={navigate} />
                </motion.div>
              )}
              {open === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, x: direction === "left" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ResourcesContent onNavigate={navigate} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={navigate}
        reduce={reduce}
      />
    </header>
  );
}
