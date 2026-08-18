import React from "react";
import { ArrowUpRight } from "lucide-react";

type HeroMinimalContent = {
  eyebrow?: string;
  headingLine1?: string;
  headingMuted?: string;
  headingLine3?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  meta?: string[];
  sectionNumber?: string;
};

type HeroMinimalTheme = {
  design?: {
    typography?: {
      color?: string;
    };
    background?: {
      color?: string;
    };
    accent?: {
      color?: string;
      mutedColor?: string;
    };
  };
  layout?: {
    sizing?: {
      minHeight?: string;
      maxWidth?: string;
    };
  };
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  accentColor?: string;
  minHeight?: string;
  maxWidth?: string;
};

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : fallback;
}

function HeroMinimal({
  content = {},
  theme = {},
}: {
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
}) {
  const heroContent = content as HeroMinimalContent;
  const heroTheme = theme as HeroMinimalTheme;
  const textColor = asString(
    heroTheme.design?.typography?.color ?? heroTheme.textColor,
    "#000000"
  );
  const mutedTextColor = asString(
    heroTheme.design?.accent?.mutedColor ?? heroTheme.mutedTextColor,
    "rgba(0,0,0,0.6)"
  );
  const accentColor = asString(
    heroTheme.design?.accent?.color ?? heroTheme.accentColor,
    "#000000"
  );
  const backgroundColor = asString(
    heroTheme.design?.background?.color ?? heroTheme.backgroundColor,
    "#ffffff"
  );
  const minHeight = asString(
    heroTheme.layout?.sizing?.minHeight ?? heroTheme.minHeight,
    "680px"
  );
  const maxWidth = asString(
    heroTheme.layout?.sizing?.maxWidth ?? heroTheme.maxWidth,
    "80rem"
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight,
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}08` }}
        />

        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
        <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full opacity-40" style={{ backgroundColor: accentColor }} />
        <div className="absolute bottom-[20%] left-[20%] h-1.5 w-1.5 rounded-full opacity-30" style={{ backgroundColor: accentColor }} />
      </div>

      <div
        className="relative mx-auto flex items-center px-6 py-24 sm:px-10 lg:px-16"
        style={{ minHeight, maxWidth }}
      >
        <div className="w-full max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: accentColor }} />
            <span
              className="text-sm font-medium uppercase tracking-[0.2em]"
              style={{ color: mutedTextColor }}
            >
              {asString(heroContent.eyebrow, "Creative Developer")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            {asString(heroContent.headingLine1, "I build digital")}
            <br />
            <span style={{ color: mutedTextColor }}>
              {asString(heroContent.headingMuted, "experiences that")}
            </span>
            <br />
            <span>{asString(heroContent.headingLine3, "stand out.")}</span>
          </h1>

          {/* Description */}
          <p
            className="mt-8 max-w-xl text-base leading-7 sm:text-lg"
            style={{ color: mutedTextColor }}
          >
            {asString(
              heroContent.description,
              "I'm a designer and developer focused on creating thoughtful, high-performance digital experiences with clean interfaces and meaningful interactions."
            )}
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={asString(heroContent.primaryHref, "#work")}
              className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-5"
              style={{ backgroundColor: accentColor }}
            >
              {asString(heroContent.primaryCta, "View my work")}
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={asString(heroContent.secondaryHref, "#contact")}
              className="inline-flex items-center rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
              style={{ borderColor: `${accentColor}26` }}
            >
              {asString(heroContent.secondaryCta, "Let's talk")}
            </a>
          </div>

          {/* Bottom metadata */}
          <div
            className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t pt-6 text-xs uppercase tracking-[0.15em]"
            style={{ borderColor: `${accentColor}1a`, color: mutedTextColor }}
          >
            {asStringArray(heroContent.meta, ["Based in India", "Available for work", "2026"]).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {/* Decorative number */}
        <div
          className="pointer-events-none absolute bottom-10 right-10 hidden text-[180px] font-semibold leading-none tracking-[-0.08em] opacity-[0.025] lg:block"
          style={{ color: accentColor }}
        >
          {asString(heroContent.sectionNumber, "01")}
        </div>
      </div>
    </section>
  );
}

export default HeroMinimal;
