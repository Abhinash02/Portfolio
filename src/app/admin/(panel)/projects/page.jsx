"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const initialForm = {
  title: "",
  description: "",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
  images: [],
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [reordering, setReordering] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to load projects");
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUploadImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setUploading(true);
      const uploadedUrls = [];

      for (const file of files.slice(0, 4)) {
        const data = new FormData();
        data.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Upload failed");
        }

        uploadedUrls.push(result.url);
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls].slice(0, 4),
      }));

      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        techStack: form.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        order: Number(form.order),
      };

      const url = editId ? `/api/projects/${editId}` : "/api/projects";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save project");
      }

      toast.success(editId ? "Project updated" : "Project added");
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      techStack: project.techStack?.join(", ") || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured || false,
      order: project.order ?? 0,
      images: project.images || [],
    });

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Delete failed");
    }
  };

  // ─── Project Reorder Logic ───────────────────────────────────
  // When you change one project's order number, all others auto-adjust
  const handleOrderChange = useCallback(
    async (projectId, newOrder) => {
      const parsed = parseInt(newOrder, 10);
      if (isNaN(parsed) || parsed < 1) return;

      // Build current sorted list
      const sorted = [...projects].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      // Find the project being moved
      const movingIndex = sorted.findIndex((p) => p._id === projectId);
      if (movingIndex === -1) return;

      // Remove it from the list
      const [movingProject] = sorted.splice(movingIndex, 1);

      // Insert at the new position (1-based to 0-based)
      const insertAt = Math.min(Math.max(parsed - 1, 0), sorted.length);
      sorted.splice(insertAt, 0, movingProject);

      // Assign sequential order numbers
      const orders = sorted.map((p, idx) => ({
        id: p._id,
        order: idx + 1,
      }));

      // Optimistically update UI
      const updatedProjects = sorted.map((p, idx) => ({
        ...p,
        order: idx + 1,
      }));
      setProjects(updatedProjects);

      // Persist to backend
      setReordering(true);
      try {
        const res = await fetch("/api/projects/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orders }),
        });

        if (!res.ok) throw new Error("Reorder failed");

        toast.success("Project order updated");
      } catch (error) {
        console.error(error);
        toast.error("Failed to reorder");
        fetchProjects(); // revert on error
      } finally {
        setReordering(false);
      }
    },
    [projects]
  );

  // Move project up/down with buttons
  const moveProject = useCallback(
    (projectId, direction) => {
      const sorted = [...projects].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );
      const currentIndex = sorted.findIndex((p) => p._id === projectId);
      if (currentIndex === -1) return;

      const newPosition =
        direction === "up" ? currentIndex : currentIndex + 2;
      handleOrderChange(projectId, newPosition);
    },
    [projects, handleOrderChange]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-fuchsia-500/10 p-6 shadow-2xl shadow-cyan-500/10"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          Admin Panel
        </p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black md:text-4xl">
              Manage <span className="gradient-text">Projects</span>
            </h1>
            <p className="mt-2 max-w-2xl text-white/60">
              Add, edit, reorder, and manage project images. Change any
              project&apos;s order number and all others auto-adjust.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {reordering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block h-4 w-4 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
                />
                <span className="text-xs text-cyan-300">Reordering...</span>
              </motion.div>
            )}
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Total
              </p>
              <p className="mt-1 text-2xl font-bold text-cyan-300">
                {projects.length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass rounded-[2rem] p-6 md:p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
          <h2 className="text-lg font-bold">
            {editId ? "Edit Project" : "Add New Project"}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-violet-400/40 focus:bg-white/8"
          />
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            placeholder="Display order (1, 2, 3...)"
            min="0"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-violet-400/40 focus:bg-white/8"
          />
          <input
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="Live URL"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-violet-400/40 focus:bg-white/8"
          />
          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-violet-400/40 focus:bg-white/8"
          />
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Next.js, MongoDB"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-violet-400/40 focus:bg-white/8 md:col-span-2"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project description"
          rows="4"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-violet-400/40 focus:bg-white/8"
        />

        {/* Image Upload */}
        <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4">
          <label className="mb-3 block text-sm text-white/70">
            Upload 3-4 project images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadImages}
            className="block w-full text-sm text-white/70"
          />

          {uploading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center gap-2 text-sm text-cyan-400"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block h-3 w-3 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
              />
              Uploading images...
            </motion.p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <AnimatePresence>
              {form.images.map((img, index) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative"
                >
                  <img
                    src={img}
                    alt="project preview"
                    className="h-20 w-28 rounded-xl object-cover transition-all duration-300 group-hover:brightness-75"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute right-1 top-1 rounded-full bg-red-500/80 p-1 text-xs text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-red-600"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white/70">
                    {index + 1}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 text-white/70 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="h-6 w-11 rounded-full bg-white/10 transition-colors peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-cyan-500" />
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
          </div>
          Featured project
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            disabled={loading || uploading}
          >
            {loading ? "Saving..." : editId ? "Update Project" : "Add Project"}
          </motion.button>

          {editId && (
            <motion.button
              type="button"
              onClick={resetForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary"
            >
              Cancel Edit
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* Project List with Reorder Controls */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-violet-500" />
          <h2 className="text-lg font-bold">
            All Projects{" "}
            <span className="text-sm font-normal text-white/40">
              (drag order numbers to reorder)
            </span>
          </h2>
        </div>

        <div className="grid gap-5">
          <AnimatePresence>
            {projects
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((project, idx) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Order controls */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => moveProject(project._id, "up")}
                          disabled={idx === 0}
                          className="rounded-lg bg-white/5 p-1.5 text-white/40 transition-all hover:bg-violet-500/20 hover:text-violet-300 disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>

                        <input
                          type="number"
                          value={project.order ?? idx + 1}
                          onChange={(e) =>
                            handleOrderChange(project._id, e.target.value)
                          }
                          min="1"
                          max={projects.length}
                          className="w-10 rounded-lg border border-white/10 bg-white/5 py-1 text-center text-sm font-bold text-cyan-300 outline-none transition-all focus:border-cyan-400/40 focus:bg-cyan-500/10"
                        />

                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => moveProject(project._id, "down")}
                          disabled={idx === projects.length - 1}
                          className="rounded-lg bg-white/5 p-1.5 text-white/40 transition-all hover:bg-violet-500/20 hover:text-violet-300 disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          {project.featured && (
                            <span className="rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/20 px-3 py-1 text-xs font-medium text-violet-300">
                              ★ Featured
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-white/60 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.techStack?.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Image thumbnails */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.images?.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt="project gallery"
                              className="h-14 w-20 rounded-lg object-cover border border-white/10 transition-all duration-300 hover:scale-105 hover:border-cyan-400/30"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(project)}
                        className="rounded-xl bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all hover:bg-cyan-400/25"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(project._id)}
                        className="rounded-xl bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300 transition-all hover:bg-red-500/25"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}