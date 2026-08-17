"use client";

import { useState, useCallback, useEffect } from "react";
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
import { PanelRightOpen } from "lucide-react";

export function EditorShell() {
  const isMobile = useIsMobile();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // Close sidebars on mobile when viewport changes
  useEffect(() => {
    if (isMobile) {
      setLeftOpen(false);
      setRightOpen(false);
    } else {
      setLeftOpen(true);
      setRightOpen(true);
    }
  }, [isMobile]);

  const toggleLeft = useCallback(() => setLeftOpen((p) => !p), []);
  const toggleRight = useCallback(() => setRightOpen((p) => !p), []);

  return (
    <EditorProvider>
      <div className="h-screen w-screen flex flex-col bg-editor-bg overflow-hidden select-none">
        <TopToolbar
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
            className={`${
              isMobile
                ? `fixed right-0 top-11 bottom-8 z-40 transition-transform duration-200 ${
                    rightOpen ? "translate-x-0" : "translate-x-full"
                  }`
                : `transition-all duration-200 ${rightOpen ? "w-56" : "w-0"}`
            }`}
          >
            <RightPanel isMobile={isMobile} onClose={toggleRight} />
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
