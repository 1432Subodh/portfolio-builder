"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import AnimatedPanel from "./AnimatedPanel";
import AuthForm from "./AuthForm";

export default function AuthLayout({ mode }: { mode: "signin" | "signup" }) {
  const isSignin = mode === "signin";
  const pathname = usePathname();

  const formSection = (
    <div className="relative flex flex-col">
      {/* top bar */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back
        </Link>

        <Link
          href={isSignin ? "/signup" : "/signin"}
          className="group inline-flex items-center gap-0.5 text-[12.5px] font-medium text-ink-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          {isSignin ? "Create an account" : "Sign in"}
          <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </header>

      {/* form body */}
      <div className="flex flex-1 flex-col justify-center px-6 pb-10 pt-6 sm:px-8">
        <div className="mx-auto w-full max-w-[360px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[10.5px] font-medium text-ink-mute"
          >
            {isSignin ? "Welcome back" : "Join 40k+ builders"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-balance text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-ink sm:text-[32px]"
          >
            {isSignin ? "Welcome back!" : "Start building, free"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-[13.5px] leading-relaxed text-ink-mute"
          >
            {isSignin
              ? "Enter email & password to continue."
              : "No card required. A portfolio that gets you hired in minutes."}
          </motion.p>

          <AuthForm
            mode={mode}
          />
        </div>
      </div>

      {/* bottom bar */}
      <footer className="flex flex-col items-center justify-between gap-1.5 px-6 py-5 text-[11px] leading-relaxed text-ink-faint sm:flex-row sm:px-8">
        <p className="text-center sm:text-left">
          You acknowledge that you read, and agree, to our{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-ink-mute underline underline-offset-2 hover:text-ink">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-ink-mute underline underline-offset-2 hover:text-ink">
            Privacy Policy
          </a>
          .
        </p>
        <p>© {new Date().getFullYear()} Profilio</p>
      </footer>
    </div>
  );

  const panelSection = <AnimatedPanel mode={mode} />;

  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-2">
      <AnimatePresence mode="wait">
        {isSignin ? (
          <motion.div
            key="signin-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="contents"
          >
            {panelSection}
            {formSection}
          </motion.div>
        ) : (
          <motion.div
            key="signup-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="contents"
          >
            {formSection}
            {panelSection}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
