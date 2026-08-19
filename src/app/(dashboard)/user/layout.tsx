"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useGetSessionQuery, authApi } from "@/lib/redux/api/authApi";
import { useDispatch } from "react-redux";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Command,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { routes } from "@/lib/routes";
import { useTheme } from "@/components/site/ThemeProvider";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useGetSessionQuery();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleCreate = () => {
    setShowMobileNav(false);
    router.push("/user/projects/new");
  };

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authApi.util.resetApiState());
    void signOut({ callbackUrl: "/signin" });
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainRoutes = routes.filter((r) => r.section === "main");
  const toolRoutes = routes.filter((r) => r.section === "tools");
  const accountRoutes = routes.filter((r) => r.section === "account");

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div className="flex h-screen bg-background text-ink overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col glass-strong transition-all duration-300 ease-out z-30 overflow-hidden shrink-0 ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Logo */}
        <div className={`flex h-14 items-center border-b border-white/[0.06] ${collapsed ? "justify-center px-2" : "justify-start gap-2.5 px-4"}`}>
          <Link href="/user" className={`flex items-center shrink-0 ${collapsed ? "" : "gap-2.5"}`}>
            <img
              src="/logo/clean-logo.png"
              alt="Profilio"
              width={28}
              height={28}
              className="size-7 object-contain shrink-0"
            />
            {!collapsed && (
              <span className="text-[14px] font-semibold tracking-tight whitespace-nowrap">
                Dashboard
              </span>
            )}
          </Link>
        </div>

        {/* New Project */}
        <div className={`p-3 ${collapsed ? "flex justify-center px-0" : ""}`}>
          <button
            onClick={handleCreate}
            className={`flex items-center justify-center rounded-lg gradient-accent text-[12px] font-medium text-on-primary transition-all hover:opacity-90 hover:scale-[1.02] ${collapsed ? "size-8 px-0" : "gap-2 px-3 py-2"}`}
          >
            <Plus className="size-3.5 shrink-0" />
            {!collapsed && "New Project"}
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-1">
          <NavSection title="Navigation" collapsed={collapsed} routes={mainRoutes} pathname={pathname} />
          <NavSection title="Tools" collapsed={collapsed} routes={toolRoutes} pathname={pathname} />
          <NavSection title="Account" collapsed={collapsed} routes={accountRoutes} pathname={pathname} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Bar */}
        <header className="glass-strong h-14 flex items-center justify-between px-4 lg:px-6 border-b border-white/[0.06] z-20 shrink-0">
          {/* Left: Mobile menu + Collapse + Search */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden rounded-md p-1.5 text-ink-faint hover:bg-white/[0.06] hover:text-ink"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>

            {/* Sidebar collapse toggle (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex rounded-md p-1.5 text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>

            {/* Search bar */}
            <button className="hidden sm:flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] text-ink-faint transition-all hover:border-white/[0.12] hover:bg-white/[0.06] w-[240px]">
              <Search className="size-3.5 shrink-0" />
              <span>Search...</span>
              <kbd className="ml-auto flex items-center gap-0.5 rounded border border-white/[0.1] bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-ink-faint font-mono">
                <Command className="size-2.5" />K
              </kbd>
            </button>
          </div>

          {/* Right: Notifications + User */}
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button className="relative rounded-lg p-2 text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary animate-pulse" />
            </button>

            {/* User Avatar Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-white/[0.06]"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="size-7 rounded-full ring-2 ring-white/10 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex size-7 items-center justify-center rounded-full gradient-accent text-[11px] font-semibold text-on-primary">
                    {initials}
                  </div>
                )}
                <span className="hidden sm:block text-[12px] font-medium max-w-[100px] truncate">
                  {session?.user?.name || "User"}
                </span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl glass-strong border border-white/[0.08] shadow-2xl overflow-hidden"
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="text-[13px] font-medium truncate">{session?.user?.name}</p>
                      <p className="text-[11px] text-ink-faint truncate">{session?.user?.email}</p>
                    </div>

                    {/* Theme toggle */}
                    <div className="px-2 py-2 border-b border-white/[0.06]">
                      <p className="px-2 pb-1.5 text-[10px] font-medium text-ink-faint uppercase tracking-wider">Theme</p>
                      <div className="flex gap-1">
                        {([
                          { value: "light" as const, icon: Sun, label: "Light" },
                          { value: "dark" as const, icon: Moon, label: "Dark" },
                          { value: "system" as const, icon: Monitor, label: "System" },
                        ]).map((t) => (
                          <button
                            key={t.value}
                            onClick={() => setTheme(t.value)}
                            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                              theme === t.value
                                ? "bg-primary/20 text-primary"
                                : "text-ink-faint hover:bg-white/[0.06] hover:text-ink"
                            }`}
                          >
                            <t.icon className="size-3" />
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="px-2 py-2">
                      <Link
                        href="/user/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                      >
                        Account Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Navigation Overlay */}
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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] glass-strong z-50 lg:hidden flex flex-col"
            >
              {/* Mobile header */}
              <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-4">
                <Link href="/user" className="flex items-center gap-2.5" onClick={() => setShowMobileNav(false)}>
                  <img
                    src="/logo/clean-logo.png"
                    alt="Profilio"
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                  <span className="text-[14px] font-semibold tracking-tight">Dashboard</span>
                </Link>
                <button
                  onClick={() => setShowMobileNav(false)}
                  className="rounded-md p-1.5 text-ink-faint hover:bg-white/[0.06]"
                >
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile New Project */}
              <div className="p-3">
                <button
                  onClick={handleCreate}
                  className="flex items-center justify-center gap-2 rounded-lg gradient-accent px-3 py-2.5 text-[12px] font-medium text-on-primary"
                >
                  <Plus className="size-3.5" />
                  New Project
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 overflow-y-auto px-3 space-y-1">
                <NavSection title="Navigation" collapsed={false} routes={mainRoutes} pathname={pathname} onNavigate={() => setShowMobileNav(false)} />
                <NavSection title="Tools" collapsed={false} routes={toolRoutes} pathname={pathname} onNavigate={() => setShowMobileNav(false)} />
                <NavSection title="Account" collapsed={false} routes={accountRoutes} pathname={pathname} onNavigate={() => setShowMobileNav(false)} />
              </nav>

              {/* Mobile Sign Out */}
              <div className="border-t border-white/[0.06] p-3">
                <button
                  onClick={handleSignOut}
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

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-white/[0.06] z-30 safe-area-pb">
        <div className="flex items-center justify-around h-14 px-2">
          {mainRoutes.slice(0, 4).map((route) => {
            const active = pathname === route.href || (route.href !== "/user" && pathname.startsWith(route.href));
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                  active ? "text-ink" : "text-ink-faint"
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

function NavSection({
  title,
  collapsed,
  routes: sectionRoutes,
  pathname,
  onNavigate,
}: {
  title: string;
  collapsed: boolean;
  routes: typeof routes;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-0.5">
      <p className={`px-3 pt-3 pb-1 text-[10px] font-semibold text-ink-faint uppercase tracking-[0.12em] whitespace-nowrap transition-opacity duration-200 ${collapsed ? "opacity-0 h-0 pt-0 pb-0 overflow-hidden" : "opacity-100"}`}>
        {title}
      </p>
      {sectionRoutes.map((route) => {
        const active = pathname === route.href || (route.href !== "/user" && pathname.startsWith(route.href));
        return (
          <Link
            key={route.href}
            href={route.href}
            onClick={onNavigate}
            className={`group relative flex items-center rounded-lg transition-all ${
              active
                ? "bg-white/[0.08] text-ink"
                : "text-ink-faint hover:bg-white/[0.06] hover:text-ink"
            } ${collapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2"}`}
            title={collapsed ? route.label : undefined}
          >
            <route.icon className="size-4 shrink-0" />
            {!collapsed && (
              <span className="text-[12px] font-medium whitespace-nowrap">
                {route.label}
              </span>
            )}
            {!collapsed && active && (
              <div className="ml-auto size-1.5 rounded-full bg-primary" />
            )}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-2 rounded-md bg-canvas-night px-2 py-1 text-[11px] font-medium text-ink opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap z-50">
                {route.label}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
