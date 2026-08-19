"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, X, AlertTriangle, Loader2 } from "lucide-react";

export function DeleteProjectModal({
  open,
  projectName,
  deleting,
  onClose,
  onConfirm,
}: {
  open: boolean;
  projectName: string;
  deleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");
  const confirmed = typed === projectName && typed.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleting) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-red-500/20 bg-[#17181c] shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-red-500/10">
                  <Trash2 className="size-4 text-red-400" />
                </div>
                <h2 className="text-[14px] font-semibold text-white">
                  Delete this project?
                </h2>
              </div>
              <button
                onClick={onClose}
                disabled={deleting}
                className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-200 disabled:opacity-40"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2.5">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-400" />
                <p className="text-[11.5px] leading-relaxed text-amber-100/80">
                  This will permanently delete the project and all of its
                  content. This action cannot be undone.
                </p>
              </div>

              <p className="mt-4 text-[12px] text-zinc-300">
                To confirm, type the project name below:
              </p>
              <input
                type="text"
                value={typed}
                disabled={deleting}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && confirmed && !deleting) onConfirm();
                }}
                autoFocus
                placeholder={projectName}
                className="mt-2 w-full rounded-lg border border-white/[0.1] bg-black/40 px-3 py-2.5 text-[12.5px] text-white placeholder:text-zinc-600 outline-none transition-all focus:border-red-400/60 focus:ring-2 focus:ring-red-500/20"
              />
              <div className="mt-2 rounded-md bg-white/[0.04] px-3 py-2">
                <p className="text-[10px] text-zinc-500">
                  Project name to confirm:
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-zinc-200 truncate">
                  {projectName || "—"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] bg-black/20 px-5 py-3.5">
              <button
                onClick={onClose}
                disabled={deleting}
                className="rounded-lg px-3.5 py-2 text-[12px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={!confirmed || deleting}
                className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3.5 py-2 text-[12px] font-medium text-white transition-all hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {deleting ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
                {deleting ? "Deleting..." : "Delete project"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
