
// "use client";

// import { motion } from "framer-motion";

// const navLinks = [
//   { label: "About", href: "#about" },
//   { label: "Skills", href: "#skills" },
//   { label: "Experience", href: "#experience" },
//   { label: "Projects", href: "#projects" },
//   { label: "Education", href: "#education" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   return (
//     <motion.header
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
//     >
//       <div className="container-custom flex h-18 items-center justify-between py-4">
//         <a href="/" className="text-3xl font-black text-cyan-400">
//           Abhinash
//         </a>

//         <nav className="hidden gap-8 md:flex">
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
//       </div>
//     </motion.header>
//   );
// }

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"
    >
      <div className="container-custom flex items-center justify-between py-4">
        <a href="/" className="text-2xl font-black text-cyan-400 md:text-3xl">
          Abhinash
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-base font-medium text-white/80 transition hover:text-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-slate-950/95 md:hidden"
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
  );
}