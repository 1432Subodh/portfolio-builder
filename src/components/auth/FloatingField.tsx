"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

/* Floating-label input: no background, only a bottom hairline. Label sits
   inside as placeholder and animates up on focus or when it has a value.

   Autofill-resistant: hydration-safe useId-based name/id (Chrome can't
   match saved fields), autofill hints skipped, and fields start readOnly
   (flipped off on first focus) to block Chrome's autofill paint. */
export default function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  error,
  valid,
  rightSlot,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  valid?: boolean;
  rightSlot?: React.ReactNode;
}) {
  /* useId is stable across server + client — no hydration mismatch.
     The colon is escaped for selectors but valid in id/name. */
  const id = `ff-${useId().replace(/:/g, "")}`;
  const [readOnly, setReadOnly] = useState(true);
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div>
      <div
        className={`relative border-b transition-colors duration-300 ${
          focused ? "border-primary" : error ? "border-red-400/70" : "border-hairline-strong"
        }`}
      >
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 origin-left transition-all duration-200 ease-out ${
            raised
              ? "top-0 translate-y-0 text-[10.5px] leading-none "
              : "top-1/2 -translate-y-1/2 text-[14px] leading-none text-ink-faint"
          }`}
        >
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={type === "password" ? "new-password" : "one-time-code"}
          aria-autocomplete="none"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setFocused(true);
            setReadOnly(false);
          }}
          onBlur={() => setFocused(false)}
          aria-invalid={error ? true : undefined}
          className={`h-11 w-full bg-transparent pb-0.5 pt-4 text-[14px] text-ink outline-none transition-colors [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--background)] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--ink)] ${
            rightSlot ? "pr-11" : ""
          }`}
        />
        <AnimatePresence>
          {valid && !error && !rightSlot && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-0 top-0 flex h-full items-center"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-3 " />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
        {rightSlot && (
          <span className="absolute right-0 top-0 flex h-full items-center text-ink-mute">
            {rightSlot}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-[11.5px] text-red-400">{error}</p>}
    </div>
  );
}