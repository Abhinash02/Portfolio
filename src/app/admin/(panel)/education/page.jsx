// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const initialForm = {
//   degree: "",
//   institute: "",
//   score: "",
//   duration: "",
//   order: 0,
// };

// export default function AdminEducationPage() {
//   const [education, setEducation] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [editId, setEditId] = useState(null);

//   const fetchEducation = async () => {
//     try {
//       const res = await fetch("/api/education/${id}`");
//       const data = await res.json();
//       setEducation(data);
//     } catch {
//       toast.error("Failed to load education");
//     }
//   };

//   useEffect(() => {
//     fetchEducation();
//   }, []);

//   const resetForm = () => {
//     setForm(initialForm);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(editId ? `/api/education/${editId}` : "/api/education", {
//         method: editId ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...form,
//           order: Number(form.order),
//         }),
//       });

//       const result = await res.json();

//       if (!res.ok) throw new Error(result.message || "Failed to save education");

//       toast.success(editId ? "Education updated" : "Education added");
//       resetForm();
//       fetchEducation();
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setForm({
//       degree: item.degree || "",
//       institute: item.institute || "",
//       score: item.score || "",
//       duration: item.duration || "",
//       order: item.order || 0,
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
//       const result = await res.json();

//       if (!res.ok) throw new Error(result.message || "Delete failed");

//       toast.success("Education deleted");
//       fetchEducation();
//     } catch (error) {
//       toast.error(error.message || "Delete failed");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Panel</p>
//         <h1 className="mt-2 text-3xl font-black md:text-4xl">Manage Education</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2">
//           <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="Degree" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} placeholder="Institute" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} placeholder="Score / CGPA" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Duration" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" />
//           <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2" />
//         </div>

//         <div className="mt-6 flex gap-3">
//           <button className="btn-primary">
//             {editId ? "Update Education" : "Add Education"}
//           </button>
//           {editId ? (
//             <button type="button" onClick={resetForm} className="btn-secondary">
//               Cancel
//             </button>
//           ) : null}
//         </div>
//       </form>

//       <div className="grid gap-4 md:grid-cols-2">
//         {education.map((item) => (
//           <div key={item._id} className="glass rounded-[2rem] p-5">
//             <h3 className="text-xl font-bold">{item.degree}</h3>
//             <p className="mt-2 text-cyan-400">{item.institute}</p>
//             <p className="mt-2 text-white/70">{item.score}</p>
//             <p className="mt-1 text-sm text-white/50">{item.duration}</p>

//             <div className="mt-4 flex gap-3">
//               <button onClick={() => handleEdit(item)} className="rounded-xl bg-cyan-400/15 px-4 py-2 text-cyan-300">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(item._id)} className="rounded-xl bg-red-500/15 px-4 py-2 text-red-300">
//                 Delete
//               </button>
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
  degree: "",
  institute: "",
  score: "",
  duration: "",
  order: 0,
};

export default function AdminEducationPage() {
  const [education, setEducation] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchEducation = async () => {
    try {
      const res = await fetch("/api/educations");

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to load education");
      }

      const data = await res.json();
      setEducation(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load education");
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId ? `/api/educations/${editId}` : "/api/educations";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          order: Number(form.order),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save education");
      }

      toast.success(editId ? "Education updated" : "Education added");
      resetForm();
      fetchEducation();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      degree: item.degree || "",
      institute: item.institute || "",
      score: item.score || "",
      duration: item.duration || "",
      order: item.order || 0,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/educations/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Education deleted");
      fetchEducation();
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
          Manage Education
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            placeholder="Degree"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            value={form.institute}
            onChange={(e) => setForm({ ...form, institute: e.target.value })}
            placeholder="Institute"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
            placeholder="Score / CGPA"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="Duration"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            placeholder="Order"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button className="btn-primary">
            {editId ? "Update Education" : "Add Education"}
          </button>

          {editId ? (
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <div key={item._id} className="glass rounded-[2rem] p-5">
            <h3 className="text-xl font-bold">{item.degree}</h3>
            <p className="mt-2 text-cyan-400">{item.institute}</p>
            <p className="mt-2 text-white/70">{item.score}</p>
            <p className="mt-1 text-sm text-white/50">{item.duration}</p>

            <div className="mt-4 flex gap-3">
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
        ))}
      </div>
    </div>
  );
}