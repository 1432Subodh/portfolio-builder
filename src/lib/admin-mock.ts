export interface AdminStat {
  label: string;
  value: string;
  change: number;
  hint: string;
  sparkline: number[];
}

export const adminStats: AdminStat[] = [
  {
    label: "Total Users",
    value: "48,932",
    change: 12.4,
    hint: "+5,284 this month",
    sparkline: [30, 42, 38, 55, 48, 66, 72, 80, 76, 92, 98, 100],
  },
  {
    label: "Active Projects",
    value: "7,142",
    change: 8.1,
    hint: "312 published today",
    sparkline: [22, 30, 28, 40, 36, 52, 46, 58, 62, 70, 74, 84],
  },
  {
    label: "Admin Accounts",
    value: "4",
    change: 33.3,
    hint: "1 superadmin seated",
    sparkline: [10, 10, 10, 20, 20, 20, 30, 30, 30, 40, 40, 40],
  },
  {
    label: "Monthly Signups",
    value: "$0 MRR",
    change: -4.2,
    hint: "Free tier → Pro spot",
    sparkline: [40, 36, 44, 38, 30, 34, 28, 32, 26, 30, 24, 22],
  },
];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  provider: "credentials" | "google";
  plan: string;
  status: "active" | "suspended" | "invited";
  projects: number;
  joined: string;
  lastActive: string;
}

export const adminUsers: AdminUser[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav@example.com", provider: "google", plan: "Pro", status: "active", projects: 6, joined: "Jan 12, 2026", lastActive: "2 min ago" },
  { id: "2", name: "Priya Patel", email: "priya@example.com", provider: "credentials", plan: "Free", status: "active", projects: 2, joined: "Feb 3, 2026", lastActive: "1 hr ago" },
  { id: "3", name: "Rahul Verma", email: "rahul@example.com", provider: "google", plan: "Pro", status: "suspended", projects: 11, joined: "Mar 18, 2026", lastActive: "3 days ago" },
  { id: "4", name: "Ananya Iyer", email: "ananya@example.com", provider: "credentials", plan: "Free", status: "invited", projects: 0, joined: "Apr 2, 2026", lastActive: "never" },
  { id: "5", name: "Vikram Singh", email: "vikram@example.com", provider: "google", plan: "Pro", status: "active", projects: 9, joined: "Apr 29, 2026", lastActive: "14 min ago" },
  { id: "6", name: "Sneha Rao", email: "sneha@example.com", provider: "credentials", plan: "Free", status: "active", projects: 3, joined: "May 15, 2026", lastActive: "4 hrs ago" },
  { id: "7", name: "Karan Mehta", email: "karan@example.com", provider: "google", plan: "Team", status: "active", projects: 18, joined: "Jun 1, 2026", lastActive: "Just now" },
  { id: "8", name: "Divya Nair", email: "divya@example.com", provider: "credentials", plan: "Pro", status: "suspended", projects: 5, joined: "Jun 22, 2026", lastActive: "1 week ago" },
];

export interface AdminProject {
  id: string;
  name: string;
  owner: string;
  template: string;
  status: "published" | "draft" | "review";
  views: number;
  updated: string;
}

export const adminProjects: AdminProject[] = [
  { id: "1", name: "Product Design Portfolio", owner: "Aarav Sharma", template: "Minimal Studio", status: "published", views: 4821, updated: "2 hr ago" },
  { id: "2", name: "Full-Stack Engineer", owner: "Karan Mehta", template: "Tech Developer", status: "published", views: 3204, updated: "5 hr ago" },
  { id: "3", name: "Brand Identity Showcase", owner: "Priya Patel", template: "Creative Agency", status: "draft", views: 0, updated: "1 day ago" },
  { id: "4", name: "Data Viz Lab", owner: "Vikram Singh", template: "Executive Clean", status: "review", views: 1120, updated: "2 days ago" },
  { id: "5", name: "Photography Grid", owner: "Sneha Rao", template: "Photography Grid", status: "published", views: 895, updated: "3 days ago" },
  { id: "6", name: "UX Case Study Vault", owner: "Divya Nair", template: "Tech Developer", status: "draft", views: 0, updated: "6 days ago" },
  { id: "7", name: "Motion Artist Reel", owner: "Rahul Verma", template: "Creative Agency", status: "published", views: 2312, updated: "1 week ago" },
  { id: "8", name: "Academia Landing", owner: "Ananya Iyer", template: "Executive Clean", status: "review", views: 64, updated: "1 week ago" },
];

export interface AdminTemplate {
  id: string;
  name: string;
  category: string;
  usage: number;
  rating: number;
  status: "live" | "beta";
}

export const adminTemplates: AdminTemplate[] = [
  { id: "1", name: "Minimal Studio", category: "Design", usage: 1240, rating: 4.8, status: "live" },
  { id: "2", name: "Tech Developer", category: "Engineering", usage: 980, rating: 4.7, status: "live" },
  { id: "3", name: "Creative Agency", category: "Agency", usage: 762, rating: 4.6, status: "live" },
  { id: "4", name: "Photography Grid", category: "Photography", usage: 534, rating: 4.5, status: "live" },
  { id: "5", name: "Executive Clean", category: "Corporate", usage: 411, rating: 4.4, status: "live" },
  { id: "6", name: "Bloom Editorial", category: "Editorial", usage: 98, rating: 4.9, status: "beta" },
];

export interface AdminComment {
  id: string;
  author: string;
  email: string;
  project: string;
  message: string;
  status: "pending" | "approved" | "spam";
  time: string;
}

export const adminComments: AdminComment[] = [
  { id: "1", author: "Jordan Reyes", email: "jordan@example.com", project: "Product Design Portfolio", message: "Love the case study breakdown — super clear!", status: "pending", time: "12 min ago" },
  { id: "2", author: "Maya Chen", email: "maya@example.com", project: "Full-Stack Engineer", message: "Hire this person please.", status: "approved", time: "1 hr ago" },
  { id: "3", author: "Dev Patel", email: "dev@example.com", project: "Data Viz Lab", message: "Great charts. Bookmarked your contact form.", status: "pending", time: "3 hrs ago" },
  { id: "4", author: "Spam Bot 9000", email: "spam@example.com", project: "Photo Grid", message: "BUY CHEAP MEDS NOW !!!CLICK!!!", status: "spam", time: "5 hrs ago" },
  { id: "5", author: "Lena Fischer", email: "lena@example.com", project: "Brand Identity Showcase", message: "The typography section is gorgeous.", status: "approved", time: "Yesterday" },
  { id: "6", author: "Tom Okada", email: "tom@example.com", project: "UX Case Study Vault", message: "Would love a walkthrough of your Figma file.", status: "pending", time: "2 days ago" },
];

export const adminActivity = [
  { type: "user" as const, message: "New user signed up via Google", time: "5 min ago", meta: "aarav@example.com" },
  { type: "publish" as const, message: "Project published to production", time: "18 min ago", meta: "Product Design Portfolio" },
  { type: "flag" as const, message: "Comment flagged as spam", time: "1 hr ago", meta: "Photo Grid" },
  { type: "admin" as const, message: "Admin panel login", time: "2 hrs ago", meta: "test@subodh.com" },
  { type: "upgrade" as const, message: "Workspace upgraded to Team", time: "5 hrs ago", meta: "karan@example.com" },
  { type: "user" as const, message: "New user signed up via credentials", time: "7 hrs ago", meta: "sneha@example.com" },
];

export const adminChart = [
  { date: "Aug 1", views: 820, users: 340 },
  { date: "Aug 2", views: 980, users: 402 },
  { date: "Aug 3", views: 720, users: 298 },
  { date: "Aug 4", views: 1100, users: 460 },
  { date: "Aug 5", views: 1240, users: 512 },
  { date: "Aug 6", views: 900, users: 388 },
  { date: "Aug 7", views: 1420, users: 590 },
  { date: "Aug 8", views: 1660, users: 640 },
  { date: "Aug 9", views: 1300, users: 520 },
  { date: "Aug 10", views: 1508, users: 611 },
  { date: "Aug 11", views: 1180, users: 470 },
  { date: "Aug 12", views: 1752, users: 706 },
  { date: "Aug 13", views: 1902, users: 761 },
  { date: "Aug 14", views: 2104, users: 842 },
];