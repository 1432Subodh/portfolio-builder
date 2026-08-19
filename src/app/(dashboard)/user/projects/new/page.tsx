"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Layout,
  Sparkles,
  Rocket,
  Palette,
  Loader2,
  FolderOpen,
  Type,
} from "lucide-react";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/lib/redux/api/projectsApi";

const steps = [
  { id: 0, label: "Basics", icon: Type },
  { id: 1, label: "Style", icon: Palette },
  { id: 2, label: "Review", icon: Sparkles },
];

const templates = [
  {
    id: "blank",
    name: "Blank Canvas",
    desc: "Start from scratch and build freely.",
    icon: Layout,
  },
  {
    id: "minimal",
    name: "Minimal Studio",
    desc: "Clean, elegant and typography-led.",
    icon: Type,
  },
  {
    id: "bold",
    name: "Bold Portfolio",
    desc: "Confident, dark and statement-driven.",
    icon: Sparkles,
  },
  {
    id: "creative",
    name: "Creative Agency",
    desc: "Playful, colorful and expressive.",
    icon: Rocket,
  },
];

const categories = [
  "Portfolio",
  "Freelance",
  "Agency",
  "Corporate",
  "Developer",
  "Designer",
  "Photography",
  "Other",
];

const accentColors = [
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "#14b8a6",
  "#6366f1",
];

const inputCls =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[12.5px] text-ink placeholder:text-ink-faint outline-none transition-all focus:border-primary/40 focus:bg-white/[0.06]";

const labelCls = "mb-1.5 block text-[11px] font-medium text-ink-mute";

export default function NewProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Portfolio");
  const [template, setTemplate] = useState("blank");
  const [accentColor, setAccentColor] = useState("#0ea5e9");
  const [error, setError] = useState<string | null>(null);

  const nameValid = name.trim().length >= 2;

  const canContinue =
    step === 0 ? nameValid : step === 1 ? Boolean(template) : true;

  const handleSubmit = async () => {
    setError(null);
    try {
      const res = await createProject({
        name: name.trim(),
        template,
      }).unwrap();
      try {
        await updateProject({
          id: res._id,
          patch: {
            settings: {
              tagline: tagline.trim(),
              description: description.trim(),
              category,
              accentColor,
            },
          },
        }).unwrap();
      } catch {
        // settings are best-effort — keep going
      }
      router.push(`/user/${res._id}/editor`);
    } catch {
      setError("Could not create the project. Please try again.");
    }
  };

  const handleNext = () => {
    if (!canContinue) return;
    setError(null);
    if (step < 2) setStep(step + 1);
    else handleSubmit();
  };

  const headers = [
    {
      title: "Tell us about your project",
      sub: "Give your portfolio a name and a short intro. You can change all of this later.",
    },
    {
      title: "Pick a style",
      sub: "Choose a starting template and an accent color for your site.",
    },
    {
      title: "Review your details",
      sub: "Everything looks good? Start building your portfolio.",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#0b0c0e]">
      {/* Left full-height card */}
      <div className="relative w-full lg:w-[620px] lg:shrink-0 min-h-screen flex flex-col bg-[#131417] border-r border-white/[0.08] px-6 sm:px-10 py-8">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/user/projects"
            className="flex items-center gap-1.5 text-[12px] font-medium text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" />
            Back to projects
          </Link>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-medium text-ink-faint">
            New Project
          </span>
        </div>

        {/* Stepper */}
        <div className="mb-12 flex items-center gap-2">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <div key={s.id} className="flex flex-1 items-center gap-2">
                <button
                  onClick={() => done && setStep(i)}
                  className={`flex items-center gap-2 rounded-full px-1.5 sm:px-3 py-1.5 transition-all ${
                    active
                      ? "bg-primary/15 text-primary"
                      : done
                        ? "text-ink cursor-pointer"
                        : "text-ink-faint"
                  }`}
                >
                  <span
                    className={`flex size-6 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                      done
                        ? "bg-primary text-on-primary"
                        : active
                          ? "bg-primary/20 text-primary"
                          : "bg-white/[0.06]"
                    }`}
                  >
                    {done ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline text-[11px] font-medium">
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 rounded-full transition-colors ${
                      done ? "bg-primary/50" : "bg-white/[0.08]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step header */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-[22px] font-semibold tracking-[-0.02em]">
                {headers[step].title}
              </h1>
              <p className="mt-1.5 text-[12.5px] text-ink-faint">
                {headers[step].sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div className="space-y-6 max-w-xl">
                  <div>
                    <label className={labelCls}>
                      Project name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. My Portfolio"
                      autoFocus
                      className={inputCls}
                    />
                    {!nameValid && name.length > 0 && (
                      <p className="mt-1 text-[10.5px] text-red-400">
                        Name must be at least 2 characters.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>Tagline</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Creative Developer & Designer"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Short description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A sentence or two about what you do..."
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-all ${
                            category === c
                              ? "bg-primary text-on-primary"
                              : "bg-white/[0.04] text-ink-faint hover:bg-white/[0.08] hover:text-ink"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <label className={labelCls}>Template</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {templates.map((t) => {
                        const Icon = t.icon;
                        const selected = template === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTemplate(t.id)}
                            className={`group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                              selected
                                ? "border-primary/60 bg-primary/[0.08]"
                                : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]"
                            }`}
                          >
                            <span
                              className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                                selected
                                  ? "bg-primary/20 text-primary"
                                  : "bg-white/[0.06] text-ink-faint"
                              }`}
                            >
                              <Icon className="size-4" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[12.5px] font-medium text-ink">
                                {t.name}
                              </span>
                              <span className="mt-0.5 block text-[11px] text-ink-faint">
                                {t.desc}
                              </span>
                            </span>
                            {selected && (
                              <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-on-primary">
                                <Check className="size-3" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Accent color</label>
                    <div className="flex flex-wrap gap-2.5">
                      {accentColors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setAccentColor(c)}
                          className={`flex size-8 items-center justify-center rounded-full transition-all hover:scale-110 ${
                            accentColor === c
                              ? "ring-2 ring-white ring-offset-2 ring-offset-[#131417]"
                              : ""
                          }`}
                          style={{ backgroundColor: c }}
                          title={c}
                        >
                          {accentColor === c && (
                            <Check className="size-3.5 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-start gap-3 border-b border-white/[0.06] pb-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <FolderOpen className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-ink">
                        {name.trim() || "Untitled Portfolio"}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-ink-faint truncate">
                        {tagline.trim() || "No tagline added"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6">
                    {[
                      ["Template", templates.find((t) => t.id === template)?.name],
                      ["Category", category],
                      ["Short description", description.trim() || "Not set"],
                    ].map(([k, v]) => (
                      <div key={k} className="py-3 border-b border-white/[0.06]">
                        <p className="text-[10px] text-ink-faint uppercase tracking-[0.12em]">
                          {k}
                        </p>
                        <p className="mt-1 text-[12.5px] font-medium text-ink truncate">
                          {v}
                        </p>
                      </div>
                    ))}
                    <div className="py-3 border-b border-white/[0.06]">
                      <p className="text-[10px] text-ink-faint uppercase tracking-[0.12em]">
                        Accent color
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-[12.5px] font-medium text-ink">
                        <span
                          className="size-3.5 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        {accentColor}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && <p className="mt-5 text-[11.5px] text-red-400">{error}</p>}
        </div>

        {/* Footer nav */}
        <div className="mt-10 flex items-center justify-between border-t border-white/[0.08] pt-5">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0 || isCreating}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink disabled:invisible"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>

          {step < 2 ? (
            <button
              onClick={handleNext}
              disabled={!canContinue}
              className="flex items-center gap-1.5 rounded-lg gradient-accent px-5 py-2.5 text-[12px] font-medium text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              Continue
              <ArrowRight className="size-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isCreating}
              className="flex items-center gap-2 rounded-lg gradient-accent px-5 py-2.5 text-[12px] font-medium text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:shadow-none"
            >
              {isCreating ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Rocket className="size-3.5" />
              )}
              {isCreating ? "Creating..." : "Start building your portfolio"}
            </button>
          )}
        </div>
        </div>

        {/* Right decorative side */}
        <div className="relative hidden lg:flex flex-1 items-center justify-center overflow-hidden px-12">
          <div className="absolute -top-40 right-0 h-[520px] w-[720px] rounded-full bg-primary/[0.12] blur-3xl" />
          <div className="absolute bottom-0 left-10 h-[360px] w-[360px] rounded-full bg-sky-500/[0.06] blur-3xl" />
          <div className="relative max-w-sm">
            <span className="flex size-12 items-center justify-center rounded-2xl gradient-accent shadow-2xl shadow-primary/30">
              <Rocket className="size-6 text-on-primary" />
            </span>
            <h2 className="mt-6 text-[26px] font-semibold tracking-[-0.03em] leading-tight">
              Your portfolio,
              <br />
              built your way.
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-faint">
              Answer a few quick questions and we&apos;ll spin up a tailored
              starting point. You can change anything later inside the editor.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "A starter template matched to your vibe",
                "Your name, tagline and intro pre-filled",
                "Custom accent color applied across the site",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[12.5px] text-ink-mute">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="size-3 text-primary" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}