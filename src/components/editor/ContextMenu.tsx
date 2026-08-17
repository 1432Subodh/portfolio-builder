"use client";

import { useEffect, useCallback } from "react";
import { useEditor } from "./editor-context";
import {
  Scissors,
  Copy,
  ClipboardPaste,
  Layers,
  Lock,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Bookmark,
  Trash2,
  Pencil,
} from "lucide-react";

interface MenuItem {
  label: string;
  shortcut?: string;
  icon: React.ElementType;
  action: () => void;
  destructive?: boolean;
  separator?: boolean;
}

export function ContextMenu() {
  const { state, dispatch } = useEditor();

  const handleClose = useCallback(() => {
    dispatch({ type: "HIDE_CONTEXT_MENU" });
  }, [dispatch]);

  useEffect(() => {
    if (!state.contextMenu) return;
    const handler = () => handleClose();
    document.addEventListener("click", handler);
    document.addEventListener("contextmenu", handler);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("contextmenu", handler);
    };
  }, [state.contextMenu, handleClose]);

  useEffect(() => {
    if (!state.contextMenu) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [state.contextMenu, handleClose]);

  if (!state.contextMenu) return null;

  const section = state.sections.find((s) => s.id === state.contextMenu!.sectionId);

  // Calculate if menu should show above
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const menuHeight = 420; // Approximate height of context menu
  const menuWidth = 200; // Min width of context menu
  const showAbove = state.contextMenu.y + menuHeight > viewportHeight;
  const showLeft = state.contextMenu.x + menuWidth > viewportWidth;
  const menuY = showAbove ? state.contextMenu.y - menuHeight : state.contextMenu.y;
  const menuX = showLeft ? state.contextMenu.x - menuWidth : state.contextMenu.x;

  const items: MenuItem[] = [
    { label: "Cut", shortcut: "Ctrl+X", icon: Scissors, action: handleClose },
    { label: "Copy", shortcut: "Ctrl+C", icon: Copy, action: handleClose },
    { label: "Paste", shortcut: "Ctrl+V", icon: ClipboardPaste, action: handleClose },
    { label: "Duplicate", shortcut: "Ctrl+D", icon: Layers, action: () => { dispatch({ type: "DUPLICATE_SECTION", sectionId: state.contextMenu!.sectionId }); handleClose(); } },
    { label: "Rename", shortcut: "F2", icon: Pencil, action: handleClose },
    { label: "", icon: Scissors, action: handleClose, separator: true },
    { label: section?.visible ? "Hide" : "Show", icon: section?.visible ? EyeOff : Eye, action: () => { dispatch({ type: "TOGGLE_VISIBILITY", sectionId: state.contextMenu!.sectionId }); handleClose(); } },
    { label: section?.locked ? "Unlock" : "Lock", icon: Lock, action: () => { dispatch({ type: "TOGGLE_LOCK", sectionId: state.contextMenu!.sectionId }); handleClose(); } },
    { label: "", icon: Scissors, action: handleClose, separator: true },
    { label: "Move Up", shortcut: "\u2191", icon: ArrowUp, action: () => { const idx = state.sections.findIndex((s) => s.id === state.contextMenu!.sectionId); if (idx > 0) dispatch({ type: "REORDER_SECTIONS", fromIndex: idx, toIndex: idx - 1 }); handleClose(); } },
    { label: "Move Down", shortcut: "\u2193", icon: ArrowDown, action: () => { const idx = state.sections.findIndex((s) => s.id === state.contextMenu!.sectionId); if (idx < state.sections.length - 1) dispatch({ type: "REORDER_SECTIONS", fromIndex: idx, toIndex: idx + 1 }); handleClose(); } },
    { label: "Save as Template", icon: Bookmark, action: handleClose },
    { label: "", icon: Scissors, action: handleClose, separator: true },
    { label: "Delete", shortcut: "Del", icon: Trash2, action: () => { dispatch({ type: "DELETE_SECTION", sectionId: state.contextMenu!.sectionId }); handleClose(); }, destructive: true },
  ];

  return (
    <div
      className="fixed z-[100]"
      style={{ left: menuX, top: menuY }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-editor-panel border border-editor-border-strong rounded-lg shadow-2xl py-1 min-w-[200px]">
        <div className="px-2.5 py-1.5 border-b border-editor-border">
          <p className="text-[9px] text-editor-text-faint font-medium uppercase tracking-wider">
            {section?.name ?? "Section"}
          </p>
        </div>
        {items.map((item, i) => {
          if (item.separator) {
            return <div key={i} className="my-1 border-t border-editor-border" />;
          }
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center gap-2 w-full px-2.5 py-1.5 text-[11px] transition-colors ${
                item.destructive
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-editor-text-2 hover:text-editor-text hover:bg-editor-hover"
              }`}
            >
              <Icon className="w-3 h-3 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && (
                <span className="text-[9px] text-editor-text-ghost">{item.shortcut}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
