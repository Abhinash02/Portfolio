"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import FadeUp from "./FadeUp";

const CATEGORY_COLORS = {
  frontend:   { border: "border-violet-400/30", bg: "bg-violet-500/10", text: "text-violet-300", dot: "bg-violet-400" },
  backend:    { border: "border-cyan-400/30",   bg: "bg-cyan-500/10",   text: "text-cyan-300",   dot: "bg-cyan-400" },
  database:   { border: "border-emerald-400/30",bg: "bg-emerald-500/10",text: "text-emerald-300",dot: "bg-emerald-400" },
  devops:     { border: "border-orange-400/30", bg: "bg-orange-500/10", text: "text-orange-300", dot: "bg-orange-400" },
  tools:      { border: "border-pink-400/30",   bg: "bg-pink-500/10",   text: "text-pink-300",   dot: "bg-pink-400" },
  default:    { border: "border-white/15",       bg: "bg-white/6",       text: "text-white/60",   dot: "bg-white/40" },
};

function getCategoryStyle(category = "") {
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] || CATEGORY_COLORS.default;
}

function MarqueeTrack({ skills, direction = 1, speed = 24 }) {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !skills.length) return;

    const totalWidth = trackRef.current.scrollWidth / 2;
    tweenRef.current = gsap.fromTo(
      trackRef.current,
      { x: direction === 1 ? 0 : -totalWidth },
      {
        x: direction === 1 ? -totalWidth : 0,
        duration: speed,
        ease: "none",
        repeat: -1,
      }
    );

    const pauseOnHover = () => tweenRef.current?.pause();
    const resumeOnLeave = () => tweenRef.current?.play();

    wrapRef.current?.addEventListener("mouseenter", pauseOnHover);
    wrapRef.current?.addEventListener("mouseleave", resumeOnLeave);

    return () => {
      wrapRef.current?.removeEventListener("mouseenter", pauseOnHover);
      wrapRef.current?.removeEventListener("mouseleave", resumeOnLeave);
      tweenRef.current?.kill();
    };
  }, [skills.length, direction, speed]);

  const doubled = [...skills, ...skills];

  return (
    <div ref={wrapRef} className="marquee-wrap py-2">
      <div ref={trackRef} className="marquee-track">
        {doubled.map((skill, i) => {
          const style = getCategoryStyle(skill.category);
          return (
            <motion.div
              key={`${skill._id || skill.name}-${i}`}
              whileHover={{ y: -8, scale: 1.06 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`group relative flex min-w-[160px] flex-col items-center justify-center gap-1.5 rounded-2xl border ${style.border} ${style.bg} px-5 py-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] sm:min-w-[180px]`}
            >
              {/* Category dot */}
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot} opacity-80`} />
              <h3 className="text-sm font-bold text-white sm:text-base">{skill.name}</h3>
              <p className={`text-xs font-medium ${style.text}`}>{skill.category}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills({ skills = [] }) {
  const frontendSkills = skills.length
    ? skills.filter((_, i) => i % 2 === 0)
    : [];
  const backendSkills = skills.length
    ? skills.filter((_, i) => i % 2 !== 0)
    : [];

  // If no split possible, just use all skills twice
  const track1 = frontendSkills.length > 0 ? frontendSkills : skills;
  const track2 = backendSkills.length > 0 ? backendSkills : [...skills].reverse();

  return (
    <section id="skills" className="section-space relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.07),transparent_60%)]" />

      <div className="container-custom">
        <FadeUp>
          <span className="section-label">Tech Stack</span>
          <h2 className="mb-2 text-4xl font-black md:text-5xl">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="mb-10 text-sm text-white/40">
            Technologies I work with daily
          </p>
        </FadeUp>
      </div>

      {/* Dual Marquee tracks */}
      {skills.length > 0 ? (
        <FadeUp delay={0.1}>
          <div className="flex flex-col gap-4">
            <MarqueeTrack skills={track1} direction={1} speed={26} />
            <MarqueeTrack skills={track2} direction={-1} speed={22} />
          </div>
        </FadeUp>
      ) : (
        <div className="container-custom">
          <p className="text-white/40">No skills data yet.</p>
        </div>
      )}

      {/* Category legend */}
      <div className="container-custom mt-8">
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(CATEGORY_COLORS)
              .filter(([key]) => key !== "default")
              .map(([key, val]) => (
                <span
                  key={key}
                  className={`inline-flex items-center gap-2 rounded-full border ${val.border} ${val.bg} px-3 py-1 text-xs font-medium ${val.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${val.dot}`} />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}