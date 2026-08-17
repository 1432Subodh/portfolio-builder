"use client";

import { useCallback, useState } from "react";
import { useEditor } from "./editor-context";
import type { DeviceMode, EditorMode } from "./types";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Laptop,
  Share2,
  Upload,
  Check,
  Loader2,
  Circle,
  ChevronRight,
  Layout,
  Type,
  SmartphoneIcon,
  Wand2,
  Search,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import Image from "next/image";

const editorModes: { id: EditorMode; label: string; icon: React.ElementType }[] = [
  { id: "design", label: "Design", icon: Layout },
  { id: "content", label: "Content", icon: Type },
  { id: "responsive", label: "Responsive", icon: SmartphoneIcon },
  { id: "animation", label: "Animation", icon: Wand2 },
];

const deviceModes: { id: DeviceMode; icon: React.ElementType; label: string }[] = [
  { id: "desktop", icon: Monitor, label: "1440px" },
  { id: "laptop", icon: Laptop, label: "1280px" },
  { id: "tablet", icon: Tablet, label: "768px" },
  { id: "mobile", icon: Smartphone, label: "390px" },
];

interface TopToolbarProps {
  isMobile: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  leftOpen: boolean;
  rightOpen: boolean;
}

export function TopToolbar({
  isMobile,
  onToggleLeft,
  onToggleRight,
  leftOpen,
  rightOpen,
}: TopToolbarProps) {
  const { state, dispatch } = useEditor();
  const [projectName, setProjectName] = useState("My Portfolio");

  const handleSave = useCallback(() => {
    dispatch({ type: "SET_SAVE_STATUS", status: "saving" });
    setTimeout(() => {
      dispatch({ type: "SET_SAVE_STATUS", status: "saved" });
    }, 1200);
  }, [dispatch]);

  return (
    <header className="h-11 flex items-center justify-between border-b border-editor-border bg-editor-bg px-2 shrink-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {/* Mobile toggle buttons */}
        {isMobile && (
          <>
            <button
              onClick={onToggleLeft}
              className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors shrink-0 ${
                leftOpen
                  ? "text-editor-text bg-editor-hover"
                  : "text-editor-text-muted hover:text-editor-text hover:bg-editor-hover"
              }`}
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-editor-border shrink-0" />
          </>
        )}

        {!isMobile && (
          <>
            <button className="flex items-center justify-center w-7 h-7 rounded-md text-editor-text-muted hover:text-editor-text hover:bg-editor-hover transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-editor-border shrink-0" />
          </>
        )}

        <div className="flex items-center gap-1.5 min-w-0 shrink-0">
          <div className="w-5 h-5  flex items-center justify-center shrink-0">
            <Image src={'/logo/clean-logo.png'} width={50} height={50} alt=""/>
          </div>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent text-[13px] font-medium text-editor-text border-none outline-none w-[100px] md:w-[120px] truncate hover:bg-editor-hover focus:bg-editor-hover rounded px-1.5 py-0.5 transition-colors"
          />
        </div>

        {!isMobile && (
          <>
            <div className="w-px h-4 bg-editor-border shrink-0" />
            {/* Breadcrumb */}
            <nav className="flex items-center gap-0.5 text-[11px] text-editor-text-ghost min-w-0 overflow-hidden">
              <span className="text-editor-text-ghost shrink-0">Profilio</span>
              {state.breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-0.5 min-w-0 shrink">
                  <ChevronRight className="w-3 h-3 text-editor-text-ghost shrink-0" />
                  <span
                    className={`truncate ${
                      i === state.breadcrumb.length - 1 ? "text-editor-text-2 font-medium" : ""
                    }`}
                  >
                    {crumb}
                  </span>
                </span>
              ))}
            </nav>
          </>
        )}
      </div>

      {/* Center - Editor mode switcher */}
      {!isMobile && (
        <div className="flex items-center gap-0.5 bg-editor-panel rounded-lg p-0.5 shrink-0">
          {editorModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => dispatch({ type: "SET_EDITOR_MODE", mode: mode.id })}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  state.editorMode === mode.id
                    ? "bg-editor-accent text-editor-on-accent shadow-sm"
                    : "text-editor-text-faint hover:text-editor-text-2"
                }`}
              >
                <Icon className="w-3 h-3" />
                {mode.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-1 shrink-0">
        {!isMobile && (
          <>
            {/* Undo/Redo */}
            <div className="flex items-center gap-0.5">
              <button
                className="flex items-center justify-center w-7 h-7 rounded-md text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                className="flex items-center justify-center w-7 h-7 rounded-md text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-px h-4 bg-editor-border" />

            {/* Command palette */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_COMMAND_PALETTE" })}
              className="flex items-center gap-1.5 text-[11px] text-editor-text-faint hover:text-editor-text-2 px-2 py-1 rounded-md hover:bg-editor-hover transition-colors"
            >
              <Search className="w-3 h-3" />
            </button>

            <div className="w-px h-4 bg-editor-border" />

            <button className="flex items-center gap-1.5 text-[11px] text-editor-text-muted hover:text-editor-text px-2 py-1.5 rounded-md hover:bg-editor-hover transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </>
        )}

        <button
          onClick={handleSave}
          className="flex items-center gap-1 text-[11px] text-editor-text-faint hover:text-editor-text-2 px-2 py-1 rounded-md hover:bg-editor-hover transition-colors"
        >
          {state.saveStatus === "saved" && (
            <>
              <Check className="w-3 h-3 text-editor-text-muted" />
              {!isMobile && <span>Saved</span>}
            </>
          )}
          {state.saveStatus === "saving" && (
            <>
              <Loader2 className="w-3 h-3 animate-spin text-editor-text-muted" />
              {!isMobile && <span>Saving...</span>}
            </>
          )}
          {state.saveStatus === "unsaved" && (
            <>
              <Circle className="w-2 h-2 fill-editor-text-faint" />
              {!isMobile && <span>Unsaved</span>}
            </>
          )}
        </button>

        <button className="flex items-center gap-1.5 text-[11px] font-medium bg-editor-accent text-editor-on-accent px-2 md:px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Publish</span>
        </button>

        {/* Mobile right panel toggle */}
        {isMobile && (
          <button
            onClick={onToggleRight}
            className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
              rightOpen
                ? "text-editor-text bg-editor-hover"
                : "text-editor-text-muted hover:text-editor-text hover:bg-editor-hover"
            }`}
          >
            <PanelRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
