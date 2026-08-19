"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type {
  EditorAction,
  EditorHistorySnapshot,
  EditorState,
  EditorSection,
} from "./types";
import type { Project } from "@/lib/redux/api/projectsApi";

const defaultSections: EditorSection[] = [];

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
  past: [],
  future: [],
};

const maxHistory = 80;

function cloneRecord(value: Record<string, unknown> | undefined) {
  return value ? JSON.parse(JSON.stringify(value)) as Record<string, unknown> : {};
}

function cloneSections(sections: EditorSection[]) {
  return sections.map((section) => ({
    ...section,
    content: cloneRecord(section.content),
    theme: cloneRecord(section.theme),
    initialContent: cloneRecord(section.initialContent),
    initialTheme: cloneRecord(section.initialTheme),
  }));
}

function makeSnapshot(state: EditorState): EditorHistorySnapshot {
  return {
    selectedSectionId: state.selectedSectionId,
    sections: cloneSections(state.sections),
    saveStatus: state.saveStatus,
    breadcrumb: [...state.breadcrumb],
  };
}

function restoreSnapshot(
  state: EditorState,
  snapshot: EditorHistorySnapshot
): EditorState {
  return {
    ...state,
    selectedSectionId: snapshot.selectedSectionId,
    sections: cloneSections(snapshot.sections),
    saveStatus: snapshot.saveStatus,
    breadcrumb: [...snapshot.breadcrumb],
    contextMenu: null,
  };
}

function isHistoryAction(action: EditorAction) {
  return [
    "TOGGLE_VISIBILITY",
    "TOGGLE_LOCK",
    "REORDER_SECTIONS",
    "DELETE_SECTION",
    "DUPLICATE_SECTION",
    "RESET_SECTION",
    "RENAME_SECTION",
    "UPDATE_SECTION_CONTENT",
    "UPDATE_SECTION_CONTENT_PATH",
    "UPDATE_SECTION_THEME",
    "UPDATE_SECTION_THEME_PATH",
    "ADD_SECTION",
  ].includes(action.type);
}

function setNestedValue(
  source: unknown,
  path: string[],
  value: unknown
): unknown {
  if (path.length === 0) return source;
  const [head, ...tail] = path;
  if (!head) return source;

  if (Array.isArray(source)) {
    const index = Number(head);
    if (!Number.isInteger(index) || index < 0) return source;
    const next = [...source];
    next[index] =
      tail.length === 0
        ? value
        : setNestedValue(next[index] ?? {}, tail, value);
    return next;
  }

  const record =
    source && typeof source === "object" && !Array.isArray(source)
      ? (source as Record<string, unknown>)
      : {};

  if (tail.length === 0) {
    return { ...record, [head]: value };
  }

  const current = record[head];
  return {
    ...record,
    [head]: setNestedValue(
      current ?? {},
      tail,
      value
    ),
  };
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  if (action.type === "UNDO") {
    const previous = state.past.at(-1);
    if (!previous) return state;
    return {
      ...restoreSnapshot(state, previous),
      past: state.past.slice(0, -1),
      future: [makeSnapshot(state), ...state.future].slice(0, maxHistory),
    };
  }

  if (action.type === "REDO") {
    const next = state.future[0];
    if (!next) return state;
    return {
      ...restoreSnapshot(state, next),
      past: [...state.past, makeSnapshot(state)].slice(-maxHistory),
      future: state.future.slice(1),
    };
  }

  const before = isHistoryAction(action) ? makeSnapshot(state) : null;
  const nextState = reduceEditorState(state, action);

  if (!before || nextState === state) return nextState;

  return {
    ...nextState,
    past: [...state.past, before].slice(-maxHistory),
    future: [],
  };
}

function reduceEditorState(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "LOAD_PROJECT":
      return {
        ...createInitialState(action.project),
        zoom: state.zoom,
        deviceMode: state.deviceMode,
        sidebarTab: state.sidebarTab,
        rightPanelTab: state.rightPanelTab,
        rightPanelOpen: state.rightPanelOpen,
      };
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
    case "RESET_SECTION":
      return {
        ...state,
        saveStatus: "unsaved",
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                content: cloneRecord(s.initialContent ?? s.content),
                theme: cloneRecord(s.initialTheme ?? s.theme),
              }
            : s
        ),
      };
    case "RENAME_SECTION":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, name: action.name } : s
        ),
      };
    case "UPDATE_SECTION_CONTENT":
      return {
        ...state,
        saveStatus: "unsaved",
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                content: {
                  ...(s.content ?? {}),
                  [action.key]: action.value,
                },
              }
            : s
        ),
      };
    case "UPDATE_SECTION_CONTENT_PATH":
      return {
        ...state,
        saveStatus: "unsaved",
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                content: setNestedValue(
                  s.content ?? {},
                  action.path,
                  action.value
                ) as Record<string, unknown>,
              }
            : s
        ),
      };
    case "UPDATE_SECTION_THEME":
      return {
        ...state,
        saveStatus: "unsaved",
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                theme: {
                  ...(s.theme ?? {}),
                  [action.key]: action.value,
                },
              }
            : s
        ),
      };
    case "UPDATE_SECTION_THEME_PATH":
      return {
        ...state,
        saveStatus: "unsaved",
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                theme: setNestedValue(
                  s.theme ?? {},
                  action.path,
                  action.value
                ) as Record<string, unknown>,
              }
            : s
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

function createInitialState(project?: Pick<Project, "sections"> | null): EditorState {
  return {
    ...initialState,
    sections: (project?.sections ?? []).map((s) => ({
      ...s,
      visible: s.visible ?? true,
      locked: s.locked ?? false,
    })),
  };
}

export function EditorProvider({
  children,
  project,
}: {
  children: ReactNode;
  project?: Project | null;
}) {
  const [state, dispatch] = useReducer(editorReducer, project, createInitialState);

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
