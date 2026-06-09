"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const socialContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const socialItem = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.5 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 22, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Hero({ hero }) {
  const socialLinks = Array.isArray(hero?.socialLinks) ? hero.socialLinks : [];
  const highlights = Array.isArray(hero?.highlights) ? hero.highlights : [];

  const headingRef = useRef(null);
  const titleRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const glowRingRef = useRef(null);
  const cardRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const scrollArrowRef = useRef(null);

  useEffect(() => {
    const headingEl = headingRef.current;
    const titleEl = titleRef.current;
    if (!headingEl || !titleEl) return;

    const mainText = `Hi, I'm ${hero?.name || "Abhinash"}`;
    const roleText = hero?.title || "MERN Stack Developer";

    let headingIndex = 0;
    let titleIndex = 0;
    let headingTimer;
    let titleTimer;

    headingEl.textContent = "";
    titleEl.textContent = "";

    const typingLoop = () => {
      headingIndex = 0;
      titleIndex = 0;
      headingEl.textContent = "";
      titleEl.textContent = "";

      headingTimer = setInterval(() => {
        headingIndex += 1;
        headingEl.textContent = mainText.slice(0, headingIndex);
        if (headingIndex >= mainText.length) {
          clearInterval(headingTimer);
          setTimeout(() => {
            titleTimer = setInterval(() => {
              titleIndex += 1;
              titleEl.textContent = roleText.slice(0, titleIndex);
              if (titleIndex >= roleText.length) {
                clearInterval(titleTimer);
                setTimeout(() => {
                  gsap.to([headingEl, titleEl], {
                    opacity: 0.3,
                    duration: 0.7,
                    yoyo: true,
                    repeat: 1,
                    onComplete: typingLoop,
                  });
                }, 2200);
              }
            }, 80);
          }, 300);
        }
      }, 85);
    };

    typingLoop();

    // Floating image
    if (imageWrapRef.current) {
      gsap.to(imageWrapRef.current, {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Rotating glow ring
    if (glowRingRef.current) {
      gsap.to(glowRingRef.current, {
        rotate: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
    }

    // Card float
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 10 },
        { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );
    }

    // Animated orbs
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: 40, y: -30, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }
    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: -35, y: 25, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });
    }
    if (orb3Ref.current) {
      gsap.to(orb3Ref.current, {
        x: 20, y: 40, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3,
      });
    }

    // Scroll arrow bounce
    if (scrollArrowRef.current) {
      gsap.to(scrollArrowRef.current, {
        y: 10, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }

    return () => {
      clearInterval(headingTimer);
      clearInterval(titleTimer);
      gsap.killTweensOf([
        headingEl, titleEl,
        imageWrapRef.current, glowRingRef.current, cardRef.current,
        orb1Ref.current, orb2Ref.current, orb3Ref.current, scrollArrowRef.current,
      ]);
    };
  }, [hero?.name, hero?.title]);

  const defaultHighlights = [
    { label: "Core Focus", value: "MERN Stack" },
    { label: "Specialty", value: "Admin Panels" },
    { label: "Backend", value: "REST APIs" },
    { label: "UI Style", value: "Responsive" },
  ];

  const displayHighlights = highlights.length > 0
    ? [...highlights].sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultHighlights;

  return (
    <section className="relative min-h-[88vh] overflow-hidden py-10 md:py-16 flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.12),transparent_40%)]" />

      {/* Floating Orbs */}
      <div
        ref={orb1Ref}
        className="orb orb-violet absolute -top-20 -right-10 h-[420px] w-[420px] -z-10 opacity-60"
      />
      <div
        ref={orb2Ref}
        className="orb orb-cyan absolute top-1/2 -left-20 h-[320px] w-[320px] -z-10 opacity-50"
      />
      <div
        ref={orb3Ref}
        className="orb orb-pink absolute bottom-0 right-1/4 h-[280px] w-[280px] -z-10 opacity-35"
      />

      <div className="container-custom w-full grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left side */}
        <div className="flex flex-col">
          {/* Profile image */}
          {hero?.profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <div ref={imageWrapRef} className="relative inline-block">
                {/* Glow aura */}
                <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-2xl scale-125" />
                {/* Rotating dashed ring */}
                <div
                  ref={glowRingRef}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-violet-400/30"
                />
                {/* Solid inner ring */}
                <div className="absolute -inset-2 rounded-full border border-violet-400/20" />
                <img
                  ref={imageRef}
                  src={hero.profileImage}
                  alt={hero?.name || "Profile"}
                  className="relative h-28 w-28 rounded-full border-2 border-violet-400/30 object-cover shadow-[0_0_50px_rgba(124,58,237,0.4)] sm:h-36 sm:w-36 md:h-44 md:w-44"
                />
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#05050f] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              </div>
            </motion.div>
          )}

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="section-label">
              {hero?.availabilityText || "Available for Opportunities"}
            </span>
          </motion.div>

          {/* Heading + typing */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="min-h-[52px] text-4xl font-black leading-tight sm:min-h-[64px] sm:text-5xl md:min-h-[80px] md:text-6xl xl:text-7xl"
          >
            <span ref={headingRef} className="gradient-text whitespace-pre-wrap" />
            <span className="cursor-blink" />
          </motion.h1>

          {/* Role */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-2 min-h-[28px] text-lg font-semibold text-white/70 sm:text-2xl md:mt-3 md:text-3xl"
          >
            <span ref={titleRef} />
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26 }}
            className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base md:mt-5 md:text-lg md:leading-8"
          >
            {hero?.tagline ||
              "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={socialContainer}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-row flex-wrap items-center gap-3 md:mt-8"
          >
            <motion.a
              variants={socialItem}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="btn-primary"
            >
              View Projects
            </motion.a>

            {hero?.resumeUrl && (
              <motion.a
                variants={socialItem}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Download Resume
              </motion.a>
            )}
          </motion.div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <motion.div
              variants={socialContainer}
              initial="hidden"
              animate="show"
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              {[...socialLinks]
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item) => (
                  <motion.a
                    variants={socialItem}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    key={item._id || item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-violet-400/50 hover:bg-violet-500/20 hover:shadow-[0_8px_24px_rgba(124,58,237,0.25)] md:h-11 md:w-11"
                    title={item.label}
                  >
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.label || "social icon"}
                        className="h-4 w-4 object-contain md:h-5 md:w-5"
                      />
                    ) : (
                      <span className="text-xs font-bold text-violet-300">
                        {item.label?.charAt(0) || "S"}
                      </span>
                    )}
                  </motion.a>
                ))}
            </motion.div>
          )}
        </div>

        {/* Right side — Highlight Cards */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Card glow backdrop */}
          <div className="absolute -inset-8 rounded-[3rem] bg-violet-600/10 blur-3xl" />

          <div className="glass-violet relative rounded-[2rem] p-5 shadow-[0_20px_70px_rgba(124,58,237,0.15)] sm:p-6 md:p-8">
            {/* Inner gradient overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-400/8 via-transparent to-cyan-400/6" />

            {/* Top label */}
            <div className="relative mb-5 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                Quick Highlights
              </p>
            </div>

            <motion.div
              variants={cardContainer}
              initial="hidden"
              animate="show"
              className="relative grid grid-cols-2 gap-3 sm:gap-4"
            >
              {displayHighlights.map((item, i) => (
                <motion.div
                  key={item._id || item.label || i}
                  variants={cardItem}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:shadow-[0_12px_32px_rgba(124,58,237,0.2)] md:p-5"
                >
                  <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-violet-500/10 blur-xl opacity-0 transition duration-300 group-hover:opacity-100" />
                  <p className="text-xs text-white/40 md:text-sm">{item.label}</p>
                  <h4 className="mt-2 text-base font-bold leading-snug text-white md:text-lg">
                    {item.value}
                  </h4>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom accent */}
            <div className="relative mt-5 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
            <p className="relative mt-3 text-center text-xs text-white/30">
              Open to internships & freelance
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollArrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-violet-400">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}