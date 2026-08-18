"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  X,
  Loader2,
  Trash2,
  Pencil,
  Check,
  Search,
  Hash,
  Boxes,
  FolderTree,
  Component,
  Braces,
} from "lucide-react";
import {
  PageHeader,
  Panel,
  StatusBadge,
  DataTable,
  type Column,
} from "@/components/admin/ui";
import { Dropdown } from "@/components/ui/Dropdown";
import {
  useGetCategoriesQuery,
  useGetComponentsQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
  type ComponentItem,
  type CreateComponentInput,
  type UpdateComponentInput,
} from "@/lib/redux/api/adminApi";

type ComponentRow = ComponentItem;

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; component: ComponentRow }
  | null;

const inputCls =
  "h-10 w-full rounded-lg border border-editor-border-strong bg-editor-panel pl-9 pr-3 text-[12.5px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text";
const jsonInputCls =
  "w-full rounded-lg border border-editor-border-strong bg-editor-panel px-3 py-2.5 font-mono text-[11px] leading-relaxed text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text resize-y";

const componentTypes = [
  "header",
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "testimonials",
  "services",
  "contact",
  "footer",
  "section",
  "text",
  "heading",
  "image",
  "video",
  "gallery",
  "button",
  "card",
  "grid",
  "columns",
];

export default function ComponentsPage() {
  const { data: components = [], isLoading, error } = useGetComponentsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [createComponent] = useCreateComponentMutation();
  const [updateComponent] = useUpdateComponentMutation();
  const [deleteComponent] = useDeleteComponentMutation();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<ModalState>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fail = (e: unknown, fallback: string) =>
    setActionError(
      e && typeof e === "object" && "data" in e
        ? ((e as { data?: { error?: string } }).data?.error ?? fallback)
        : fallback
    );

  const toggleActive = (component: ComponentRow) => {
    setActionError(null);
    updateComponent({ id: component.id, body: { isActive: !component.isActive } })
      .unwrap()
      .catch((e) => fail(e, "Update failed"));
  };

  const remove = (component: ComponentRow) => {
    if (!window.confirm(`Delete component "${component.name}"?`)) return;
    setActionError(null);
    deleteComponent(component.id)
      .unwrap()
      .catch((e) => fail(e, "Delete failed"));
  };

  const filtered = components.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.slug.toLowerCase().includes(query.toLowerCase()) ||
      (c.description ?? "").toLowerCase().includes(query.toLowerCase()) ||
      (c.category?.name ?? "").toLowerCase().includes(query.toLowerCase())
  );

  const loadError =
    error && typeof error === "object" && "data" in error
      ? ((error as { data?: { error?: string } }).data?.error ?? "Failed to load components")
      : error
        ? "Failed to load components"
        : null;
  const banner = loadError ?? actionError;

  const columns: Column<ComponentRow>[] = [
    {
      key: "component",
      header: "Component",
      render: (c) => (
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-editor-text truncate">{c.name}</p>
          <p className="text-[11px] text-editor-text-faint truncate">{c.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (c) =>
        c.category ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-editor-surface-2 px-2 py-0.5 text-[10px] font-medium text-editor-text-muted">
            {c.category.name}
          </span>
        ) : (
          <span className="text-editor-text-ghost">—</span>
        ),
    },
    {
      key: "type",
      header: "Type",
      render: (c) =>
        c.type ? (
          <span className="text-[11px] font-medium text-sky-400">{c.type}</span>
        ) : (
          <span className="text-editor-text-ghost">—</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (c) => <StatusBadge status={c.isActive ? "active" : "suspended"} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (c) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => setModal({ mode: "edit", component: c })}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text"
            title="Edit"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => toggleActive(c)}
            title={c.isActive ? "Deactivate" : "Activate"}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text"
          >
            {c.isActive ? <X className="size-3.5" /> : <Check className="size-3.5" />}
          </button>
          <button
            onClick={() => remove(c)}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-red-500/10 hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Components"
        description="Manage reusable components available in the editor library."
      >
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 rounded-lg bg-editor-accent px-3 py-2 text-[12px] font-medium text-editor-on-accent transition-opacity hover:opacity-90"
        >
          <Plus className="size-3.5" />
          Add Component
        </button>
      </PageHeader>

      {banner && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-4 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-400"
        >
          <span className="size-1.5 shrink-0 rounded-full bg-red-500" />
          {banner}
        </motion.div>
      )}

      <Panel>
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-1">
          <div className="relative w-full max-w-[260px]">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="h-9 w-full rounded-lg border border-editor-border-strong bg-editor-panel pl-8 pr-3 text-[12px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text"
            />
          </div>
          <span className="text-[11px] text-editor-text-faint tabular-nums">
            {filtered.length} of {components.length}
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-[12px] text-editor-text-faint">
            <Loader2 className="size-4 animate-spin" />
            Loading components…
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={filtered}
            emptyLabel="No components yet."
          />
        )}
      </Panel>

      <ComponentModal
        key={
          modal?.mode === "edit"
            ? `edit-${modal.component.id}`
            : modal?.mode === "create"
              ? "create"
              : "closed"
        }
        modal={modal}
        categories={categories}
        onClose={() => setModal(null)}
        onCreate={(body) => createComponent(body).unwrap()}
        onUpdate={(id, body) => updateComponent({ id, body }).unwrap()}
      />
    </>
  );
}

function ComponentModal({
  modal,
  categories,
  onClose,
  onCreate,
  onUpdate,
}: {
  modal: ModalState;
  categories: { id: string; name: string }[];
  onClose: () => void;
  onCreate: (body: CreateComponentInput) => Promise<ComponentItem>;
  onUpdate: (id: string, body: UpdateComponentInput["body"]) => Promise<ComponentItem>;
}) {
  const isEdit = modal?.mode === "edit";
  const component = isEdit && modal ? modal.component : null;

  const [name, setName] = useState(component?.name ?? "");
  const [categoryId, setCategoryId] = useState(
    component?.categoryId ?? categories[0]?.id ?? ""
  );
  const [type, setType] = useState(component?.type ?? "");
  const [componentSlug, setComponentSlug] = useState(component?.componentSlug ?? "");
  const [description, setDescription] = useState(component?.description ?? "");
  const [isActive, setIsActive] = useState(component?.isActive ?? true);
  const [contentJson, setContentJson] = useState(
    component?.content && Object.keys(component.content).length
      ? JSON.stringify(component.content, null, 2)
      : ""
  );
  const [themeJson, setThemeJson] = useState(
    component?.theme && Object.keys(component.theme).length
      ? JSON.stringify(component.theme, null, 2)
      : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Name is required.");
      return;
    }
    if (!categoryId) {
      setFormError("Pick a component category first.");
      return;
    }

    let content: Record<string, unknown> = {};
    let theme: Record<string, unknown> = {};
    if (contentJson.trim()) {
      try {
        const parsed = JSON.parse(contentJson);
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("must be an object");
        }
        content = parsed;
      } catch {
        setFormError("Content JSON is invalid (must be a JSON object).");
        return;
      }
    }
    if (themeJson.trim()) {
      try {
        const parsed = JSON.parse(themeJson);
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("must be an object");
        }
        theme = parsed;
      } catch {
        setFormError("Theme JSON is invalid (must be a JSON object).");
        return;
      }
    }

    const componentSlugValue = componentSlug.trim() || undefined;

    setSubmitting(true);
    try {
      if (isEdit && modal?.mode === "edit") {
        await onUpdate(modal.component.id, {
          name,
          categoryId,
          type,
          componentSlug: componentSlugValue,
          description,
          isActive,
          content,
          theme,
        });
      } else {
        await onCreate({
          name,
          categoryId,
          type,
          componentSlug: componentSlugValue,
          description,
          isActive,
          content,
          theme,
        });
      }
      onClose();
    } catch (e) {
      setFormError(
        e && typeof e === "object" && "data" in e
          ? ((e as { data?: { error?: string } }).data?.error ?? "Failed to save component.")
          : "Failed to save component."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[6vh] z-50 mx-auto w-[calc(100vw-32px)] max-w-[460px]"
          >
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-xl border border-editor-border-strong bg-editor-panel shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-editor-border px-5 py-4">
                <h3 className="text-[14px] font-semibold">
                  {isEdit ? "Edit Component" : "Add New Component"}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1 text-editor-text-faint hover:bg-editor-hover hover:text-editor-text"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="space-y-3 px-5 py-5 max-h-[64vh] overflow-y-auto">
                {formError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11.5px] text-red-400">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Name
                  </label>
                  <div className="relative">
                    <Boxes className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hero"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Category
                  </label>
                  <Dropdown
                    value={categoryId}
                    onChange={(v) => setCategoryId(v)}
                    leadingIcon={FolderTree}
                    placeholder={categories.length === 0 ? "No categories yet" : "Select category"}
                    options={categories.map((c) => ({ value: c.id, label: c.name }))}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Type
                  </label>
                  <div className="relative">
                    <Component className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
                    <input
                      list="component-type-options"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="e.g. hero, header, about"
                      className={inputCls}
                    />
                    <datalist id="component-type-options">
                      {componentTypes.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Component slug
                    <span className="ml-1 text-editor-text-ghost">(editor identifier)</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
                    <input
                      value={componentSlug}
                      onChange={(e) => setComponentSlug(e.target.value)}
                      placeholder="auto from type or name"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description shown in the editor"
                    rows={2}
                    className="w-full rounded-lg border border-editor-border-strong bg-editor-panel px-3 py-2.5 text-[12.5px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text resize-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-editor-text-muted">
                    <Braces className="size-3" />
                    Content JSON
                    <span className="text-editor-text-ghost">(default content)</span>
                  </label>
                  <textarea
                    value={contentJson}
                    onChange={(e) => setContentJson(e.target.value)}
                    rows={4}
                    placeholder='{"heading": "Welcome", "subtitle": "A short intro", "cta": "Get in touch"}'
                    className={jsonInputCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-editor-text-muted">
                    <Braces className="size-3" />
                    Theme JSON
                    <span className="text-editor-text-ghost">(default styles)</span>
                  </label>
                  <textarea
                    value={themeJson}
                    onChange={(e) => setThemeJson(e.target.value)}
                    rows={4}
                    placeholder='{"textColor": "#0f172a", "bgColor": "#ffffff", "spacing": "lg"}'
                    className={jsonInputCls}
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-emerald-400"
                  />
                  <span className="text-[12px] text-editor-text-muted">Active in editor library</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 border-t border-editor-border px-5 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-[12px] font-medium text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-lg bg-editor-accent px-4 py-2 text-[12px] font-medium text-editor-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save Component"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
