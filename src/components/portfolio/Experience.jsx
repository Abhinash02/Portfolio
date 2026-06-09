"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import FadeUp from "./FadeUp";

export default function Experience({ experience = [] }) {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current || !experience.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: 1.2, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, [experience.length]);

  return (
    <section id="experience" className="section-space relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.06),transparent_40%)]" />

      <div className="container-custom">
        <FadeUp>
          <span className="section-label">Work Journey</span>
          <h2 className="mb-12 text-4xl font-black md:text-5xl">
            My <span className="gradient-text">Experience</span>
          </h2>
        </FadeUp>

        {experience.length === 0 ? (
          <p className="text-white/40">No experience data found.</p>
        ) : (
          <div ref={timelineRef} className="relative pl-6 md:pl-10">
            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/8 rounded-full" />
            <div
              ref={lineRef}
              className="timeline-line"
              style={{ height: "100%", transformOrigin: "top" }}
            />

            <div className="space-y-8">
              {experience.map((item, index) => (
                <FadeUp key={item._id || item.role} delay={index * 0.1}>
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="timeline-dot" />

                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                      className="glass-violet glow-card rounded-[1.75rem] p-5 transition-all duration-400 hover:shadow-[0_16px_50px_rgba(124,58,237,0.15)] sm:p-6 md:p-8"
                    >
                      {/* Card inner glow */}
                      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

                      <div className="relative flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white sm:text-2xl">{item.role}</h3>
                          <p className="mt-1 font-semibold text-violet-400">{item.company}</p>
                          <p className="mt-1 text-sm text-white/40">{item.location}</p>
                        </div>

                        <div className="shrink-0">
                          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      {item.points?.length > 0 && (
                        <ul className="relative mt-5 space-y-3">
                          {item.points.map((point, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                              className="flex items-start gap-3 text-sm text-white/65 sm:text-base"
                            >
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                              <span className="leading-relaxed">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}