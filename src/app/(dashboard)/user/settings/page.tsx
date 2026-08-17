"use client";

import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { User, Mail, Calendar, Shield, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 max-w-[800px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em]">Settings</h1>
        <p className="mt-1 text-[13px] text-ink-mute">Manage your account and preferences.</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-4"
      >
        <div className="flex items-center gap-2 mb-5">
          <User className="size-4 text-ink-faint" />
          <h2 className="text-[14px] font-semibold">Profile</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="avatar"
              width={64}
              height={64}
              className="size-16 rounded-full ring-2 ring-white/10 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full gradient-accent text-[20px] font-semibold text-on-primary">
              {initials}
            </div>
          )}
          <div>
            <p className="text-[16px] font-medium">{session?.user?.name || "User"}</p>
            <p className="text-[12px] text-ink-faint">{session?.user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-ink-faint uppercase tracking-wider">
              Display Name
            </label>
            <input
              type="text"
              defaultValue={session?.user?.name || ""}
              className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-[13px] text-ink outline-none transition-all focus:border-primary/40 focus:bg-white/[0.06]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-ink-faint uppercase tracking-wider">
              Email
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                defaultValue={session?.user?.email || ""}
                disabled
                className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-[13px] text-ink-faint"
              />
              <span className="text-[11px] text-ink-faint whitespace-nowrap rounded-full bg-white/[0.06] px-2.5 py-1">
                Google account
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="glass rounded-2xl p-6 mb-4"
      >
        <div className="flex items-center gap-2 mb-5">
          <Shield className="size-4 text-ink-faint" />
          <h2 className="text-[14px] font-semibold">Account</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-3">
            <Mail className="size-4 text-ink-faint" />
            <div>
              <p className="text-[11px] text-ink-faint uppercase tracking-wider">Email</p>
              <p className="text-[13px] text-ink">{session?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-3">
            <Calendar className="size-4 text-ink-faint" />
            <div>
              <p className="text-[11px] text-ink-faint uppercase tracking-wider">Signed in via</p>
              <p className="text-[13px] text-ink capitalize">
                {session?.user?.id ? "Google" : "Credentials"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-white/[0.12] cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06]">
              <Bell className="size-4 text-ink-faint" />
            </div>
            <div>
              <p className="text-[13px] font-medium">Notifications</p>
              <p className="text-[11px] text-ink-faint">Manage email alerts</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-white/[0.12] cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06]">
              <CreditCard className="size-4 text-ink-faint" />
            </div>
            <div>
              <p className="text-[13px] font-medium">Billing</p>
              <p className="text-[11px] text-ink-faint">Manage subscription</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
