export default function DashboardCard({ title, value }) {
  return (
    <div className="glass rounded-3xl p-6">
      <p className="text-sm text-white/60">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}