"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Command,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { adminRoutes, adminSections } from "@/lib/admin-nav";
import { useTheme } from "@/components/site/ThemeProvider";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const activeHref = useMemo(() => {
    const matches = adminRoutes.filter(
      (r) => pathname === r.href || pathname.startsWith(r.href + "/")
    );
    if (!matches.length) return null;
    return matches.reduce((a, b) => (b.href.length > a.href.length ? b : a)).href;
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const name = session?.user?.name || "Admin";
  const email = session?.user?.email || "";
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  return (
    <div className="flex h-screen overflow-hidden bg-editor-bg text-editor-text">
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-editor-border bg-editor-surface/80 transition-all duration-300 z-30 overflow-hidden shrink-0 ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        <div
          className={`flex h-12 items-center border-b border-editor-border ${
            collapsed ? "justify-center px-2" : "justify-between px-3"
          }`}
        >
          <Link href="/admin" className="flex items-center gap-2 min-w-0">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-editor-accent text-editor-on-accent">
              <ShieldCheck className="size-3.5" />
            </span>
            {!collapsed && (
              <span className="text-[13px] font-semibold tracking-tight whitespace-nowrap">
                Admin Console
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-2 space-y-1 editor-scrollbar">
          {adminSections.map((section) => (
            <div key={section.key} className="space-y-0.5">
              <p
                className={`px-2.5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-editor-text-ghost whitespace-nowrap transition-opacity duration-200 ${
                  collapsed ? "opacity-0 h-0 pt-0 pb-0 overflow-hidden" : "opacity-100"
                }`}
              >
                {section.label}
              </p>
              {adminRoutes
                .filter((r) => r.section === section.key)
                .map((route) => {
                  const active = route.href === activeHref;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      title={collapsed ? route.label : undefined}
                      className={`group relative flex items-center rounded-md transition-all ${
                        collapsed ? "justify-center p-2" : "gap-2.5 px-2.5 py-1.5"
                      } ${
                        active
                          ? "bg-editor-active text-editor-text"
                          : "text-editor-text-muted hover:bg-editor-hover hover:text-editor-text"
                      }`}
                    >
                      <route.icon className="size-3.5 shrink-0" />
                      {!collapsed && (
                        <span className="text-[12px] font-medium whitespace-nowrap">
                          {route.label}
                        </span>
                      )}
                      {!collapsed && active && (
                        <span className="ml-auto size-1 rounded-full bg-editor-accent" />
                      )}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full ml-2 rounded-md border border-editor-border-strong bg-editor-panel px-2 py-1 text-[11px] font-medium text-editor-text opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap z-50">
                          {route.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="border-t border-editor-border p-2.5 space-y-1">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium text-editor-text-muted transition-colors hover:bg-editor-hover hover:text-editor-text ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            <ExternalLink className="size-3.5 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">View Website</span>}
          </Link>
          <div
            className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary">
              {initials}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium">{name}</p>
                <p className="truncate text-[10px] text-editor-text-ghost">
                  Super Admin
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-editor-border bg-editor-bg px-3 sm:px-5 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setShowMobileNav(true)}
              className="lg:hidden rounded-md p-1.5 text-editor-text-faint hover:bg-editor-hover hover:text-editor-text"
              aria-label="Open menu"
            >
              <Menu className="size-4.5" />
            </button>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="hidden lg:flex rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>
            <button className="hidden sm:flex items-center gap-2.5 rounded-lg border border-editor-border bg-editor-panel px-3 py-1.5 text-[12px] text-editor-text-ghost transition-all hover:border-editor-border-strong w-[220px]">
              <Search className="size-3.5 shrink-0" />
              <span>Search admin…</span>
              <kbd className="ml-auto flex items-center gap-0.5 rounded border border-editor-border-strong bg-editor-surface-2 px-1 py-0.5 text-[9px] text-editor-text-faint">
                <Command className="size-2" />K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="relative rounded-lg p-2 text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary animate-pulse" />
            </button>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-editor-hover"
              >
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary">
                  {initials}
                </div>
                <span className="hidden sm:block text-[12px] font-medium max-w-[120px] truncate">
                  {name}
                </span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-editor-border-strong bg-editor-panel shadow-2xl"
                  >
                    <div className="border-b border-editor-border px-4 py-3">
                      <p className="text-[13px] font-medium truncate">{name}</p>
                      <p className="flex items-center gap-1 text-[11px] text-editor-text-faint truncate">
                        <ShieldCheck className="size-3" />
                        {email || "admin"}
                      </p>
                    </div>

                    <div className="border-b border-editor-border px-2 py-2">
                      <p className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-editor-text-ghost">
                        Theme
                      </p>
                      <div className="flex gap-1">
                        {(
                          [
                            { value: "light" as const, icon: Sun, label: "Light" },
                            { value: "dark" as const, icon: Moon, label: "Dark" },
                            { value: "system" as const, icon: Monitor, label: "System" },
                          ]
                        ).map((t) => (
                          <button
                            key={t.value}
                            onClick={() => setTheme(t.value)}
                            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                              theme === t.value
                                ? "bg-editor-active text-editor-text"
                                : "text-editor-text-faint hover:bg-editor-hover hover:text-editor-text"
                            }`}
                          >
                            <t.icon className="size-3" />
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="px-2 py-2">
                      <Link
                        href="/"
                        target="_blank"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-editor-text-muted transition-colors hover:bg-editor-hover hover:text-editor-text"
                      >
                        <ExternalLink className="size-3.5" />
                        View Website
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <LogOut className="size-3.5" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto editor-scrollbar">
          <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {showMobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setShowMobileNav(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[240px] border-r border-editor-border bg-editor-surface z-50 lg:hidden flex flex-col"
            >
              <div className="flex h-12 items-center justify-between border-b border-editor-border px-3">
                <Link href="/admin" onClick={() => setShowMobileNav(false)} className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-md bg-editor-accent text-editor-on-accent">
                    <ShieldCheck className="size-3.5" />
                  </span>
                  <span className="text-[13px] font-semibold tracking-tight">Admin Console</span>
                </Link>
                <button
                  onClick={() => setShowMobileNav(false)}
                  className="rounded-md p-1 text-editor-text-faint hover:bg-editor-hover"
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-1 editor-scrollbar">
                {adminSections.map((section) => (
                  <div key={section.key} className="space-y-0.5">
                    <p className="px-2.5 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-editor-text-ghost">
                      {section.label}
                    </p>
                    {adminRoutes
                      .filter((r) => r.section === section.key)
                      .map((route) => {
                        const active = route.href === activeHref;
                        return (
                          <Link
                            key={route.href}
                            href={route.href}
                            onClick={() => setShowMobileNav(false)}
                            className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 ${
                              active
                                ? "bg-editor-active text-editor-text"
                                : "text-editor-text-muted hover:bg-editor-hover hover:text-editor-text"
                            }`}
                          >
                            <route.icon className="size-3.5 shrink-0" />
                            <span className="text-[12px] font-medium">{route.label}</span>
                          </Link>
                        );
                      })}
                  </div>
                ))}
              </nav>
              <div className="border-t border-editor-border p-3">
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-editor-border bg-editor-surface z-30">
        <div className="flex items-center justify-around h-14 px-2">
          {adminRoutes.slice(0, 4).map((route) => {
            const active = route.href === activeHref;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                  active ? "text-editor-text" : "text-editor-text-faint"
                }`}
              >
                <route.icon className="size-4" />
                {route.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}