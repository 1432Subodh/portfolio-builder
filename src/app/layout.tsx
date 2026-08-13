import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
