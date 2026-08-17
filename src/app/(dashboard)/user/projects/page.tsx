"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Globe,
  Eye,
  Trash2,
  MoreHorizontal,
  PenTool,
  Search,
  Filter,
} from "lucide-react";

interface Project {
  _id: string;
  name: string;
  slug: string;
  template: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p._id !== id));
    setShowMenu(null);
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em]">Projects</h1>
            <p className="mt-1 text-[13px] text-ink-mute">All your portfolios in one place.</p>
          </div>
          <Link
            href="/editor"
            className="flex items-center gap-2 rounded-lg gradient-accent px-4 py-2.5 text-[12px] font-medium text-on-primary transition-all hover:opacity-90 hover:scale-[1.02] self-start"
          >
            <Plus className="size-3.5" />
            New Project
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="mt-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-ink-faint" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 py-2 text-[12px] text-ink placeholder:text-ink-faint outline-none transition-all focus:border-primary/40 focus:bg-white/[0.06]"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[12px] text-ink-faint transition-all hover:border-white/[0.12] hover:bg-white/[0.06]">
            <Filter className="size-3.5" />
            Filter
          </button>
        </div>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center glass rounded-2xl py-20"
        >
          <PenTool className="mb-3 size-8 text-ink-faint" />
          <p className="text-[13px] font-medium text-ink-mute">
            {searchQuery ? "No projects match your search" : "No projects yet"}
          </p>
          <p className="mt-1 text-[12px] text-ink-faint">
            {searchQuery ? "Try a different search term" : "Create your first portfolio to get started."}
          </p>
          {!searchQuery && (
            <Link
              href="/editor"
              className="mt-4 flex items-center gap-2 rounded-lg gradient-accent px-4 py-2 text-[12px] font-medium text-on-primary transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              <Plus className="size-3.5" />
              New Project
            </Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-2"
        >
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_100px_100px_80px_32px] sm:grid-cols-[1fr_120px_120px_100px_40px] gap-4 px-4 py-2 text-[10px] sm:text-[11px] font-medium text-ink-faint uppercase tracking-[0.12em]">
            <span>Name</span>
            <span className="hidden sm:block">Status</span>
            <span className="hidden sm:block">Created</span>
            <span>Updated</span>
            <span />
          </div>

          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="group grid grid-cols-[1fr_100px_100px_80px_32px] sm:grid-cols-[1fr_120px_120px_100px_40px] items-center gap-4 glass rounded-xl px-4 py-3 transition-all duration-200 hover:border-white/[0.12]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] shrink-0">
                  <Globe className="size-4 text-ink-faint" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium truncate">{project.name}</p>
                  <p className="text-[11px] text-ink-faint truncate">{project.slug}</p>
                </div>
              </div>

              <span
                className={`hidden sm:inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  project.published
                    ? "bg-primary/15 text-primary"
                    : "bg-white/[0.06] text-ink-faint"
                }`}
              >
                {project.published ? (
                  <><Globe className="size-2.5" /> Published</>
                ) : (
                  <><Eye className="size-2.5" /> Draft</>
                )}
              </span>

              <span className="hidden sm:block text-[11px] text-ink-faint">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>

              <span className="text-[10px] sm:text-[11px] text-ink-faint">
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowMenu(showMenu === project._id ? null : project._id)}
                  className="rounded-md p-1 text-ink-faint opacity-0 transition-all hover:bg-white/[0.06] hover:text-ink group-hover:opacity-100"
                >
                  <MoreHorizontal className="size-4" />
                </button>

                <AnimatePresence>
                  {showMenu === project._id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-8 z-10 w-36 rounded-xl glass-strong border border-white/[0.08] shadow-2xl overflow-hidden"
                    >
                      <Link
                        href={`/editor?id=${project._id}`}
                        className="flex items-center gap-2 px-3 py-2.5 text-[12px] text-ink transition-colors hover:bg-white/[0.06]"
                        onClick={() => setShowMenu(null)}
                      >
                        <PenTool className="size-3.5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="flex w-full items-center gap-2 px-3 py-2.5 text-[12px] text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
