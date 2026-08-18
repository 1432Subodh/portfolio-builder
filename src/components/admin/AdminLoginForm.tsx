"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, Loader2, ShieldCheck } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim()) return "Email is required";
    if (!EMAIL_RE.test(email.trim())) return "Enter a valid email address";
    if (!password) return "Password is required";
    return null;
  };

  const canSubmit = !submitting && email.trim().length > 0 && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setSubmitting(true);

    try {
      const result = await signIn("admin", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "h-11 w-full rounded-lg border border-editor-border-strong bg-editor-panel pl-10 pr-9 text-[13px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-all duration-200 focus:border-editor-text";

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 space-y-3"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-400"
        >
          <span className="size-1.5 shrink-0 rounded-full bg-red-500" />
          {error}
        </motion.div>
      )}

      <div>
        <label htmlFor="admin-email" className="sr-only">Email address</label>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 flex h-11 w-9 items-center justify-center">
            <Mail className="size-4 text-editor-text-faint" />
          </div>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            autoComplete="username"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-password" className="sr-only">Password</label>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 flex h-11 w-9 items-center justify-center">
            <Lock className="size-4 text-editor-text-faint" />
          </div>
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoComplete="current-password"
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-editor-text-faint transition-colors hover:text-editor-text"
          >
            {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-emerald-400" />
          <span className="text-[12px] text-editor-text-muted">Remember me</span>
        </label>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-[12px] font-medium text-editor-text transition-opacity hover:opacity-70"
        >
          Forgot password
        </a>
      </div>

      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.01 } : undefined}
        whileTap={canSubmit ? { scale: 0.98 } : undefined}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-editor-accent text-[13px] font-medium text-editor-on-accent transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            <ShieldCheck className="size-3.5" />
            Sign in to Admin
          </>
        )}
      </motion.button>
    </motion.form>
  );
}