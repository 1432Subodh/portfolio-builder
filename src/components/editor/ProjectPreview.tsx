"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monitor, Laptop, Tablet, Smartphone, ArrowLeft, Loader2, AlertTriangle, ExternalLink } from "lucide-react";
import { PortfolioPreview } from "./PortfolioCanvas";
import { useGetProjectQuery } from "@/lib/redux/api/projectsApi";
import type { DeviceMode } from "./types";

const deviceWidths: Record<DeviceMode, string> = {
  desktop: "1440px",
  laptop: "1280px",
  tablet: "768px",
  mobile: "390px",
};

const previewDevices: { id: DeviceMode; label: string; icon: React.ElementType }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "laptop", label: "Laptop", icon: Laptop },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

export function ProjectPreview({
  projectId,
  embed = false,
}: {
  projectId: string;
  embed?: boolean;
}) {
  const { data: project, isLoading, isError } = useGetProjectQuery(projectId);
  const router = useRouter();
  const [device, setDevice] = useState<DeviceMode>("desktop");

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-3 bg-editor-bg text-editor-text">
        <Loader2 className="size-6 animate-spin text-editor-text-faint" />
        <p className="text-[12px] text-editor-text-ghost">Loading preview…</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-editor-bg px-6">
        <AlertTriangle className="size-7 text-editor-text-faint" />
        <p className="text-[13px] font-medium text-editor-text">Project not found</p>
        <p className="text-[11.5px] text-editor-text-ghost text-center max-w-sm">
          This project doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <Link
          href="/user/projects"
          className="rounded-lg bg-editor-accent px-4 py-2 text-[12px] font-medium text-editor-on-accent hover:opacity-90 transition-opacity"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  if (embed) {
    return (
      <div className="h-screen w-screen overflow-auto bg-white">
        <PortfolioPreview
          sections={project.sections ?? []}
          deviceMode="desktop"
        />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-editor-border bg-editor-panel px-3 py-2 shrink-0 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => router.push(`/user/${projectId}/editor`)}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium text-editor-text-muted transition-colors hover:bg-editor-hover hover:text-editor-text"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to editor
          </button>
          <div className="h-4 w-px bg-editor-border shrink-0" />
          <p className="text-[11px] font-medium text-editor-text truncate">
            {project.name}
          </p>
          <span className="hidden sm:inline text-[10px] text-editor-text-faint rounded-full border border-editor-border-strong px-2 py-0.5">
            Preview
          </span>
        </div>

        <div className="flex items-center gap-0.5 rounded-lg bg-editor-bg p-0.5 shrink-0">
          {previewDevices.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  device === d.id
                    ? "bg-editor-accent text-editor-on-accent shadow-sm"
                    : "text-editor-text-faint hover:text-editor-text-2"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{d.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 min-w-0">
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-editor-text-faint whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-editor-accent" />
            {deviceWidths[device]}px wide
          </span>
          <button
            onClick={() => window.open(window.location.href, "_blank")}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium text-editor-text-muted transition-colors hover:bg-editor-hover hover:text-editor-text whitespace-nowrap"
            title="Open preview in a new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New tab</span>
          </button>
        </div>
      </div>

      {/* Scrollable preview frame */}
      <div className="flex-1 overflow-auto editor-scrollbar scroll-smooth">
        <div className="min-h-full flex items-start justify-center ">
          <div
            className="relative bg-white overflow-hidden transition-all duration-200"
            style={{
              width: deviceWidths[device],
              maxWidth: "100%",
              boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
            }}
          >
            <PortfolioPreview
              sections={project.sections ?? []}
              deviceMode={device}
            />
          </div>
        </div>
      </div>
    </div>
  );
}