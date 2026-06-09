"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import FadeUp from "./FadeUp";

function CountUp({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration,
            ease: "power2.out",
            onUpdate: () => setCount(Math.round(obj.val)),
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About({ about }) {
  const sectionRef = useRef(null);
  const mainCardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Moving glow orb inside the card
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 20, y: 12, opacity: 0.6,
          duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techChips = [
    "Next.js", "React", "Node.js", "Express.js",
    "MongoDB", "Tailwind CSS", "TypeScript", "REST API",
  ];

  const statCards = [
    { label: "Projects Built", value: 10, suffix: "+" },
    { label: "Years Learning", value: 2, suffix: "+" },
    { label: "APIs Developed", value: 20, suffix: "+" },
    { label: "Commits Made", value: 300, suffix: "+" },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-space relative overflow-hidden">
      {/* Orb background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.1),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08),transparent_40%)]" />

      <div className="container-custom">
        <FadeUp>
          <div className="mb-12 max-w-3xl">
            <span className="section-label">Who I Am</span>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          </div>
        </FadeUp>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Main Card */}
          <FadeUp delay={0.05} className="lg:col-span-8">
            <motion.div
              ref={mainCardRef}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35 }}
              className="glass-violet relative overflow-hidden rounded-[2rem] p-6 shadow-[0_20px_70px_rgba(124,58,237,0.12)] md:p-8 xl:p-10"
            >
              {/* Left violet border accent */}
              <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent" />

              {/* Moving glow */}
              <div
                ref={glowRef}
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl"
              />

              <div className="relative pl-4">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400 mb-3">
                  My Story
                </p>

                <p className="max-w-3xl text-base leading-8 text-white/70 md:text-[17px] md:leading-9">
                  {about?.content ||
                    "I'm a MERN Stack Developer passionate about building scalable web applications with clean, maintainable code. I specialize in authentication systems, admin dashboards, REST APIs, and responsive UIs that combine performance with great design."}
                </p>

                {/* Tech Chips */}
                <div className="mt-7">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                    Tech I Work With
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(about?.techChips || techChips).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/20 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Focus strip */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="mt-7 rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-sm hover:bg-white/6 transition-all duration-300 md:p-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">
                    Focus · Core · Goal
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white sm:text-base md:text-lg">
                    Full Stack · MERN + Next.js · Clean, Scalable UI
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {statCards.map((stat, i) => (
              <FadeUp key={stat.label} delay={0.1 + i * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-violet glow-card relative overflow-hidden rounded-[1.75rem] p-5 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(124,58,237,0.2)] md:p-6"
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-violet-500/15 blur-2xl" />
                  <p className="relative text-xs uppercase tracking-[0.24em] text-white/40 md:text-sm">
                    {stat.label}
                  </p>
                  <h3 className="relative mt-3 text-3xl font-black text-white md:text-4xl">
                    <span className="gradient-text">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </span>
                  </h3>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}