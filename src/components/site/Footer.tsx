"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check, Laptop, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "@/components/site/ThemeProvider";

type ThemeValue = "system" | "light" | "dark";

const themeOptions: { value: ThemeValue; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "system", label: "System", icon: Laptop },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

function FooterLogo({ className = "size-7" }: { className?: string }) {
  return (
    <div className="relative inline-flex items-center">
      <Image
        src="/logo/logo-light.png"
        alt="Profilio"
        width={512}
        height={512}
        quality={50}
        className={`${className} logo-light rounded-md object-contain w-[180px] h-[80px]`}
        suppressHydrationWarning
      />
      <Image
        src="/logo/logo-dark.png"
        alt="Profilio"
        width={512}
        height={512}
        quality={50}
        className={`${className} logo-dark rounded-md object-contain w-[180px] h-[80px]`}
        suppressHydrationWarning
      />
    </div>
  );
}

const groups: { title: string; links: { label: string; href?: string }[] }[] = [
  { title: "Product", links: ["Templates", "AI Studio", "Domains", "Analytics", "Pricing"].map((label) => ({ label })) },
  { title: "Resources", links: ["Documentation", "Tutorials", "Blog", "Community", "Changelog"].map((label) => ({ label })) },
  { title: "Company", links: ["About", "Careers", "Press kit", "Contact", "Status"].map((label) => ({ label })) },
  { title: "Admin", links: [{ label: "Admin Login", href: "/admin/login" }] },
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const DribbbleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6 6.47 9.9 7.66 18.5M19.1 4.5c-3.65 2.4-7.8 3.6-14.4 3.3M2 13.3c5.2-.5 9.15-.2 12.02 3.45" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  </svg>
);

const socials = [
  { icon: XIcon, label: "X (Twitter)" },
  { icon: GithubIcon, label: "GitHub" },
  { icon: DribbbleIcon, label: "Dribbble" },
  { icon: LinkedinIcon, label: "LinkedIn" },
];

function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = themeOptions.find((o) => o.value === theme) ?? themeOptions[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Theme: ${current.label}`}
        className="flex size-8 items-center justify-center rounded-md border border-hairline-strong bg-canvas text-ink-mute transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        <CurrentIcon className="size-3.5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-2 w-36 overflow-hidden rounded-lg border border-hairline bg-canvas-night p-1 elev-3"
          >
            {themeOptions.map((o) => {
              const Icon = o.icon;
              const active = theme === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors duration-150 ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-ink-mute hover:bg-white/[0.05] hover:text-ink"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span className="flex-1 text-left font-medium">{o.label}</span>
                  {active && <Check className="size-3.5" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-soft">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="#hero" className="inline-flex items-center gap-2">
              <FooterLogo />
              
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-mute">
              The portfolio builder that drafts, publishes and proves your work —
              so you can focus on the work itself.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-md border border-hairline-strong bg-canvas text-ink-mute transition-colors duration-200 hover:border-ink-mute-2 hover:text-ink"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                {g.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <Link
                        href={l.href}
                        className="text-[14px] text-ink-mute transition-colors duration-200 hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-[14px] text-ink-mute transition-colors duration-200 hover:text-ink"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-[12.5px] text-ink-mute">
            © {new Date().getFullYear()} Profilio Labs, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <ThemeSelect />
            
          </div>
        </div>
      </div>
    </footer>
  );
}