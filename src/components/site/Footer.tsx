import Link from "next/link";
import { Sparkles } from "lucide-react";

const groups: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Templates", "AI Studio", "Domains", "Analytics", "Pricing"] },
  { title: "Resources", links: ["Documentation", "Tutorials", "Blog", "Community", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Press kit", "Contact", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Cookie policy"] },
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

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas-soft">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="#hero" className="inline-flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md border border-hairline-strong bg-canvas">
                <Sparkles className="size-4 text-primary" />
              </span>
              <span className="text-[17px] font-medium tracking-tight text-ink">
                Folioforge
              </span>
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
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-ink-mute transition-colors duration-200 hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-[12.5px] text-ink-mute">
            © {new Date().getFullYear()} Folioforge Labs, Inc. All rights reserved.
          </p>
          <p className="text-[12.5px] text-ink-mute">
            Made in Berlin &amp; Toronto · 99.99% uptime
          </p>
        </div>
      </div>
    </footer>
  );
}