"use client";

import { Menu, User } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

type UserInfo = {
  username: string;
  email: string;
  role: string;
};

type Props = {
  user: UserInfo;
  onOpenSidebar: () => void;
};

export default function AdminTopbar({ user, onOpenSidebar }: Props) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 border-b backdrop-blur-md transition-colors"
      style={{
        background: "var(--nav-bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Kiri: Hamburger mobile saja */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl border transition-all hover:scale-105"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
          aria-label="Buka menu navigasi"
          type="button"
        >
          <Menu size={18} />
        </button>

        <span
          className="text-xs tracking-[0.2em] uppercase hidden sm:block"
          style={{ color: "var(--text-muted)" }}
        >
          Admin Panel
        </span>
      </div>

      {/* Kanan: Theme Toggle & Info User */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            {user.username.slice(0, 1) || <User size={13} />}
          </div>
          <div className="hidden sm:block text-left pr-1">
            <p
              className="text-xs font-medium leading-none"
              style={{ color: "var(--text)" }}
            >
              {user.username}
            </p>
            <p
              className="text-[9px] tracking-wider uppercase mt-0.5"
              style={{ color: "var(--accent)" }}
            >
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}