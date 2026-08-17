"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "password";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignin = mode === "signin";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!isSignin && name.trim().length < 2) {
      next.name = "Please enter your name";
    }
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email address";
    }
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const canSubmit =
    !submitting &&
    email.trim().length > 0 &&
    password.length > 0 &&
    (isSignin || name.trim().length >= 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);

    try {
      if (!isSignin) {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setSubmitError(data.error || "Failed to create account");
          setSubmitting(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setSubmitError(isSignin ? "Invalid email or password" : "Account created but sign in failed. Please sign in.");
        if (!isSignin && result.error) {
          router.push("/signin");
        }
      } else {
        router.push("/user");
        router.refresh();
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/user" });
  };

  const inputClasses = (hasError: boolean) =>
    `h-11 w-full rounded-lg border bg-canvas pl-10 pr-3 text-[13px] text-ink placeholder-ink-faint outline-none transition-all duration-200 ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-hairline-strong focus:border-ink"
    }`;

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="mt-4 space-y-2.5"
    >
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-[12px] text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
        >
          <span className="size-1.5 shrink-0 rounded-full bg-red-500" />
          {submitError}
        </motion.div>
      )}

      {!isSignin && (
        <div>
          <label htmlFor="auth-name" className="sr-only">Full name</label>
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 flex h-11 w-9 items-center justify-center">
              <User className="size-4 text-ink-faint" />
            </div>
            <input
              id="auth-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={inputClasses(!!errors.name)}
            />
          </div>
          {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
        </div>
      )}

      <div>
        <label htmlFor="auth-email" className="sr-only">Email address</label>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 flex h-11 w-9 items-center justify-center">
            <Mail className="size-4 text-ink-faint" />
          </div>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={inputClasses(!!errors.email)}
          />
        </div>
        {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="auth-password" className="sr-only">Password</label>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 flex h-11 w-9 items-center justify-center">
            <Lock className="size-4 text-ink-faint" />
          </div>
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={`h-11 w-full rounded-lg border bg-canvas pl-10 pr-9 text-[13px] text-ink placeholder-ink-faint outline-none transition-all duration-200 ${
              errors.password ? "border-red-400 focus:border-red-500" : "border-hairline-strong focus:border-ink"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-faint transition-colors hover:text-ink"
          >
            {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-[11px] text-red-500">{errors.password}</p>}
      </div>

      {isSignin && (
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only peer"
              />
              <div className="size-3.5 rounded border border-hairline-strong bg-canvas transition-all peer-checked:border-foreground peer-checked:bg-foreground flex items-center justify-center">
                {rememberMe && (
                  <svg className="size-2 text-background" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[12px] text-ink-mute">Remember me</span>
          </label>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[12px] font-medium text-ink transition-opacity hover:opacity-70">
            Forgot password
          </a>
        </div>
      )}

      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.01 } : undefined}
        whileTap={canSubmit ? { scale: 0.98 } : undefined}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-[13px] font-medium text-background transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            {isSignin ? "Signing in..." : "Creating account..."}
          </>
        ) : (
          isSignin ? "Sign In" : "Create Account"
        )}
      </motion.button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-hairline" />
        <span className="text-[11px] text-ink-faint">Or continue with</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-hairline-strong bg-canvas text-[12px] font-medium text-ink transition-all duration-200 hover:bg-canvas-soft"
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-hairline-strong bg-canvas text-[12px] font-medium text-ink transition-all duration-200 hover:bg-canvas-soft"
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Apple
        </button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-center text-[12px] text-ink-mute pt-1"
      >
        {isSignin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-ink underline underline-offset-2 transition-opacity hover:opacity-70">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-ink underline underline-offset-2 transition-opacity hover:opacity-70">
              Sign in
            </Link>
          </>
        )}
      </motion.p>
    </motion.form>
  );
}
