import {
  LayoutDashboard,
  FolderOpen,
  LayoutTemplate,
  Briefcase,
  Image,
  BarChart3,
  Search,
  Plug,
  CreditCard,
  User,
  LucideIcon,
} from "lucide-react";

export interface NavRoute {
  href: string;
  label: string;
  icon: LucideIcon;
  section?: "main" | "tools" | "account";
}

export const routes: NavRoute[] = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard, section: "main" },
  { href: "/user/portfolios", label: "Portfolios", icon: FolderOpen, section: "main" },
  { href: "/user/templates", label: "Templates", icon: LayoutTemplate, section: "main" },
  { href: "/user/projects", label: "Projects", icon: Briefcase, section: "main" },
  { href: "/user/media", label: "Media", icon: Image, section: "tools" },
  { href: "/user/analytics", label: "Analytics", icon: BarChart3, section: "tools" },
  { href: "/user/seo", label: "SEO Settings", icon: Search, section: "tools" },
  { href: "/user/integrations", label: "Integrations", icon: Plug, section: "tools" },
  { href: "/user/billing", label: "Billing", icon: CreditCard, section: "account" },
  { href: "/user/settings", label: "Account", icon: User, section: "account" },
];
