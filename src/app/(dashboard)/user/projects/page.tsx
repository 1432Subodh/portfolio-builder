"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Globe,
  Eye,
  Trash2,
  PenTool,
  Search,
  Layout,
  ArrowUpRight,
  Calendar,
  Layers,
} from "lucide-react";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  type Project,
} from "@/lib/redux/api/projectsApi";
import { PortfolioPreview } from "@/components/editor/PortfolioCanvas";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";

const PREVIEW_W = 1000;
const PREVIEW_H = 620;

function useThumbScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(0.3);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / PREVIEW_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

export default function ProjectsPage() {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id).unwrap();
      setDeleteTarget(null);
    } catch {
      // keep modal open so the user can retry
    }
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
            <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em]">
              Projects
            </h1>
            <p className="mt-1 text-[13px] text-ink-mute">
              All your portfolios in one place.
            </p>
          </div>
          <button
            onClick={() => router.push("/user/projects/new")}
            className="flex items-center gap-2 rounded-lg gradient-accent px-4 py-2.5 text-[12px] font-medium text-on-primary transition-all hover:opacity-90 hover:scale-[1.02] self-start shadow-lg shadow-primary/20"
          >
            <Plus className="size-3.5" />
            New Project
          </button>
        </div>

        {/* Search */}
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
          <span className="text-[11px] text-ink-faint">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-60 animate-pulse rounded-2xl bg-white/[0.03]"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center glass rounded-2xl py-20"
        >
          <Layout className="mb-3 size-8 text-ink-faint" />
          <p className="text-[13px] font-medium text-ink-mute">
            {searchQuery ? "No projects match your search" : "No projects yet"}
          </p>
          <p className="mt-1 text-[12px] text-ink-faint">
            {searchQuery
              ? "Try a different search term"
              : "Create your first portfolio to get started."}
          </p>
          {!searchQuery && (
            <button
              onClick={() => router.push("/user/projects/new")}
              className="mt-4 flex items-center gap-2 rounded-lg gradient-accent px-4 py-2 text-[12px] font-medium text-on-primary transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              <Plus className="size-3.5" />
              New Project
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={i}
              onDelete={() =>
                setDeleteTarget({ id: project._id, name: project.name })
              }
            />
          ))}
        </motion.div>
      )}

      <DeleteProjectModal
        open={Boolean(deleteTarget)}
        projectName={deleteTarget?.name ?? ""}
        deleting={isDeleting}
        onClose={() => {
          if (!isDeleting) setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onDelete,
}: {
  project: Project;
  index: number;
  onDelete: () => void;
}) {
  const router = useRouter();
  const sectionCount = project.sections?.length ?? 0;
  const thumbRef = useRef<HTMLDivElement>(null);
  const scale = useThumbScale(thumbRef);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1"
    >
      {/* Thumbnail — mini live preview of the site */}
      <div
        ref={thumbRef}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.name}`}
        onClick={() => router.push(`/user/projects/${project._id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/user/projects/${project._id}`);
          }
        }}
        className="relative w-full overflow-hidden bg-white text-left cursor-pointer"
      >
        <div className="w-full" style={{ height: Math.max(PREVIEW_H * scale, 120) }} />
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{
            width: PREVIEW_W,
            height: PREVIEW_H,
            transform: `scale(${scale})`,
          }}
        >
          <PortfolioPreview
            sections={project.sections ?? []}
            deviceMode="desktop"
          />
        </div>

        {/* Hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <ArrowUpRight className="size-2.5" /> Open project
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            <Eye className="size-2.5" /> Preview
          </span>
        </div>

        {/* Status badge */}
        <span
          className={`pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-medium backdrop-blur-sm ${
            project.published
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-black/40 text-white/70"
          }`}
        >
          {project.published ? (
            <>
              <Globe className="size-2.5" /> Published
            </>
          ) : (
            <>
              <Eye className="size-2.5" /> Draft
            </>
          )}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3.5 py-3">
        <button
          onClick={() => router.push(`/user/projects/${project._id}`)}
          className="block w-full truncate text-left text-[13px] font-medium text-ink transition-colors hover:text-primary"
        >
          {project.name}
        </button>
        <p className="mt-0.5 truncate text-[10.5px] text-ink-faint">
          {project.slug}
        </p>

        {/* Meta + actions */}
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2.5">
          <div className="flex items-center gap-3 text-[10.5px] text-ink-faint">
            <span className="flex items-center gap-1">
              <Calendar className="size-2.5" />
              {new Date(project.updatedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Layers className="size-2.5" />
              {sectionCount} {sectionCount === 1 ? "section" : "sections"}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Link
              href={`/user/${project._id}/editor`}
              title="Edit"
              className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-white/[0.08] hover:text-primary"
            >
              <PenTool className="size-3.5" />
            </Link>
            <Link
              href={`/user/${project._id}/preview`}
              target="_blank"
              title="Preview"
              className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-white/[0.08] hover:text-primary"
            >
              <Eye className="size-3.5" />
            </Link>
            <button
              onClick={onDelete}
              title="Delete"
              className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
