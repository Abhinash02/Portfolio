"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialForm = {
  role: "",
  company: "",
  location: "",
  duration: "",
  points: "",
  order: 0,
};

export default function AdminExperiencePage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experiences");

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to load experience");
      }

      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load experience");
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId ? `/api/experiences/${editId}` : "/api/experiences";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: form.role,
          company: form.company,
          location: form.location,
          duration: form.duration,
          points: form.points
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
          order: Number(form.order),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save experience");
      }

      toast.success(editId ? "Experience updated" : "Experience added");
      resetForm();
      fetchExperience();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      role: item.role || "",
      company: item.company || "",
      location: item.location || "",
      duration: item.duration || "",
      points: item.points?.join("\n") || "",
      order: item.order || 0,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Experience deleted");
      fetchExperience();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          Manage Experience
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            placeholder="Order"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2"
          />
        </div>

        <textarea
          name="points"
          value={form.points}
          onChange={handleChange}
          placeholder="One point per line"
          rows="5"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        />

        <div className="mt-6 flex gap-3">
          <button className="btn-primary">
            {editId ? "Update Experience" : "Add Experience"}
          </button>

          {editId ? (
            <button type="button" onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-5">
        {items.map((item) => (
          <div key={item._id} className="glass rounded-[2rem] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-bold">{item.role}</h3>
                <p className="mt-1 text-cyan-400">{item.company}</p>
                <p className="mt-1 text-sm text-white/50">
                  {item.location} • {item.duration}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-xl bg-cyan-400/15 px-4 py-2 text-cyan-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded-xl bg-red-500/15 px-4 py-2 text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-white/65">
              {item.points?.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}