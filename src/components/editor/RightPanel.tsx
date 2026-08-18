"use client";

import { useState } from "react";
import { useEditor } from "./editor-context";
import type { RightPanelTab } from "./types";
import {
  ChevronDown,
  ChevronRight,
  Type,
  Layout,
  Palette,
  Sparkles,
  Smartphone,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  PanelRightClose,
  RotateCcw,
  Undo2,
  Redo2,
} from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";

type ThemeTab = Exclude<RightPanelTab, "content">;

const tabRoot: Record<ThemeTab, string> = {
  design: "design",
  layout: "layout",
  responsive: "responsive",
  animation: "animation",
};

const panelTabs: { id: RightPanelTab; label: string; icon: React.ElementType }[] = [
  { id: "content", label: "Content", icon: Type },
  { id: "design", label: "Design", icon: Palette },
  { id: "layout", label: "Layout", icon: Layout },
  { id: "responsive", label: "Responsive", icon: Smartphone },
  { id: "animation", label: "Animation", icon: Sparkles },
];

const selectOptions: Record<string, { label: string; value: string }[]> = {
  fontFamily: [
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "System", value: "system-ui, sans-serif" },
    { label: "Serif", value: "Georgia, serif" },
    { label: "Mono", value: "ui-monospace, monospace" },
  ],
  fontWeight: [
    { label: "Regular", value: "400" },
    { label: "Medium", value: "500" },
    { label: "Semibold", value: "600" },
    { label: "Bold", value: "700" },
    { label: "Black", value: "900" },
  ],
  textAlign: [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ],
  style: [
    { label: "Solid", value: "solid" },
    { label: "Dashed", value: "dashed" },
    { label: "Dotted", value: "dotted" },
    { label: "None", value: "none" },
  ],
  display: [
    { label: "Block", value: "block" },
    { label: "Flex", value: "flex" },
    { label: "Grid", value: "grid" },
    { label: "Inline Flex", value: "inline-flex" },
  ],
  direction: [
    { label: "Vertical", value: "column" },
    { label: "Horizontal", value: "row" },
  ],
  alignItems: [
    { label: "Stretch", value: "stretch" },
    { label: "Start", value: "flex-start" },
    { label: "Center", value: "center" },
    { label: "End", value: "flex-end" },
  ],
  justifyContent: [
    { label: "Start", value: "flex-start" },
    { label: "Center", value: "center" },
    { label: "End", value: "flex-end" },
    { label: "Between", value: "space-between" },
    { label: "Around", value: "space-around" },
  ],
  type: [
    { label: "Static", value: "static" },
    { label: "Relative", value: "relative" },
    { label: "Absolute", value: "absolute" },
    { label: "Fixed", value: "fixed" },
    { label: "Sticky", value: "sticky" },
  ],
  entranceType: [
    { label: "None", value: "none" },
    { label: "Fade", value: "fade" },
    { label: "Fade Up", value: "fade-up" },
    { label: "Slide", value: "slide" },
    { label: "Scale", value: "scale" },
  ],
  easing: [
    { label: "Ease Out", value: "ease-out" },
    { label: "Ease In", value: "ease-in" },
    { label: "Ease In Out", value: "ease-in-out" },
    { label: "Linear", value: "linear" },
  ],
  hoverEffect: [
    { label: "None", value: "none" },
    { label: "Lift", value: "lift" },
    { label: "Scale", value: "scale" },
    { label: "Glow", value: "glow" },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatFieldLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fieldValueToString(value: unknown) {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function parseValue(value: string, previous: unknown) {
  if (typeof previous === "number") return Number(value);
  if (typeof previous === "boolean") return value === "true";
  if (typeof previous === "object" && previous !== null) {
    try {
      return JSON.parse(value);
    } catch {
      return previous;
    }
  }
  return value;
}

function numericPart(value: unknown, fallback = 0) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function withUnit(next: number, previous: unknown, fallbackUnit = "px") {
  if (typeof previous === "number") return next;
  if (typeof previous !== "string") return `${next}${fallbackUnit}`;
  const unit = previous.match(/[a-z%]+$/i)?.[0] ?? fallbackUnit;
  return `${next}${unit}`;
}

function isColorKey(key: string, value: unknown) {
  return (
    key.toLowerCase().includes("color") ||
    (typeof value === "string" &&
      (/^#/.test(value) || /^rgba?\(/.test(value) || /^hsla?\(/.test(value)))
  );
}

function sliderConfig(key: string, value: unknown) {
  const lower = key.toLowerCase();
  if (typeof value === "number" || /opacity/.test(lower)) {
    return { min: 0, max: lower.includes("opacity") ? 1 : 100, step: 0.01 };
  }
  if (/duration|delay/.test(lower)) return { min: 0, max: 3000, step: 50 };
  if (/fontsize|radius|width|height|gap|padding|margin|top|right|bottom|left/.test(lower)) {
    return { min: 0, max: 240, step: 1 };
  }
  if (/letterspacing/.test(lower)) return { min: -5, max: 20, step: 0.5 };
  return null;
}

function PropertyGroup({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-editor-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 text-[11px] font-medium text-editor-text-muted hover:text-editor-text transition-colors"
      >
        {open ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
        {Icon && <Icon className="w-3 h-3 shrink-0" />}
        <span className="flex-1 text-left">{title}</span>
      </button>
      {open && <div className="px-3 pb-3 space-y-2">{children}</div>}
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1 min-w-0">
      <label className="block text-[10px] text-editor-text-faint truncate">
        {label}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-w-0 bg-editor-panel border border-editor-border-strong rounded px-2 py-1 text-[11px] text-editor-text placeholder:text-editor-text-ghost outline-none focus:border-editor-text-faint transition-colors"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return <Dropdown compact value={value} onChange={onChange} options={options} />;
}

function ColorInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const canUseNative = /^#[0-9a-f]{6}$/i.test(value);

  return (
    <div className="flex items-center gap-2 min-w-0">
      <input
        type="color"
        value={canUseNative ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-8 shrink-0 cursor-pointer rounded border border-editor-border-strong bg-transparent p-0"
        title="Pick color"
      />
      <TextInput value={value} onChange={onChange} />
    </div>
  );
}

function Slider({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1 min-w-0 bg-editor-hover rounded-full appearance-none cursor-pointer accent-editor-accent"
      />
      <span className="text-[9px] text-editor-text-faint w-10 text-right tabular-nums shrink-0">
        {value}
      </span>
    </div>
  );
}

function EditableField({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const lower = fieldKey.toLowerCase();
  const selectKey =
    lower === "type" && typeof value === "string" && ["fade", "fade-up", "slide", "scale", "none"].includes(value)
      ? "entranceType"
      : lower === "effect"
        ? "hoverEffect"
        : fieldKey;
  const options = selectOptions[selectKey];
  const slider = sliderConfig(fieldKey, value);

  if (typeof value === "boolean") {
    return (
      <Select
        value={String(value)}
        onChange={(next) => onChange(next === "true")}
        options={[
          { label: "True", value: "true" },
          { label: "False", value: "false" },
        ]}
      />
    );
  }

  if (options && (typeof value === "string" || typeof value === "number")) {
    return (
      <Select
        value={String(value)}
        onChange={(next) => onChange(typeof value === "number" ? Number(next) : next)}
        options={options}
      />
    );
  }

  if (isColorKey(fieldKey, value) && typeof value === "string") {
    return <ColorInput value={value} onChange={onChange} />;
  }

  if (slider) {
    return (
      <div className="space-y-1">
        <Slider
          value={numericPart(value)}
          onChange={(next) => onChange(withUnit(next, value))}
          min={slider.min}
          max={slider.max}
          step={slider.step}
        />
        <TextInput
          value={fieldValueToString(value)}
          onChange={(next) => onChange(parseValue(next, value))}
        />
      </div>
    );
  }

  if (isRecord(value) || Array.isArray(value)) {
    return (
      <textarea
        value={fieldValueToString(value)}
        onChange={(e) => onChange(parseValue(e.target.value, value))}
        rows={Array.isArray(value) ? 3 : 5}
        className="w-full min-w-0 resize-y bg-editor-panel border border-editor-border-strong rounded px-2 py-1 text-[10px] leading-relaxed text-editor-text font-mono outline-none focus:border-editor-text-faint transition-colors"
      />
    );
  }

  return (
    <TextInput
      value={fieldValueToString(value)}
      onChange={(next) => onChange(parseValue(next, value))}
      type={typeof value === "number" ? "number" : "text"}
    />
  );
}

function DynamicObjectEditor({
  value,
  onChange,
  path = [],
  defaultIcon,
}: {
  value: Record<string, unknown>;
  onChange: (path: string[], value: unknown) => void;
  path?: string[];
  defaultIcon?: React.ElementType;
}) {
  const entries = Object.entries(value);

  if (entries.length === 0) {
    return (
      <div className="px-3 py-8 text-center text-[11px] text-editor-text-ghost">
        No editable fields in this tab.
      </div>
    );
  }

  return (
    <>
      {entries.map(([key, fieldValue], index) => {
        const currentPath = [...path, key];
        if (isRecord(fieldValue)) {
          return (
            <PropertyGroup
              key={currentPath.join(".")}
              title={formatFieldLabel(key)}
              icon={defaultIcon}
              defaultOpen={index === 0}
            >
              <DynamicObjectEditor
                value={fieldValue}
                onChange={onChange}
                path={currentPath}
                defaultIcon={defaultIcon}
              />
            </PropertyGroup>
          );
        }

        if (Array.isArray(fieldValue)) {
          return (
            <PropertyGroup
              key={currentPath.join(".")}
              title={formatFieldLabel(key)}
              icon={defaultIcon}
              defaultOpen={index === 0}
            >
              <DynamicArrayEditor
                fieldKey={key}
                value={fieldValue}
                onChange={onChange}
                path={currentPath}
                defaultIcon={defaultIcon}
              />
            </PropertyGroup>
          );
        }

        return (
          <div key={currentPath.join(".")} className="px-3 pb-2">
            <FieldRow label={formatFieldLabel(key)}>
              <EditableField
                fieldKey={key}
                value={fieldValue}
                onChange={(next) => onChange(currentPath, next)}
              />
            </FieldRow>
          </div>
        );
      })}
    </>
  );
}

function DynamicArrayEditor({
  fieldKey,
  value,
  onChange,
  path,
  defaultIcon,
}: {
  fieldKey: string;
  value: unknown[];
  onChange: (path: string[], value: unknown) => void;
  path: string[];
  defaultIcon?: React.ElementType;
}) {
  const addItem = () => {
    onChange(path, [...value, createArrayItem(value[0])]);
  };
  const itemLabel = singularLabel(fieldKey);

  if (value.length === 0) {
    return (
      <div className="space-y-2">
        <div className="rounded border border-dashed border-editor-border-strong px-3 py-4 text-center text-[10px] text-editor-text-ghost">
          Empty array
        </div>
        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-1 rounded-md border border-editor-border-strong px-2 py-1.5 text-[10px] font-medium text-editor-text-muted transition-colors hover:border-editor-text-faint hover:text-editor-text"
        >
          Add {itemLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1 rounded-md border border-editor-border-strong px-2 py-1.5 text-[10px] font-medium text-editor-text-muted transition-colors hover:border-editor-text-faint hover:text-editor-text"
      >
        Add {itemLabel}
      </button>

      {value.map((item, index) => {
        const itemPath = [...path, String(index)];
        const itemTitle = `${itemLabel} ${index + 1}`;

        if (isRecord(item)) {
          return (
            <PropertyGroup
              key={itemPath.join(".")}
              title={itemTitle}
              icon={defaultIcon}
              defaultOpen={index === 0}
            >
              <DynamicObjectEditor
                value={item}
                onChange={onChange}
                path={itemPath}
                defaultIcon={defaultIcon}
              />
            </PropertyGroup>
          );
        }

        if (Array.isArray(item)) {
          return (
            <PropertyGroup
              key={itemPath.join(".")}
              title={itemTitle}
              icon={defaultIcon}
              defaultOpen={index === 0}
            >
              <DynamicArrayEditor
                fieldKey={fieldKey}
                value={item}
                onChange={onChange}
                path={itemPath}
                defaultIcon={defaultIcon}
              />
            </PropertyGroup>
          );
        }

        return (
          <FieldRow key={itemPath.join(".")} label={itemTitle}>
            <EditableField
              fieldKey={fieldKey}
              value={item}
              onChange={(next) => onChange(itemPath, next)}
            />
          </FieldRow>
        );
      })}
    </div>
  );
}

function createArrayItem(template: unknown): unknown {
  if (Array.isArray(template)) return [];
  if (isRecord(template)) {
    return Object.fromEntries(
      Object.entries(template).map(([key, value]) => [key, emptyValueFor(value)])
    );
  }
  return emptyValueFor(template);
}

function emptyValueFor(value: unknown): unknown {
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (isRecord(value)) return createArrayItem(value);
  return "";
}

function singularLabel(key: string) {
  const label = formatFieldLabel(key);
  if (label.endsWith("ies")) return label.slice(0, -3) + "y";
  if (label.endsWith("ses")) return label.slice(0, -2);
  if (label.endsWith("s")) return label.slice(0, -1);
  return label || "Item";
}

function ContentPanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (path: string[], value: unknown) => void;
}) {
  return (
    <PropertyGroup title="Content">
      <DynamicObjectEditor value={value} onChange={onChange} />
    </PropertyGroup>
  );
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function LayoutPanel({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (path: string[], value: unknown) => void;
}) {
  const spacing = asRecord(value.spacing);
  const sizing = asRecord(value.sizing);
  const flex = asRecord(value.flex);
  const position = asRecord(value.position);
  const knownKeys = new Set(["spacing", "sizing", "flex", "position"]);
  const extra = Object.fromEntries(
    Object.entries(value).filter(([key]) => !knownKeys.has(key))
  );

  return (
    <>
      <PropertyGroup title="Spacing" icon={Layout}>
        {[
          ["Margin Top", "marginTop"],
          ["Margin Right", "marginRight"],
          ["Margin Bottom", "marginBottom"],
          ["Margin Left", "marginLeft"],
          ["Padding Top", "paddingTop"],
          ["Padding Right", "paddingRight"],
          ["Padding Bottom", "paddingBottom"],
          ["Padding Left", "paddingLeft"],
        ].map(([label, key]) => (
          <FieldRow key={key} label={label}>
            <EditableField
              fieldKey={key}
              value={spacing[key] ?? "0px"}
              onChange={(next) => onChange(["spacing", key], next)}
            />
          </FieldRow>
        ))}
      </PropertyGroup>

      <PropertyGroup title="Sizing" icon={Layout} defaultOpen={false}>
        {[
          ["Width", "width"],
          ["Height", "height"],
          ["Min Width", "minWidth"],
          ["Min Height", "minHeight"],
          ["Max Width", "maxWidth"],
          ["Max Height", "maxHeight"],
        ].map(([label, key]) => (
          <FieldRow key={key} label={label}>
            <TextInput
              value={stringValue(sizing[key])}
              onChange={(next) => onChange(["sizing", key], next)}
            />
          </FieldRow>
        ))}
      </PropertyGroup>

      <PropertyGroup title="Flex" icon={Layout} defaultOpen={false}>
        <FieldRow label="Display">
          <Select
            value={stringValue(flex.display, "block")}
            onChange={(next) => onChange(["flex", "display"], next)}
            options={selectOptions.display}
          />
        </FieldRow>
        <FieldRow label="Direction">
          <Select
            value={stringValue(flex.direction, "column")}
            onChange={(next) => onChange(["flex", "direction"], next)}
            options={selectOptions.direction}
          />
        </FieldRow>
        <FieldRow label="Align">
          <Select
            value={stringValue(flex.alignItems, "stretch")}
            onChange={(next) => onChange(["flex", "alignItems"], next)}
            options={selectOptions.alignItems}
          />
        </FieldRow>
        <FieldRow label="Justify">
          <Select
            value={stringValue(flex.justifyContent, "flex-start")}
            onChange={(next) => onChange(["flex", "justifyContent"], next)}
            options={selectOptions.justifyContent}
          />
        </FieldRow>
        <FieldRow label="Gap">
          <EditableField
            fieldKey="gap"
            value={flex.gap ?? "0px"}
            onChange={(next) => onChange(["flex", "gap"], next)}
          />
        </FieldRow>
      </PropertyGroup>

      <PropertyGroup title="Position" icon={Layout} defaultOpen={false}>
        <FieldRow label="Type">
          <Select
            value={stringValue(position.type, "relative")}
            onChange={(next) => onChange(["position", "type"], next)}
            options={selectOptions.type}
          />
        </FieldRow>
        {[
          ["Top", "top"],
          ["Right", "right"],
          ["Bottom", "bottom"],
          ["Left", "left"],
        ].map(([label, key]) => (
          <FieldRow key={key} label={label}>
            <EditableField
              fieldKey={key}
              value={position[key] ?? ""}
              onChange={(next) => onChange(["position", key], next)}
            />
          </FieldRow>
        ))}
        <FieldRow label="Z Index">
          <TextInput
            type="number"
            value={fieldValueToString(position.zIndex ?? 0)}
            onChange={(next) => onChange(["position", "zIndex"], Number(next))}
          />
        </FieldRow>
      </PropertyGroup>

      {Object.keys(extra).length > 0 && (
        <PropertyGroup title="Custom" icon={Layout} defaultOpen={false}>
          <DynamicObjectEditor
            value={extra}
            onChange={onChange}
            defaultIcon={Layout}
          />
        </PropertyGroup>
      )}
    </>
  );
}

export function RightPanel({
  isMobile,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const { state, dispatch } = useEditor();
  const selectedSection = state.sections.find(
    (s) => s.id === state.selectedSectionId
  );
  const theme = isRecord(selectedSection?.theme) ? selectedSection.theme : {};
  const content = isRecord(selectedSection?.content) ? selectedSection.content : {};

  return (
    <aside className={`h-full flex flex-col border-l border-editor-border bg-editor-bg ${isMobile ? "w-72" : "w-full shrink-0"}`}>
      <div className="flex border-b border-editor-border overflow-x-auto no-scrollbar">
        {panelTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: "SET_RIGHT_PANEL_TAB", tab: tab.id })}
              className={`flex items-center gap-1 px-2 py-2 text-[10px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                state.rightPanelTab === tab.id
                  ? "text-editor-text border-editor-accent"
                  : "text-editor-text-faint border-transparent hover:text-editor-text-2"
              }`}
            >
              <Icon className="w-3 h-3" />
              {tab.label}
            </button>
          );
        })}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="ml-auto px-2 py-2 text-editor-text-faint hover:text-editor-text"
          >
            x
          </button>
        )}
      </div>

      {selectedSection ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden editor-scrollbar">
          <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-editor-border">
            <button
              onClick={() => dispatch({ type: "UNDO" })}
              disabled={state.past.length === 0}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              title="Undo"
            >
              <Undo2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => dispatch({ type: "REDO" })}
              disabled={state.future.length === 0}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors disabled:cursor-not-allowed disabled:opacity-35"
              title="Redo"
            >
              <Redo2 className="w-3 h-3" />
            </button>
            <div className="h-4 w-px bg-editor-border" />
            <button
              onClick={() => dispatch({ type: "TOGGLE_VISIBILITY", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
              title="Toggle visibility"
            >
              {selectedSection.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-editor-text-ghost" />}
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_LOCK", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
              title="Toggle lock"
            >
              {selectedSection.locked ? <Lock className="w-3 h-3 text-editor-text-ghost" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button
              onClick={() => dispatch({ type: "RESET_SECTION", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
              title="Reset selected component"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={() => dispatch({ type: "DUPLICATE_SECTION", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
              title="Duplicate"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE_SECTION", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-red-400 hover:bg-editor-hover transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <div className="flex-1 min-w-0 px-1">
              <p className="truncate text-[10px] font-medium text-editor-text-muted">
                {selectedSection.name}
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
                title="Close panel"
              >
                <PanelRightClose className="w-3 h-3" />
              </button>
            )}
          </div>

          {state.rightPanelTab === "content" ? (
            <ContentPanel
              value={content}
              onChange={(path, value) =>
                dispatch({
                  type: "UPDATE_SECTION_CONTENT_PATH",
                  sectionId: selectedSection.id,
                  path,
                  value,
                })
              }
            />
          ) : state.rightPanelTab === "layout" ? (
            <LayoutPanel
              value={isRecord(theme.layout) ? theme.layout : {}}
              onChange={(path, value) =>
                dispatch({
                  type: "UPDATE_SECTION_THEME_PATH",
                  sectionId: selectedSection.id,
                  path: ["layout", ...path],
                  value,
                })
              }
            />
          ) : (
            <DynamicObjectEditor
              value={
                isRecord(theme[tabRoot[state.rightPanelTab as ThemeTab]])
                  ? (theme[tabRoot[state.rightPanelTab as ThemeTab]] as Record<string, unknown>)
                  : {}
              }
              defaultIcon={
                state.rightPanelTab === "design"
                  ? Palette
                  : state.rightPanelTab === "responsive"
                    ? Smartphone
                    : Sparkles
              }
              onChange={(path, value) =>
                dispatch({
                  type: "UPDATE_SECTION_THEME_PATH",
                  sectionId: selectedSection.id,
                  path: [tabRoot[state.rightPanelTab as ThemeTab], ...path],
                  value,
                })
              }
            />
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-2">
            <Settings className="w-6 h-6 text-editor-text-ghost mx-auto" />
            <p className="text-[11px] text-editor-text-faint">Select a section</p>
            <p className="text-[9px] text-editor-text-ghost">
              Click a component in the canvas to edit it.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="mt-4 flex items-center gap-1 text-[10px] text-editor-text-ghost hover:text-editor-text-faint transition-colors"
            >
              <PanelRightClose className="w-3 h-3" />
              Close panel
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
