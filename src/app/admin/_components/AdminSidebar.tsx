"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Loader2,
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLinkActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const navGroups: NavGroup[] = [
    {
      group: "KONTEN",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          enabled: true,
        },
        {
          label: "Proyek",
          href: "/admin/proyek",
          icon: FolderKanban,
          enabled: true,
        },
        {
          label: "Keahlian",
          href: "/admin/skills",
          icon: Code2,
          enabled: true,
        },
        {
          label: "Tentang Saya",
          href: "/admin/about",
          icon: UserCheck,
          enabled: true,
        },
      ],
    },
    {
      group: "KOMUNIKASI",
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
      group: "SISTEM",
      items: [
        {
          label: "Pengaturan",
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

        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.01]"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-soft)",
            color: "var(--text)",
          }}
        >
          <LogOut size={13} />
          Keluar dari Admin
        </button>

        <p
          className="text-[10px] text-center italic tracking-wider opacity-60 pt-1"
          style={{ color: "var(--text-muted)" }}
        >
          Dibuat dengan dedikasi &amp; ketelitian
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

      {/* Modal Konfirmasi Logout */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isLoggingOut) setShowLogoutModal(false);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Kotak Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl border p-6 sm:p-7 shadow-2xl z-10 space-y-5"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                  style={{
                    background: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  <LogOut size={22} />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold leading-tight"
                    style={{ color: "var(--text)" }}
                  >
                    Konfirmasi Keluar
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Keluar dari Dashboard Admin
                  </p>
                </div>
              </div>

              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Apakah Anda yakin ingin keluar dari sesi admin? Anda harus masuk kembali jika ingin mengelola proyek atau konten portofolio.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-soft)",
                    color: "var(--text)",
                  }}
                >
                  Batal
                </button>

                <form
                  action={async () => {
                    setIsLoggingOut(true);
                    await signOut();
                  }}
                  className="flex-1"
                >
                  <button
                    type="submit"
                    disabled={isLoggingOut}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-50 shadow-xs"
                    style={{
                      background: "var(--accent)",
                    }}
                  >
                    {isLoggingOut ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Keluar...</span>
                      </>
                    ) : (
                      <span>Lanjutkan</span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
