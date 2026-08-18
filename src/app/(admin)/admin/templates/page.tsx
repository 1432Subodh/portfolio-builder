"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { adminTemplates } from "@/lib/admin-mock";
import { PageHeader, StatusBadge } from "@/components/admin/ui";

export default function AdminTemplatesPage() {
  return (
    <>
      <PageHeader
        title="Templates"
        description="Curated layouts available to all builders."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {adminTemplates.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            className="group overflow-hidden rounded-xl border border-editor-border bg-editor-panel/60 transition-colors hover:border-editor-border-strong"
          >
            {/* Mockup preview */}
            <div className="relative h-[150px] border-b border-editor-border bg-editor-surface p-4">
              <div className="absolute inset-3 overflow-hidden rounded-lg border border-editor-border bg-editor-panel">
                <div className="h-2 border-b border-editor-border flex items-center gap-1 px-2">
                  <span className="size-1 rounded-full bg-red-400/60" />
                  <span className="size-1 rounded-full bg-yellow-400/60" />
                  <span className="size-1 rounded-full bg-green-400/60" />
                </div>
                <div className="space-y-1.5 p-3">
                  <div className="h-1.5 w-14 rounded bg-editor-border-strong" />
                  <div className="h-1.5 w-10 rounded bg-editor-border" />
                  <div className="mt-3 h-8 rounded bg-primary/30" />
                  <div className="flex gap-1.5">
                    <div className="h-10 flex-1 rounded bg-editor-border" />
                    <div className="h-10 flex-1 rounded bg-editor-border" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold">{t.name}</p>
                  <p className="text-[11px] text-editor-text-faint mt-0.5">{t.category}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-editor-border pt-3 text-[11px] text-editor-text-faint">
                <span>{t.usage.toLocaleString()} uses</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="size-3 fill-current" />
                  {t.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}