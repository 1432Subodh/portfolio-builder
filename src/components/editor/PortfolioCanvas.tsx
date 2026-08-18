"use client";

import { useCallback, type CSSProperties } from "react";
import { useEditor } from "./editor-context";
import componentRegistry from "@/components/design/registry";
import type { DeviceMode, EditorSection } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : [];
}

function spacingStyles(spacing: Record<string, unknown>): CSSProperties {
  return {
    marginTop: asString(spacing.marginTop),
    marginRight: asString(spacing.marginRight),
    marginBottom: asString(spacing.marginBottom),
    marginLeft: asString(spacing.marginLeft),
    paddingTop: asString(spacing.paddingTop),
    paddingRight: asString(spacing.paddingRight),
    paddingBottom: asString(spacing.paddingBottom),
    paddingLeft: asString(spacing.paddingLeft),
  };
}

function sectionStyle(section: EditorSection, deviceMode: DeviceMode): CSSProperties {
  const theme = asRecord(section.theme);
  const design = asRecord(theme.design);
  const layout = asRecord(theme.layout);
  const responsive = asRecord(theme.responsive);
  const deviceOverrides = asRecord(responsive[deviceMode]);
  const typography = asRecord(design.typography);
  const background = asRecord(design.background);
  const border = asRecord(design.border);
  const shadow = asRecord(design.shadow);
  const sizing = asRecord(layout.sizing);
  const spacing = asRecord(layout.spacing);
  const flex = asRecord(layout.flex);
  const position = asRecord(layout.position);
  const animation = asRecord(theme.animation);
  const entrance = asRecord(animation.entrance);

  return {
    color: asString(typography.color),
    fontFamily: asString(typography.fontFamily),
    fontSize: asString(typography.fontSize),
    fontWeight: asNumber(typography.fontWeight),
    lineHeight: asString(typography.lineHeight),
    letterSpacing: asString(typography.letterSpacing),
    textAlign: asString(typography.textAlign) as CSSProperties["textAlign"],
    background: asString(background.gradient) || asString(background.color),
    borderWidth: asString(border.width),
    borderStyle: asString(border.style) as CSSProperties["borderStyle"],
    borderColor: asString(border.color),
    borderRadius: asString(border.radius),
    boxShadow: asString(shadow.value),
    opacity: asNumber(design.opacity),
    width: asString(sizing.width),
    minWidth: asString(sizing.minWidth),
    maxWidth: asString(sizing.maxWidth),
    height: asString(sizing.height),
    minHeight: asString(sizing.minHeight),
    maxHeight: asString(sizing.maxHeight),
    display: asString(flex.display),
    flexDirection: asString(flex.direction) as CSSProperties["flexDirection"],
    alignItems: asString(flex.alignItems),
    justifyContent: asString(flex.justifyContent),
    gap: asString(flex.gap),
    position: asString(position.type) as CSSProperties["position"],
    top: asString(position.top),
    right: asString(position.right),
    bottom: asString(position.bottom),
    left: asString(position.left),
    zIndex: asNumber(position.zIndex),
    transitionDuration: asString(entrance.duration),
    transitionDelay: asString(entrance.delay),
    transitionTimingFunction: asString(entrance.easing),
    ...spacingStyles(spacing),
    ...(deviceOverrides.styles && isRecord(deviceOverrides.styles)
      ? (deviceOverrides.styles as CSSProperties)
      : {}),
  };
}

function Section({
  section,
  children,
}: {
  section: EditorSection;
  children: React.ReactNode;
}) {
  const { state, dispatch } = useEditor();
  const isSelected = state.selectedSectionId === section.id;
  const isHovered = state.hoveredSectionId === section.id;
  const theme = asRecord(section.theme);
  const responsive = asRecord(theme.responsive);
  const hiddenOn = asStringArray(responsive.hiddenOn);
  const isVisible =
    section.visible !== false && !hiddenOn.includes(state.deviceMode);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch({ type: "SELECT_SECTION", sectionId: section.id });
    },
    [dispatch, section.id]
  );

  const handleMouseEnter = useCallback(() => {
    dispatch({ type: "HOVER_SECTION", sectionId: section.id });
  }, [dispatch, section.id]);

  const handleMouseLeave = useCallback(() => {
    dispatch({ type: "HOVER_SECTION", sectionId: null });
  }, [dispatch]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: "SHOW_CONTEXT_MENU",
        x: e.clientX,
        y: e.clientY,
        sectionId: section.id,
      });
    },
    [dispatch, section.id]
  );

  if (!isVisible) return null;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      className={`relative transition-all duration-100 ${
        isSelected
          ? "ring-2 ring-white ring-offset-2 ring-offset-background"
          : isHovered
            ? "ring-1 ring-neutral-400 ring-offset-1 ring-offset-background"
            : ""
      }`}
      data-section={section.id}
      style={sectionStyle(section, state.deviceMode)}
    >
      {(isSelected || isHovered) && (
        <div className="absolute -top-6 left-0 z-30 flex items-center gap-1">
          <span
            className={`text-[9px] font-medium px-1.5 py-0.5 rounded-sm ${
              isSelected
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-300 border border-neutral-600"
            }`}
          >
            {section.name}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function MissingComponent({ slug }: { slug?: string }) {
  return (
    <div className="min-h-48 border border-dashed border-neutral-300 bg-white p-8 text-sm text-neutral-600">
      Component not registered: {slug || "unknown"}
    </div>
  );
}

function RenderedSection({ section }: { section: EditorSection }) {
  const key = section.componentSlug;
  const Component = key
    ? componentRegistry[key as keyof typeof componentRegistry]
    : null;

  return (
    <Section section={section}>
      {Component ? (
        <Component content={section.content} theme={section.theme} />
      ) : (
        <MissingComponent slug={key} />
      )}
    </Section>
  );
}

export function PortfolioCanvas() {
  const { state } = useEditor();

  return (
    <div className="min-h-screen bg-background text-ink">
      {state.sections.length === 0 ? (
        <div className="flex min-h-[520px] items-center justify-center bg-white px-6 text-center text-sm text-neutral-500">
          Add an uploaded component from the left panel to start building.
        </div>
      ) : (
        state.sections.map((section) => (
          <RenderedSection key={section.id} section={section} />
        ))
      )}
    </div>
  );
}
