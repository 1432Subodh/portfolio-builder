"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Users,
  FolderKanban,
  ShieldCheck,
  DollarSign,
  UserPlus,
  Globe,
  Flag,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  adminStats,
  adminActivity,
  adminUsers,
  adminChart,
} from "@/lib/admin-mock";
import {
  PageHeader,
  Panel,
  StatCard,
  StatusBadge,
  Avatar,
  DataTable,
  type Column,
} from "@/components/admin/ui";
import type { AdminUser } from "@/lib/admin-mock";

const activityIcons: Record<string, React.ElementType> = {
  user: UserPlus,
  publish: Globe,
  flag: Flag,
  admin: ShieldCheck,
  upgrade: Sparkles,
};

const columns: Column<AdminUser>[] = [
  {
    key: "user",
    header: "User",
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={r.name} index={Number(r.id)} />
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-editor-text truncate">{r.name}</p>
          <p className="text-[11px] text-editor-text-faint truncate">{r.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    render: (r) => (
      <span className="rounded-md bg-editor-surface-2 px-2 py-0.5 text-[11px] font-medium">
        {r.plan}
      </span>
    ),
  },
  {
    key: "projects",
    header: "Projects",
    render: (r) => <span className="tabular-nums">{r.projects}</span>,
  },
  {
    key: "joined",
    header: "Joined",
    render: (r) => <span className="text-editor-text-faint">{r.joined}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export default function AdminDashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const maxViews = Math.max(...adminChart.map((d) => d.views));
  const maxUsers = Math.max(...adminChart.map((d) => d.users));

  return (
    <>
      <PageHeader title="Admin Overview" description={today}>
        <Link
          href="/admin/admins"
          className="flex items-center gap-2 rounded-lg bg-editor-accent px-3 py-2 text-[12px] font-medium text-editor-on-accent transition-opacity hover:opacity-90"
        >
          <UserPlus className="size-3.5" />
          Manage Admins
        </Link>
      </PageHeader>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { icon: Users, label: adminStats[0].label, value: adminStats[0].value, change: adminStats[0].change, hint: adminStats[0].hint, sparkline: adminStats[0].sparkline },
          { icon: FolderKanban, label: adminStats[1].label, value: adminStats[1].value, change: adminStats[1].change, hint: adminStats[1].hint, sparkline: adminStats[1].sparkline },
          { icon: ShieldCheck, label: adminStats[2].label, value: adminStats[2].value, change: adminStats[2].change, hint: adminStats[2].hint, sparkline: adminStats[2].sparkline },
          { icon: DollarSign, label: adminStats[3].label, value: adminStats[3].value, change: adminStats[3].change, hint: adminStats[3].hint, sparkline: adminStats[3].sparkline },
        ].map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Activity */}
        <Panel className="p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold">Recent Activity</h3>
            <span className="text-[11px] text-editor-text-faint">Live</span>
          </div>
          <div className="space-y-0">
            {adminActivity.map((a, i) => {
              const Icon = activityIcons[a.type] ?? UserPlus;
              return (
                <div key={i} className="relative flex items-start gap-3 py-2.5">
                  {i < adminActivity.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-px bg-editor-border" />
                  )}
                  <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-editor-surface-2 shrink-0">
                    <Icon className="size-3 text-editor-text-faint" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] text-editor-text-2 truncate">{a.message}</p>
                    <p className="text-[10px] text-editor-text-faint mt-0.5">
                      {a.meta} · {a.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        {/* Chart */}
        <Panel className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[13px] font-semibold">Platform Activity</h3>
              <p className="text-[11px] text-editor-text-faint mt-0.5">Last 14 days</p>
            </div>
            <div className="flex gap-3 text-[10px] text-editor-text-faint">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" /> Views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-editor-text-muted" /> Users
              </span>
            </div>
          </div>

          <div className="relative h-[220px]">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-px bg-editor-border/60" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-end gap-[2px] sm:gap-1.5">
              {adminChart.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-px">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.views / maxViews) * 100}%` }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.02, ease: "easeOut" }}
                    className="w-full rounded-t-sm bg-primary/50 hover:bg-primary/80 transition-colors"
                    title={`${d.date}: ${d.views} views`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.users / maxUsers) * 100}%` }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.02, ease: "easeOut" }}
                    className="w-full rounded-t-sm bg-editor-text-muted/60 hover:bg-editor-text-muted transition-colors"
                    title={`${d.date}: ${d.users} users`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-editor-text-ghost">
            <span>{adminChart[0]?.date}</span>
            <span>{adminChart[Math.floor(adminChart.length / 2)]?.date}</span>
            <span>{adminChart[adminChart.length - 1]?.date}</span>
          </div>
        </Panel>
      </div>

      {/* Recent signups */}
      <Panel>
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h3 className="text-[13px] font-semibold">Recent Signups</h3>
          <Link
            href="/admin/users"
            className="flex items-center gap-1 text-[11px] font-medium text-editor-text-faint transition-colors hover:text-editor-text"
          >
            View all <ChevronRight className="size-3" />
          </Link>
        </div>
        <DataTable columns={columns} rows={adminUsers.slice(0, 5)} />
      </Panel>
    </>
  );
}