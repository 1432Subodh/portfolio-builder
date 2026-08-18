"use client";

import { useState } from "react";
import { Check, Trash2, MessageSquare } from "lucide-react";
import { adminComments, type AdminComment } from "@/lib/admin-mock";
import { PageHeader, Panel, StatusBadge, Avatar } from "@/components/admin/ui";

const filters = ["all", "pending", "approved", "spam"] as const;

export default function AdminCommentsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [rows, setRows] = useState(adminComments);

  const filtered =
    filter === "all" ? rows : rows.filter((c) => c.status === filter);

  const approve = (id: string) =>
    setRows((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
    );
  const markSpam = (id: string) =>
    setRows((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "spam" as const } : c))
    );
  const remove = (id: string) => setRows((prev) => prev.filter((c) => c.id !== id));

  return (
    <>
      <PageHeader
        title="Comments"
        description="Moderate comments left across portfolios."
      />

      <Panel>
        <div className="flex items-center gap-1 px-4 pt-3 pb-1">
          {filters.map((f) => (
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

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[12px] text-editor-text-faint">
            No comments in this view.
          </div>
        ) : (
          <div className="divide-y divide-editor-border/60">
            {filtered.map((c) => (
              <CommentRow
                key={c.id}
                comment={c}
                onApprove={() => approve(c.id)}
                onSpam={() => markSpam(c.id)}
                onDelete={() => remove(c.id)}
              />
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}

function CommentRow({
  comment,
  onApprove,
  onSpam,
  onDelete,
}: {
  comment: AdminComment;
  onApprove: () => void;
  onSpam: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-4">
      <Avatar name={comment.author} index={Number(comment.id)} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <p className="text-[12.5px] font-medium">{comment.author}</p>
          <span className="text-[11px] text-editor-text-faint">
            on {comment.project} · {comment.time}
          </span>
          <StatusBadge status={comment.status} />
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-editor-text-2">
          “{comment.message}”
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {comment.status !== "approved" && (
          <button
            onClick={onApprove}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-primary/15 hover:text-primary"
            title="Approve"
          >
            <Check className="size-3.5" />
          </button>
        )}
        {comment.status !== "spam" && (
          <button
            onClick={onSpam}
            className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-amber-400/15 hover:text-amber-400"
            title="Mark as spam"
          >
            <MessageSquare className="size-3.5" />
          </button>
        )}
        <button
          onClick={onDelete}
          className="rounded-md p-1.5 text-editor-text-faint transition-colors hover:bg-red-500/10 hover:text-red-400"
          title="Delete"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}