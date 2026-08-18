"use client";

import { useState, useMemo, useCallback } from "react";
import { useEditor } from "./editor-context";
import type { SidebarTab } from "./types";
import {
  Search,
  MousePointerClick,
  Image,
  Video,
  LayoutTemplate,
  Grid3x3,
  Columns3,
  RectangleHorizontal,
  Layers,
  Rocket,
  User,
  Wrench,
  Briefcase,
  Building2,
  GraduationCap,
  Award,
  Quote,
  Headphones,
  Trophy,
  Mail,
  PenTool,
  Images,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  GripVertical,
  LayoutList,
  Component,
} from "lucide-react";
import {
  useGetEditorComponentsQuery,
  type ComponentItem as DbComponentItem,
} from "@/lib/redux/api/adminApi";

interface ComponentItem {
  name: string;
  icon: React.ElementType;
  description: string;
  variants: number;
  component?: DbComponentItem;
}

interface ComponentCategory {
  name: string;
  icon: React.ElementType;
  items: ComponentItem[];
}

function CategorySection({
  category,
  searchQuery,
  defaultOpen = false,
}: {
  category: ComponentCategory;
  searchQuery: string;
  defaultOpen?: boolean;
}) {
  const { dispatch } = useEditor();
  const [open, setOpen] = useState(defaultOpen);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);

  const addComponent = useCallback(
    (item: ComponentItem) => {
      const component = item.component;
      const type = component?.type || item.name.toLowerCase();
      dispatch({
        type: "ADD_SECTION",
        section: {
          id: `${component?.componentSlug ?? type}-${Date.now()}`,
          name: component?.name ?? item.name,
          type,
          componentSlug: component?.componentSlug,
          content: component?.content ?? {},
          theme: component?.theme ?? {},
          initialContent: component?.content ?? {},
          initialTheme: component?.theme ?? {},
          visible: true,
          locked: false,
        },
      });
    },
    [dispatch]
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery) return category.items;
    const q = searchQuery.toLowerCase();
    return category.items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        category.name.toLowerCase().includes(q)
    );
  }, [category, searchQuery]);

  // Auto-open when searching matches
  const isOpen = searchQuery ? filteredItems.length > 0 : open;

  if (filteredItems.length === 0) return null;

  const Icon = category.icon;

  return (
    <div className="px-0.5 relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full px-1.5 py-1 text-[11px] font-medium text-editor-text-faint hover:text-editor-text-2 hover:bg-editor-hover/50 rounded transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="w-3 h-3 shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 shrink-0" />
        )}
        <Icon className="w-3 h-3 shrink-0" />
        <span className="flex-1 text-left">{category.name}</span>
        <span className="text-[9px] text-editor-text-ghost tabular-nums">
          {filteredItems.length}
        </span>
      </button>
      {isOpen && (
        <div className="ml-2.5 border-l border-editor-border pl-1.5 mt-0.5 mb-1">
          {filteredItems.map((item, index) => {
            const ItemIcon = item.icon;
            const isLast = index === filteredItems.length - 1;
            const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
            const showAbove = hoverRect && hoverRect.bottom + 160 > viewportHeight;

            return (
              <div
                key={item.name}
                className="relative overflow-visible"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoverRect(rect);
                  setHoveredItem(item.name);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  setHoverRect(null);
                }}
              >
                {/* Tree connector line */}
                <div className="absolute left-0 top-0 bottom-0 flex items-center">
                  <div
                    className={`w-px bg-editor-border ${
                      isLast ? "h-2.5" : "h-full"
                    }`}
                  />
                </div>
                <button
                  draggable
                  onClick={() => addComponent(item)}
                  className="flex items-center gap-1.5 w-full pl-2.5 pr-1 py-[3px] rounded text-[11px] text-editor-text-muted hover:text-editor-text hover:bg-editor-hover transition-colors group cursor-grab active:cursor-grabbing"
                >
                  <ItemIcon className="w-3 h-3 shrink-0 text-editor-text-faint group-hover:text-editor-text-2 transition-colors" />
                  <span className="flex-1 text-left truncate">{item.name}</span>
                  {item.variants > 1 && (
                    <span className="text-[9px] text-editor-text-ghost">
                      {item.variants}
                    </span>
                  )}
                </button>

                {hoveredItem === item.name && hoverRect && (
                  <div
                    className="fixed left-52 ml-1 z-[100] w-48 bg-editor-panel border border-editor-border-strong rounded-lg shadow-xl p-3 pointer-events-none"
                    style={{
                      left: "208px",
                      ...(showAbove
                        ? { bottom: viewportHeight - hoverRect.top + 8 }
                        : { top: hoverRect.bottom + 8 }),
                    }}
                  >
                    <div className="w-full h-20 bg-editor-surface-2 rounded border border-editor-border flex items-center justify-center mb-2">
                      <ItemIcon className="w-6 h-6 text-editor-text-ghost" />
                    </div>
                    <p className="text-[11px] font-medium text-editor-text">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-editor-text-faint mt-0.5">
                      {item.description}
                    </p>
                    {item.variants > 1 && (
                      <p className="text-[10px] text-editor-text-muted mt-1">
                        {item.variants} variants available
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LayersPanel() {
  const { state, dispatch } = useEditor();

  const sectionIcons: Record<string, React.ElementType> = {
    Navbar: LayoutList,
    Hero: Rocket,
    About: User,
    Skills: Wrench,
    Projects: Briefcase,
    Experience: Building2,
    Education: GraduationCap,
    Testimonials: Quote,
    Services: Headphones,
    Certifications: Award,
    Achievements: Trophy,
    Contact: Mail,
    Blog: PenTool,
    Footer: Layers,
  };

  return (
    <div className="flex-1 flex flex-col editor-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-editor-border/50">
        <span className="text-[10px] text-editor-text-ghost uppercase tracking-wider font-medium">
          Layers
        </span>
        <span className="text-[9px] text-editor-text-ghost tabular-nums bg-editor-panel px-1.5 py-0.5 rounded">
          {state.sections.length}
        </span>
      </div>

      {/* Layer list */}
      <div className="flex-1 overflow-y-auto py-1">
        {state.sections.map((section) => {
          const isSelected = state.selectedSectionId === section.id;
          const isHovered = state.hoveredSectionId === section.id;
          const SectionIcon = sectionIcons[section.name] || Layers;

          return (
            <div
              key={section.id}
              onClick={() =>
                dispatch({
                  type: "SELECT_SECTION",
                  sectionId: isSelected ? null : section.id,
                })
              }
              onMouseEnter={() =>
                dispatch({ type: "HOVER_SECTION", sectionId: section.id })
              }
              onMouseLeave={() =>
                dispatch({ type: "HOVER_SECTION", sectionId: null })
              }
              className={`group relative flex items-center gap-2 mx-1 px-2 py-[5px] text-[11px] rounded-md cursor-pointer transition-all duration-150 ${
                isSelected
                  ? "bg-editor-accent/10 text-editor-text"
                  : isHovered
                  ? "bg-editor-hover text-editor-text-2"
                  : "text-editor-text-muted hover:text-editor-text-2"
              }`}
            >
              {/* Selection indicator */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 rounded-full transition-all duration-150 ${
                  isSelected
                    ? "bg-editor-accent opacity-100"
                    : "bg-transparent opacity-0"
                }`}
              />

              {/* Drag handle */}
              <GripVertical className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-40 transition-opacity cursor-grab text-editor-text-ghost" />

              {/* Section icon */}
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-editor-accent text-editor-on-accent"
                    : "bg-editor-surface-2 text-editor-text-faint group-hover:text-editor-text-2"
                }`}
              >
                <SectionIcon className="w-2.5 h-2.5" />
              </div>

              {/* Section name */}
              <span className="flex-1 truncate font-medium">{section.name}</span>

              {/* Status indicators */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Visibility */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "TOGGLE_VISIBILITY", sectionId: section.id });
                  }}
                  className={`p-0.5 rounded transition-colors ${
                    section.visible
                      ? "text-editor-text-faint hover:text-editor-text-2 hover:bg-editor-active"
                      : "text-editor-text-ghost hover:text-editor-text-faint"
                  }`}
                >
                  {section.visible ? (
                    <Eye className="w-3 h-3" />
                  ) : (
                    <EyeOff className="w-3 h-3" />
                  )}
                </button>

                {/* Lock */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "TOGGLE_LOCK", sectionId: section.id });
                  }}
                  className={`p-0.5 rounded transition-colors ${
                    section.locked
                      ? "text-editor-text-ghost hover:text-editor-text-faint"
                      : "text-editor-text-faint hover:text-editor-text-2 hover:bg-editor-active opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {section.locked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <Unlock className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LeftSidebar({
  isMobile,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const { state, dispatch } = useEditor();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: dbComponents = [], isLoading } = useGetEditorComponentsQuery();

  const dynamicLibrary = useMemo<ComponentCategory[]>(() => {
    const iconByType: Record<string, React.ElementType> = {
      header: LayoutList,
      hero: Rocket,
      about: User,
      skills: Wrench,
      experience: Building2,
      projects: Briefcase,
      testimonials: Quote,
      services: Headphones,
      contact: Mail,
      footer: Layers,
      image: Image,
      video: Video,
      gallery: Images,
      button: MousePointerClick,
      section: LayoutTemplate,
      grid: Grid3x3,
      columns: Columns3,
      card: RectangleHorizontal,
    };
    const grouped = new Map<string, ComponentCategory>();

    dbComponents
      .filter((component) => component.isActive)
      .forEach((component) => {
        const categoryName = component.category?.name ?? "Uploaded";
        const category: ComponentCategory =
          grouped.get(categoryName) ??
          {
            name: categoryName,
            icon: LayoutTemplate,
            items: [] as ComponentItem[],
          };
        const type = component.type ?? "";
        category.items.push({
          name: component.name,
          icon: iconByType[type] ?? Component,
          description: component.description || component.componentSlug || "Uploaded component",
          variants: 1,
          component,
        });
        grouped.set(categoryName, category);
      });

    return Array.from(grouped.values());
  }, [dbComponents]);

  const handleTabChange = useCallback(
    (tab: SidebarTab) => {
      dispatch({ type: "SET_SIDEBAR_TAB", tab });
    },
    [dispatch]
  );

  return (
    <aside className={`h-full flex flex-col border-r border-editor-border bg-editor-bg ${isMobile ? "w-64" : "w-52 shrink-0"}`}>
      {/* Tab switcher */}
      <div className="flex border-b border-editor-border">
        {([
          ["components", "Elements", Component],
          ["layers", "Layers", Layers],
        ] as const).map(([tab, label, Icon]) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium transition-colors border-b-2 ${
              state.sidebarTab === tab
                ? "text-editor-text border-editor-accent"
                : "text-editor-text-faint border-transparent hover:text-editor-text-2"
            }`}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="px-2 text-editor-text-faint hover:text-editor-text"
          >
            ✕
          </button>
        )}
      </div>

      {state.sidebarTab === "components" ? (
        <>
          {/* Search */}
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-editor-text-faint" />
              <input
                type="text"
                placeholder="Search elements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-editor-panel border border-editor-border rounded-md pl-7 pr-8 py-1.5 text-[11px] text-editor-text placeholder:text-editor-text-ghost outline-none focus:border-editor-border-strong transition-colors"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-editor-text-ghost border border-editor-border-strong rounded px-1 py-0.5">
                Ctrl K
              </kbd>
            </div>
          </div>

          {/* Component categories */}
          <div className="flex-1 overflow-y-auto overflow-x-clip editor-scrollbar">
            {isLoading && (
              <div className="px-3 py-2 text-[10px] text-editor-text-ghost">
                Loading uploaded components...
              </div>
            )}
            {!isLoading && dynamicLibrary.length === 0 && (
              <div className="px-3 py-8 text-center text-[11px] leading-relaxed text-editor-text-ghost">
                No uploaded components yet. Add active components from admin.
              </div>
            )}
            {dynamicLibrary.map((category, index) => (
              <CategorySection
                key={category.name}
                category={category}
                searchQuery={searchQuery}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </>
      ) : (
        <LayersPanel />
      )}
    </aside>
  );
}
