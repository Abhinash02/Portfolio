
// "use client";

// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const navLinks = [
//   { label: "About", href: "#about" },
//   { label: "Skills", href: "#skills" },
//   { label: "Experience", href: "#experience" },
//   { label: "Projects", href: "#projects" },
//   { label: "Education", href: "#education" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <motion.header
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"
//     >
//       <div className="container-custom flex items-center justify-between py-4">
//         <a href="/" className="text-2xl font-black text-cyan-400 md:text-3xl">
//           Abhinash
//         </a>

//         <nav className="hidden items-center gap-8 md:flex">
//           {navLinks.map((item) => (
//             <a
//               key={item.label}
//               href={item.href}
//               className="text-base font-medium text-white/80 transition hover:text-cyan-400"
//             >
//               {item.label}
//             </a>
//           ))}
//         </nav>

//         <button
//           onClick={() => setOpen(!open)}
//           className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
//           aria-label="Toggle menu"
//         >
//           <div className="space-y-1.5">
//             <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
//             <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
//           </div>
//         </button>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="border-t border-white/10 bg-slate-950/95 md:hidden"
//           >
//             <div className="container-custom flex flex-col py-4">
//               {navLinks.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className="rounded-xl px-3 py-3 text-white/80 transition hover:bg-white/5 hover:text-cyan-400"
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { gsap } from "gsap";

// const navLinks = [
//   { label: "About", href: "#about" },
//   { label: "Skills", href: "#skills" },
//   { label: "Experience", href: "#experience" },
//   { label: "Projects", href: "#projects" },
//   { label: "Education", href: "#education" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const headerRef = useRef(null);
//   const logoRef = useRef(null);
//   const desktopNavRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(headerRef.current, {
//          opacity: 2, y: 4
//       });

//       gsap.from(logoRef.current, {
//         x: -30,
//         opacity: 0,
//         duration: 0.8,
//         delay: 0.15,
//         ease: "power3.out",
//       });

//       if (desktopNavRef.current) {
//         gsap.from(desktopNavRef.current.children, {
//           y: -18,
//           opacity: 0,
//           duration: 0.5,
//           stagger: 0.08,
//           delay: 0.25,
//           ease: "power2.out",
//         });
//       }
//     });

//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     if (!mobileMenuRef.current) return;

//     if (open) {
//       // gsap.fromTo(
//       //   mobileMenuRef.current,
//       //   { opacity: 0, height: 0 },
//       //   {
//       //     opacity: 1,
//       //     height: "auto",
//       //     duration: 0.4,
//       //     ease: "power2.out",
//       //   }
//       // );

//       gsap.fromTo(
//   desktopNavRef.current.children,
//   { y: -18, opacity: 0 },
//   {
//     y: 0,
//     opacity: 1,
//     duration: 0.5,
//     stagger: 0.08,
//     delay: 0.25,
//     ease: "power2.out",
//     overwrite: "auto",
//   }
// );

//       gsap.fromTo(
//         mobileMenuRef.current.querySelectorAll("a"),
//         { y: 18, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.45,
//           stagger: 0.08,
//           delay: 0.08,
//           ease: "power2.out",
//         }
//       );
//     }
//   }, [open]);

//   return (
//     <motion.header
//       ref={headerRef}
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"
//     >
//       <div className="container-custom flex items-center justify-between py-4">
//         <a
//           ref={logoRef}
//           href="/"
//           className="text-2xl font-black text-cyan-400 md:text-3xl"
//         >
//           Abhinash
//         </a>

//         {/* <nav
//           ref={desktopNavRef}
//           className="hidden items-center gap-8 md:flex"
//         >
//           {navLinks.map((item) => (
//             <a
//               key={item.label}
//               href={item.href}
//               className="text-base font-medium text-white/80 transition hover:text-cyan-400"
//             >
//               {item.label}
//             </a>
//           ))}
//         </nav> */}

//    <nav
//   ref={desktopNavRef}
//   className="hidden items-center gap-8 md:flex"
// >
//   {navLinks.map((item) => (
//     <a
//       key={item.label}
//       href={item.href}
//       className="text-base font-medium text-white opacity-100 transition duration-300 hover:text-cyan-400"
//       style={{ opacity: 1 }}
//     >
//       {item.label}
//     </a>
//   ))}
// </nav>
//         <button
//           onClick={() => setOpen(!open)}
//           className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
//           aria-label="Toggle menu"
//         >
//           <div className="space-y-1.5">
//             <span
//               className={`block h-0.5 w-5 bg-white transition ${
//                 open ? "translate-y-2 rotate-45" : ""
//               }`}
//             />
//             <span
//               className={`block h-0.5 w-5 bg-white transition ${
//                 open ? "opacity-0" : ""
//               }`}
//             />
//             <span
//               className={`block h-0.5 w-5 bg-white transition ${
//                 open ? "-translate-y-2 -rotate-45" : ""
//               }`}
//             />
//           </div>
//         </button>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             ref={mobileMenuRef}
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="overflow-hidden border-t border-white/10 bg-slate-950/95 md:hidden"
//           >
//             <div className="container-custom flex flex-col py-4">
//               {navLinks.map((item) => (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className="rounded-xl px-3 py-3 text-white/80 transition hover:bg-white/5 hover:text-cyan-400"
//                 >
//                   {item.label}
//                 </a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const logoRef = useRef(null);
  const desktopNavRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      if (desktopNavRef.current) {
        gsap.fromTo(
          desktopNavRef.current.children,
          { y: -14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.12,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open || !mobileMenuRef.current) return;

    gsap.fromTo(
      mobileMenuRef.current.querySelectorAll("a"),
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out",
      }
    );
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
      >
        <div className="container-custom flex items-center justify-between gap-4 py-4">
          <a
            ref={logoRef}
            href="/"
            className="shrink-0 whitespace-nowrap text-2xl font-black text-cyan-400 md:text-3xl"
          >
            Abhinash
          </a>

          <nav
            ref={desktopNavRef}
            className="hidden flex-1 items-center justify-end gap-6 whitespace-nowrap md:flex lg:gap-8"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap text-base font-medium text-white transition duration-300 hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10 bg-slate-950/95 md:hidden"
            >
              <div className="container-custom flex flex-col py-4">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-white/80 transition hover:bg-white/5 hover:text-cyan-400"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-[76px] md:h-[84px]" />
    </>
  );
}