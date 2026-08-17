"use client";

import { useEditor } from "./editor-context";
import {
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export function FloatingToolbar() {
  const { state, dispatch } = useEditor();

  if (!state.selectedSectionId) return null;

  const section = state.sections.find((s) => s.id === state.selectedSectionId);
  if (!section) return null;

  const idx = state.sections.findIndex((s) => s.id === state.selectedSectionId);

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 bg-editor-panel border border-editor-border-strong rounded-lg shadow-2xl px-1 py-0.5">
      <span className="text-[10px] text-editor-text-muted font-medium px-2 py-1 border-r border-editor-border mr-1">
        {section.name}
      </span>

      {idx > 0 && (
        <button
          onClick={() => dispatch({ type: "REORDER_SECTIONS", fromIndex: idx, toIndex: idx - 1 })}
          className="p-1.5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
          title="Move Up"
        >
          <ArrowUp className="w-3 h-3" />
        </button>
      )}
      {idx < state.sections.length - 1 && (
        <button
          onClick={() => dispatch({ type: "REORDER_SECTIONS", fromIndex: idx, toIndex: idx + 1 })}
          className="p-1.5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
          title="Move Down"
        >
          <ArrowDown className="w-3 h-3" />
        </button>
      )}

      <div className="w-px h-4 bg-editor-border mx-0.5" />

      <button
        onClick={() => dispatch({ type: "DUPLICATE_SECTION", sectionId: state.selectedSectionId! })}
        className="p-1.5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
        title="Duplicate"
      >
        <Copy className="w-3 h-3" />
      </button>

      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY", sectionId: state.selectedSectionId! })}
        className="p-1.5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
        title={section.visible ? "Hide" : "Show"}
      >
        {section.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
      </button>

      <button
        onClick={() => dispatch({ type: "TOGGLE_LOCK", sectionId: state.selectedSectionId! })}
        className="p-1.5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
        title={section.locked ? "Unlock" : "Lock"}
      >
        {section.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
      </button>

      <div className="w-px h-4 bg-editor-border mx-0.5" />

      <button
        onClick={() => dispatch({ type: "DELETE_SECTION", sectionId: state.selectedSectionId! })}
        className="p-1.5 rounded text-editor-text-faint hover:text-red-400 hover:bg-editor-hover transition-colors"
        title="Delete"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}
