"use client";

import { useState } from "react";
import GlobalBackground from "@/components/GlobalBackground";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

type UserInfo = {
  username: string;
  email: string;
  role: string;
};

type Props = {
  user: UserInfo;
  children: React.ReactNode;
};

export default function AdminShell({ user, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: "var(--bg)" }}>
      <GlobalBackground />

      {/* Sidebar (Desktop fixed + Mobile Drawer) */}
      <AdminSidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Konten Kanan */}
      <div className="lg:pl-[260px] flex flex-col min-h-screen transition-all duration-200">
        <AdminTopbar
          user={user}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 w-full pt-6 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
