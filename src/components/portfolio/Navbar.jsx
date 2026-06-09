"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ socials }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const logoRef = useRef(null);
  const desktopNavRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  // GSAP entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      );

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
      }

      if (desktopNavRef.current) {
        tl.fromTo(
          desktopNavRef.current.children,
          { y: -14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
          },
          "-=0.35"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu GSAP stagger
  useEffect(() => {
    if (!open || !mobileMenuRef.current) return;
    gsap.fromTo(
      mobileMenuRef.current.querySelectorAll("a"),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" }
    );
  }, [open]);

  // Scroll-based active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks.map((l) => document.querySelector(l.href));
      const scrollY = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/8 bg-[#05050f]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <a
            ref={logoRef}
            href="/"
            className="shrink-0 whitespace-nowrap text-2xl font-black md:text-3xl"
          >
            <span className="gradient-text">Abhinash</span>
          </a>

          {/* Desktop Nav */}
          <nav
            ref={desktopNavRef}
            className="hidden flex-1 items-center justify-end gap-1 whitespace-nowrap md:flex lg:gap-2"
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-white/8 border border-white/10"
                      style={{ borderRadius: "0.75rem" }}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                  )}
                </a>
              );
            })}

            <a
              href="#contact"
              className="btn-primary ml-4 px-5 py-2.5 text-sm"
            >
              Hire Me
            </a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                  open ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/8 bg-[#05050f]/95 backdrop-blur-2xl md:hidden"
            >
              <div className="container-custom flex flex-col gap-1 py-4">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                      )}
                      {item.label}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 w-full"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
}