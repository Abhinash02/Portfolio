"use client";

import { motion } from "framer-motion";
import FadeUp from "./FadeUp";

const DEGREE_ICONS = {
  default: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12v5c3.33 2 9 2 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Education({ education = [] }) {
  return (
    <section id="education" className="section-space relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.1),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.08),transparent_40%)]" />

      <div className="container-custom">
        <FadeUp>
          <span className="section-label">Academic Background</span>
          <h2 className="mb-12 text-4xl font-black md:text-5xl">
            My <span className="gradient-text">Education</span>
          </h2>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <FadeUp key={item._id || item.degree} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.35 }}
                className="glass-violet glow-card group relative overflow-hidden rounded-[2rem] transition-all duration-400 hover:shadow-[0_20px_60px_rgba(124,58,237,0.18)]"
              >
                {/* Top gradient accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-cyan-500 to-transparent" />

                <div className="relative p-6 md:p-8">
                  {/* Inner glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition duration-400 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-5">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/15 text-violet-400 shadow-[0_4px_16px_rgba(124,58,237,0.2)]">
                      {DEGREE_ICONS.default}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
                        {item.degree}
                      </h3>
                      <p className="mt-1.5 font-semibold text-violet-400">{item.institute}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        {item.score && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            {item.score}
                          </span>
                        )}
                        {item.duration && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}