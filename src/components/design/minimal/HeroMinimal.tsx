import React from "react";
import { ArrowUpRight } from "lucide-react";

type HeroMinimalContent = {
  id?:string;
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

function EditableText({
  value,
  path,
  onChange,
  className,
  style,
  as: Tag = "span",
}: {
  value: string;
  path: string[];
  onChange?: (path: string[], value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "p";
}) {
  return (
    <Tag
      contentEditable={Boolean(onChange)}
      suppressContentEditableWarning
      tabIndex={onChange ? 0 : undefined}
      className={className}
      style={style}
      onClick={(e) => {
        if (onChange) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onKeyDown={(e) => {
        if (onChange && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => {
        const next = e.currentTarget.textContent ?? "";
        if (onChange && next !== value) onChange(path, next);
      }}
    >
      {value}
    </Tag>
  );
}

function HeroMinimal({
  content = {},
  theme = {},
  onContentChange,
}: {
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
  onContentChange?: (path: string[], value: unknown) => void;
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
      id={heroContent.id || undefined}
      className="relative w-full overflow-hidden px-0"
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
            <EditableText
              value={asString(heroContent.eyebrow, "Creative Developer")}
              path={["eyebrow"]}
              onChange={onContentChange}
              className="text-sm font-medium uppercase tracking-[0.2em] outline-none focus:ring-1 focus:ring-current/30"
              style={{ color: mutedTextColor }}
            />
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            <EditableText
              value={asString(heroContent.headingLine1, "I build digital")}
              path={["headingLine1"]}
              onChange={onContentChange}
              className="outline-none focus:ring-1 focus:ring-current/30"
            />
            <br />
            <EditableText
              value={asString(heroContent.headingMuted, "experiences that")}
              path={["headingMuted"]}
              onChange={onContentChange}
              className="outline-none focus:ring-1 focus:ring-current/30"
              style={{ color: mutedTextColor }}
            />
            <br />
            <EditableText
              value={asString(heroContent.headingLine3, "stand out.")}
              path={["headingLine3"]}
              onChange={onContentChange}
              className="outline-none focus:ring-1 focus:ring-current/30"
            />
          </h1>

          {/* Description */}
          <EditableText
            as="p"
            value={asString(
              heroContent.description,
              "I'm a designer and developer focused on creating thoughtful, high-performance digital experiences with clean interfaces and meaningful interactions."
            )}
            path={["description"]}
            onChange={onContentChange}
            className="mt-8 max-w-xl text-base leading-7 sm:text-lg"
            style={{ color: mutedTextColor }}
          />

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={asString(heroContent.primaryHref, "#work")}
              className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-5"
              style={{ backgroundColor: accentColor }}
            >
              <EditableText
                value={asString(heroContent.primaryCta, "View my work")}
                path={["primaryCta"]}
                onChange={onContentChange}
                className="outline-none focus:ring-1 focus:ring-white/50"
              />
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
              <EditableText
                value={asString(heroContent.secondaryCta, "Let's talk")}
                path={["secondaryCta"]}
                onChange={onContentChange}
                className="outline-none focus:ring-1 focus:ring-current/30"
              />
            </a>
          </div>

          {/* Bottom metadata */}
          <div
            className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t pt-6 text-xs uppercase tracking-[0.15em]"
            style={{ borderColor: `${accentColor}1a`, color: mutedTextColor }}
          >
            {asStringArray(heroContent.meta, ["Based in India", "Available for work", "2026"]).map((item, index) => (
              <EditableText
                key={`${item}-${index}`}
                value={item}
                path={["meta", String(index)]}
                onChange={onContentChange}
                className="outline-none focus:ring-1 focus:ring-current/30"
              />
            ))}
          </div>
        </div>

        {/* Decorative number */}
        <div
          className="pointer-events-none absolute bottom-10 right-10 hidden text-[180px] font-semibold leading-none tracking-[-0.08em] opacity-[0.025] lg:block"
          style={{ color: accentColor }}
        >
          <EditableText
            value={asString(heroContent.sectionNumber, "01")}
            path={["sectionNumber"]}
            onChange={onContentChange}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroMinimal;
