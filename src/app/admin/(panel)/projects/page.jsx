// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const initialForm = {
//   title: "",
//   description: "",
//   techStack: "",
//   liveUrl: "",
//   githubUrl: "",
//   featured: false,
//   order: 0,
//   images: [],
// };

// export default function AdminProjectsPage() {
//   const [projects, setProjects] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const fetchProjects = async () => {
//     try {
//       const res = await fetch("/api/projects");
//       const data = await res.json();
//       setProjects(data);
//     } catch {
//       toast.error("Failed to load projects");
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleUploadImages = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) return;

//     try {
//       setUploading(true);
//       const uploadedUrls = [];

//       for (const file of files.slice(0, 4)) {
//         const data = new FormData();
//         data.append("file", file);

//         const res = await fetch("/api/upload", {
//           method: "POST",
//           body: data,
//         });

//         const result = await res.json();

//         if (!res.ok) {
//           throw new Error(result.message || "Upload failed");
//         }

//         uploadedUrls.push(result.url);
//       }

//       setForm((prev) => ({
//         ...prev,
//         images: [...prev.images, ...uploadedUrls].slice(0, 4),
//       }));

//       toast.success("Images uploaded successfully");
//     } catch (error) {
//       toast.error(error.message || "Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeImage = (url) => {
//     setForm((prev) => ({
//       ...prev,
//       images: prev.images.filter((img) => img !== url),
//     }));
//   };

//   const resetForm = () => {
//     setForm(initialForm);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         ...form,
//         techStack: form.techStack.split(",").map((item) => item.trim()).filter(Boolean),
//         order: Number(form.order),
//       };

//       const res = await fetch(editId ? `/api/projects/${editId}` : "/api/projects", {
//         method: editId ? "PUT" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message || "Failed to save project");
//       }

//       toast.success(editId ? "Project updated" : "Project added");
//       resetForm();
//       fetchProjects();
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (project) => {
//     setEditId(project._id);
//     setForm({
//       title: project.title || "",
//       description: project.description || "",
//       techStack: project.techStack?.join(", ") || "",
//       liveUrl: project.liveUrl || "",
//       githubUrl: project.githubUrl || "",
//       featured: project.featured || false,
//       order: project.order || 0,
//       images: project.images || [],
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
//       const result = await res.json();

//       if (!res.ok) throw new Error(result.message || "Delete failed");

//       toast.success("Project deleted");
//       fetchProjects();
//     } catch (error) {
//       toast.error(error.message || "Delete failed");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Panel</p>
//         <h1 className="mt-2 text-3xl font-black md:text-4xl">Manage Projects</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2">
//           <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Next.js, MongoDB" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2" />
//         </div>

//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Project description"
//           rows="5"
//           className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
//         />

//         <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4">
//           <label className="mb-3 block text-sm text-white/70">
//             Upload 3-4 project images
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleUploadImages}
//             className="block w-full text-sm text-white/70"
//           />
//           {uploading ? <p className="mt-3 text-sm text-cyan-400">Uploading images...</p> : null}

//           <div className="mt-4 flex flex-wrap gap-3">
//             {form.images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img src={img} alt="" className="h-20 w-28 rounded-xl object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(img)}
//                   className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <label className="mt-4 flex items-center gap-3 text-white/70">
//           <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
//           Featured project
//         </label>

//         <div className="mt-6 flex flex-wrap gap-3">
//           <button className="btn-primary" disabled={loading || uploading}>
//             {loading ? "Saving..." : editId ? "Update Project" : "Add Project"}
//           </button>

//           {editId ? (
//             <button type="button" onClick={resetForm} className="btn-secondary">
//               Cancel Edit
//             </button>
//           ) : null}
//         </div>
//       </form>

//       <div className="grid gap-5">
//         {projects.map((project) => (
//           <div key={project._id} className="glass rounded-[2rem] p-5">
//             <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
//               <div>
//                 <h3 className="text-xl font-bold">{project.title}</h3>
//                 <p className="mt-2 text-white/60">{project.description}</p>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {project.techStack?.map((tech, i) => (
//                     <span key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-300">
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button onClick={() => handleEdit(project)} className="rounded-xl bg-cyan-400/15 px-4 py-2 text-cyan-300">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(project._id)} className="rounded-xl bg-red-500/15 px-4 py-2 text-red-300">
//                   Delete
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4 flex flex-wrap gap-3">
//               {project.images?.map((img, i) => (
//                 <img key={i} src={img} alt="" className="h-16 w-24 rounded-xl object-cover" />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
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
      order: project.order || 0,
      images: project.images || [],
    });
  };

  const handleDelete = async (id) => {
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

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-fuchsia-500/10 p-6 shadow-2xl shadow-cyan-500/10">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          Admin Panel
        </p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black md:text-4xl">Manage Projects</h1>
            <p className="mt-2 max-w-2xl text-white/60">
              Add, edit, delete, feature, and upload project images directly from
              your dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Total Projects
            </p>
            <p className="mt-1 text-2xl font-bold text-cyan-300">
              {projects.length}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            placeholder="Order"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="Live URL"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="React, Next.js, MongoDB"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project description"
          rows="5"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        />

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

          {uploading ? (
            <p className="mt-3 text-sm text-cyan-400">Uploading images...</p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-3">
            {form.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt="project preview"
                  className="h-20 w-28 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img)}
                  className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 text-white/70">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured project
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn-primary" disabled={loading || uploading}>
            {loading ? "Saving..." : editId ? "Update Project" : "Add Project"}
          </button>

          {editId ? (
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.featured ? (
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-300">
                      Featured
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-white/60">{project.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(project)}
                  className="rounded-xl bg-cyan-400/15 px-4 py-2 text-cyan-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="rounded-xl bg-red-500/15 px-4 py-2 text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {project.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="project gallery"
                  className="h-16 w-24 rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}