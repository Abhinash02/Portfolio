export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">{subtitle}</p>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}