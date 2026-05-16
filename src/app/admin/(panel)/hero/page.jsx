
// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// const initialForm = {
//   availabilityText: "",
//   name: "",
//   title: "",
//   tagline: "",
//   resumeUrl: "",
//   resumePublicId: "",
//   socialLinks: [],
//   highlights: [],
// };

// export default function AdminHeroPage() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [resumeUploading, setResumeUploading] = useState(false);
//   const [iconUploadingIndex, setIconUploadingIndex] = useState(null);

//   const fetchHero = async () => {
//     try {
//       setFetching(true);

//       const res = await fetch("/api/hero", { cache: "no-store" });
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error(data.error || data.message || "Failed to fetch hero");
//       }

//       const hero = data.hero || {};

//       setForm({
//         availabilityText: hero.availabilityText || "",
//         name: hero.name || "",
//         title: hero.title || "",
//         tagline: hero.tagline || "",
//         resumeUrl: hero.resumeUrl || "",
//         resumePublicId: hero.resumePublicId || "",
//         socialLinks: Array.isArray(hero.socialLinks) ? hero.socialLinks : [],
//         highlights: Array.isArray(hero.highlights) ? hero.highlights : [],
//       });
//     } catch (error) {
//       console.error("Failed to fetch hero:", error);
//       toast.error(error.message || "Failed to load hero data");
//       setForm(initialForm);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchHero();
//   }, []);

//   const handleResumeUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setResumeUploading(true);

//       const res = await fetch("/api/upload-resume", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || data.message || "Resume upload failed");
//       }

//       setForm((prev) => ({
//         ...prev,
//         resumeUrl: data.url || "",
//         resumePublicId: data.public_id || "",
//       }));

//       toast.success("Resume uploaded successfully");
//     } catch (error) {
//       toast.error(error.message || "Resume upload failed");
//     } finally {
//       setResumeUploading(false);
//     }
//   };

//   const handleSocialIconUpload = async (e, index) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setIconUploadingIndex(index);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || data.message || "Icon upload failed");
//       }

//       setForm((prev) => {
//         const updated = [...prev.socialLinks];
//         updated[index] = {
//           ...updated[index],
//           icon: data.url || "",
//         };
//         return { ...prev, socialLinks: updated };
//       });

//       toast.success("Social icon uploaded");
//     } catch (error) {
//       toast.error(error.message || "Icon upload failed");
//     } finally {
//       setIconUploadingIndex(null);
//     }
//   };

//   const addSocialLink = () => {
//     setForm((prev) => ({
//       ...prev,
//       socialLinks: [
//         ...prev.socialLinks,
//         {
//           label: "",
//           url: "",
//           icon: "",
//           order: prev.socialLinks.length + 1,
//         },
//       ],
//     }));
//   };

//   const updateSocialLink = (index, field, value) => {
//     setForm((prev) => {
//       const updated = [...prev.socialLinks];
//       updated[index] = {
//         ...updated[index],
//         [field]: value,
//       };
//       return { ...prev, socialLinks: updated };
//     });
//   };

//   const deleteSocialLink = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       socialLinks: prev.socialLinks
//         .filter((_, i) => i !== index)
//         .map((item, i) => ({
//           ...item,
//           order: i + 1,
//         })),
//     }));

//     toast.success("Social link removed");
//   };

//   const addHighlight = () => {
//     setForm((prev) => ({
//       ...prev,
//       highlights: [
//         ...prev.highlights,
//         {
//           label: "",
//           value: "",
//           order: prev.highlights.length + 1,
//         },
//       ],
//     }));
//   };

//   const updateHighlight = (index, field, value) => {
//     setForm((prev) => {
//       const updated = [...prev.highlights];
//       updated[index] = {
//         ...updated[index],
//         [field]: value,
//       };
//       return { ...prev, highlights: updated };
//     });
//   };

//   const deleteHighlight = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       highlights: prev.highlights
//         .filter((_, i) => i !== index)
//         .map((item, i) => ({
//           ...item,
//           order: i + 1,
//         })),
//     }));

//     toast.success("Hero card removed");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const payload = {
//         ...form,
//         socialLinks: form.socialLinks.filter(
//           (item) => item.label?.trim() || item.url?.trim() || item.icon?.trim()
//         ),
//         highlights: form.highlights.filter(
//           (item) => item.label?.trim() || item.value?.trim()
//         ),
//       };

//       const res = await fetch("/api/hero", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error(data.error || data.message || "Failed to update hero");
//       }

//       toast.success("Hero section updated successfully");
//       await fetchHero();
//     } catch (error) {
//       console.error("Save hero error:", error);
//       toast.error(error.message || "Failed to update hero");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return <p className="text-white/70">Loading hero data...</p>;
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Panel</p>
//         <h1 className="mt-2 text-3xl font-black md:text-4xl">Manage Hero Section</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="glass space-y-8 rounded-[2rem] p-6 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2">
//           <input
//             value={form.name}
//             onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
//             placeholder="Your name"
//             className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
//           />
//           <input
//             value={form.title}
//             onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
//             placeholder="Your title"
//             className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
//           />
//         </div>

//         <input
//           value={form.availabilityText}
//           onChange={(e) =>
//             setForm((prev) => ({ ...prev, availabilityText: e.target.value }))
//           }
//           placeholder="Availability text"
//           className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
//         />

//         <textarea
//           value={form.tagline}
//           onChange={(e) => setForm((prev) => ({ ...prev, tagline: e.target.value }))}
//           placeholder="Hero tagline"
//           rows={4}
//           className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
//         />

//         <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <p className="text-lg font-bold">Resume PDF</p>
//               <p className="text-sm text-white/60">Upload your resume PDF directly from admin</p>
//             </div>

//             <label className="cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">
//               {resumeUploading ? "Uploading..." : "Upload Resume"}
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleResumeUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           <input
//             value={form.resumeUrl}
//             onChange={(e) => setForm((prev) => ({ ...prev, resumeUrl: e.target.value }))}
//             placeholder="Resume URL"
//             className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
//           />
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold">Social Links</h2>
//             <button type="button" onClick={addSocialLink} className="btn-primary">
//               Add Social Link
//             </button>
//           </div>

//           {form.socialLinks.map((item, index) => (
//             <div key={index} className="space-y-4 rounded-2xl border border-white/10 p-4">
//               <div className="grid gap-3 md:grid-cols-3">
//                 <input
//                   value={item.label || ""}
//                   onChange={(e) => updateSocialLink(index, "label", e.target.value)}
//                   placeholder="Label"
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//                 />
//                 <input
//                   value={item.url || ""}
//                   onChange={(e) => updateSocialLink(index, "url", e.target.value)}
//                   placeholder="Profile URL"
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//                 />
//                 <input
//                   type="number"
//                   value={item.order || index + 1}
//                   onChange={(e) => updateSocialLink(index, "order", Number(e.target.value))}
//                   placeholder="Order"
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//                 />
//               </div>

//               <div className="flex flex-col gap-3 md:flex-row md:items-center">
//                 <input
//                   value={item.icon || ""}
//                   onChange={(e) => updateSocialLink(index, "icon", e.target.value)}
//                   placeholder="Icon image URL"
//                   className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//                 />

//                 <label className="cursor-pointer rounded-xl bg-white/10 px-4 py-3 text-sm">
//                   {iconUploadingIndex === index ? "Uploading..." : "Upload Icon"}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleSocialIconUpload(e, index)}
//                     className="hidden"
//                   />
//                 </label>

//                 <button
//                   type="button"
//                   onClick={() => deleteSocialLink(index)}
//                   className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300"
//                 >
//                   Delete
//                 </button>
//               </div>

//               {item.icon && (
//                 <img
//                   src={item.icon}
//                   alt={item.label || "Social icon"}
//                   className="h-12 w-12 rounded-xl object-cover"
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold">Hero Cards</h2>
//             <button type="button" onClick={addHighlight} className="btn-primary">
//               Add Card
//             </button>
//           </div>

//           {form.highlights.map((item, index) => (
//             <div
//               key={index}
//               className="grid gap-3 rounded-2xl border border-white/10 p-4 md:grid-cols-4"
//             >
//               <input
//                 value={item.label || ""}
//                 onChange={(e) => updateHighlight(index, "label", e.target.value)}
//                 placeholder="Card label"
//                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//               />
//               <input
//                 value={item.value || ""}
//                 onChange={(e) => updateHighlight(index, "value", e.target.value)}
//                 placeholder="Card value"
//                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//               />
//               <input
//                 type="number"
//                 value={item.order || index + 1}
//                 onChange={(e) => updateHighlight(index, "order", Number(e.target.value))}
//                 placeholder="Order"
//                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//               />
//               <button
//                 type="button"
//                 onClick={() => deleteHighlight(index)}
//                 className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="btn-primary">
//           {loading ? "Saving..." : "Save Hero Section"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialForm = {
  availabilityText: "",
  name: "",
  title: "",
  tagline: "",
  resumeUrl: "",
  resumePublicId: "",
  profileImage: "",
  profileImagePublicId: "",
  socialLinks: [],
  highlights: [],
};

export default function AdminHeroPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);
  const [iconUploadingIndex, setIconUploadingIndex] = useState(null);

  const fetchHero = async () => {
    try {
      setFetching(true);

      const res = await fetch("/api/hero", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to fetch hero");
      }

      const hero = data.hero || {};

      setForm({
        availabilityText: hero.availabilityText || "",
        name: hero.name || "",
        title: hero.title || "",
        tagline: hero.tagline || "",
        resumeUrl: hero.resumeUrl || "",
        resumePublicId: hero.resumePublicId || "",
        profileImage: hero.profileImage || "",
        profileImagePublicId: hero.profileImagePublicId || "",
        socialLinks: Array.isArray(hero.socialLinks) ? hero.socialLinks : [],
        highlights: Array.isArray(hero.highlights) ? hero.highlights : [],
      });
    } catch (error) {
      console.error("Failed to fetch hero:", error);
      toast.error(error.message || "Failed to load hero data");
      setForm(initialForm);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setResumeUploading(true);

      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Resume upload failed");
      }

      setForm((prev) => ({
        ...prev,
        resumeUrl: data.url || "",
        resumePublicId: data.public_id || "",
      }));

      toast.success("Resume uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Resume upload failed");
    } finally {
      setResumeUploading(false);
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProfileUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Profile image upload failed");
      }

      setForm((prev) => ({
        ...prev,
        profileImage: data.url || "",
        profileImagePublicId: data.public_id || "",
      }));

      toast.success("Profile image uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Profile image upload failed");
    } finally {
      setProfileUploading(false);
    }
  };

  const handleSocialIconUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIconUploadingIndex(index);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Icon upload failed");
      }

      setForm((prev) => {
        const updated = [...prev.socialLinks];
        updated[index] = {
          ...updated[index],
          icon: data.url || "",
        };
        return { ...prev, socialLinks: updated };
      });

      toast.success("Social icon uploaded");
    } catch (error) {
      toast.error(error.message || "Icon upload failed");
    } finally {
      setIconUploadingIndex(null);
    }
  };

  const addSocialLink = () => {
    setForm((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          label: "",
          url: "",
          icon: "",
          order: prev.socialLinks.length + 1,
        },
      ],
    }));
  };

  const updateSocialLink = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.socialLinks];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, socialLinks: updated };
    });
  };

  const deleteSocialLink = (index) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks
        .filter((_, i) => i !== index)
        .map((item, i) => ({
          ...item,
          order: i + 1,
        })),
    }));

    toast.success("Social link removed");
  };

  const addHighlight = () => {
    setForm((prev) => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        {
          label: "",
          value: "",
          order: prev.highlights.length + 1,
        },
      ],
    }));
  };

  const updateHighlight = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.highlights];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, highlights: updated };
    });
  };

  const deleteHighlight = (index) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights
        .filter((_, i) => i !== index)
        .map((item, i) => ({
          ...item,
          order: i + 1,
        })),
    }));

    toast.success("Hero card removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        socialLinks: form.socialLinks.filter(
          (item) => item.label?.trim() || item.url?.trim() || item.icon?.trim()
        ),
        highlights: form.highlights.filter(
          (item) => item.label?.trim() || item.value?.trim()
        ),
      };

      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to update hero");
      }

      toast.success("Hero section updated successfully");
      await fetchHero();
    } catch (error) {
      console.error("Save hero error:", error);
      toast.error(error.message || "Failed to update hero");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="text-white/70">Loading hero data...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Manage Hero Section</h1>
      </div>

      <form onSubmit={handleSubmit} className="glass space-y-8 rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Your name"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Your title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />
        </div>

        <input
          value={form.availabilityText}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, availabilityText: e.target.value }))
          }
          placeholder="Availability text"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        />

        <textarea
          value={form.tagline}
          onChange={(e) => setForm((prev) => ({ ...prev, tagline: e.target.value }))}
          placeholder="Hero tagline"
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        />

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-bold">Profile Image</p>
              <p className="text-sm text-white/60">Upload your profile image from admin</p>
            </div>

            <label className="cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">
              {profileUploading ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
              />
            </label>
          </div>

          <input
            value={form.profileImage}
            onChange={(e) => setForm((prev) => ({ ...prev, profileImage: e.target.value }))}
            placeholder="Profile image URL"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
          />

          {form.profileImage ? (
            <img
              src={form.profileImage}
              alt="Profile preview"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-cyan-400/20"
            />
          ) : null}
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-bold">Resume PDF</p>
              <p className="text-sm text-white/60">Upload your resume PDF directly from admin</p>
            </div>

            <label className="cursor-pointer rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">
              {resumeUploading ? "Uploading..." : "Upload Resume"}
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          </div>

          <input
            value={form.resumeUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, resumeUrl: e.target.value }))}
            placeholder="Resume URL"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Social Links</h2>
            <button type="button" onClick={addSocialLink} className="btn-primary whitespace-nowrap">
              Add Social Link
            </button>
          </div>

          {form.socialLinks.map((item, index) => (
            <div key={index} className="space-y-4 rounded-2xl border border-white/10 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  value={item.label || ""}
                  onChange={(e) => updateSocialLink(index, "label", e.target.value)}
                  placeholder="Label"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                />
                <input
                  value={item.url || ""}
                  onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                  placeholder="Profile URL"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                />
                <input
                  type="number"
                  value={item.order || index + 1}
                  onChange={(e) => updateSocialLink(index, "order", Number(e.target.value))}
                  placeholder="Order"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                />
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                  value={item.icon || ""}
                  onChange={(e) => updateSocialLink(index, "icon", e.target.value)}
                  placeholder="Icon image URL"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                />

                <label className="cursor-pointer rounded-xl bg-white/10 px-4 py-3 text-sm whitespace-nowrap">
                  {iconUploadingIndex === index ? "Uploading..." : "Upload Icon"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSocialIconUpload(e, index)}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => deleteSocialLink(index)}
                  className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300 whitespace-nowrap"
                >
                  Delete
                </button>
              </div>

              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label || "Social icon"}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Hero Cards</h2>
            <button type="button" onClick={addHighlight} className="btn-primary whitespace-nowrap">
              Add Card
            </button>
          </div>

          {form.highlights.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl border border-white/10 p-4 md:grid-cols-4"
            >
              <input
                value={item.label || ""}
                onChange={(e) => updateHighlight(index, "label", e.target.value)}
                placeholder="Card label"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              />
              <input
                value={item.value || ""}
                onChange={(e) => updateHighlight(index, "value", e.target.value)}
                placeholder="Card value"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              />
              <input
                type="number"
                value={item.order || index + 1}
                onChange={(e) => updateHighlight(index, "order", Number(e.target.value))}
                placeholder="Order"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              />
              <button
                type="button"
                onClick={() => deleteHighlight(index)}
                className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300 whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-primary whitespace-nowrap">
          {loading ? "Saving..." : "Save Hero Section"}
        </button>
      </form>
    </div>
  );
}