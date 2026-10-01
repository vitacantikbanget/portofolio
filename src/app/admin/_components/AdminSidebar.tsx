"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  UserCheck,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "@/app/admin/actions";

type UserInfo = {
  username: string;
  email: string;
  role: string;
};

type Props = {
  user: UserInfo;
  isOpen: boolean;
  onClose: () => void;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  enabled: boolean;
  badge?: string;
  external?: boolean;
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

export default function AdminSidebar({ user, isOpen, onClose }: Props) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const navGroups: NavGroup[] = [
    {
      group: "CONTENT",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          enabled: true,
        },
        {
          label: "Projects",
          href: "/admin/proyek",
          icon: FolderKanban,
          enabled: true,
        },
        {
          label: "Skills",
          href: "/admin/skills",
          icon: Code2,
          enabled: true,
        },
        {
          label: "About",
          href: "/admin/about",
          icon: UserCheck,
          enabled: true,
        },
      ],
    },
    {
      group: "COMMUNICATION",
      items: [
        {
          label: "Pesan Kontak",
          href: "/admin#pesan-terbaru",
          icon: Mail,
          enabled: true,
          badge: "Di Dashboard",
        },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        {
          label: "Settings",
          href: "/admin/settings",
          icon: Settings,
          enabled: true,
        },
        {
          label: "Lihat Web Publik",
          href: "/",
          icon: ExternalLink,
          enabled: true,
          external: true,
        },
      ],
    },
  ];

  const sidebarContent = (
    <div
      className="flex flex-col h-full w-[260px] border-r select-none"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Brand Header */}
      <div
        className="flex items-center justify-between px-6 py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ background: "var(--accent)" }}
            />
            <h1
              className="text-base font-bold tracking-wider leading-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              ADMIN PORTOFOLIO
            </h1>
          </div>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mt-1 pl-4"
            style={{ color: "var(--text-muted)" }}
          >
            {user.username || "Desvita Putri"}
          </p>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
          aria-label="Tutup sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navGroups.map((group) => (
          <div key={group.group}>
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.enabled && !item.external && isLinkActive(item.href);

                if (!item.enabled) {
                  return (
                    <li key={item.label}>
                      <div
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs opacity-50 cursor-not-allowed"
                        style={{ color: "var(--text-muted)" }}
                        title="Fitur belum tersedia"
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </span>
                        {item.badge && (
                          <span
                            className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: "var(--border)",
                              background: "var(--bg-soft)",
                              color: "var(--text-muted)",
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                }

                if (item.external) {
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all hover:scale-[1.01]"
                        style={{
                          color: "var(--text-muted)",
                        }}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </span>
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                      style={{
                        background: active ? "var(--accent)" : "transparent",
                        color: active ? "#ffffff" : "var(--text)",
                        boxShadow: active
                          ? "0 2px 10px rgba(169, 111, 107, 0.25)"
                          : "none",
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </span>
                      {item.badge && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: active ? "rgba(255,255,255,0.4)" : "var(--border)",
                            background: active ? "rgba(255,255,255,0.15)" : "var(--bg-soft)",
                            color: active ? "#ffffff" : "var(--text-muted)",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* User profile & Logout Box */}
      <div
        className="p-4 border-t space-y-3"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="flex items-center gap-3 p-2.5 rounded-2xl border"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            {user.username.slice(0, 1) || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-xs font-medium truncate"
              style={{ color: "var(--text)" }}
            >
              {user.username}
            </p>
            <p
              className="text-[10px] truncate flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}
            >
              <ShieldCheck size={11} style={{ color: "var(--accent)" }} />
              {user.role}
            </p>
          </div>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all hover:scale-[1.01]"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-soft)",
              color: "var(--text)",
            }}
          >
            <LogOut size={13} />
            Keluar dari Admin
          </button>
        </form>

        <p
          className="text-[10px] text-center italic tracking-wider opacity-60 pt-1"
          style={{ color: "var(--text-muted)" }}
        >
          Crafted with passion & precision
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative flex-1 flex flex-col max-w-[260px] w-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
