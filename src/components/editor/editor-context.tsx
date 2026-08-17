"use client";

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { EditorAction, EditorState, EditorSection } from "./types";

const defaultSections: EditorSection[] = [
  { id: "navbar", name: "Navbar", type: "navbar", visible: true, locked: false },
  { id: "hero", name: "Hero", type: "hero", visible: true, locked: false },
  { id: "about", name: "About", type: "about", visible: true, locked: false },
  { id: "skills", name: "Skills", type: "skills", visible: true, locked: false },
  { id: "projects", name: "Projects", type: "projects", visible: true, locked: false },
  { id: "experience", name: "Experience", type: "experience", visible: true, locked: false },
  { id: "testimonials", name: "Testimonials", type: "testimonials", visible: true, locked: false },
  { id: "contact", name: "Contact", type: "contact", visible: true, locked: false },
  { id: "footer", name: "Footer", type: "footer", visible: true, locked: false },
];

const initialState: EditorState = {
  selectedSectionId: null,
  hoveredSectionId: null,
  zoom: 100,
  deviceMode: "desktop",
  editorMode: "design",
  gridMode: "off",
  showRulers: false,
  showGuides: true,
  snapToGrid: true,
  sections: defaultSections,
  saveStatus: "saved",
  sidebarTab: "components",
  rightPanelTab: "content",
  rightPanelOpen: true,
  commandPaletteOpen: false,
  contextMenu: null,
  breadcrumb: ["Home"],
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "SELECT_SECTION": {
      const section = state.sections.find((s) => s.id === action.sectionId);
      return {
        ...state,
        selectedSectionId: action.sectionId,
        breadcrumb: section ? ["Home", section.name] : ["Home"],
        contextMenu: null,
      };
    }
    case "HOVER_SECTION":
      return { ...state, hoveredSectionId: action.sectionId };
    case "SET_ZOOM":
      return { ...state, zoom: Math.min(300, Math.max(10, action.zoom)) };
    case "SET_DEVICE_MODE":
      return { ...state, deviceMode: action.mode };
    case "SET_EDITOR_MODE":
      return { ...state, editorMode: action.mode };
    case "SET_GRID_MODE":
      return { ...state, gridMode: action.mode };
    case "TOGGLE_RULERS":
      return { ...state, showRulers: !state.showRulers };
    case "TOGGLE_GUIDES":
      return { ...state, showGuides: !state.showGuides };
    case "TOGGLE_SNAP":
      return { ...state, snapToGrid: !state.snapToGrid };
    case "TOGGLE_VISIBILITY":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, visible: !s.visible } : s
        ),
      };
    case "TOGGLE_LOCK":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, locked: !s.locked } : s
        ),
      };
    case "REORDER_SECTIONS": {
      const next = [...state.sections];
      const [moved] = next.splice(action.fromIndex, 1);
      next.splice(action.toIndex, 0, moved);
      return { ...state, sections: next };
    }
    case "SET_SAVE_STATUS":
      return { ...state, saveStatus: action.status };
    case "SET_SIDEBAR_TAB":
      return { ...state, sidebarTab: action.tab };
    case "SET_RIGHT_PANEL_TAB":
      return { ...state, rightPanelTab: action.tab };
    case "TOGGLE_RIGHT_PANEL":
      return { ...state, rightPanelOpen: !state.rightPanelOpen };
    case "TOGGLE_COMMAND_PALETTE":
      return { ...state, commandPaletteOpen: !state.commandPaletteOpen };
    case "SHOW_CONTEXT_MENU":
      return {
        ...state,
        contextMenu: { x: action.x, y: action.y, sectionId: action.sectionId },
      };
    case "HIDE_CONTEXT_MENU":
      return { ...state, contextMenu: null };
    case "DELETE_SECTION":
      return {
        ...state,
        sections: state.sections.filter((s) => s.id !== action.sectionId),
        selectedSectionId:
          state.selectedSectionId === action.sectionId
            ? null
            : state.selectedSectionId,
      };
    case "DUPLICATE_SECTION": {
      const idx = state.sections.findIndex((s) => s.id === action.sectionId);
      const original = state.sections[idx];
      if (!original) return state;
      const copy: EditorSection = {
        ...original,
        id: `${original.id}-${Date.now()}`,
        name: `${original.name} Copy`,
      };
      const next = [...state.sections];
      next.splice(idx + 1, 0, copy);
      return { ...state, sections: next };
    }
    case "RENAME_SECTION":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, name: action.name } : s
        ),
      };
    case "ADD_SECTION": {
      const next = [...state.sections];
      if (action.afterId) {
        const idx = next.findIndex((s) => s.id === action.afterId);
        next.splice(idx + 1, 0, action.section);
      } else {
        next.push(action.section);
      }
      return { ...state, sections: next };
    }
    default:
      return state;
  }
}

interface EditorContextValue {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
