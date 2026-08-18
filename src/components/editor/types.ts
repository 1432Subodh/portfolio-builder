export type DeviceMode = "desktop" | "laptop" | "tablet" | "mobile";
export type EditorMode = "design" | "content" | "responsive" | "animation";
export type SaveStatus = "saved" | "saving" | "unsaved";
export type SidebarTab = "components" | "layers";
export type RightPanelTab = "content" | "design" | "layout" | "responsive" | "animation";
export type GridMode = "off" | "small" | "large" | "columns";

export interface EditorSection {
  id: string;
  name: string;
  type: string;
  componentSlug?: string;
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
  initialContent?: Record<string, unknown>;
  initialTheme?: Record<string, unknown>;
  visible: boolean;
  locked: boolean;
}

export interface EditorHistorySnapshot {
  selectedSectionId: string | null;
  sections: EditorSection[];
  saveStatus: SaveStatus;
  breadcrumb: string[];
}

export interface EditorState {
  selectedSectionId: string | null;
  hoveredSectionId: string | null;
  zoom: number;
  deviceMode: DeviceMode;
  editorMode: EditorMode;
  gridMode: GridMode;
  showRulers: boolean;
  showGuides: boolean;
  snapToGrid: boolean;
  sections: EditorSection[];
  saveStatus: SaveStatus;
  sidebarTab: SidebarTab;
  rightPanelTab: RightPanelTab;
  rightPanelOpen: boolean;
  commandPaletteOpen: boolean;
  contextMenu: { x: number; y: number; sectionId: string } | null;
  breadcrumb: string[];
  past: EditorHistorySnapshot[];
  future: EditorHistorySnapshot[];
}

export type EditorAction =
  | { type: "SELECT_SECTION"; sectionId: string | null }
  | { type: "HOVER_SECTION"; sectionId: string | null }
  | { type: "SET_ZOOM"; zoom: number }
  | { type: "SET_DEVICE_MODE"; mode: DeviceMode }
  | { type: "SET_EDITOR_MODE"; mode: EditorMode }
  | { type: "SET_GRID_MODE"; mode: GridMode }
  | { type: "TOGGLE_RULERS" }
  | { type: "TOGGLE_GUIDES" }
  | { type: "TOGGLE_SNAP" }
  | { type: "TOGGLE_VISIBILITY"; sectionId: string }
  | { type: "TOGGLE_LOCK"; sectionId: string }
  | { type: "REORDER_SECTIONS"; fromIndex: number; toIndex: number }
  | { type: "SET_SAVE_STATUS"; status: SaveStatus }
  | { type: "SET_SIDEBAR_TAB"; tab: SidebarTab }
  | { type: "SET_RIGHT_PANEL_TAB"; tab: RightPanelTab }
  | { type: "TOGGLE_RIGHT_PANEL" }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "SHOW_CONTEXT_MENU"; x: number; y: number; sectionId: string }
  | { type: "HIDE_CONTEXT_MENU" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "DELETE_SECTION"; sectionId: string }
  | { type: "DUPLICATE_SECTION"; sectionId: string }
  | { type: "RESET_SECTION"; sectionId: string }
  | { type: "RENAME_SECTION"; sectionId: string; name: string }
  | {
      type: "UPDATE_SECTION_CONTENT";
      sectionId: string;
      key: string;
      value: unknown;
    }
  | {
      type: "UPDATE_SECTION_CONTENT_PATH";
      sectionId: string;
      path: string[];
      value: unknown;
    }
  | {
      type: "UPDATE_SECTION_THEME";
      sectionId: string;
      key: string;
      value: unknown;
    }
  | {
      type: "UPDATE_SECTION_THEME_PATH";
      sectionId: string;
      path: string[];
      value: unknown;
    }
  | { type: "ADD_SECTION"; section: EditorSection; afterId?: string };
