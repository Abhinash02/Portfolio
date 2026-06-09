import Link from "next/link";

export default function DashboardCard({ title, value, icon: Icon, href, accent = "cyan" }) {
  const accents = {
    cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-400/20",
    violet: "from-violet-500/20 to-violet-500/5 text-violet-300 border-violet-400/20",
    emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-300 border-emerald-400/20",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-300 border-amber-400/20",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-300 border-rose-400/20",
  };

  const content = (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-6 transition duration-300 hover:border-white/15 hover:bg-white/[0.05]">
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-gradient-to-br ${accents[accent]}`}>
        {Icon ? <Icon className="h-5 w-5" /> : null}
      </div>
      <p className="text-sm font-medium text-white/50">{title}</p>
      <p className="mt-2 text-4xl font-black tracking-tight text-white">{value}</p>
      {href ? (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/30 transition group-hover:text-cyan-300">
          Manage →
        </p>
      ) : null}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl transition group-hover:from-cyan-400/10" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
