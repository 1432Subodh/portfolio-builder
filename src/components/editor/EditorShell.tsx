"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { EditorProvider } from "./editor-context";
import { TopToolbar } from "./TopToolbar";
import { LeftSidebar } from "./LeftSidebar";
import { Canvas } from "./Canvas";
import { RightPanel } from "./RightPanel";
import { BottomToolbar } from "./BottomToolbar";
import { ContextMenu } from "./ContextMenu";
import { CommandPalette } from "./CommandPalette";
import { FloatingToolbar } from "./FloatingToolbar";
import { useIsMobile } from "./useIsMobile";
import { Loader2, AlertTriangle } from "lucide-react";
import { PanelRightOpen } from "lucide-react";
import { useGetProjectQuery } from "@/lib/redux/api/projectsApi";

export function EditorShell({ projectId }: { projectId: string }) {
  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectQuery(projectId);
  const isMobile = useIsMobile();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [rightPanelWidth, setRightPanelWidth] = useState(280);
  const [resizingRightPanel, setResizingRightPanel] = useState(false);

  // Close sidebars on mobile when viewport changes
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isMobile) {
        setLeftOpen(false);
        setRightOpen(false);
      } else {
        setLeftOpen(true);
        setRightOpen(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  const toggleLeft = useCallback(() => setLeftOpen((p) => !p), []);
  const toggleRight = useCallback(() => setRightOpen((p) => !p), []);

  const startRightPanelResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setResizingRightPanel(true);
  }, []);

  useEffect(() => {
    if (!resizingRightPanel) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nextWidth = window.innerWidth - e.clientX;
      setRightPanelWidth(Math.min(520, Math.max(240, nextWidth)));
    };
    const stopResize = () => setResizingRightPanel(false);

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResize);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [resizingRightPanel]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-3 bg-editor-bg text-editor-text">
        <Loader2 className="size-6 animate-spin text-editor-text-faint" />
        <p className="text-[12px] text-editor-text-ghost">Loading project…</p>
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

  return (
    <EditorProvider project={project}>
      <div className="h-screen w-screen flex flex-col bg-editor-bg overflow-hidden select-none">
        <TopToolbar
          projectId={projectId}
          isMobile={isMobile}
          onToggleLeft={toggleLeft}
          onToggleRight={toggleRight}
          leftOpen={leftOpen}
          rightOpen={rightOpen}
        />
        <div className="flex flex-1 min-h-0 relative">
          {/* Mobile overlay */}
          {isMobile && leftOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30"
              onClick={toggleLeft}
            />
          )}
          {isMobile && rightOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30"
              onClick={toggleRight}
            />
          )}

          {/* Left Sidebar */}
          <div
            className={`${
              isMobile
                ? `fixed left-0 top-11 bottom-8 z-40 transition-transform duration-200 ${
                    leftOpen ? "translate-x-0" : "-translate-x-full"
                  }`
                : `transition-all duration-200 ${leftOpen ? "w-52" : "w-0"}`
            }`}
          >
            <LeftSidebar isMobile={isMobile} onClose={isMobile ? toggleLeft : undefined} />
          </div>

          {/* Canvas */}
          <div className="flex-1 relative flex flex-col min-w-0">
            <Canvas />
            <FloatingToolbar />
          </div>

          {/* Right Panel */}
          <div
            style={
              isMobile
                ? undefined
                : { width: rightOpen ? rightPanelWidth : 0 }
            }
            className={`relative ${
              isMobile
                ? `fixed right-0 top-11 bottom-8 z-40 transition-transform duration-200 ${
                    rightOpen ? "translate-x-0" : "translate-x-full"
                  }`
                : `${resizingRightPanel ? "" : "transition-[width] duration-200"}`
            }`}
          >
            {!isMobile && rightOpen && (
              <button
                type="button"
                aria-label="Resize right panel"
                onMouseDown={startRightPanelResize}
                className="absolute left-0 top-0 z-50 h-full w-1.5 -translate-x-1/2 cursor-col-resize bg-transparent transition-colors hover:bg-editor-accent/40"
              />
            )}
            <RightPanel isMobile={isMobile} onClose={toggleRight} projectId={projectId} />
          </div>

          {/* Right panel toggle button (desktop only) */}
          {!isMobile && !rightOpen && (
            <button
              onClick={toggleRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-editor-bg border border-editor-border border-r-0 rounded-l-md p-1.5 text-editor-text-faint hover:text-editor-text transition-colors"
            >
              <PanelRightOpen className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <BottomToolbar isMobile={isMobile} />
        <ContextMenu />
        <CommandPalette />
      </div>
    </EditorProvider>
  );
}
