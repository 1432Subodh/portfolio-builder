"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

export function Dropdown({
  value,
  onChange,
  options,
  placeholder = "Select…",
  leadingIcon: LeadingIcon,
  compact = false,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  leadingIcon?: React.ComponentType<{ className?: string }>;
  compact?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;

    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onScroll() {
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [open, options, value]);

  const openMenu = () => {
    if (disabled || options.length === 0) return;
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    setRect({ top: r.bottom + 6, left: r.left, width: r.width });
    setHighlight(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const select = (opt: DropdownOption) => {
    onChange(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlight((h) => (h + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((h) => (h - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[highlight]) select(options[highlight]);
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`group flex w-full items-center gap-2 rounded-lg border border-editor-border-strong bg-editor-panel text-left outline-none transition-colors focus:border-editor-text disabled:cursor-not-allowed disabled:opacity-50 ${
          compact
            ? "min-w-0 px-2 py-1 text-[11px]"
            : "h-10 px-3 text-[12.5px]"
        }`}
      >
        {LeadingIcon && (
          <LeadingIcon
            className={`shrink-0 text-editor-text-faint ${
              compact ? "size-3" : "size-3.5"
            }`}
          />
        )}
        <span
          className={`flex-1 truncate ${
            selected ? "text-editor-text" : "text-editor-text-ghost"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`shrink-0 text-editor-text-faint transition-transform duration-200 ${
            compact ? "size-3" : "size-3.5"
          } ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && rect && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            style={{ top: rect.top, left: rect.left, width: rect.width }}
            className="fixed z-50"
            role="listbox"
            id={listboxId}
          >
            <div className="overflow-hidden rounded-lg border border-editor-border-strong bg-editor-panel shadow-2xl">
              <div className="max-h-56 overflow-y-auto editor-scrollbar p-1">
                {options.length === 0 ? (
                  <p className="px-2.5 py-1.5 text-[11px] text-editor-text-ghost">
                    No options
                  </p>
                ) : (
                  options.map((opt, i) => {
                    const active = opt.value === value;
                    const isHighlighted = i === highlight;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => select(opt)}
                        onMouseEnter={() => setHighlight(i)}
                        className={`flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
                          active
                            ? "text-editor-text"
                            : "text-editor-text-muted"
                        } ${
                          isHighlighted
                            ? "bg-editor-hover"
                            : "hover:bg-editor-hover/60"
                        } ${active ? "font-medium" : ""}`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {active && (
                          <Check className="size-3.5 shrink-0 text-editor-accent" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}