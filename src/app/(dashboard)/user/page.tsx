"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Eye,
  Plus,
  Edit3,
  User,
  Calendar,
  FolderOpen,
  MessageSquare,
  Layout,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import {
  stats,
  activities,
  trafficSources,
  projectThumbs,
  templateSuggestions,
  analyticsData,
  portfolioHealth,
} from "@/lib/mock-data";
import {
  useGetProjectsQuery,
  type Project,
} from "@/lib/redux/api/projectsApi";

export default function UserDashboard() {
  const { data: session } = useSession();
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [analyticsView, setAnalyticsView] = useState<"views" | "visitors">("views");

  const userName = session?.user?.name?.split(" ")[0] || "there";

  const maxViews = Math.max(...analyticsData.map((d) => d.views));
  const maxVisitors = Math.max(...analyticsData.map((d) => d.visitors));

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.03em]">
          Welcome back, {userName}
        </h1>
        <p className="mt-1.5 text-[14px] text-ink-mute">
          Here&apos;s what&apos;s happening with your portfolios today.
        </p>
      </motion.div>

      {/* Row 1: Executive Summary — Floating Stat Blocks */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="group relative">
            <div className="flex items-end justify-between mb-3">
              <p className="text-[11px] font-medium text-ink-faint uppercase tracking-[0.12em]">
                {stat.label}
              </p>
              {stat.change !== 0 && (
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-medium ${
                    stat.change > 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.change > 0 ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(stat.change)}%
                </span>
              )}
            </div>
            <p className="stat-number text-ink">{stat.value}</p>
            {/* Sparkline */}
            <div className="sparkline mt-3">
              {stat.sparkline.map((val, j) => (
                <div
                  key={j}
                  className="sparkline-bar"
                  style={{
                    height: `${(val / Math.max(...stat.sparkline)) * 100}%`,
                    opacity: j === stat.sparkline.length - 1 ? 1 : 0.3 + (j / stat.sparkline.length) * 0.5,
                  }}
                />
              ))}
            </div>
            {/* Subtle underline gradient */}
            <div className="mt-3 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
          </div>
        ))}
      </motion.div>

      {/* Row 2: Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bento-grid mb-8"
      >
        {/* Portfolio Health — Large (span 5) */}
        <div className="col-span-12 lg:col-span-5 glass rounded-2xl p-5 transition-all duration-300 hover:border-white/[0.1]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold">Portfolio Health</h3>
            <span className="text-[11px] text-ink-faint">Score</span>
          </div>

          {/* Circular score */}
          <div className="flex items-center gap-6">
            <div className="relative size-28 shrink-0">
              <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-white/[0.06]"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${(portfolioHealth.score / 100) * 264} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-semibold tracking-tight">{portfolioHealth.score}</span>
                <span className="text-[10px] text-ink-faint">/ 100</span>
              </div>
            </div>

            <div className="flex-1 space-y-2.5">
              <p className="text-[11px] font-medium text-ink-faint uppercase tracking-wider mb-2">Missing Items</p>
              {portfolioHealth.missing.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-ink-mute">
                  <div className="size-1.5 rounded-full bg-amber-400/80 shrink-0" />
                  {item}
                </div>
              ))}
              <Link
                href="/user/settings"
                className="inline-flex items-center gap-1 mt-2 text-[11px] font-medium text-primary hover:text-primary-deep transition-colors"
              >
                Complete setup <ChevronRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity — Medium (span 4) */}
        <div className="col-span-12 lg:col-span-4 glass rounded-2xl p-5 transition-all duration-300 hover:border-white/[0.1]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold">Recent Activity</h3>
            <span className="text-[11px] text-ink-faint">Today</span>
          </div>

          <div className="space-y-0">
            {activities.slice(0, 5).map((activity, i) => (
              <div key={activity.id} className="flex items-start gap-3 py-2.5 relative">
                {/* Timeline line */}
                {i < 4 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-px bg-white/[0.06]" />
                )}
                {/* Icon */}
                <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-white/[0.06] shrink-0">
                  <ActivityIcon type={activity.type} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-ink truncate">{activity.message}</p>
                  <p className="text-[10px] text-ink-faint mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources — Small (span 3) */}
        <div className="col-span-12 lg:col-span-3 glass rounded-2xl p-5 transition-all duration-300 hover:border-white/[0.1]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold">Traffic Sources</h3>
          </div>

          {/* Donut chart placeholder — using bars */}
          <div className="space-y-3">
            {trafficSources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-ink-mute">{source.name}</span>
                  <span className="text-[11px] font-medium">{source.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.value}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini donut */}
          <div className="mt-4 flex justify-center">
            <div className="relative size-20">
              <svg className="size-20 -rotate-90" viewBox="0 0 100 100">
                {trafficSources.reduce<{ offset: number; elements: React.ReactNode[] }>(
                  (acc, source, i) => {
                    const circumference = (source.value / 100) * 251.3;
                    const el = (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={source.color}
                        strokeWidth="8"
                        strokeDasharray={`${circumference} 251.3`}
                        strokeDashoffset={-acc.offset}
                        className="transition-all duration-700"
                      />
                    );
                    return { offset: acc.offset + circumference, elements: [...acc.elements, el] };
                  },
                  { offset: 0, elements: [] }
                ).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[16px] font-semibold">12.8k</p>
                  <p className="text-[9px] text-ink-faint">views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 3: Project Showcase — Masonry Grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold tracking-tight">Your Projects</h2>
          <Link
            href="/user/projects"
            className="flex items-center gap-1 text-[12px] font-medium text-ink-faint hover:text-ink transition-colors"
          >
            View all <ChevronRight className="size-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="masonry-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="masonry-item">
                <div className="h-48 animate-pulse rounded-2xl bg-white/[0.03]" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center glass rounded-2xl py-16">
            <FolderOpen className="mb-3 size-8 text-ink-faint" />
            <p className="text-[13px] font-medium text-ink-mute">No projects yet</p>
            <p className="mt-1 text-[12px] text-ink-faint">Create your first portfolio to get started.</p>
            <Link
              href="/editor"
              className="mt-4 flex items-center gap-2 rounded-lg gradient-accent px-4 py-2 text-[12px] font-medium text-on-primary transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              <Plus className="size-3.5" />
              New Project
            </Link>
          </div>
        ) : (
          <div className="masonry-grid">
            {/* Real projects first */}
            {projects.slice(0, 6).map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
            {/* Fill with mock thumbs if less than 6 */}
            {projects.length < 6 &&
              projectThumbs.slice(0, 6 - projects.length).map((thumb, i) => (
                <MockProjectCard key={thumb.id} thumb={thumb} index={projects.length + i} />
              ))}
          </div>
        )}
      </motion.div>

      {/* Row 4: Template Suggestions — Horizontal Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[16px] font-semibold tracking-tight">Recommended Templates</h2>
            <p className="text-[12px] text-ink-faint mt-0.5">Based on your &ldquo;Tech&rdquo; portfolio style</p>
          </div>
          <Link
            href="/user/templates"
            className="flex items-center gap-1 text-[12px] font-medium text-ink-faint hover:text-ink transition-colors"
          >
            Browse all <ChevronRight className="size-3" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {templateSuggestions.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              className="shrink-0 w-[200px] sm:w-[220px] group"
            >
              <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:scale-[1.02]">
                {/* Mockup frame */}
                <div className="relative h-[140px] bg-gradient-to-br from-canvas-soft to-canvas-night p-3">
                  {/* MacBook frame */}
                  <div className="absolute inset-3 rounded-lg border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                    <div className="h-2 border-b border-white/[0.06] flex items-center gap-1 px-2">
                      <div className="size-1 rounded-full bg-red-400/60" />
                      <div className="size-1 rounded-full bg-yellow-400/60" />
                      <div className="size-1 rounded-full bg-green-400/60" />
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="h-1 w-12 rounded bg-white/[0.1]" />
                      <div className="h-1 w-8 rounded bg-white/[0.06]" />
                      <div className="mt-2 h-6 rounded bg-primary/20" />
                      <div className="h-1 w-16 rounded bg-white/[0.08]" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[12px] font-medium">{template.name}</p>
                  <p className="text-[10px] text-ink-faint mt-0.5">{template.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Row 5: Analytics Deep Dive — Full Width Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass rounded-2xl p-5 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-[16px] font-semibold tracking-tight">Traffic Overview</h2>
            <p className="text-[12px] text-ink-faint mt-0.5">Last 30 days</p>
          </div>
          {/* Toggle */}
          <div className="flex rounded-lg bg-white/[0.04] p-0.5">
            {(["views", "visitors"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setAnalyticsView(view)}
                className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition-all ${
                  analyticsView === view
                    ? "bg-primary/20 text-primary shadow-sm"
                    : "text-ink-faint hover:text-ink"
                }`}
              >
                {view === "views" ? "Page Views" : "Unique Visitors"}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-[200px] sm:h-[240px]">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-px bg-white/[0.04]" />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-[2px] sm:gap-1">
            {analyticsData.map((point, i) => {
              const value = analyticsView === "views" ? point.views : point.visitors;
              const max = analyticsView === "views" ? maxViews : maxVisitors;
              const height = (value / max) * 100;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.015, ease: "easeOut" }}
                  className="flex-1 rounded-t-sm bg-primary/40 hover:bg-primary/70 transition-colors relative group cursor-pointer"
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-canvas-night text-[10px] text-ink opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                    {point.date}: {value.toLocaleString()}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[9px] text-ink-faint">
            <span>{analyticsData[0]?.date}</span>
            <span>{analyticsData[Math.floor(analyticsData.length / 2)]?.date}</span>
            <span>{analyticsData[analyticsData.length - 1]?.date}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const iconClass = "size-3";
  switch (type) {
    case "update":
      return <Edit3 className={iconClass} />;
    case "visitor":
      return <User className={iconClass} />;
    case "publish":
      return <Globe className={iconClass} />;
    case "lead":
      return <Calendar className={iconClass} />;
    case "comment":
      return <MessageSquare className={iconClass} />;
    default:
      return <FolderOpen className={iconClass} />;
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
      className="masonry-item"
    >
      <Link
        href={`/editor?id=${project._id}`}
        className="group block glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:scale-[1.01]"
      >
        {/* Thumbnail area */}
        <div className="relative h-36 bg-gradient-to-br from-canvas-soft to-canvas-night flex items-center justify-center">
          <Globe className="size-8 text-ink-faint/40" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-md bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-white">
                <Edit3 className="size-2.5" /> Edit
              </span>
            </div>
          </div>
          {/* Drag handle */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="size-4 text-white/40" />
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-[13px] font-medium truncate group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                project.published
                  ? "bg-primary/15 text-primary"
                  : "bg-white/[0.06] text-ink-faint"
              }`}
            >
              {project.published ? (
                <><Globe className="size-2.5" /> Published</>
              ) : (
                <><Eye className="size-2.5" /> Draft</>
              )}
            </span>
            <span className="text-[10px] text-ink-faint">
              {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MockProjectCard({ thumb, index }: { thumb: typeof projectThumbs[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
      className="masonry-item"
    >
      <div className="group glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:scale-[1.01]">
        <div
          className="relative bg-gradient-to-br from-canvas-soft to-canvas-night flex items-center justify-center"
          style={{ height: thumb.height }}
        >
          <Layout className="size-8 text-ink-faint/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="size-4 text-white/40" />
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-[13px] font-medium truncate">{thumb.name}</h3>
          <div className="mt-2 flex flex-wrap gap-1">
            {thumb.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] text-ink-faint"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-ink-faint">{thumb.updatedAt}</p>
        </div>
      </div>
    </motion.div>
  );
}
