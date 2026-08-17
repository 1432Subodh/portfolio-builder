"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useEditor } from "./editor-context";
import { useTheme } from "@/components/site/ThemeProvider";
import type { GridMode } from "./types";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Grid3x3,
  Magnet,
  Ruler,
  Monitor,
  Tablet,
  Smartphone,
  Laptop,
  Share2,
  Sun,
  Moon,
  Laptop2,
  Check,
} from "lucide-react";

const gridModes: GridMode[] = ["off", "small", "large", "columns"];

type ThemeValue = "system" | "light" | "dark";

const themeOptions: { value: ThemeValue; label: string; icon: React.ElementType }[] = [
  { value: "system", label: "System", icon: Laptop2 },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

function ThemeSwitcher({ isMobile }: { isMobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = themeOptions.find((o) => o.value === theme) ?? themeOptions[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-6 h-6 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
        title={`Theme: ${current.label}`}
      >
        <CurrentIcon className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-32 bg-editor-panel border border-editor-border-strong rounded-lg shadow-xl py-1 z-50">
          {themeOptions.map((o) => {
            const Icon = o.icon;
            const active = theme === o.value;
            return (
              <button
                key={o.value}
                onClick={() => {
                  setTheme(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-[11px] transition-colors ${
                  active
                    ? "text-editor-text bg-editor-hover"
                    : "text-editor-text-muted hover:text-editor-text hover:bg-editor-hover"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="flex-1 text-left">{o.label}</span>
                {active && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function BottomToolbar({ isMobile }: { isMobile?: boolean }) {
  const { state, dispatch } = useEditor();

  const handleZoomIn = useCallback(() => {
    dispatch({ type: "SET_ZOOM", zoom: state.zoom + 10 });
  }, [dispatch, state.zoom]);

  const handleZoomOut = useCallback(() => {
    dispatch({ type: "SET_ZOOM", zoom: state.zoom - 10 });
  }, [dispatch, state.zoom]);

  const handleFit = useCallback(() => {
    dispatch({ type: "SET_ZOOM", zoom: 100 });
  }, [dispatch]);

  const cycleGrid = useCallback(() => {
    const idx = gridModes.indexOf(state.gridMode);
    const next = gridModes[(idx + 1) % gridModes.length];
    dispatch({ type: "SET_GRID_MODE", mode: next });
  }, [dispatch, state.gridMode]);

  return (
    <footer className="h-8 flex items-center justify-between border-t border-editor-border bg-editor-bg px-2 md:px-3 shrink-0 z-50">
      {/* Left: Zoom */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={handleZoomOut}
          className="flex items-center justify-center w-5 h-5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
        >
          <ZoomOut className="w-3 h-3" />
        </button>
        <button
          onClick={handleFit}
          className="text-[10px] text-editor-text-faint hover:text-editor-text tabular-nums px-1 py-0.5 rounded hover:bg-editor-hover transition-colors min-w-[36px] text-center"
        >
          {state.zoom}%
        </button>
        <button
          onClick={handleZoomIn}
          className="flex items-center justify-center w-5 h-5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
        >
          <ZoomIn className="w-3 h-3" />
        </button>
        {!isMobile && (
          <>
            <div className="w-px h-3 bg-editor-border mx-1" />
            <button
              onClick={handleFit}
              className="flex items-center justify-center w-5 h-5 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
              title="Fit to Screen"
            >
              <Maximize className="w-3 h-3" />
            </button>
          </>
        )}
      </div>

      {/* Center: Canvas controls */}
      {!isMobile && (
        <div className="flex items-center gap-0.5">
          <button
            onClick={cycleGrid}
            className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${
              state.gridMode !== "off"
                ? "text-editor-text bg-editor-hover"
                : "text-editor-text-faint hover:text-editor-text hover:bg-editor-hover"
            }`}
            title={`Grid: ${state.gridMode}`}
          >
            <Grid3x3 className="w-3 h-3" />
            <span className="hidden md:inline capitalize">{state.gridMode}</span>
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_RULERS" })}
            className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${
              state.showRulers
                ? "text-editor-text bg-editor-hover"
                : "text-editor-text-faint hover:text-editor-text hover:bg-editor-hover"
            }`}
          >
            <Ruler className="w-3 h-3" />
            <span className="hidden md:inline">Rulers</span>
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_SNAP" })}
            className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-colors ${
              state.snapToGrid
                ? "text-editor-text bg-editor-hover"
                : "text-editor-text-faint hover:text-editor-text hover:bg-editor-hover"
            }`}
          >
            <Magnet className="w-3 h-3" />
            <span className="hidden md:inline">Snap</span>
          </button>
        </div>
      )}

      {/* Right: Device + Theme + Share */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 bg-editor-panel rounded p-0.5">
          {([
            ["desktop", Monitor, "1440"],
            ["laptop", Laptop, "1280"],
            ["tablet", Tablet, "768"],
            ["mobile", Smartphone, "390"],
          ] as const).map(([mode, Icon, size]) => (
            <button
              key={mode}
              onClick={() => dispatch({ type: "SET_DEVICE_MODE", mode })}
              className={`flex items-center gap-1 px-1 md:px-1.5 py-0.5 text-[10px] rounded transition-colors ${
                state.deviceMode === mode
                  ? "bg-editor-accent text-editor-on-accent"
                  : "text-editor-text-faint hover:text-editor-text-2"
              }`}
            >
              <Icon className="w-3 h-3" />
              {!isMobile && <span className="hidden md:inline">{size}</span>}
            </button>
          ))}
        </div>

        <div className="w-px h-3 bg-editor-border" />

        <ThemeSwitcher isMobile={isMobile} />

        {!isMobile && (
          <>
            <div className="w-px h-3 bg-editor-border" />
            <button className="flex items-center gap-1 text-[10px] text-editor-text-muted hover:text-editor-text px-1.5 py-1 rounded hover:bg-editor-hover transition-colors">
              <Share2 className="w-3 h-3" />
              <span className="hidden md:inline">Share</span>
            </button>
          </>
        )}
      </div>
    </footer>
  );
}
