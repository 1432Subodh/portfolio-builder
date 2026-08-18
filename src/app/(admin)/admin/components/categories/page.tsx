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
} from "lucide-react";
import {
  PageHeader,
  Panel,
  StatusBadge,
  DataTable,
  type Column,
} from "@/components/admin/ui";
import {
  useGetCategoriesQuery,
  useGetComponentsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  type ComponentCategoryItem,
  type CreateComponentCategoryInput,
  type UpdateComponentCategoryInput,
} from "@/lib/redux/api/adminApi";

type CategoryRow = ComponentCategoryItem;

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; category: CategoryRow }
  | null;

const inputCls =
  "h-10 w-full rounded-lg border border-editor-border-strong bg-editor-panel px-3 text-[12.5px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text";

export default function ComponentCategoriesPage() {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const { data: components = [] } = useGetComponentsQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<ModalState>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fail = (e: unknown, fallback: string) =>
    setActionError(
      e && typeof e === "object" && "data" in e
        ? ((e as { data?: { error?: string } }).data?.error ?? fallback)
        : fallback
    );

  const toggleActive = (category: CategoryRow) => {
    setActionError(null);
    updateCategory({ id: category.id, body: { isActive: !category.isActive } })
      .unwrap()
      .catch((e) => fail(e, "Update failed"));
  };

  const remove = (category: CategoryRow) => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    setActionError(null);
    deleteCategory(category.id)
      .unwrap()
      .catch((e) => fail(e, "Delete failed"));
  };

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.slug.toLowerCase().includes(query.toLowerCase()) ||
      (c.description ?? "").toLowerCase().includes(query.toLowerCase())
  );

  const countFor = (id: string) =>
    components.filter((c) => c.categoryId === id).length;

  const loadError =
    error && typeof error === "object" && "data" in error
      ? ((error as { data?: { error?: string } }).data?.error ?? "Failed to load categories")
      : error
        ? "Failed to load categories"
        : null;
  const banner = loadError ?? actionError;

  const columns: Column<CategoryRow>[] = [
    {
      key: "category",
      header: "Category",
      render: (c) => (
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-editor-text truncate">{c.name}</p>
          <p className="text-[11px] text-editor-text-faint truncate">/admin/components/categories/{c.slug}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (c) => (
        <span className="text-editor-text-faint truncate block max-w-[260px]">
          {c.description || "—"}
        </span>
      ),
    },
    {
      key: "count",
      header: "Components",
      render: (c) => (
        <span className="tabular-nums text-editor-text-muted">{countFor(c.id)}</span>
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
            onClick={() => setModal({ mode: "edit", category: c })}
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
        title="Component Categories"
        description="Organize the component library into categories used by the editor."
      >
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 rounded-lg bg-editor-accent px-3 py-2 text-[12px] font-medium text-editor-on-accent transition-opacity hover:opacity-90"
        >
          <Plus className="size-3.5" />
          Add Category
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
              placeholder="Search categories…"
              className="h-9 w-full rounded-lg border border-editor-border-strong bg-editor-panel pl-8 pr-3 text-[12px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text"
            />
          </div>
          <span className="text-[11px] text-editor-text-faint tabular-nums">
            {filtered.length} of {categories.length}
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-[12px] text-editor-text-faint">
            <Loader2 className="size-4 animate-spin" />
            Loading categories…
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={filtered}
            emptyLabel="No categories yet."
          />
        )}
      </Panel>

      <CategoryModal
        key={
          modal?.mode === "edit"
            ? `edit-${modal.category.id}`
            : modal?.mode === "create"
              ? "create"
              : "closed"
        }
        modal={modal}
        onClose={() => setModal(null)}
        onCreate={(body) => createCategory(body).unwrap()}
        onUpdate={(id, body) => updateCategory({ id, body }).unwrap()}
      />
    </>
  );
}

function CategoryModal({
  modal,
  onClose,
  onCreate,
  onUpdate,
}: {
  modal: ModalState;
  onClose: () => void;
  onCreate: (body: CreateComponentCategoryInput) => Promise<ComponentCategoryItem>;
  onUpdate: (
    id: string,
    body: UpdateComponentCategoryInput["body"]
  ) => Promise<ComponentCategoryItem>;
}) {
  const isEdit = modal?.mode === "edit";
  const category = isEdit && modal ? modal.category : null;

  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Name is required.");
      return;
    }

    setSubmitting(true);
    try {
      if (isEdit && modal?.mode === "edit") {
        await onUpdate(modal.category.id, {
          name,
          description,
          isActive,
        });
      } else {
        await onCreate({ name, description, isActive });
      }
      onClose();
    } catch (e) {
      setFormError(
        e && typeof e === "object" && "data" in e
          ? ((e as { data?: { error?: string } }).data?.error ?? "Failed to save category.")
          : "Failed to save category."
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
            className="fixed inset-x-0 top-[8vh] z-50 mx-auto w-[calc(100vw-32px)] max-w-[440px]"
          >
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-xl border border-editor-border-strong bg-editor-panel shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-editor-border px-5 py-4">
                <h3 className="text-[14px] font-semibold">
                  {isEdit ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1 text-editor-text-faint hover:bg-editor-hover hover:text-editor-text"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="space-y-3 px-5 py-5 max-h-[62vh] overflow-y-auto">
                {formError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11.5px] text-red-400">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Portfolio"
                    className={inputCls}
                  />
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
                    "Save Category"
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
