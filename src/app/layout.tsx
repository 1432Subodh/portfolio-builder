import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Folioforge — Build a portfolio that gets you hired",
  description:
    "Folioforge is the portfolio builder for designers, developers and creators. AI-powered templates, custom domains, analytics and instant publishing.",
  openGraph: {
    title: "Folioforge — Build a portfolio that gets you hired",
    description:
      "AI-powered portfolio builder with stunning templates, custom domains and real-time analytics.",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("folioforge-theme")||"system";var r=t==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):t;document.documentElement.dataset.theme=r;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
