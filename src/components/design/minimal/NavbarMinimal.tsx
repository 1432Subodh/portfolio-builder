import React from "react";
import { ArrowUpRight, Menu } from "lucide-react";

const defaultNavbarContent = {
  logo: {
    text: "Portfolio",
    href: "/",
  },

  links: [
    {
      label: "Work",
      href: "#work",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ],

  cta: {
    label: "Let's talk",
    href: "#contact",
  },
};

type NavbarLink = {
  label?: string;
  href?: string;
};

type NavbarLogo = NavbarLink & {
  text?: string;
};

type NavbarContent = {
  logo?: NavbarLogo;
  links?: NavbarLink[];
  cta?: NavbarLink;
  mobileMenuLabel?: string;
};

type NavbarTheme = {
  design?: {
    typography?: {
      color?: string;
      fontFamily?: string;
      fontWeight?: number;
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
      maxWidth?: string;
    };
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asLinks(value: unknown, fallback: NavbarLink[]) {
  return Array.isArray(value)
    ? value.filter(isRecord).map((item) => ({
        label: asString(item.label, "Link"),
        href: asString(item.href, "#"),
      }))
    : fallback;
}

function NavbarMinimal({
  content = {},
  theme = {},
}: {
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
}) {
  const navbarContent = content as NavbarContent;
  const navbarTheme = theme as NavbarTheme;
  const logo: NavbarLogo = isRecord(navbarContent.logo)
    ? navbarContent.logo
    : defaultNavbarContent.logo;
  const cta = isRecord(navbarContent.cta)
    ? navbarContent.cta
    : defaultNavbarContent.cta;
  const links = asLinks(navbarContent.links, defaultNavbarContent.links);
  const textColor = asString(
    navbarTheme.design?.typography?.color,
    "#000000"
  );
  const mutedTextColor = asString(
    navbarTheme.design?.accent?.mutedColor,
    "rgba(0,0,0,0.6)"
  );
  const accentColor = asString(navbarTheme.design?.accent?.color, "#000000");
  const backgroundColor = asString(
    navbarTheme.design?.background?.color,
    "#ffffff"
  );
  const fontFamily = asString(
    navbarTheme.design?.typography?.fontFamily,
    "Inter, sans-serif"
  );
  const fontWeight = asNumber(navbarTheme.design?.typography?.fontWeight, 500);
  const maxWidth = asString(navbarTheme.layout?.sizing?.maxWidth, "80rem");

  return (
    <header
      className="left-0 right-0 top-0 z-50"
      style={{ backgroundColor, fontFamily, color: textColor }}
    >
      <nav
        className="mx-auto flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16"
        style={{ maxWidth }}
      >
        {/* Logo */}
        <a
          href={asString(logo.href, "/")}
          className="text-lg font-semibold tracking-[-0.03em]"
          style={{ color: textColor }}
        >
          {asString(logo.text ?? logo.label, "Portfolio")}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => (
            <a
              key={`${link.label}-${index}`}
              href={asString(link.href, "#")}
              className="relative text-sm transition-colors duration-300 hover:opacity-100"
              style={{ color: mutedTextColor, fontWeight }}
            >
              {asString(link.label, "Link")}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={asString(cta.href, "#contact")}
          className="group hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:gap-3 md:inline-flex"
          style={{ backgroundColor: accentColor }}
        >
          {asString(cta.label, "Let's talk")}

          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        {/* Mobile Menu */}
        <button
          type="button"
          aria-label={asString(
            navbarContent.mobileMenuLabel,
            "Open navigation menu"
          )}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:border-black md:hidden"
          style={{ borderColor: `${accentColor}1a`, color: textColor }}
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>
      </nav>
    </header>
  );
}

export default NavbarMinimal;
