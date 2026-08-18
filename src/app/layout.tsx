import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import AuthProvider from "@/components/auth/AuthProvider";
import ReduxProvider from "@/components/redux/ReduxProvider";
import ThemeScript from "@/components/ThemeScript";
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
      <body className="min-h-full flex-col">
        <ThemeScript />
        <AuthProvider>
          <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
