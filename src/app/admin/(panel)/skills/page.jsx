"use client";

import { useEffect, useState } from "react";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", order: 0 });

  const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", category: "", order: 0 });
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    fetchSkills();
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Manage Skills</h1>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Skill name"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            placeholder="Order"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
        </div>

        <button className="btn-primary mt-6">Add Skill</button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill._id} className="glass rounded-[2rem] p-5">
            <h3 className="text-lg font-bold">{skill.name}</h3>
            <p className="mt-1 text-cyan-400">{skill.category}</p>
            <button onClick={() => handleDelete(skill._id)} className="mt-4 rounded-xl bg-red-500/15 px-4 py-2 text-red-300">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}