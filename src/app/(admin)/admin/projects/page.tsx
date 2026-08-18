"use client";

import { Eye } from "lucide-react";
import { adminProjects, type AdminProject } from "@/lib/admin-mock";
import {
  PageHeader,
  Panel,
  StatusBadge,
  Avatar,
  DataTable,
  type Column,
} from "@/components/admin/ui";

const columns: Column<AdminProject>[] = [
  {
    key: "project",
    header: "Project",
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-editor-surface-2">
          <Eye className="size-3.5 text-editor-text-faint" />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-editor-text truncate">{r.name}</p>
          <p className="text-[11px] text-editor-text-faint truncate">{r.template}</p>
        </div>
      </div>
    ),
  },
  {
    key: "owner",
    header: "Owner",
    render: (r) => (
      <div className="flex items-center gap-2">
        <Avatar name={r.owner} index={Number(r.id)} />
        <span className="text-[12px]">{r.owner}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
  {
    key: "views",
    header: "Views",
    render: (r) => (
      <span className="tabular-nums text-editor-text-2">
        {r.views.toLocaleString()}
      </span>
    ),
  },
  {
    key: "updated",
    header: "Updated",
    render: (r) => <span className="text-editor-text-faint">{r.updated}</span>,
  },
];

export default function AdminProjectsPage() {
  const total = adminProjects.reduce((acc, p) => acc + p.views, 0);
  const published = adminProjects.filter((p) => p.status === "published").length;

  return (
    <>
      <PageHeader
        title="Projects"
        description={`${adminProjects.length} portfolios · ${published} published · ${total.toLocaleString()} total views`}
      />

      <Panel>
        <DataTable columns={columns} rows={adminProjects} />
      </Panel>
    </>
  );
}