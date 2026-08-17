"use client";

import { useState, useCallback } from "react";
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
} from "lucide-react";

function PropertyGroup({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: React.ElementType;
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
        {open ? (
          <ChevronDown className="w-3 h-3 shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 shrink-0" />
        )}
        <Icon className="w-3 h-3 shrink-0" />
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
    <div className="flex items-center gap-2 min-w-0">
      <label className="text-[10px] text-editor-text-faint w-14 shrink-0">{label}</label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
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
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-w-0 bg-editor-panel border border-editor-border-strong rounded px-2 py-1 text-[11px] text-editor-text outline-none focus:border-editor-text-faint transition-colors appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function ColorInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className="w-5 h-5 rounded border border-editor-border-strong shrink-0 cursor-pointer"
        style={{ backgroundColor: value }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 bg-editor-panel border border-editor-border-strong rounded px-2 py-1 text-[10px] text-editor-text font-mono outline-none focus:border-editor-text-faint transition-colors"
      />
    </div>
  );
}

function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  unit = "",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1 min-w-0 bg-editor-hover rounded-full appearance-none cursor-pointer accent-editor-accent"
      />
      <span className="text-[9px] text-editor-text-faint w-10 text-right tabular-nums shrink-0">
        {value}{unit}
      </span>
    </div>
  );
}

function SpacingBox() {
  const [linked, setLinked] = useState(true);
  const [vals, setVals] = useState({ t: 16, r: 16, b: 16, l: 16 });

  const update = useCallback(
    (side: keyof typeof vals, v: number) => {
      if (linked) setVals({ t: v, r: v, b: v, l: v });
      else setVals((p) => ({ ...p, [side]: v }));
    },
    [linked]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-editor-text-faint">Spacing</span>
        <button
          onClick={() => setLinked(!linked)}
          className={`text-[9px] px-1 py-0.5 rounded transition-colors ${
            linked ? "bg-editor-accent text-editor-on-accent" : "bg-editor-hover text-editor-text-faint"
          }`}
        >
          {linked ? "Linked" : "Free"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {(["t", "r", "b", "l"] as const).map((s) => (
          <div key={s} className="flex items-center gap-1">
            <span className="text-[8px] text-editor-text-ghost w-2 uppercase">{s}</span>
            <input
              type="number"
              value={vals[s]}
              onChange={(e) => update(s, Number(e.target.value))}
              className="w-full min-w-0 bg-editor-panel border border-editor-border-strong rounded px-1 py-0.5 text-[9px] text-editor-text text-center outline-none focus:border-editor-text-faint transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BoxModel() {
  return (
    <div className="relative w-full aspect-square max-w-[140px] mx-auto">
      <div className="absolute inset-0 border border-dashed border-editor-border-strong rounded">
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[7px] text-editor-text-ghost">margin</span>
      </div>
      <div className="absolute inset-3 border border-editor-border-strong rounded">
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[7px] text-editor-text-faint">border</span>
      </div>
      <div className="absolute inset-5 border border-editor-border rounded bg-editor-panel/50">
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[7px] text-editor-text-ghost">padding</span>
      </div>
      <div className="absolute inset-7 bg-editor-hover rounded flex items-center justify-center">
        <span className="text-[7px] text-editor-text-faint">content</span>
      </div>
    </div>
  );
}

const sectionConfigs: Record<
  string,
  {
    title: string;
    contentFields?: { label: string; placeholder?: string }[];
  }
> = {
  navbar: {
    title: "Navbar",
    contentFields: [
      { label: "Logo Text", placeholder: "Your Name" },
      { label: "CTA Label", placeholder: "Let's Talk" },
    ],
  },
  hero: {
    title: "Hero",
    contentFields: [
      { label: "Eyebrow", placeholder: "Full-Stack Developer" },
      { label: "Heading", placeholder: "Hi, I'm Alex Chen" },
      { label: "Description", placeholder: "I build exceptional..." },
      { label: "Primary CTA", placeholder: "View My Work" },
      { label: "Secondary CTA", placeholder: "Get In Touch" },
    ],
  },
  about: {
    title: "About",
    contentFields: [
      { label: "Heading", placeholder: "About Me" },
      { label: "Bio", placeholder: "Your bio..." },
    ],
  },
  skills: {
    title: "Skills",
    contentFields: [
      { label: "Heading", placeholder: "Skills" },
      { label: "Subheading", placeholder: "Technologies I work with" },
    ],
  },
  projects: {
    title: "Projects",
    contentFields: [
      { label: "Heading", placeholder: "Projects" },
      { label: "Subheading", placeholder: "Featured work" },
    ],
  },
  experience: {
    title: "Experience",
    contentFields: [
      { label: "Heading", placeholder: "Experience" },
      { label: "Subheading", placeholder: "Where I've worked" },
    ],
  },
  testimonials: {
    title: "Testimonials",
    contentFields: [
      { label: "Heading", placeholder: "Testimonials" },
      { label: "Subheading", placeholder: "What people say" },
    ],
  },
  contact: {
    title: "Contact",
    contentFields: [
      { label: "Heading", placeholder: "Contact" },
      { label: "Subheading", placeholder: "Let's work together" },
      { label: "Email", placeholder: "your@email.com" },
    ],
  },
  footer: {
    title: "Footer",
    contentFields: [{ label: "Copyright", placeholder: "© 2026 Your Name" }],
  },
};

const panelTabs: { id: RightPanelTab; label: string; icon: React.ElementType }[] = [
  { id: "content", label: "Content", icon: Type },
  { id: "design", label: "Design", icon: Palette },
  { id: "layout", label: "Layout", icon: Layout },
  { id: "responsive", label: "Responsive", icon: Smartphone },
  { id: "animation", label: "Animation", icon: Sparkles },
];

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
  const config = selectedSection ? sectionConfigs[selectedSection.type] : null;

  return (
    <aside className={`h-full flex flex-col border-l border-editor-border bg-editor-bg ${isMobile ? "w-72" : "w-56 shrink-0"}`}>
      {/* Tabs */}
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
            ✕
          </button>
        )}
      </div>

      {selectedSection && config ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden editor-scrollbar">
          {/* Section actions bar */}
          <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-editor-border">
            <button
              onClick={() => dispatch({ type: "TOGGLE_VISIBILITY", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
            >
              {selectedSection.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-editor-text-ghost" />}
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_LOCK", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
            >
              {selectedSection.locked ? <Lock className="w-3 h-3 text-editor-text-ghost" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button
              onClick={() => dispatch({ type: "DUPLICATE_SECTION", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-editor-text hover:bg-editor-hover transition-colors"
            >
              <Copy className="w-3 h-3" />
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE_SECTION", sectionId: selectedSection.id })}
              className="p-1 rounded text-editor-text-faint hover:text-red-400 hover:bg-editor-hover transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <div className="flex-1" />
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

          {/* Content tab */}
          {state.rightPanelTab === "content" && config.contentFields && (
            <PropertyGroup title="Content" icon={Type}>
              {config.contentFields.map((field) => (
                <FieldRow key={field.label} label={field.label}>
                  <Input value="" onChange={() => {}} placeholder={field.placeholder} />
                </FieldRow>
              ))}
            </PropertyGroup>
          )}

          {/* Design tab */}
          {state.rightPanelTab === "design" && (
            <>
              <PropertyGroup title="Typography" icon={Type}>
                <FieldRow label="Font">
                  <Select
                    value="inter"
                    onChange={() => {}}
                    options={[
                      { label: "Inter", value: "inter" },
                      { label: "Georgia", value: "georgia" },
                      { label: "Mono", value: "mono" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Size">
                  <Slider value={16} onChange={() => {}} min={10} max={72} unit="px" />
                </FieldRow>
                <FieldRow label="Weight">
                  <Select
                    value="400"
                    onChange={() => {}}
                    options={[
                      { label: "Regular (400)", value: "400" },
                      { label: "Medium (500)", value: "500" },
                      { label: "Semibold (600)", value: "600" },
                      { label: "Bold (700)", value: "700" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Height">
                  <Slider value={150} onChange={() => {}} min={100} max={250} unit="%" />
                </FieldRow>
                <FieldRow label="Spacing">
                  <Slider value={0} onChange={() => {}} min={-5} max={10} unit="px" />
                </FieldRow>
                <FieldRow label="Color">
                  <ColorInput value="#f5f5f4" onChange={() => {}} />
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Background" icon={Palette} defaultOpen={false}>
                <FieldRow label="Color">
                  <ColorInput value="#121214" onChange={() => {}} />
                </FieldRow>
                <FieldRow label="Gradient">
                  <Input value="" onChange={() => {}} placeholder="linear-gradient(...)" />
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Border" icon={Layout} defaultOpen={false}>
                <FieldRow label="Width">
                  <Slider value={0} onChange={() => {}} min={0} max={10} unit="px" />
                </FieldRow>
                <FieldRow label="Style">
                  <Select
                    value="solid"
                    onChange={() => {}}
                    options={[
                      { label: "Solid", value: "solid" },
                      { label: "Dashed", value: "dashed" },
                      { label: "None", value: "none" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Color">
                  <ColorInput value="#2a2a2e" onChange={() => {}} />
                </FieldRow>
                <FieldRow label="Radius">
                  <div className="flex gap-1 flex-wrap">
                    {[0, 4, 8, 12, 16, 24].map((r) => (
                      <button
                        key={r}
                        className="w-6 h-6 rounded border border-editor-border-strong hover:border-editor-text-faint flex items-center justify-center text-[8px] text-editor-text-faint hover:text-editor-text transition-colors"
                        style={{ borderRadius: r }}
                      >
                        {r}
                      </button>
                    ))}
                    <button className="w-6 h-6 rounded-full border border-editor-border-strong hover:border-editor-text-faint flex items-center justify-center text-[8px] text-editor-text-faint hover:text-editor-text transition-colors">
                      Full
                    </button>
                  </div>
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Shadow" icon={Sparkles} defaultOpen={false}>
                <div className="grid grid-cols-3 gap-1">
                  {["none", "sm", "md", "lg", "xl", "2xl"].map((s) => (
                    <button
                      key={s}
                      className="px-2 py-1.5 text-[9px] text-editor-text-faint border border-editor-border-strong rounded hover:border-editor-text-faint hover:text-editor-text transition-colors capitalize"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </PropertyGroup>

              <PropertyGroup title="Opacity" icon={Eye} defaultOpen={false}>
                <Slider value={100} onChange={() => {}} min={0} max={100} unit="%" />
              </PropertyGroup>
            </>
          )}

          {/* Layout tab */}
          {state.rightPanelTab === "layout" && (
            <>
              <PropertyGroup title="Box Model" icon={Layout}>
                <BoxModel />
                <SpacingBox />
              </PropertyGroup>

              <PropertyGroup title="Sizing" icon={Layout} defaultOpen={false}>
                <FieldRow label="Width">
                  <Select
                    value="auto"
                    onChange={() => {}}
                    options={[
                      { label: "Auto", value: "auto" },
                      { label: "Fill", value: "100%" },
                      { label: "Fit", value: "fit-content" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Min W">
                  <Input value="" onChange={() => {}} placeholder="0" />
                </FieldRow>
                <FieldRow label="Max W">
                  <Input value="" onChange={() => {}} placeholder="none" />
                </FieldRow>
                <FieldRow label="Height">
                  <Select
                    value="auto"
                    onChange={() => {}}
                    options={[
                      { label: "Auto", value: "auto" },
                      { label: "Fill", value: "100%" },
                      { label: "Fit", value: "fit-content" },
                    ]}
                  />
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Flex" icon={Layout} defaultOpen={false}>
                <FieldRow label="Direction">
                  <Select
                    value="column"
                    onChange={() => {}}
                    options={[
                      { label: "Vertical", value: "column" },
                      { label: "Horizontal", value: "row" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Align">
                  <Select
                    value="stretch"
                    onChange={() => {}}
                    options={[
                      { label: "Stretch", value: "stretch" },
                      { label: "Start", value: "flex-start" },
                      { label: "Center", value: "center" },
                      { label: "End", value: "flex-end" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Justify">
                  <Select
                    value="flex-start"
                    onChange={() => {}}
                    options={[
                      { label: "Start", value: "flex-start" },
                      { label: "Center", value: "center" },
                      { label: "End", value: "flex-end" },
                      { label: "Between", value: "space-between" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Gap">
                  <input
                    type="number"
                    value={16}
                    onChange={() => {}}
                    className="w-full min-w-0 bg-editor-panel border border-editor-border-strong rounded px-2 py-1 text-[11px] text-editor-text outline-none focus:border-editor-text-faint transition-colors"
                  />
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Position" icon={Layout} defaultOpen={false}>
                <FieldRow label="Type">
                  <Select
                    value="static"
                    onChange={() => {}}
                    options={[
                      { label: "Static", value: "static" },
                      { label: "Relative", value: "relative" },
                      { label: "Absolute", value: "absolute" },
                      { label: "Fixed", value: "fixed" },
                      { label: "Sticky", value: "sticky" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Z-Index">
                  <Input value="0" onChange={() => {}} />
                </FieldRow>
              </PropertyGroup>
            </>
          )}

          {/* Responsive tab */}
          {state.rightPanelTab === "responsive" && (
            <PropertyGroup title="Responsive" icon={Smartphone}>
              <div className="space-y-2">
                {["Desktop", "Tablet", "Mobile"].map((device) => (
                  <div key={device} className="flex items-center justify-between">
                    <span className="text-[10px] text-editor-text-muted">{device}</span>
                    <div className="flex items-center gap-1">
                      <button className="text-[9px] text-editor-text-faint hover:text-editor-text px-1.5 py-0.5 rounded border border-editor-border-strong hover:border-editor-text-faint transition-colors">
                        Visible
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <FieldRow label="Hide on">
                <div className="flex gap-1">
                  {["Desktop", "Tablet", "Mobile"].map((d) => (
                    <button
                      key={d}
                      className="text-[9px] text-editor-text-faint hover:text-editor-text px-1.5 py-0.5 rounded border border-editor-border-strong hover:border-editor-text-faint transition-colors"
                    >
                      {d[0]}
                    </button>
                  ))}
                </div>
              </FieldRow>
            </PropertyGroup>
          )}

          {/* Animation tab */}
          {state.rightPanelTab === "animation" && (
            <>
              <PropertyGroup title="Entrance" icon={Sparkles}>
                <FieldRow label="Type">
                  <Select
                    value="fade"
                    onChange={() => {}}
                    options={[
                      { label: "None", value: "none" },
                      { label: "Fade Up", value: "fade" },
                      { label: "Slide Left", value: "slide" },
                      { label: "Scale In", value: "scale" },
                      { label: "Blur In", value: "blur" },
                    ]}
                  />
                </FieldRow>
                <FieldRow label="Duration">
                  <Slider value={600} onChange={() => {}} min={100} max={2000} unit="ms" />
                </FieldRow>
                <FieldRow label="Delay">
                  <Slider value={0} onChange={() => {}} min={0} max={1000} unit="ms" />
                </FieldRow>
                <FieldRow label="Easing">
                  <Select
                    value="ease-out"
                    onChange={() => {}}
                    options={[
                      { label: "Ease Out", value: "ease-out" },
                      { label: "Ease In", value: "ease-in" },
                      { label: "Ease In Out", value: "ease-in-out" },
                      { label: "Linear", value: "linear" },
                    ]}
                  />
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Hover" icon={Sparkles} defaultOpen={false}>
                <FieldRow label="Effect">
                  <Select
                    value="none"
                    onChange={() => {}}
                    options={[
                      { label: "None", value: "none" },
                      { label: "Lift", value: "lift" },
                      { label: "Scale", value: "scale" },
                      { label: "Glow", value: "glow" },
                    ]}
                  />
                </FieldRow>
              </PropertyGroup>

              <PropertyGroup title="Scroll" icon={Sparkles} defaultOpen={false}>
                <FieldRow label="Trigger">
                  <Select
                    value="none"
                    onChange={() => {}}
                    options={[
                      { label: "None", value: "none" },
                      { label: "Reveal", value: "reveal" },
                      { label: "Parallax", value: "parallax" },
                      { label: "Stagger", value: "stagger" },
                    ]}
                  />
                </FieldRow>
              </PropertyGroup>
            </>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-2">
            <Settings className="w-6 h-6 text-editor-text-ghost mx-auto" />
            <p className="text-[11px] text-editor-text-faint">Select a section</p>
            <p className="text-[9px] text-editor-text-ghost">
              Click on any section in the canvas to edit its properties
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
