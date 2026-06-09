"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Shield } from "lucide-react";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/hero": "Hero Section",
  "/admin/projects": "Projects",
  "/admin/skills": "Skills",
  "/admin/experience": "Experience",
  "/admin/education": "Education",
  "/admin/settings": "Settings",
  "/admin/about": "About",
  "/admin/socials": "Social Links",
};

export default function AdminHeader({ user }) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Admin Panel";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            <Shield className="h-3.5 w-3.5" />
            Secure Admin
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
            {pageTitle}
          </h1>
          <p className="mt-1 text-sm text-white/45">{today}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Portfolio
          </Link>

          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 text-sm font-bold text-white">
              {(user?.name || user?.email || "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || "Admin"}
              </p>
              <p className="truncate text-xs text-white/45">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
