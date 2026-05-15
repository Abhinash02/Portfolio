"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const links = [
  { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Hero", href: "/admin/hero" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Education", href: "/admin/education" },
  { label: "Settings", href: "/admin/settings" },
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
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <div className="space-y-1.5">
          <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </div>
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-white/10 bg-slate-950/95 p-5 backdrop-blur-xl transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin</p>
          <h2 className="mt-2 text-2xl font-black">Abhinash Panel</h2>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 transition ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className="btn-secondary w-full">
          Logout
        </button>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}