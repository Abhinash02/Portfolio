

// "use client";

// import { motion } from "framer-motion";

// const socialContainer = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.15,
//     },
//   },
// };

// const socialItem = {
//   hidden: { opacity: 0, y: 18, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.35,
//       ease: "easeOut",
//     },
//   },
// };

// export default function Hero({ hero }) {
//   const socialLinks = Array.isArray(hero?.socialLinks) ? hero.socialLinks : [];
//   const highlights = Array.isArray(hero?.highlights) ? hero.highlights : [];

//   return (
//     <section className="relative overflow-hidden py-14 md:py-24">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_30%)]" />

//       <div className="container-custom grid items-center gap-10 lg:grid-cols-2">
//         <div>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45 }}
//             className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-wide text-cyan-300 md:text-sm"
//           >
//             {hero?.availabilityText || "Available for full-stack opportunities"}
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.08 }}
//             className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl"
//           >
//             Hi, I&apos;m <span className="text-cyan-400">{hero?.name || "Abhinash"}</span>
//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.16 }}
//             className="mt-4 text-lg font-semibold text-white/80 sm:text-xl md:text-3xl"
//           >
//             {hero?.title || "MERN Stack Developer"}
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.24 }}
//             className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base md:text-lg md:leading-8"
//           >
//             {hero?.tagline ||
//               "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 28 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.32 }}
//             className="mt-8 flex flex-wrap items-center gap-3 md:gap-4"
//           >
//             <a href="#projects" className="btn-primary">
//               View Projects
//             </a>

//             {hero?.resumeUrl && (
//               <a
//                 href={hero.resumeUrl}
//                 className="btn-secondary"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Download Resume
//               </a>
//             )}

//             {socialLinks.length > 0 &&
//               [...socialLinks]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <a
//                     key={item._id || item.label}
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10"
//                     title={item.label}
//                   >
//                     {item.icon ? (
//                       <img
//                         src={item.icon}
//                         alt={item.label || "social icon"}
//                         className="h-5 w-5 object-contain"
//                       />
//                     ) : (
//                       <span className="text-xs font-bold text-cyan-300">
//                         {item.label?.charAt(0) || "S"}
//                       </span>
//                     )}
//                   </a>
//                 ))}
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 18 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="glass relative mx-auto w-full rounded-[2rem] p-5 sm:p-6 md:p-8"
//         >
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {highlights.length > 0 ? (
//               [...highlights]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <div
//                     key={item._id || item.label}
//                     className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:bg-white/10"
//                   >
//                     <p className="text-sm text-white/50">{item.label}</p>
//                     <h4 className="mt-2 text-lg font-bold md:text-xl">{item.value}</h4>
//                   </div>
//                 ))
//             ) : (
//               <>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm text-white/50">Core Focus</p>
//                   <h4 className="mt-2 text-lg font-bold md:text-xl">MERN Stack</h4>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm text-white/50">Specialty</p>
//                   <h4 className="mt-2 text-lg font-bold md:text-xl">Admin Panels</h4>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm text-white/50">Backend</p>
//                   <h4 className="mt-2 text-lg font-bold md:text-xl">REST APIs</h4>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm text-white/50">UI</p>
//                   <h4 className="mt-2 text-lg font-bold md:text-xl">Responsive</h4>
//                 </div>
//               </>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



"use client";

import { motion } from "framer-motion";

const socialContainer = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const socialItem = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
};

const cardContainer = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.24,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: "easeOut",
    },
  },
};


export default function Hero({ hero }) {
  const socialLinks = Array.isArray(hero?.socialLinks) ? hero.socialLinks : [];
  const highlights = Array.isArray(hero?.highlights) ? hero.highlights : [];

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cyan-400/10 via-cyan-300/5 to-transparent blur-2xl md:h-56" />

      <div className="container-custom grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-[11px] font-medium tracking-[0.2em] text-cyan-300 sm:px-4 md:mb-4 md:text-sm"
          >
            {hero?.availabilityText || "Available for full-stack opportunities"}
          </motion.p>

          

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl"
          >
            Hi, I&apos;m <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]">{hero?.name || "Abhinash"}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-3 text-base font-semibold text-white/80 sm:text-xl md:mt-3 md:text-3xl"
          >
            {hero?.title || "MERN Stack Developer"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
           className="mt-4 max-w-2xl text-justify text-sm leading-7 text-white/70 sm:text-base md:mt-5 md:text-lg md:leading-8">
            {hero?.tagline ||
              "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
          </motion.p>
                {hero?.resumeUrl && (
  <motion.a
    variants={socialItem}
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    href={hero.resumeUrl}
    className="btn-primary"
    target="_blank"
    rel="noopener noreferrer"
  >
    Download Resume
  </motion.a>
)}
          <motion.div
            variants={socialContainer}
            initial="hidden"
            animate="show"
            className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-4"
          >
            <motion.a
              variants={socialItem}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="btn-primary shadow-[0_10px_30px_rgba(34,211,238,0.18)]"
            >
              View Projects
            </motion.a>

            {socialLinks.length > 0 &&
              [...socialLinks]
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item) => (
                  <motion.a
                    variants={socialItem}
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    key={item._id || item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_10px_24px_rgba(34,211,238,0.16)] md:h-11 md:w-11"
                    title={item.label}
                  >
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.label || "social icon"}
                        className="h-4 w-4 object-contain md:h-5 md:w-5"
                      />
                    ) : (
                      <span className="text-xs font-bold text-cyan-300">
                        {item.label?.charAt(0) || "S"}
                      </span>
                    )}
                  </motion.a>
                ))}
          </motion.div>
          
        </div>


        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass relative mx-auto w-full rounded-[1.75rem] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] sm:p-6 md:rounded-[2rem] md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 md:rounded-[2rem]" />

          <motion.div
            variants={cardContainer}
            initial="hidden"
            animate="show"
            className="relative grid grid-cols-2 gap-3 sm:gap-4"
          >
            {highlights.length > 0 ? (
              [...highlights]
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((item) => (
                  <motion.div
                    variants={cardItem}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={item._id || item.label}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
                  >
                    <p className="text-xs text-white/50 md:text-sm">{item.label}</p>
                    <h4 className="mt-2 text-base font-bold leading-snug md:text-xl">{item.value}</h4>
                  </motion.div>
                ))
            ) : (
              <>
                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
                >
                  <p className="text-xs text-white/50 md:text-sm">Core Focus</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">MERN Stack</h4>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
                >
                  <p className="text-xs text-white/50 md:text-sm">Specialty</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">Admin Panels</h4>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
                >
                  <p className="text-xs text-white/50 md:text-sm">Backend</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">REST APIs</h4>
                </motion.div>

                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
                >
                  <p className="text-xs text-white/50 md:text-sm">UI</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">Responsive</h4>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}