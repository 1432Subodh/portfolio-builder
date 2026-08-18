import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  FolderKanban,
  LayoutTemplate,
  BarChart3,
  MessageSquare,
  Settings,
  Component,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavRoute {
  href: string;
  label: string;
  icon: LucideIcon;
  section: "overview" | "management" | "system";
}

export const adminRoutes: AdminNavRoute[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, section: "overview" },
  { href: "/admin/admins", label: "Manage Admins", icon: ShieldCheck, section: "management" },
  { href: "/admin/users", label: "Users", icon: Users, section: "management" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, section: "management" },
  { href: "/admin/templates", label: "Templates", icon: LayoutTemplate, section: "management" },
  { href: "/admin/components", label: "Components", icon: Component, section: "management" },
  { href: "/admin/components/categories", label: "Component Categories", icon: Layers, section: "management" },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, section: "management" },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare, section: "management" },
  { href: "/admin/settings", label: "Settings", icon: Settings, section: "system" },
];

export const adminSections = [
  { key: "overview" as const, label: "Overview" },
  { key: "management" as const, label: "Management" },
  { key: "system" as const, label: "System" },
];