"use client";

import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Users, Eye, MousePointerClick } from "lucide-react";
import { adminChart } from "@/lib/admin-mock";
import { PageHeader, Panel } from "@/components/admin/ui";

const summary = [
  { icon: Eye, label: "Total Views", value: "18,426", change: 14.2 },
  { icon: Users, label: "Unique Visitors", value: "7,204", change: 9.8 },
  { icon: MousePointerClick, label: "Click-through", value: "2.9%", change: -1.3 },
];

export default function AdminAnalyticsPage() {
  const max = Math.max(...adminChart.map((d) => d.views));

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Aggregated platform usage across all portfolios."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summary.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-xl border border-editor-border bg-editor-panel/60 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-8 items-center justify-center rounded-lg bg-editor-surface-2 text-editor-text-faint">
                <s.icon className="size-4" />
              </span>
              <span
                className={`flex items-center gap-0.5 text-[11px] font-medium ${
                  s.change >= 0 ? "text-primary" : "text-red-400"
                }`}
              >
                {s.change >= 0 ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {Math.abs(s.change)}%
              </span>
            </div>
            <p className="mt-4 text-[24px] font-semibold tracking-[-0.02em] tabular-nums">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-editor-text-faint">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <Panel className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[13px] font-semibold">Page Views — Last 14 days</h3>
            <p className="text-[11px] text-editor-text-faint mt-0.5">Aggregated</p>
          </div>
        </div>
        <div className="relative h-[260px]">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-px bg-editor-border/60" />
            ))}
          </div>
          <div className="absolute inset-0 flex items-end gap-[3px]">
            {adminChart.map((d, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(d.views / max) * 100}%` }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.02, ease: "easeOut" }}
                className="group relative flex-1 rounded-t-sm bg-primary/50 transition-colors hover:bg-primary"
              >
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-editor-border-strong bg-editor-panel px-2 py-1 text-[10px] text-editor-text opacity-0 transition-opacity group-hover:opacity-100">
                  {d.date}: {d.views.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-editor-text-ghost">
          <span>{adminChart[0]?.date}</span>
          <span>{adminChart[Math.floor(adminChart.length / 2)]?.date}</span>
          <span>{adminChart[adminChart.length - 1]?.date}</span>
        </div>
      </Panel>
    </>
  );
}