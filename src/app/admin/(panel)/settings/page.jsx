"use client";

import { useEffect, useState } from "react";

const initialState = {
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  resumeUrl: "",
  portfolioTitle: "",
  heroTitle: "",
  heroTagline: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setForm({ ...initialState, ...data });
    }

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved("");

    await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setSaved("Settings updated successfully");
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Settings</h1>
        <p className="mt-2 text-white/60">
          Update your contact details, hero text, and portfolio-wide profile settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input name="portfolioTitle" value={form.portfolioTitle} onChange={handleChange} placeholder="Portfolio title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Hero title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="Resume URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
        </div>

        <textarea
          name="heroTagline"
          value={form.heroTagline}
          onChange={handleChange}
          placeholder="Hero tagline"
          rows="4"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        />

        {saved ? <p className="mt-4 text-sm text-green-400">{saved}</p> : null}

        <button className="btn-primary mt-6" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}