"use client";

import { useState } from "react";
import { Download, Filter } from "lucide-react";
import { adminUsers, type AdminUser } from "@/lib/admin-mock";
import {
  PageHeader,
  Panel,
  StatusBadge,
  Avatar,
  DataTable,
  type Column,
} from "@/components/admin/ui";

const columns: Column<AdminUser>[] = [
  {
    key: "user",
    header: "User",
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={r.name} index={Number(r.id)} />
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-editor-text truncate">{r.name}</p>
          <p className="text-[11px] text-editor-text-faint truncate">{r.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "provider",
    header: "Provider",
    render: (r) => (
      <span className="rounded-md bg-editor-surface-2 px-2 py-0.5 text-[10px] font-medium capitalize">
        {r.provider}
      </span>
    ),
  },
  {
    key: "plan",
    header: "Plan",
    render: (r) => <span className="font-medium">{r.plan}</span>,
  },
  {
    key: "projects",
    header: "Projects",
    render: (r) => <span className="tabular-nums">{r.projects}</span>,
  },
  {
    key: "joined",
    header: "Joined",
    render: (r) => <span className="text-editor-text-faint">{r.joined}</span>,
  },
  {
    key: "lastActive",
    header: "Last Active",
    render: (r) => <span className="text-editor-text-faint">{r.lastActive}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<"all" | "active" | "suspended" | "invited">("all");
  const rows =
    filter === "all" ? adminUsers : adminUsers.filter((u) => u.status === filter);

  return (
    <>
      <PageHeader
        title="Users"
        description="Every account registered on Profilio."
      >
        <button className="flex items-center gap-2 rounded-lg border border-editor-border-strong px-3 py-2 text-[12px] font-medium text-editor-text-muted transition-colors hover:bg-editor-hover hover:text-editor-text">
          <Download className="size-3.5" />
          Export
        </button>
      </PageHeader>

      <Panel>
        <div className="flex items-center gap-1 px-4 pt-3 pb-1">
          <Filter className="size-3.5 text-editor-text-faint" />
          {(["all", "active", "suspended", "invited"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-editor-active text-editor-text"
                  : "text-editor-text-faint hover:text-editor-text"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <DataTable columns={columns} rows={rows} />
      </Panel>
    </>
  );
}