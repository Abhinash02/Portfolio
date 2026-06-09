export const dynamic = "force-dynamic";

import Link from "next/link";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Hero from "@/models/Hero";
import DashboardCard from "@/components/admin/DashboardCard";
import {
  FolderKanban,
  Wrench,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PenLine,
} from "lucide-react";

export default async function AdminDashboardPage() {
  await connectDB();

  const session = await getServerSession(authOptions);

  const [
    projectCount,
    skillCount,
    experienceCount,
    educationCount,
    hero,
    featuredProjects,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
    Hero.findOne().lean(),
    Project.countDocuments({ featured: true }),
  ]);

  const stats = [
    {
      title: "Projects",
      value: projectCount,
      icon: FolderKanban,
      href: "/admin/projects",
      accent: "cyan",
    },
    {
      title: "Skills",
      value: skillCount,
      icon: Wrench,
      href: "/admin/skills",
      accent: "violet",
    },
    {
      title: "Experience",
      value: experienceCount,
      icon: Briefcase,
      href: "/admin/experience",
      accent: "emerald",
    },
    {
      title: "Education",
      value: educationCount,
      icon: GraduationCap,
      href: "/admin/education",
      accent: "amber",
    },
  ];

  const quickActions = [
    {
      title: "Update Hero",
      description: "Edit name, title, tagline, and profile image",
      href: "/admin/hero",
      icon: Sparkles,
    },
    {
      title: "Add Project",
      description: "Showcase a new portfolio project",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      title: "Edit Settings",
      description: "Manage contact info and site settings",
      href: "/admin/settings",
      icon: PenLine,
    },
  ];

  const firstName = session?.user?.name?.split(" ")[0] || "Admin";

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-br from-violet-500/10 via-white/[0.02] to-cyan-500/10 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            Welcome back
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            Hello, {firstName}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/55">
            Manage your portfolio content, keep projects up to date, and control
            everything from one secure dashboard.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <DashboardCard key={item.title} {...item} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              <p className="mt-1 text-sm text-white/45">
                Jump straight into common tasks
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-semibold text-white">{action.title}</h4>
                  <p className="mt-1 text-sm text-white/45">{action.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/30 transition group-hover:text-cyan-300">
                    Open <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                Security
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">JWT Protected</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Your admin session is secured with JWT tokens. All write operations
              require authentication.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold text-white">Portfolio Snapshot</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-white/50">Hero Name</span>
                <span className="text-sm font-semibold text-white">
                  {hero?.name || "Not set"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-white/50">Featured Projects</span>
                <span className="text-sm font-semibold text-cyan-300">
                  {featuredProjects}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                <span className="text-sm text-white/50">Total Content Items</span>
                <span className="text-sm font-semibold text-white">
                  {projectCount + skillCount + experienceCount + educationCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
