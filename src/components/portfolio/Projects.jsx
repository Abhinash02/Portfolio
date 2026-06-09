"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import FadeUp from "./FadeUp";
import ProjectSlider from "./ProjectSlider";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.3 },
  },
};

export default function Projects({ projects = [] }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const sectionRef = useRef(null);
  const headerGlowRef = useRef(null);

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

  // Animated glow orb in the background
  useEffect(() => {
    if (!headerGlowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(headerGlowRef.current, {
        x: 40,
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  const totalPages = Math.ceil(projects.length / perPage);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else if (projects.length === 0) {
      setPage(1);
    }
  }, [projects.length, perPage, totalPages, page]);

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * perPage;
    return projects.slice(start, start + perPage);
  }, [projects, page, perPage]);

  if (!projects.length) {
    return (
      <section id="projects" className="section-space">
        <div className="container-custom">
          <FadeUp>
            <span className="section-label">Featured Work</span>
            <h2 className="text-4xl font-black md:text-5xl">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="mt-4 text-white/50">No projects found.</p>
          </FadeUp>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-space relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_top,rgba(124,58,237,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.06),transparent_40%)]" />
      <div
        ref={headerGlowRef}
        className="pointer-events-none absolute right-1/4 top-20 h-64 w-64 rounded-full bg-violet-500/8 blur-[100px]"
      />

      <div className="container-custom">
        {/* Section Header */}
        <FadeUp>
          <div className="mb-12 max-w-3xl">
            <span className="section-label">Featured Work</span>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              My <span className="gradient-text">Projects</span>
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
            <p className="mt-4 max-w-xl text-white/50">
              A collection of projects I&apos;ve built — from full-stack web
              apps to responsive dashboards and APIs.
            </p>
          </div>
        </FadeUp>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project._id || project.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="glass group flex h-full flex-col overflow-hidden rounded-[2rem] p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]"
              >
                {/* Image Container - Centered */}
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
                  <div className="flex h-52 items-center justify-center sm:h-56 md:h-60 lg:h-56 xl:h-60">
                    <ProjectSlider
                      images={project.images}
                      title={project.title}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-violet-400/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />

                  {/* Project number badge */}
                  <div className="absolute left-3 top-3 rounded-xl bg-black/50 px-2.5 py-1 backdrop-blur-md">
                    <span className="text-xs font-bold text-white/70">
                      #{project.order || index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5 flex items-center justify-between">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full bg-gradient-to-r from-violet-500/15 to-cyan-500/15 border border-violet-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 transition-all duration-300 group-hover:from-violet-500/25 group-hover:to-cyan-500/25"
                  >
                    {project.featured ? "★ Featured" : "Project"}
                  </motion.span>
                </div>

                <h3 className="mt-4 text-xl font-bold transition-all duration-300 group-hover:text-violet-300 sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 flex-grow text-sm text-white/55 sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65 transition-all duration-300 group-hover:border-violet-400/20 group-hover:bg-violet-500/10 group-hover:text-violet-300 sm:text-sm cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        Live Demo
                      </span>
                    </motion.a>
                  ) : null}

                  {project.githubUrl ? (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      Source Code
                    </motion.a>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Prev
            </motion.button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPage(i + 1)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    page === i + 1
                      ? "bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                      : "bg-white/15 hover:bg-white/30"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50"
              >
                <span className="font-semibold text-white/80">{page}</span> /{" "}
                {totalPages}
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <svg className="h-4 w-4 ml-1 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}