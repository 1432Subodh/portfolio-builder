import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck, Lock, Users, Activity, BarChart3 } from "lucide-react";
import { auth, isAdminRole } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login — Profilio",
  description: "Restricted access. Sign in to the Profilio admin console.",
};

const perks = [
  { icon: Users, label: "User management", desc: "Review signups, plans & access" },
  { icon: BarChart3, label: "Platform analytics", desc: "Monitor usage across portfolios" },
  { icon: Lock, label: "Moderation tools", desc: "Handle content & admin accounts" },
];

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user && isAdminRole(session.user.role)) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-svh bg-editor-bg text-editor-text lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden flex-col overflow-hidden border-r border-editor-border lg:flex">
        <div className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 size-[420px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative flex items-center justify-between p-7">
          <span className="inline-flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-editor-accent text-editor-on-accent">
              <ShieldCheck className="size-4" />
            </span>
            <span className="text-[14px] font-semibold tracking-tight">Profilio Admin</span>
          </span>
          <span className="rounded-full border border-editor-border-strong bg-editor-panel px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-editor-text-faint">
            Restricted
          </span>
        </div>

        <div className="relative mt-auto p-7">
          <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.02em]">
            Oversee the entire
            <br />
            platform from one console.
          </h2>
          <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-editor-text-muted">
            Manage users, projects, templates and admin access — with the tools to
            keep Profilio fast, safe and growing.
          </p>

          <div className="mt-8 space-y-2.5">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-3 rounded-xl border border-editor-border bg-editor-panel/50 px-4 py-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-editor-surface-2 text-editor-text-muted">
                  <perk.icon className="size-3.5" />
                </span>
                <div>
                  <p className="text-[12.5px] font-medium">{perk.label}</p>
                  <p className="text-[11px] text-editor-text-faint">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-2 text-[11px] text-editor-text-faint">
            <Activity className="size-3" />
            All activity on this panel is logged.
          </div>
        </div>
      </div>

      {/* Right — login form */}
      <div className="relative flex flex-col">
        <header className="flex items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-editor-text-muted transition-colors hover:text-editor-text"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Profilio
          </Link>
          <span className="text-[12.5px] font-medium text-editor-text-faint">
            Admin Console
          </span>
        </header>

        <div className="flex flex-1 flex-col justify-center px-6 pb-10 pt-6 sm:px-8">
          <div className="mx-auto w-full max-w-[380px]">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-editor-border-strong bg-editor-panel px-2.5 py-1 text-[10.5px] font-medium text-editor-text-muted">
              <Lock className="size-3" />
              Authorized personnel only
            </div>
            <h1 className="mt-4 text-[28px] font-medium leading-[1.2] tracking-[-0.02em]">
              Admin login
            </h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-editor-text-muted">
              Enter your administrator credentials to continue.
            </p>

            <AdminLoginForm />
          </div>
        </div>

        <footer className="flex items-center justify-between px-6 py-5 text-[11px] text-editor-text-ghost sm:px-8">
          <p>© {new Date().getFullYear()} Profilio Labs, Inc.</p>
          <p>v2.0 — Internal</p>
        </footer>
      </div>
    </main>
  );
}