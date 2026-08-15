import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Create your account — Folioforge",
  description:
    "Start building your portfolio for free. AI drafts your layout, your domain connects in one click, and you publish in minutes.",
};

export default function SignupPage() {
  return <AuthLayout mode="signup" />;
}
