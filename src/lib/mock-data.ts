export interface Stat {
  label: string;
  value: string;
  change: number;
  sparkline: number[];
}

export interface Activity {
  id: string;
  type: "update" | "visitor" | "publish" | "lead" | "comment";
  message: string;
  time: string;
  icon: string;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface ProjectThumb {
  id: string;
  name: string;
  tags: string[];
  image: string;
  updatedAt: string;
  height: number;
}

export interface TemplateSuggestion {
  id: string;
  name: string;
  category: string;
  preview: string;
}

export interface AnalyticsPoint {
  date: string;
  views: number;
  visitors: number;
}

export const stats: Stat[] = [
  {
    label: "Portfolio Views",
    value: "12,847",
    change: 14.2,
    sparkline: [40, 55, 35, 65, 48, 72, 60, 85, 70, 92, 78, 95],
  },
  {
    label: "Inbound Leads",
    value: "342",
    change: 8.7,
    sparkline: [20, 30, 25, 40, 35, 50, 45, 55, 48, 60, 52, 65],
  },
  {
    label: "Active Projects",
    value: "7",
    change: 0,
    sparkline: [5, 6, 5, 7, 6, 7, 8, 7, 6, 7, 7, 7],
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: -2.1,
    sparkline: [30, 35, 40, 38, 42, 36, 44, 40, 38, 42, 39, 41],
  },
];

export const activities: Activity[] = [
  {
    id: "1",
    type: "update",
    message: "Updated 'Product Design Portfolio'",
    time: "2 min ago",
    icon: "edit",
  },
  {
    id: "2",
    type: "visitor",
    message: "New visitor from LinkedIn",
    time: "18 min ago",
    icon: "user",
  },
  {
    id: "3",
    type: "publish",
    message: "Portfolio 'Design' was published",
    time: "1 hour ago",
    icon: "globe",
  },
  {
    id: "4",
    type: "lead",
    message: "Inbound lead via Calendly booking",
    time: "3 hours ago",
    icon: "calendar",
  },
  {
    id: "5",
    type: "update",
    message: "Added 3 new projects to 'Tech' portfolio",
    time: "5 hours ago",
    icon: "folder",
  },
  {
    id: "6",
    type: "comment",
    message: "New comment on 'About' section",
    time: "Yesterday",
    icon: "message",
  },
];

export const trafficSources: TrafficSource[] = [
  { name: "Direct", value: 42, color: "#006239" },
  { name: "LinkedIn", value: 28, color: "#0a66c2" },
  { name: "Google", value: 18, color: "#4285f4" },
  { name: "Twitter/X", value: 8, color: "#f5f5f4" },
  { name: "Other", value: 4, color: "#525252" },
];

export const projectThumbs: ProjectThumb[] = [
  {
    id: "1",
    name: "Product Design Portfolio",
    tags: ["Figma", "UX Research", "Design Systems"],
    image: "",
    updatedAt: "2 hours ago",
    height: 220,
  },
  {
    id: "2",
    name: "Full-Stack Engineering",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "",
    updatedAt: "1 day ago",
    height: 280,
  },
  {
    id: "3",
    name: "Brand Identity Work",
    tags: ["Branding", "Illustration", "Print"],
    image: "",
    updatedAt: "3 days ago",
    height: 200,
  },
  {
    id: "4",
    name: "Mobile App Showcase",
    tags: ["React Native", "iOS", "Android"],
    image: "",
    updatedAt: "1 week ago",
    height: 260,
  },
  {
    id: "5",
    name: "Data Visualization Projects",
    tags: ["D3.js", "Python", "Analytics"],
    image: "",
    updatedAt: "2 weeks ago",
    height: 240,
  },
  {
    id: "6",
    name: "Creative Writing Portfolio",
    tags: ["Content", "Editorial", "Copywriting"],
    image: "",
    updatedAt: "3 weeks ago",
    height: 210,
  },
];

export const templateSuggestions: TemplateSuggestion[] = [
  { id: "1", name: "Minimal Studio", category: "Design", preview: "" },
  { id: "2", name: "Tech Developer", category: "Engineering", preview: "" },
  { id: "3", name: "Creative Agency", category: "Agency", preview: "" },
  { id: "4", name: "Photography Grid", category: "Photography", preview: "" },
  { id: "5", name: "Executive Clean", category: "Corporate", preview: "" },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const analyticsDates = [
  "Jul 19", "Jul 20", "Jul 21", "Jul 22", "Jul 23", "Jul 24", "Jul 25",
  "Jul 26", "Jul 27", "Jul 28", "Jul 29", "Jul 30", "Jul 31", "Aug 1",
  "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8",
  "Aug 9", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 14", "Aug 15",
  "Aug 16", "Aug 17",
];

export const analyticsData: AnalyticsPoint[] = analyticsDates.map((date, i) => ({
  date,
  views: Math.floor(300 + seededRandom(i + 1) * 500 + (i > 20 ? 200 : 0)),
  visitors: Math.floor(150 + seededRandom(i + 100) * 250 + (i > 20 ? 100 : 0)),
}));

export const portfolioHealth = {
  score: 85,
  missing: [
    "Add SEO meta description",
    "Upload video introduction",
    "Add 2 more projects",
  ],
};
