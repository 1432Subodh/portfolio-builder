import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profilio — Build a portfolio that gets you hired",
  description:
    "Profilio is the portfolio builder for designers, developers and creators. AI-powered templates, custom domains, analytics and instant publishing.",
  openGraph: {
    title: "Profilio — Build a portfolio that gets you hired",
    description:
      "AI-powered portfolio builder with stunning templates, custom domains and real-time analytics.",
    type: "website",
  },
};

const themeScript = `(function(){try{var c=document.cookie.match(/(?:^|; )Profilio-theme=([^;]*)/);var t=c?decodeURIComponent(c[1]):null;if(!t)t=localStorage.getItem("Profilio-theme");var theme=t&&["light","dark","system"].includes(t)?t:"system";var resolved=theme==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):theme;document.documentElement.dataset.theme=resolved;}catch(e){var fallback=matchMedia && matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=fallback;}})();`;

async function getServerTheme(): Promise<"light" | "dark" | null> {
  try {
    const c = await cookies();
    const cookie = c.get("Profilio-theme");
    if (cookie?.value === "light" || cookie?.value === "dark") return cookie.value;
  } catch {}
  return null;
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const theme = await getServerTheme();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={theme ?? undefined}
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
