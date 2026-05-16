// "use client";

// import { useMemo, useState } from "react";
// import FadeUp from "./FadeUp";
// import ProjectSlider from "./ProjectSlider";

// export default function Projects({ projects = [] }) {
//   const [page, setPage] = useState(1);
//   const perPage = 4;

//   const totalPages = Math.ceil(projects.length / perPage);

//   const paginatedProjects = useMemo(() => {
//     const start = (page - 1) * perPage;
//     return projects.slice(start, start + perPage);
//   }, [projects, page]);

//   return (
//     <section id="projects" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
//             Featured Work
//           </p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Projects</h2>
//         </FadeUp>

//         <div className="grid gap-6 md:grid-cols-2">
//           {paginatedProjects.map((project, index) => (
//             <FadeUp key={project._id || project.title} delay={index * 0.06}>
//               <div className="glass h-full rounded-[2rem] p-5 transition duration-300 hover:-translate-y-2">
//                 <ProjectSlider images={project.images || []} />

//                 <div className="mt-5 flex items-center justify-between">
//                   <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
//                     {project.featured ? "Featured" : "Project"}
//                   </span>
//                 </div>

//                 <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
//                 <p className="mt-3 text-white/65">{project.description}</p>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {project.techStack?.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/75"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="mt-5 flex flex-wrap gap-3">
//                   {project.liveUrl ? (
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-primary"
//                     >
//                       Live
//                     </a>
//                   ) : null}

//                   {project.githubUrl ? (
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-secondary"
//                     >
//                       Code
//                     </a>
//                   ) : null}
//                 </div>
//               </div>
//             </FadeUp>
//           ))}
//         </div>

//         {totalPages > 1 ? (
//           <div className="mt-10 flex items-center justify-center gap-3">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Prev
//             </button>

//             <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
//               Page {page} of {totalPages}
//             </div>

//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//               className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         ) : null}
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import FadeUp from "./FadeUp";
// import ProjectSlider from "./ProjectSlider";

// export default function Projects({ projects = [] }) {
//   const [page, setPage] = useState(1);
//   const perPage = 4;

//   const totalPages = Math.ceil(projects.length / perPage);

//   const paginatedProjects = useMemo(() => {
//     const start = (page - 1) * perPage;
//     return projects.slice(start, start + perPage);
//   }, [projects, page]);

//   return (
//     <section id="projects" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
//             Featured Work
//           </p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Projects</h2>
//         </FadeUp>

//         <div className="grid gap-6 md:grid-cols-2 ">
//           {paginatedProjects.map((project, index) => (
//             <FadeUp key={project._id || project.title} delay={index * 0.06}>
//               <motion.div
//                 whileHover={{ y: -8 }}
//                 transition={{ duration: 0.28, ease: "easeOut" }}
//                 className="glass group h-full overflow-hidden rounded-[2rem] p-5 transition duration-300"
//               >
//                 <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
//                   <div className="project-slider-wrap">
//                     <ProjectSlider images={project.images || []} />
//                   </div>

//                   <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-cyan-400/5 opacity-0 transition duration-500 group-hover:opacity-100" />
//                 </div>

//                 <div className="mt-5 flex items-center justify-between">
//                   <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 transition duration-300 group-hover:bg-cyan-400/15 group-hover:text-cyan-200">
//                     {project.featured ? "Featured" : "Project"}
//                   </span>
//                 </div>

//                 <h3 className="mt-4 text-2xl font-bold transition duration-300 group-hover:text-cyan-300">
//                   {project.title}
//                 </h3>
//                 <p className="mt-3 text-white/65">{project.description}</p>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {project.techStack?.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/75 transition duration-300 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/5"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="mt-5 flex flex-wrap gap-3">
//                   {project.liveUrl ? (
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-primary"
//                     >
//                       Live
//                     </a>
//                   ) : null}

//                   {project.githubUrl ? (
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-secondary"
//                     >
//                       Code
//                     </a>
//                   ) : null}
//                 </div>
//               </motion.div>
//             </FadeUp>
//           ))}
//         </div>

//         {totalPages > 1 ? (
//           <div className="mt-10 flex items-center justify-center gap-3">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Prev
//             </button>

//             <motion.div
//               key={page}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.25 }}
//               className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
//             >
//               Page {page} of {totalPages}
//             </motion.div>

//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//               className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         ) : null}
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import FadeUp from "./FadeUp";
// import ProjectSlider from "./ProjectSlider";

// export default function Projects({ projects = [] }) {
//   const [page, setPage] = useState(1);
//   const perPage = 4;

//   const totalPages = Math.ceil(projects.length / perPage);

//   useEffect(() => {
//     if (page > totalPages && totalPages > 0) {
//       setPage(totalPages);
//     }
//     if (projects.length === 0) {
//       setPage(1);
//     }
//   }, [projects.length, totalPages, page]);

//   const paginatedProjects = useMemo(() => {
//     const start = (page - 1) * perPage;
//     return projects.slice(start, start + perPage);
//   }, [projects, page, perPage]);

//   return (
//     <section id="projects" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
//             Featured Work
//           </p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Projects</h2>
//         </FadeUp>

//         <div className="grid gap-6 md:grid-cols-2">
//           {paginatedProjects.map((project, index) => (
//             <FadeUp key={project._id || project.title} delay={index * 0.06}>
//               <motion.div
//                 whileHover={{ y: -8 }}
//                 transition={{ duration: 0.28, ease: "easeOut" }}
//                 className="glass group h-full overflow-hidden rounded-[2rem] p-5 transition duration-300"
//               >
//                 <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
//                   <div className="project-slider-wrap">
//                     <ProjectSlider images={project.images || []} />
//                   </div>

//                   <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-cyan-400/5 opacity-0 transition duration-500 group-hover:opacity-100" />
//                 </div>

//                 <div className="mt-5 flex items-center justify-between">
//                   <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 transition duration-300 group-hover:bg-cyan-400/15 group-hover:text-cyan-200">
//                     {project.featured ? "Featured" : "Project"}
//                   </span>
//                 </div>

//                 <h3 className="mt-4 text-2xl font-bold transition duration-300 group-hover:text-cyan-300">
//                   {project.title}
//                 </h3>

//                 <p className="mt-3 text-white/65">{project.description}</p>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {project.techStack?.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/75 transition duration-300 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/5"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="mt-5 flex flex-wrap gap-3">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-primary"
//                     >
//                       Live
//                     </a>
//                   )}

//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-secondary"
//                     >
//                       Code
//                     </a>
//                   )}
//                 </div>
//               </motion.div>
//             </FadeUp>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="mt-10 flex items-center justify-center gap-3">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Prev
//             </button>

//             <motion.div
//               key={page}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.25 }}
//               className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
//             >
//               Page {page} of {totalPages}
//             </motion.div>

//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages}
//               className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";
import ProjectSlider from "./ProjectSlider";

export default function Projects({ projects = [] }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth >= 1024) {
        setPerPage(4);
      } else {
        setPerPage(2);
      }
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const totalPages = Math.ceil(projects.length / perPage);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else {
      setPage(1);
    }
  }, [projects.length, perPage, totalPages]);

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * perPage;
    return projects.slice(start, start + perPage);
  }, [projects, page, perPage]);

  if (!projects.length) {
    return (
      <section id="projects" className="section-space">
        <div className="container-custom">
          <FadeUp>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Featured Work
            </p>
            <h2 className="mb-10 text-4xl font-black md:text-5xl">Projects</h2>
            <p className="text-white/60">No projects found.</p>
          </FadeUp>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-space">
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Featured Work
          </p>
          <h2 className="mb-10 text-4xl font-black md:text-5xl">Projects</h2>
        </FadeUp>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {paginatedProjects.map((project, index) => (
            <FadeUp key={project._id || project.title} delay={index * 0.06}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="glass group flex h-full flex-col overflow-hidden rounded-[2rem] p-4 sm:p-5 transition duration-300"
              >
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
                  <div className="h-52 sm:h-56 md:h-60 lg:h-56 xl:h-60">
                    <ProjectSlider images={project.images} title={project.title} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-cyan-400/5 opacity-0 transition duration-500 group-hover:opacity-100" />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 transition duration-300 group-hover:bg-cyan-400/15 group-hover:text-cyan-200">
                    {project.featured ? "Featured" : "Project"}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold transition duration-300 group-hover:text-cyan-300 sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 flex-grow text-sm text-white/65 sm:text-base">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 transition duration-300 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/5 sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      Live
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      Code
                    </a>
                  ) : null}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>

            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
            >
              Page {page} of {totalPages}
            </motion.div>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}