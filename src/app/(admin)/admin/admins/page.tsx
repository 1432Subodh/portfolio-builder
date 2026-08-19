"use client";

import { useState } from "react";
import { useGetSessionQuery } from "@/lib/redux/api/authApi";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  ShieldCheck,
  Shield,
  X,
  Loader2,
  Trash2,
  Pencil,
  Check,
  Mail,
  Lock,
  User,
  Search,
} from "lucide-react";
import {
  PageHeader,
  Panel,
  StatusBadge,
  Avatar,
  DataTable,
  type Column,
} from "@/components/admin/ui";
import {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  type AdminItem,
  type CreateAdminInput,
  type UpdateAdminInput,
} from "@/lib/redux/api/adminApi";

type AdminRow = AdminItem;

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; admin: AdminRow }
  | null;

const inputCls =
  "h-10 w-full rounded-lg border border-editor-border-strong bg-editor-panel pl-9 pr-3 text-[12.5px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text";

export default function ManageAdminsPage() {
  const { data: session } = useGetSessionQuery();
  const { data: admins = [], isLoading, error } = useGetAdminsQuery();
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<ModalState>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fail = (e: unknown, fallback: string) =>
    setActionError(
      e && typeof e === "object" && "data" in e
        ? ((e as { data?: { error?: string } }).data?.error ?? fallback)
        : fallback
    );

  const toggleActive = (admin: AdminRow) => {
    setActionError(null);
    updateAdmin({ id: admin.id, body: { isActive: !admin.isActive } })
      .unwrap()
      .catch((e) => fail(e, "Update failed"));
  };

  const remove = (admin: AdminRow) => {
    if (!window.confirm(`Delete admin "${admin.name}" (${admin.email})?`)) return;
    setActionError(null);
    deleteAdmin(admin.id)
      .unwrap()
      .catch((e) => fail(e, "Delete failed"));
  };

  const filtered = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.email.toLowerCase().includes(query.toLowerCase())
  );

  const loadError =
    error && typeof error === "object" && "data" in error
      ? ((error as { data?: { error?: string } }).data?.error ?? "Failed to load admins")
      : error
        ? "Failed to load admins"
        : null;
  const banner = loadError ?? actionError;

  const columns: Column<AdminRow>[] = [
    {
      key: "admin",
      header: "Admin",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={r.name} index={admins.findIndex((x) => x.id === r.id)} />
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-editor-text truncate">
              {r.name}
              {session?.user?.email === r.email && (
                <span className="ml-2 rounded bg-editor-accent px-1.5 py-0.5 text-[9px] font-semibold text-editor-on-accent">
                  You
                </span>
              )}
            </p>
            <p className="text-[11px] text-editor-text-faint truncate">{r.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (r) => (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
            r.role === "superadmin" ? "text-amber-400" : "text-sky-400"
          }`}
        >
          {r.role === "superadmin" ? (
            <ShieldCheck className="size-3.5" />
          ) : (
            <Shield className="size-3.5" />
          )}
          {r.role === "superadmin" ? "Superadmin" : "Admin"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.isActive ? "active" : "suspended"} />,
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (r) => (
        <span className="text-editor-text-faint">
          {r.lastLoginAt ? new Date(r.lastLoginAt).toLocaleString() : "Never"}
        </span>
      ),
    },
    {
      key: "created",
      header: "Created",
      render: (r) => (
        <span className="text-editor-text-faint">
          {new Date(r.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (r) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => setModal({ mode: "edit", admin: r })}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text"
            title="Edit"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => toggleActive(r)}
            disabled={r.role === "superadmin"}
            title={r.isActive ? "Deactivate" : "Activate"}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-editor-hover hover:text-editor-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            {r.isActive ? <X className="size-3.5" /> : <Check className="size-3.5" />}
          </button>
          <button
            onClick={() => remove(r)}
            disabled={r.role === "superadmin"}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
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
        title="Manage Admins"
        description="Create, edit and deactivate administrator accounts."
      >
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 rounded-lg bg-editor-accent px-3 py-2 text-[12px] font-medium text-editor-on-accent transition-opacity hover:opacity-90"
        >
          <Plus className="size-3.5" />
          Add Admin
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
              placeholder="Search admins…"
              className="h-9 w-full rounded-lg border border-editor-border-strong bg-editor-panel pl-8 pr-3 text-[12px] text-editor-text placeholder:text-editor-text-ghost outline-none transition-colors focus:border-editor-text"
            />
          </div>
          <span className="text-[11px] text-editor-text-faint tabular-nums">
            {filtered.length} of {admins.length}
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-[12px] text-editor-text-faint">
            <Loader2 className="size-4 animate-spin" />
            Loading admins…
          </div>
        ) : (
          <DataTable columns={columns} rows={filtered} />
        )}
      </Panel>

      <AdminModal
        key={
          modal?.mode === "edit"
            ? `edit-${modal.admin.id}`
            : modal?.mode === "create"
              ? "create"
              : "closed"
        }
        modal={modal}
        onClose={() => setModal(null)}
        onCreate={(body) => createAdmin(body).unwrap()}
        onUpdate={(id, body) => updateAdmin({ id, body }).unwrap()}
      />
    </>
  );
}

function AdminModal({
  modal,
  onClose,
  onCreate,
  onUpdate,
}: {
  modal: ModalState;
  onClose: () => void;
  onCreate: (body: CreateAdminInput) => Promise<AdminItem>;
  onUpdate: (id: string, body: UpdateAdminInput["body"]) => Promise<AdminItem>;
}) {
  const isEdit = modal?.mode === "edit";
  const admin = isEdit && modal ? modal.admin : null;

  const [name, setName] = useState(admin?.name ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "superadmin">(admin?.role ?? "admin");
  const [isActive, setIsActive] = useState(admin?.isActive ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !email.trim()) {
      setFormError("Name and email are required.");
      return;
    }
    if (!isEdit && password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    const isEditMode = modal?.mode === "edit" && modal.admin;

    const body: Record<string, unknown> = {
      name,
      email,
      role,
    };
    if (password.trim()) body.password = password;
    if (isEditMode) body.isActive = isActive;

    try {
      const saved = isEditMode
        ? await onUpdate(modal.admin.id, body as UpdateAdminInput["body"])
        : await onCreate({ name, email, password, role });
      onClose();
      return saved;
    } catch (e) {
      setFormError(
        e && typeof e === "object" && "data" in e
          ? ((e as { data?: { error?: string } }).data?.error ?? "Failed to save admin.")
          : "Failed to save admin."
      );
      return null;
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
            className="fixed inset-x-0 top-[10vh] z-50 mx-auto w-[calc(100vw-32px)] max-w-[420px]"
          >
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-xl border border-editor-border-strong bg-editor-panel shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-editor-border px-5 py-4">
                <h3 className="text-[14px] font-semibold">
                  {isEdit ? "Edit Admin" : "Add New Admin"}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1 text-editor-text-faint hover:bg-editor-hover hover:text-editor-text"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="space-y-3 px-5 py-5">
                {formError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11.5px] text-red-400">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Subodh"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Password {isEdit && <span className="text-editor-text-ghost">(leave blank to keep)</span>}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-editor-text-faint" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isEdit ? "••••••••" : "Min. 8 characters"}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        { value: "admin" as const, label: "Admin", icon: Shield, desc: "Manage day-to-day" },
                        { value: "superadmin" as const, label: "Superadmin", icon: ShieldCheck, desc: "Full control" },
                      ]
                    ).map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`flex flex-col items-start gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                          role === r.value
                            ? "border-editor-accent bg-editor-active"
                            : "border-editor-border-strong hover:border-editor-border"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 text-[12px] font-medium">
                          <r.icon className="size-3.5" />
                          {r.label}
                        </span>
                        <span className="text-[10px] text-editor-text-faint">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {isEdit && (
                  <label className="flex cursor-pointer items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="accent-emerald-400"
                    />
                    <span className="text-[12px] text-editor-text-muted">Account active</span>
                  </label>
                )}
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
                    "Save Admin"
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