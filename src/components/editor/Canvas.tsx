"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useEditor } from "./editor-context";
import { PortfolioCanvas } from "./PortfolioCanvas";
import { Plus } from "lucide-react";

const deviceWidths = {
  desktop: "1440px",
  laptop: "1280px",
  tablet: "768px",
  mobile: "390px",
};

function Ruler({ vertical = false }: { vertical?: boolean }) {
  const marks = vertical
    ? Array.from({ length: 30 }, (_, i) => i * 100)
    : Array.from({ length: 40 }, (_, i) => i * 100);

  return (
    <div
      className={`absolute z-20 bg-editor-bg/80 backdrop-blur-sm ${
        vertical
          ? "left-0 top-0 bottom-0 w-6 border-r border-editor-border"
          : "top-0 left-0 right-0 h-6 border-b border-editor-border"
      }`}
    >
      {vertical ? (
        <div className="relative h-full">
          {marks.map((m) => (
            <div
              key={m}
              className="absolute right-0 flex items-center"
              style={{ top: `${m}px` }}
            >
              <span className="text-[8px] text-editor-text-ghost mr-0.5 tabular-nums">
                {m}
              </span>
              <div className="w-1.5 h-px bg-editor-text-ghost" />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-full">
          {marks.map((m) => (
            <div
              key={m}
              className="absolute bottom-0 flex flex-col items-center"
              style={{ left: `${m}px` }}
            >
              <div className="h-1.5 w-px bg-editor-text-ghost" />
              <span className="text-[8px] text-editor-text-ghost tabular-nums">
                {m}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GridOverlay({ mode }: { mode: string }) {
  if (mode === "off") return null;

  const gridSize = mode === "small" ? 20 : mode === "large" ? 100 : 80;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage:
          mode === "columns"
            ? `repeating-linear-gradient(90deg, transparent, transparent calc(100% - 1px), rgba(128,128,128,0.08) calc(100% - 1px), rgba(128,128,128,0.08) 100%)`
            : `linear-gradient(rgba(128,128,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.06) 1px, transparent 1px)`,
        backgroundSize:
          mode === "columns"
            ? undefined
            : `${gridSize}px ${gridSize}px`,
      }}
    />
  );
}

function InsertionPoint({ afterId }: { afterId: string }) {
  const { dispatch } = useEditor();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-0 flex items-center justify-center z-30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <div className="absolute inset-x-0 -top-3 flex items-center justify-center gap-2">
          <div className="flex-1 h-px bg-editor-accent/30" />
          <button
            onClick={() => {
              const section = {
                id: `section-${Date.now()}`,
                name: "New Section",
                type: "section",
                visible: true,
                locked: false,
              };
              dispatch({ type: "ADD_SECTION", section, afterId });
            }}
            className="flex items-center gap-1 px-2 py-0.5 bg-editor-accent text-editor-on-accent text-[10px] font-medium rounded shadow-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3 h-3" />
            Add Section
          </button>
          <div className="flex-1 h-px bg-editor-accent/30" />
        </div>
      ) : (
        <div className="absolute inset-x-0 -top-px h-px bg-transparent hover:bg-editor-accent/20 cursor-pointer" />
      )}
    </div>
  );
}

export function Canvas() {
  const { state, dispatch } = useEditor();
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        dispatch({ type: "SET_ZOOM", zoom: state.zoom + delta });
      }
    },
    [dispatch, state.zoom]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget || e.target === contentRef.current) {
        dispatch({ type: "SELECT_SECTION", sectionId: null });
        dispatch({ type: "HIDE_CONTEXT_MENU" });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        dispatch({ type: "TOGGLE_COMMAND_PALETTE" });
      }
      if (e.key === "Escape") {
        dispatch({ type: "SELECT_SECTION", sectionId: null });
        dispatch({ type: "HIDE_CONTEXT_MENU" });
        if (state.commandPaletteOpen) {
          dispatch({ type: "TOGGLE_COMMAND_PALETTE" });
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dispatch, state.commandPaletteOpen]);

  return (
    <div
      ref={canvasRef}
      className="flex-1 overflow-auto bg-editor-surface relative editor-scrollbar"
      onWheel={handleWheel}
      onClick={handleCanvasClick}
    >
      {state.showRulers && (
        <>
          <Ruler />
          <Ruler vertical />
        </>
      )}

      <GridOverlay mode={state.gridMode} />

      <div
        className={`min-h-full flex items-start justify-center py-16 px-8 ${
          state.showRulers ? "pl-12 pt-12" : ""
        }`}
        ref={contentRef}
        onClick={handleCanvasClick}
      >
        <div
          className="transition-all duration-200 ease-out"
          style={{
            width: deviceWidths[state.deviceMode],
            maxWidth: "100%",
            transform: `scale(${state.zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <InsertionPoint afterId="" />

          <div className="bg-background rounded-sm shadow-[0_0_0_1px_var(--editor-border),0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden relative">
            <PortfolioCanvas />
          </div>

          <InsertionPoint afterId={state.sections[state.sections.length - 1]?.id ?? ""} />
        </div>
      </div>
    </div>
  );
}
