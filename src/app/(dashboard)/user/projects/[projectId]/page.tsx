"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  PenTool,
  Eye,
  Globe,
  Loader2,
  AlertTriangle,
  Trash2,
  Calendar,
  Tag,
  Palette,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import {
  useGetProjectQuery,
  useDeleteProjectMutation,
} from "@/lib/redux/api/projectsApi";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";

export default function ProjectDetailPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  const router = useRouter();
  const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [showDelete, setShowDelete] = useState(false);

  const settings = (project?.settings ?? {}) as Record<string, unknown>;
  const asString = (v: unknown) =>
    typeof v === "string" && v.trim() ? v : null;

  const handleDelete = async () => {
    try {
      await deleteProject(projectId).unwrap();
      router.push("/user/projects");
    } catch {
      // keep modal open so the user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-ink-faint" />
        <p className="text-[12px] text-ink-faint">Loading project…</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
        <AlertTriangle className="size-8 text-ink-faint" />
        <p className="text-[14px] font-medium text-ink">Project not found</p>
        <p className="text-[12px] text-ink-faint">
          This project doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <Link
          href="/user/projects"
          className="mt-2 rounded-lg gradient-accent px-4 py-2 text-[12px] font-medium text-on-primary transition-all hover:opacity-90"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  const metaItems = [
    {
      icon: Tag,
      label: "Template",
      value: asString(project.template) ?? "blank",
    },
    {
      icon: Calendar,
      label: "Created",
      value: new Date(project.createdAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      icon: Calendar,
      label: "Last updated",
      value: new Date(project.updatedAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
    {
      icon: Palette,
      label: "Category",
      value: asString(settings.category) ?? "General",
    },
    {
      icon: Palette,
      label: "Accent color",
      value: asString(settings.accentColor) ?? "—",
      swatch: asString(settings.accentColor) ?? null,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 max-w-[1400px] mx-auto">
      {/* Back */}
      <Link
        href="/user/projects"
        className="mb-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-faint transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" />
        Back to projects
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="truncate text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em]">
              {project.name}
            </h1>
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                project.published
                  ? "bg-primary/15 text-primary"
                  : "bg-white/[0.06] text-ink-faint"
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
          <p className="mt-1 text-[12.5px] text-ink-faint truncate">
            {asString(settings.tagline) ?? project.slug}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/user/${projectId}/preview`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-ink transition-all hover:border-white/[0.16] hover:bg-white/[0.06]"
          >
            <Eye className="size-3.5" />
            Preview
            <ExternalLink className="size-3 text-ink-faint" />
          </Link>
          <Link
            href={`/user/${projectId}/editor`}
            className="flex items-center gap-1.5 rounded-lg gradient-accent px-3.5 py-2 text-[12px] font-medium text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90"
          >
            <PenTool className="size-3.5" />
            Open Editor
          </Link>
        </div>
      </motion.div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-[13px] font-semibold text-ink">About</h2>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-faint">
              {asString(settings.description) ||
                "No description added yet. Open the editor to start building your portfolio."}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span
                className="size-3.5 rounded-full"
                style={{
                  backgroundColor: asString(settings.accentColor) ?? "#0ea5e9",
                }}
              />
              <span className="text-[11px] text-ink-faint">
                {asString(settings.accentColor) ?? "#0ea5e9"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-[13px] font-semibold text-ink">Details</h2>
            <div className="mt-3 space-y-3">
              {metaItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-2 text-[11.5px] text-ink-faint">
                      <Icon className="size-3.5" />
                      {item.label}
                    </span>
                    <span className="flex min-w-0 items-center gap-1.5 text-[12px] font-medium text-ink truncate">
                      {"swatch" in item && item.swatch && (
                        <span
                          className="size-3 rounded-full"
                          style={{ backgroundColor: item.swatch }}
                        />
                      )}
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Preview iframe */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="min-w-0"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-ink">
              Website preview
            </h2>
            <Link
              href={`/user/${projectId}/preview`}
              target="_blank"
              className="flex items-center gap-1 text-[11.5px] font-medium text-ink-faint transition-colors hover:text-primary"
            >
              Open full preview
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#15171a] px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-amber-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 flex-1 truncate rounded-md bg-white/[0.05] px-3 py-1 text-[10.5px] text-ink-faint">
                /user/{projectId}/preview
              </span>
            </div>
            <iframe
              src={`/user/${projectId}/preview?embed=1`}
              title={`${project.name} preview`}
              className="h-[560px] w-full bg-white"
            />
          </div>
        </motion.div>
      </div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
              <ShieldAlert className="size-5 text-red-400" />
            </span>
            <div>
              <h2 className="text-[14px] font-semibold text-red-300">
                Danger zone
              </h2>
              <p className="mt-1 max-w-md text-[12px] leading-relaxed text-ink-faint">
                Permanently delete this project and all of its content. This
                action cannot be undone.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDelete(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-[12px] font-medium text-red-300 transition-all hover:bg-red-500/20 hover:text-red-200"
          >
            <Trash2 className="size-3.5" />
            Delete project
          </button>
        </div>
      </motion.div>

      <DeleteProjectModal
        open={showDelete}
        projectName={project.name}
        deleting={isDeleting}
        onClose={() => {
          if (!isDeleting) setShowDelete(false);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
