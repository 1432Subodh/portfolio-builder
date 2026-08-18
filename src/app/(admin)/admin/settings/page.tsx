"use client";

import { useState } from "react";
import { Check, Globe, Save } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/ui";
import { Dropdown } from "@/components/ui/Dropdown";

function ToggleRow({
  title,
  desc,
  defaultOn = false,
}: {
  title: string;
  desc: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[12.5px] font-medium">{title}</p>
        <p className="text-[11px] text-editor-text-faint mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-primary" : "bg-editor-active"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-editor-text transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [sitename, setSitename] = useState("Profilio");
  const [currency, setCurrency] = useState("USD");
  const [template, setTemplate] = useState("Minimal Studio");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Platform-wide preferences and moderation rules."
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-editor-accent px-3 py-2 text-[12px] font-medium text-editor-on-accent transition-opacity hover:opacity-90"
        >
          {saved ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
          {saved ? "Saved" : "Save Changes"}
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Panel className="p-5">
          <h3 className="text-[13px] font-semibold mb-4">General</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                Platform name
              </label>
              <input
                value={sitename}
                onChange={(e) => setSitename(e.target.value)}
                className="h-10 w-full rounded-lg border border-editor-border-strong bg-editor-panel px-3 text-[12.5px] text-editor-text outline-none transition-colors focus:border-editor-text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                Support email
              </label>
              <input
                defaultValue="support@profilio.com"
                className="h-10 w-full rounded-lg border border-editor-border-strong bg-editor-panel px-3 text-[12.5px] text-editor-text outline-none transition-colors focus:border-editor-text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                Default currency
              </label>
              <Dropdown
                value={currency}
                onChange={setCurrency}
                leadingIcon={Globe}
                placeholder="Select currency"
                options={[
                  { value: "USD", label: "USD — US Dollar" },
                  { value: "EUR", label: "EUR — Euro" },
                  { value: "INR", label: "INR — Indian Rupee" },
                ]}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-editor-text-muted">
                Default template
              </label>
              <Dropdown
                value={template}
                onChange={setTemplate}
                placeholder="Select template"
                options={[
                  { value: "Minimal Studio", label: "Minimal Studio" },
                  { value: "Tech Developer", label: "Tech Developer" },
                  { value: "Creative Agency", label: "Creative Agency" },
                  { value: "Photography Grid", label: "Photography Grid" },
                  { value: "Executive Clean", label: "Executive Clean" },
                ]}
              />
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <h3 className="text-[13px] font-semibold mb-2">Moderation</h3>
          <div className="divide-y divide-editor-border/60">
            <ToggleRow
              title="Require approval for new portfolios"
              desc="Portfolios stay in review until an admin publishes them."
              defaultOn
            />
            <ToggleRow
              title="Auto-flag suspicious comments"
              desc="Spam heuristics tag risky comments for review."
              defaultOn
            />
            <ToggleRow
              title="Public analytics"
              desc="Show view counters publicly on portfolio pages."
            />
            <ToggleRow
              title="Allow custom domains"
              desc="Let users connect their own domains."
              defaultOn
            />
          </div>
        </Panel>

        <Panel className="p-5 lg:col-span-2">
          <h3 className="text-[13px] font-semibold mb-2">Maintenance</h3>
          <div className="divide-y divide-editor-border/60">
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <Globe className="size-4 text-editor-text-faint" />
                <div>
                  <p className="text-[12.5px] font-medium">API status</p>
                  <p className="text-[11px] text-editor-text-faint">
                    All systems operational.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                <span className="size-1.5 rounded-full bg-current" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-4 items-center justify-center">
                  <span className="block size-2.5 rounded-full border border-editor-border-strong" />
                </div>
                <div>
                  <p className="text-[12.5px] font-medium">Danger zone</p>
                  <p className="text-[11px] text-editor-text-faint">
                    Irreversible platform actions.
                  </p>
                </div>
              </div>
              <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-[11px] font-medium text-red-400 transition-colors hover:bg-red-500/10">
                Clear cache
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}