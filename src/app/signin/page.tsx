import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Sign in — Folioforge",
  description:
    "Welcome back. Sign in to Folioforge to pick up where you left off — drafts, analytics and domains all saved.",
};

export default function SigninPage() {
  return <AuthLayout mode="signin" />;
}
