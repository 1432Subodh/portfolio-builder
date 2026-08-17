"use client";

import { useEffect, useCallback, useState, useMemo } from "react";
import { useEditor } from "./editor-context";
import {
  Search,
  Rocket,
  User,
  Wrench,
  Briefcase,
  Building2,
  Quote,
  Mail,
  Grid3x3,
  Maximize,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Layers,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
}

export function CommandPalette() {
  const { state, dispatch } = useEditor();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = useMemo(
    () => [
      { id: "add-hero", label: "Add Hero Section", category: "Add Section", icon: Rocket, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `hero-${Date.now()}`, name: "Hero", type: "hero", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "add-about", label: "Add About Section", category: "Add Section", icon: User, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `about-${Date.now()}`, name: "About", type: "about", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "add-skills", label: "Add Skills Section", category: "Add Section", icon: Wrench, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `skills-${Date.now()}`, name: "Skills", type: "skills", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "add-projects", label: "Add Projects Section", category: "Add Section", icon: Briefcase, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `projects-${Date.now()}`, name: "Projects", type: "projects", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "add-experience", label: "Add Experience Section", category: "Add Section", icon: Building2, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `exp-${Date.now()}`, name: "Experience", type: "experience", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "add-testimonials", label: "Add Testimonials Section", category: "Add Section", icon: Quote, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `test-${Date.now()}`, name: "Testimonials", type: "testimonials", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "add-contact", label: "Add Contact Section", category: "Add Section", icon: Mail, action: () => { dispatch({ type: "ADD_SECTION", section: { id: `contact-${Date.now()}`, name: "Contact", type: "contact", visible: true, locked: false } }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "toggle-grid", label: "Toggle Grid", category: "View", icon: Grid3x3, action: () => { dispatch({ type: "SET_GRID_MODE", mode: state.gridMode === "off" ? "small" : "off" }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "toggle-rulers", label: "Toggle Rulers", category: "View", icon: Maximize, action: () => { dispatch({ type: "TOGGLE_RULERS" }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "toggle-sidebar", label: "Toggle Layers Panel", category: "View", icon: Layers, action: () => { dispatch({ type: "SET_SIDEBAR_TAB", tab: "layers" }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "device-desktop", label: "Switch to Desktop (1440px)", category: "Device", icon: Monitor, action: () => { dispatch({ type: "SET_DEVICE_MODE", mode: "desktop" }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "device-tablet", label: "Switch to Tablet (768px)", category: "Device", icon: Tablet, action: () => { dispatch({ type: "SET_DEVICE_MODE", mode: "tablet" }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "device-mobile", label: "Switch to Mobile (390px)", category: "Device", icon: Smartphone, action: () => { dispatch({ type: "SET_DEVICE_MODE", mode: "mobile" }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "zoom-fit", label: "Zoom to Fit", category: "Canvas", icon: Maximize, action: () => { dispatch({ type: "SET_ZOOM", zoom: 100 }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
      { id: "deselect", label: "Deselect All", category: "Canvas", icon: Eye, action: () => { dispatch({ type: "SELECT_SECTION", sectionId: null }); dispatch({ type: "TOGGLE_COMMAND_PALETTE" }); } },
    ],
    [dispatch, state.gridMode]
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    filtered.forEach((c) => {
      if (!map.has(c.category)) map.set(c.category, []);
      map.get(c.category)!.push(c);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!state.commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [state.commandPaletteOpen]);

  useEffect(() => {
    if (!state.commandPaletteOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch({ type: "TOGGLE_COMMAND_PALETTE" });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selectedIndex]?.action();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [state.commandPaletteOpen, dispatch, filtered, selectedIndex]);

  if (!state.commandPaletteOpen) return null;

  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-[200] bg-editor-bg/60 flex items-start justify-center pt-[15vh]"
      onClick={() => dispatch({ type: "TOGGLE_COMMAND_PALETTE" })}
    >
      <div
        className="w-full max-w-lg bg-editor-panel border border-editor-border-strong rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-editor-border">
          <Search className="w-4 h-4 text-editor-text-faint" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-editor-text placeholder:text-editor-text-faint outline-none"
          />
          <kbd className="text-[9px] text-editor-text-ghost border border-editor-border-strong rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto editor-scrollbar py-1">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-[11px] text-editor-text-faint">No commands found</p>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([category, cmds]) => (
              <div key={category}>
                <div className="px-3 py-1.5">
                  <p className="text-[9px] font-medium text-editor-text-faint uppercase tracking-wider">
                    {category}
                  </p>
                </div>
                {cmds.map((cmd) => {
                  const idx = flatIndex++;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className={`flex items-center gap-2 w-full px-3 py-1.5 text-[11px] transition-colors ${
                        idx === selectedIndex
                          ? "bg-editor-accent text-editor-on-accent"
                          : "text-editor-text-2 hover:bg-editor-hover"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="flex-1 text-left">{cmd.label}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
