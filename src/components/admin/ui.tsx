"use client";

import { motion } from "motion/react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.03em] text-editor-text">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-[13px] text-editor-text-faint">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </motion.div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-editor-border bg-editor-panel/60 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  hint,
  sparkline,
  icon: Icon,
  index = 0,
}: {
  label: string;
  value: string;
  change: number;
  hint: string;
  sparkline: number[];
  icon: LucideIcon;
  index?: number;
}) {
  const max = Math.max(...sparkline, 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -2 }}
      className="group rounded-xl border border-editor-border bg-editor-panel/60 p-4 transition-colors hover:border-editor-border-strong"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-lg bg-editor-surface-2 text-editor-text-faint transition-colors group-hover:text-editor-accent">
          <Icon className="size-4" />
        </div>
        <span
          className={`flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
            change >= 0
              ? "bg-primary/30 "
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {change >= 0 ? (
            <TrendingUp className="size-2.5" />
          ) : (
            <TrendingDown className="size-2.5" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="mt-4 text-[24px] font-semibold tracking-[-0.02em] text-editor-text tabular-nums">
        {value}
      </p>
      <p className="mt-0.5 text-[12px] font-medium text-editor-text-muted">{label}</p>
      <p className="text-[11px] text-editor-text-faint">{hint}</p>
      <div className="mt-3 flex h-8 items-end gap-0.5">
        {sparkline.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-primary/40 transition-colors group-hover:bg-primary/60"
            style={{ height: `${(v / max) * 100}%`, opacity: 0.35 + (i / sparkline.length) * 0.65 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

const badgeTones: Record<string, string> = {
  active: "bg-primary/30 ",
  published: "bg-primary/30 ",
  approved: "bg-primary/30 ",
  live: "bg-primary/30 ",
  superadmin: "bg-amber-400/15 text-amber-400",
  admin: "bg-sky-400/15 text-sky-400",
  invited: "bg-sky-400/15 text-sky-400",
  suspended: "bg-red-500/10 text-red-400",
  draft: "bg-white/[0.06] text-editor-text-faint",
  review: "bg-amber-400/15 text-amber-400",
  pending: "bg-amber-400/15 text-amber-400",
  spam: "bg-red-500/10 text-red-400",
  beta: "bg-indigo-400/15 text-indigo-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
        badgeTones[status.toLowerCase()] ?? "bg-white/[0.06] text-editor-text-faint"
      }`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

const avatarPalette = [
  "bg-primary/20 ",
  "bg-sky-400/20 text-sky-400",
  "bg-amber-400/20 text-amber-400",
  "bg-indigo-400/20 text-indigo-400",
  "bg-emerald-400/20 text-emerald-400",
];

export function Avatar({ name, index = 0 }: { name: string; index?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
        avatarPalette[index % avatarPalette.length]
      }`}
    >
      {initials}
    </div>
  );
}

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
}

export function DataTable<T>({
  columns,
  rows,
  emptyLabel = "Nothing here yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  emptyLabel?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-editor-border">
            {columns.map((c) => (
              <th
                key={c.key}
                className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-editor-text-faint ${
                  c.className ?? ""
                }`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-[12px] text-editor-text-faint"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={String((row as { id?: string }).id ?? i)}
                className="border-b border-editor-border/60 transition-colors last:border-0 hover:bg-editor-hover/40"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-4 py-3 text-[12px] text-editor-text-2 ${c.className ?? ""}`}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}