import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, isAdminRole } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin — Profilio",
  description: "Profilio admin console.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || !isAdminRole(session.user.role)) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}