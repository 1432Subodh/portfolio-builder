"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import FloatingField from "./FloatingField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "password";

export default function AuthForm({
  mode,
  onEnter,
}: {
  mode: "signin" | "signup";
  onEnter: (fields: Record<FieldName, string>) => void;
}) {
  const isSignin = mode === "signin";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);
  const [magicLinkHover, setMagicLinkHover] = useState(false);
  const [hovering, setHovering] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitError(
        isSignin
          ? "We couldn't sign you in. Check your email and password, then try again."
          : "We couldn't create your account. Please try again.",
      );
      onEnter({ name, email, password });
    }, 900);
  };

  const handleMagicLink = () => {
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setErrors({ email: "Enter a valid email to receive a magic link" });
      return;
    }
    setMagicLinkLoading(true);
    window.setTimeout(() => {
      setMagicLinkLoading(false);
      setMagicLinkSent(true);
    }, 1200);
  };

  const emailValid = EMAIL_RE.test(email.trim());

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="mt-5 space-y-3.5"
    >
      {submitError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-2.5 text-[12.5px] leading-relaxed text-red-400"
        >
          {submitError}
        </motion.p>
      )}

      {!isSignin && (
        <FloatingField
          label="Full name"
          value={name}
          onChange={setName}
          error={errors.name}
          valid={!isSignin && name.trim().length >= 2}
        />
      )}

      <FloatingField
        label={isSignin ? "Your email" : "Email"}
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        valid={emailValid}
      />

      <FloatingField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        error={errors.password}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex size-7 items-center justify-center rounded-md text-ink-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />

      <div className="flex justify-end">
        {isSignin && (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[12px] font-medium text-ink-mute transition-colors hover:text-primary"
          >
            Forgot password?
          </a>
        )}
      </div>

      {/* morphing submit button */}
      <motion.button
        type="submit"
        disabled={!canSubmit}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        whileHover={canSubmit ? { scale: 1.015 } : undefined}
        whileTap={canSubmit ? { scale: 0.985 } : undefined}
        className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-primary to-primary-deep px-4 text-[14px] font-medium text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {/* gradient shimmer on hover */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"
        />

        <span className="relative z-10 flex items-center gap-2">
          {submitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {isSignin ? "Signing in\u2026" : "Creating account\u2026"}
              </motion.span>
            </>
          ) : (
            <>
              <motion.span
                key={hovering ? "hover" : "default"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {hovering
                  ? isSignin
                    ? "Let\u2019s go"
                    : "Get started"
                  : isSignin
                    ? "Sign in"
                    : "Create account"}
              </motion.span>
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </span>
      </motion.button>

      {/* divider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="h-px flex-1 bg-hairline" />
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-faint">
          or
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </motion.div>

      {/* magic link */}
      {magicLinkSent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-[12.5px] text-primary"
        >
          <Check className="size-4 shrink-0" />
          Magic link sent! Check your inbox.
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={handleMagicLink}
          onMouseEnter={() => setMagicLinkHover(true)}
          onMouseLeave={() => setMagicLinkHover(false)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-hairline-strong bg-canvas text-[13px] font-medium text-ink transition-all duration-300 hover:border-primary/40 hover:bg-canvas-soft cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
        >
          {magicLinkLoading ? (
            <Loader2 className="size-4 animate-spin text-primary" />
          ) : (
            <motion.span
              animate={magicLinkHover ? { rotate: [0, -10, 10, -5, 0] } : { rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Mail className="size-4" />
            </motion.span>
          )}
          Send me a magic link
        </motion.button>
      )}

      {/* social icons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-3 pt-1"
      >
        {/* Google */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Continue with Google"
          className="flex size-10 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-mute transition-colors hover:border-ink-mute-2 hover:bg-canvas-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </motion.button>

        {/* GitHub */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Continue with GitHub"
          className="flex size-10 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-mute transition-colors hover:border-ink-mute-2 hover:bg-canvas-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </motion.button>

        {/* Apple */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Continue with Apple"
          className="flex size-10 items-center justify-center rounded-full border border-hairline bg-canvas text-ink-mute transition-colors hover:border-ink-mute-2 hover:bg-canvas-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </motion.button>
      </motion.div>

      {/* footer arrow */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-[12.5px] text-ink-mute"
      >
        {isSignin ? (
          <a
            href="/signup"
            className="group inline-flex items-center gap-1 font-medium  transition-colors hover:text-ink"
          >
            New here? Create an account
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="size-3.5" />
            </motion.span>
          </a>
        ) : (
          <a
            href="/signin"
            className="group inline-flex items-center gap-1 font-medium  transition-colors hover:text-ink"
          >
            Already have an account? Sign in
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="size-3.5" />
            </motion.span>
          </a>
        )}
      </motion.p>
    </motion.form>
  );
}
