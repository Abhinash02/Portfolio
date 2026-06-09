"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  Wrench,
  Briefcase,
  GraduationCap,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: Sparkles },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-white/8 bg-[#070714]/95 backdrop-blur-xl transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/8 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-violet-400">
                Portfolio CMS
              </p>
              <h2 className="text-lg font-black text-white">Admin Panel</h2>
            </div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            Navigation
          </p>
          {links.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-violet-500/15 to-cyan-500/10 text-white shadow-[inset_0_0_0_1px_rgba(124,58,237,0.2)]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-violet-500/20 text-violet-300"
                      : "bg-white/5 text-white/50 group-hover:bg-white/8 group-hover:text-white/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/8 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
