export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Social from "@/models/Social";

export default async function AdminDashboardPage() {
  await connectDB();

  const [
    projectCount,
    skillCount,
    experienceCount,
    educationCount,
    socialCount,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
    Social.countDocuments(),
  ]);

  const stats = [
    { title: "Projects", value: projectCount },
    { title: "Skills", value: skillCount },
    { title: "Experience", value: experienceCount },
    { title: "Education", value: educationCount },
    { title: "Social Links", value: socialCount },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          Dashboard Overview
        </h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => (
          <div key={item.title} className="glass rounded-[2rem] p-6">
            <p className="text-sm text-white/60">{item.title}</p>
            <h2 className="mt-3 text-4xl font-black text-white">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}