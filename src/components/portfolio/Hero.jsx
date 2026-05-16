

// "use client";

// import { motion } from "framer-motion";

// const socialContainer = {
//   hidden: { opacity: 0, y: 16 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.12,
//     },
//   },
// };

// const socialItem = {
//   hidden: { opacity: 0, y: 14, scale: 0.94 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.32,
//       ease: "easeOut",
//     },
//   },
// };

// const cardContainer = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.24,
//     },
//   },
// };

// const cardItem = {
//   hidden: { opacity: 0, y: 20, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.38,
//       ease: "easeOut",
//     },
//   },
// };


// export default function Hero({ hero }) {
//   const socialLinks = Array.isArray(hero?.socialLinks) ? hero.socialLinks : [];
//   const highlights = Array.isArray(hero?.highlights) ? hero.highlights : [];

//   return (
//     <section className="relative overflow-hidden py-10 md:py-16">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_30%)]" />
//       <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cyan-400/10 via-cyan-300/5 to-transparent blur-2xl md:h-56" />

//       <div className="container-custom grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
//         <div>
//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45 }}
//             className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-[11px] font-medium tracking-[0.2em] text-cyan-300 sm:px-4 md:mb-4 md:text-sm"
//           >
//             {hero?.availabilityText || "Available for full-stack opportunities"}
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.08 }}
//             className="text-3xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl"
//           >
//             Hi, I&apos;m <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]">{hero?.name || "Abhinash"}</span>
//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.16 }}
//             className="mt-3 text-base font-semibold text-white/80 sm:text-xl md:mt-3 md:text-3xl"
//           >
//             {hero?.title || "MERN Stack Developer"}
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.24 }}
//            className="mt-4 max-w-2xl text-justify text-sm leading-7 text-white/70 sm:text-base md:mt-5 md:text-lg md:leading-8">
//             {hero?.tagline ||
//               "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
//           </motion.p>
//                 {hero?.resumeUrl && (
//   <motion.a
//     variants={socialItem}
//     whileHover={{ y: -2, scale: 1.02 }}
//     whileTap={{ scale: 0.97 }}
//     href={hero.resumeUrl}
//     className="btn-primary"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Download Resume
//   </motion.a>
// )}
//           <motion.div
//             variants={socialContainer}
//             initial="hidden"
//             animate="show"
//             className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-4"
//           >
//             <motion.a
//               variants={socialItem}
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               href="#projects"
//               className="btn-primary shadow-[0_10px_30px_rgba(34,211,238,0.18)]"
//             >
//               View Projects
//             </motion.a>

//             {socialLinks.length > 0 &&
//               [...socialLinks]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <motion.a
//                     variants={socialItem}
//                     whileHover={{ y: -3, scale: 1.06 }}
//                     whileTap={{ scale: 0.94 }}
//                     key={item._id || item.label}
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_10px_24px_rgba(34,211,238,0.16)] md:h-11 md:w-11"
//                     title={item.label}
//                   >
//                     {item.icon ? (
//                       <img
//                         src={item.icon}
//                         alt={item.label || "social icon"}
//                         className="h-4 w-4 object-contain md:h-5 md:w-5"
//                       />
//                     ) : (
//                       <span className="text-xs font-bold text-cyan-300">
//                         {item.label?.charAt(0) || "S"}
//                       </span>
//                     )}
//                   </motion.a>
//                 ))}
//           </motion.div>
          
//         </div>


//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 18 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="glass relative mx-auto w-full rounded-[1.75rem] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] sm:p-6 md:rounded-[2rem] md:p-8"
//         >
//           <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 md:rounded-[2rem]" />

//           <motion.div
//             variants={cardContainer}
//             initial="hidden"
//             animate="show"
//             className="relative grid grid-cols-2 gap-3 sm:gap-4"
//           >
//             {highlights.length > 0 ? (
//               [...highlights]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <motion.div
//                     variants={cardItem}
//                     whileHover={{ y: -4, scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     key={item._id || item.label}
//                     className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                   >
//                     <p className="text-xs text-white/50 md:text-sm">{item.label}</p>
//                     <h4 className="mt-2 text-base font-bold leading-snug md:text-xl">{item.value}</h4>
//                   </motion.div>
//                 ))
//             ) : (
//               <>
//                 <motion.div
//                   variants={cardItem}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Core Focus</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">MERN Stack</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Specialty</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">Admin Panels</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Backend</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">REST APIs</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">UI</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">Responsive</h4>
//                 </motion.div>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";

// const socialContainer = {
//   hidden: { opacity: 0, y: 16 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.12,
//     },
//   },
// };

// const socialItem = {
//   hidden: { opacity: 0, y: 14, scale: 0.94 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.32,
//       ease: "easeOut",
//     },
//   },
// };

// const cardContainer = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.24,
//     },
//   },
// };

// const cardItem = {
//   hidden: { opacity: 0, y: 20, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.38,
//       ease: "easeOut",
//     },
//   },
// };

// export default function Hero({ hero }) {
//   const socialLinks = Array.isArray(hero?.socialLinks) ? hero.socialLinks : [];
//   const highlights = Array.isArray(hero?.highlights) ? hero.highlights : [];
//   const fullText = useMemo(() => `Hi, I’m ${hero?.name || "Abhinash"}`, [hero?.name]);
//   const [typedText, setTypedText] = useState("");

//   useEffect(() => {
//     let index = 0;
//     setTypedText("");

//     const interval = setInterval(() => {
//       index += 1;
//       setTypedText(fullText.slice(0, index));

//       if (index >= fullText.length) {
//         clearInterval(interval);
//       }
//     }, 70);

//     return () => clearInterval(interval);
//   }, [fullText]);

//   return (
//     <section className="relative overflow-hidden py-10 md:py-16">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_30%)]" />
//       <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cyan-400/10 via-cyan-300/5 to-transparent blur-2xl md:h-56" />

//       <div className="container-custom grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
//         <div>
//           {hero?.profileImage ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-6 flex justify-center lg:justify-start"
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl" />
//                 <div className="absolute -inset-2 rounded-full border border-cyan-400/20" />
//                 <img
//                   src={hero.profileImage}
//                   alt={hero?.name || "Profile"}
//                   className="relative h-28 w-28 rounded-full border border-white/10 object-cover shadow-[0_0_40px_rgba(34,211,238,0.22)] sm:h-36 sm:w-36 md:h-40 md:w-40"
//                 />
//               </div>
//             </motion.div>
//           ) : null}

//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45 }}
//             className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-[11px] font-medium tracking-[0.2em] text-cyan-300 sm:px-4 md:mb-4 md:text-sm"
//           >
//             {hero?.availabilityText || "Available for full-stack opportunities"}
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.08 }}
//             className="min-h-[56px] text-3xl font-black leading-tight sm:min-h-[72px] sm:text-5xl md:min-h-[92px] md:text-6xl xl:text-7xl"
//           >
//             <span className="whitespace-pre-wrap">
//               {typedText}
//               <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-cyan-400 align-middle" />
//             </span>
//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.16 }}
//             className="mt-3 text-base font-semibold text-white/80 sm:text-xl md:mt-3 md:text-3xl"
//           >
//             {hero?.title || "MERN Stack Developer"}
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.24 }}
//             className="mt-4 max-w-2xl text-justify text-sm leading-7 text-white/70 sm:text-base md:mt-5 md:text-lg md:leading-8"
//           >
//             {hero?.tagline ||
//               "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
//           </motion.p>

//           <motion.div
//             variants={socialContainer}
//             initial="hidden"
//             animate="show"
//             className="mt-5 flex flex-wrap items-center gap-3 md:mt-8"
//           >
//             <motion.a
//               variants={socialItem}
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               href="#projects"
//               className="btn-primary whitespace-nowrap shadow-[0_10px_30px_rgba(34,211,238,0.18)]"
//             >
//               View Projects
//             </motion.a>

//             {hero?.resumeUrl ? (
//               <motion.a
//                 variants={socialItem}
//                 whileHover={{ y: -2, scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//                 href={hero.resumeUrl}
//                 className="btn-primary whitespace-nowrap"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Download Resume
//               </motion.a>
//             ) : null}
//           </motion.div>

//           {socialLinks.length > 0 ? (
//             <motion.div
//               variants={socialContainer}
//               initial="hidden"
//               animate="show"
//               className="mt-5 flex flex-wrap items-center gap-2.5 md:mt-6 md:gap-4"
//             >
//               {[...socialLinks]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <motion.a
//                     variants={socialItem}
//                     whileHover={{ y: -3, scale: 1.06 }}
//                     whileTap={{ scale: 0.94 }}
//                     key={item._id || item.label}
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_10px_24px_rgba(34,211,238,0.16)] md:h-11 md:w-11"
//                     title={item.label}
//                   >
//                     {item.icon ? (
//                       <img
//                         src={item.icon}
//                         alt={item.label || "social icon"}
//                         className="h-4 w-4 object-contain md:h-5 md:w-5"
//                       />
//                     ) : (
//                       <span className="text-xs font-bold text-cyan-300">
//                         {item.label?.charAt(0) || "S"}
//                       </span>
//                     )}
//                   </motion.a>
//                 ))}
//             </motion.div>
//           ) : null}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 18 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="glass relative mx-auto w-full rounded-[1.75rem] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] sm:p-6 md:rounded-[2rem] md:p-8"
//         >
//           <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 md:rounded-[2rem]" />

//           <motion.div
//             variants={cardContainer}
//             initial="hidden"
//             animate="show"
//             className="relative grid grid-cols-2 gap-3 sm:gap-4"
//           >
//             {highlights.length > 0 ? (
//               [...highlights]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <motion.div
//                     variants={cardItem}
//                     whileHover={{ y: -4, scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     key={item._id || item.label}
//                     className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                   >
//                     <p className="text-xs text-white/50 md:text-sm">{item.label}</p>
//                     <h4 className="mt-2 text-base font-bold leading-snug md:text-xl">
//                       {item.value}
//                     </h4>
//                   </motion.div>
//                 ))
//             ) : (
//               <>
//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Core Focus</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">MERN Stack</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Specialty</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">Admin Panels</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Backend</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">REST APIs</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">UI</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">Responsive</h4>
//                 </motion.div>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { gsap } from "gsap";

// const socialContainer = {
//   hidden: { opacity: 0, y: 16 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.12,
//     },
//   },
// };

// const socialItem = {
//   hidden: { opacity: 0, y: 14, scale: 0.94 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.32,
//       ease: "easeOut",
//     },
//   },
// };

// const cardContainer = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.24,
//     },
//   },
// };

// const cardItem = {
//   hidden: { opacity: 0, y: 20, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.38,
//       ease: "easeOut",
//     },
//   },
// };

// export default function Hero({ hero }) {
//   const socialLinks = Array.isArray(hero?.socialLinks) ? hero.socialLinks : [];
//   const highlights = Array.isArray(hero?.highlights) ? hero.highlights : [];

//   const headingRef = useRef(null);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     const headingEl = headingRef.current;
//     const titleEl = titleRef.current;

//     if (!headingEl || !titleEl) return;

//     const mainText = `Hi, I'm ${hero?.name || "Abhinash"}`;
//     const roleText = hero?.title || "MERN Stack Developer";

//     let headingIndex = 0;
//     let titleIndex = 0;

//     headingEl.textContent = "";
//     titleEl.textContent = "";

//     const headingTyping = setInterval(() => {
//       headingIndex += 1;
//       headingEl.textContent = mainText.slice(0, headingIndex);

//       if (headingIndex >= mainText.length) {
//         clearInterval(headingTyping);

//         setTimeout(() => {
//           const titleTyping = setInterval(() => {
//             titleIndex += 1;
//             titleEl.textContent = roleText.slice(0, titleIndex);

//             if (titleIndex >= roleText.length) {
//               clearInterval(titleTyping);

//               gsap.to([headingEl, titleEl], {
//                 opacity: 0.65,
//                 y: -4,
//                 duration: 1.2,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "power1.inOut",
//               });
//             }
//           }, 85);
//         }, 250);
//       }
//     }, 90);
//     return () => {
//       clearInterval(headingTyping);
//       gsap.killTweensOf([headingEl, titleEl]);
//     };
//   }, [hero?.name, hero?.title]);

//   return (
//     <section className="relative overflow-hidden py-10 md:py-16">
//       <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_30%)]" />
//       <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cyan-400/10 via-cyan-300/5 to-transparent blur-2xl md:h-56" />

//       <div className="container-custom grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
//         <div>
//           {hero?.profileImage ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-6 flex justify-center lg:justify-start"
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl" />
//                 <div className="absolute -inset-2 rounded-full border border-cyan-400/20" />
//                 <img
//                   src={hero.profileImage}
//                   alt={hero?.name || "Profile"}
//                   className="relative h-28 w-28 rounded-full border border-white/10 object-cover shadow-[0_0_40px_rgba(34,211,238,0.22)] sm:h-36 sm:w-36 md:h-40 md:w-40"
//                 />
//               </div>
//             </motion.div>
//           ) : null}

//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45 }}
//             className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-[11px] font-medium tracking-[0.2em] text-cyan-300 sm:px-4 md:mb-4 md:text-sm"
//           >
//             {hero?.availabilityText || "Available for full-stack opportunities"}
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.08 }}
//             className="min-h-[56px] text-3xl font-black leading-tight sm:min-h-[72px] sm:text-5xl md:min-h-[92px] md:text-6xl xl:text-7xl"
//           >
//             <span
//               ref={headingRef}
//               className="whitespace-pre-wrap text-cyan-300"
//             />
//             <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-cyan-400 align-middle" />
//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.16 }}
//             className="mt-3 min-h-[32px] text-base font-semibold text-white/80 sm:text-xl md:mt-3 md:min-h-[40px] md:text-3xl"
//           >
//             <span ref={titleRef} />
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.24 }}
//             className="mt-4 max-w-2xl text-justify text-sm leading-7 text-white/70 sm:text-base md:mt-5 md:text-lg md:leading-8"
//           >
//             {hero?.tagline ||
//               "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
//           </motion.p>

//           <motion.div
//             variants={socialContainer}
//             initial="hidden"
//             animate="show"
//             className="mt-5 flex flex-nowrap items-center gap-3 overflow-x-auto md:mt-8"
//           >
//             <motion.a
//               variants={socialItem}
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               href="#projects"
//               className="btn-primary shrink-0 whitespace-nowrap shadow-[0_10px_30px_rgba(34,211,238,0.18)]"
//             >
//               View Projects
//             </motion.a>

//             {hero?.resumeUrl ? (
//               <motion.a
//                 variants={socialItem}
//                 whileHover={{ y: -2, scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//                 href={hero.resumeUrl}
//                 className="btn-primary shrink-0 whitespace-nowrap"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Download Resume
//               </motion.a>
//             ) : null}
//           </motion.div>

//           {socialLinks.length > 0 ? (
//             <motion.div
//               variants={socialContainer}
//               initial="hidden"
//               animate="show"
//               className="mt-5 flex flex-wrap items-center gap-2.5 md:mt-6 md:gap-4"
//             >
//               {[...socialLinks]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <motion.a
//                     variants={socialItem}
//                     whileHover={{ y: -3, scale: 1.06 }}
//                     whileTap={{ scale: 0.94 }}
//                     key={item._id || item.label}
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_10px_24px_rgba(34,211,238,0.16)] md:h-11 md:w-11"
//                     title={item.label}
//                   >
//                     {item.icon ? (
//                       <img
//                         src={item.icon}
//                         alt={item.label || "social icon"}
//                         className="h-4 w-4 object-contain md:h-5 md:w-5"
//                       />
//                     ) : (
//                       <span className="text-xs font-bold text-cyan-300">
//                         {item.label?.charAt(0) || "S"}
//                       </span>
//                     )}
//                   </motion.a>
//                 ))}
//             </motion.div>
//           ) : null}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 18 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="glass relative mx-auto w-full rounded-[1.75rem] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] sm:p-6 md:rounded-[2rem] md:p-8"
//         >
//           <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 md:rounded-[2rem]" />

//           <motion.div
//             variants={cardContainer}
//             initial="hidden"
//             animate="show"
//             className="relative grid grid-cols-2 gap-3 sm:gap-4"
//           >
//             {highlights.length > 0 ? (
//               [...highlights]
//                 .sort((a, b) => (a.order || 0) - (b.order || 0))
//                 .map((item) => (
//                   <motion.div
//                     variants={cardItem}
//                     whileHover={{ y: -4, scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     key={item._id || item.label}
//                     className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-cyan-400/20 hover:from-cyan-400/10 hover:to-blue-500/10 hover:shadow-[0_12px_28px_rgba(34,211,238,0.12)] md:p-4"
//                   >
//                     <p className="text-xs text-white/50 md:text-sm">{item.label}</p>
//                     <h4 className="mt-2 text-base font-bold leading-snug md:text-xl">
//                       {item.value}
//                     </h4>
//                   </motion.div>
//                 ))
//             ) : (
//               <>
//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Core Focus</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">MERN Stack</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Specialty</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">Admin Panels</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">Backend</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">REST APIs</h4>
//                 </motion.div>

//                 <motion.div
//                   variants={cardItem}
//                   className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4"
//                 >
//                   <p className="text-xs text-white/50 md:text-sm">UI</p>
//                   <h4 className="mt-2 text-base font-bold md:text-xl">Responsive</h4>
//                 </motion.div>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

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

  const headingRef = useRef(null);
  const titleRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const glowRingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const headingEl = headingRef.current;
    const titleEl = titleRef.current;
    const imageWrapEl = imageWrapRef.current;
    const imageEl = imageRef.current;
    const glowRingEl = glowRingRef.current;
    const cardEl = cardRef.current;

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

                gsap.to([headingEl, titleEl], {
                  opacity: 1,
                  duration: 0.4,
                });

                setTimeout(() => {
                  gsap.to([headingEl, titleEl], {
                    opacity: 0.35,
                    duration: 0.8,
                    yoyo: true,
                    repeat: 1,
                    onComplete: typingLoop,
                  });
                }, 1800);
              }
            }, 85);
          }, 250);
        }
      }, 90);
    };

    typingLoop();

    if (imageWrapEl && imageEl) {
      gsap.fromTo(
        imageWrapEl,
        { y: 0, scale: 1 },
        {
          y: -12,
          scale: 1.02,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );

      gsap.to(imageEl, {
        boxShadow: "0 0 60px rgba(34,211,238,0.35)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (glowRingEl) {
      gsap.to(glowRingEl, {
        rotate: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });
    }

    if (cardEl) {
      gsap.fromTo(
        cardEl,
        { y: 10 },
        {
          y: -6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }

    return () => {
      clearInterval(headingTimer);
      clearInterval(titleTimer);
      gsap.killTweensOf([headingEl, titleEl, imageWrapEl, imageEl, glowRingEl, cardEl]);
    };
  }, [hero?.name, hero?.title]);

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-cyan-400/10 via-cyan-300/5 to-transparent blur-2xl md:h-56" />

      <div className="container-custom grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          {hero?.profileImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex justify-center"
            >
              <div ref={imageWrapRef} className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl" />
                <div
                  ref={glowRingRef}
                  className="absolute -inset-3 rounded-full border border-cyan-400/20 border-dashed"
                />
                <div className="absolute -inset-2 rounded-full border border-cyan-400/20" />
                <img
                  ref={imageRef}
                  src={hero.profileImage}
                  alt={hero?.name || "Profile"}
                  className="relative h-28 w-28 rounded-full border border-white/10 object-cover shadow-[0_0_40px_rgba(34,211,238,0.22)] sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44"
                />
              </div>
            </motion.div>
          ) : null}

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
          //   className="min-h-[56px] text-3xl font-black leading-tight sm:min-h-[72px] sm:text-5xl md:min-h-[92px] md:text-6xl xl:text-7xl"
          // >
          className="min-h-[56px] text-3xl font-black leading-tight sm:min-h-[72px] sm:text-5xl md:min-h-[92px] md:text-6xl xl:text-6xl lg:whitespace-nowrap">
            <span ref={headingRef} className="whitespace-pre-wrap text-cyan-300" />
            <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-cyan-400 align-middle" />
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-3 min-h-[32px] text-base font-semibold text-white/80 sm:text-xl md:mt-3 md:min-h-[40px] md:text-3xl"
          >
            <span ref={titleRef} />
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-4 max-w-2xl text-justify text-sm leading-7 text-white/70 sm:text-base md:mt-5 md:text-lg md:leading-8"
          >
            {hero?.tagline ||
              "I build scalable web apps with Next.js, React, Node.js, Express.js, and MongoDB."}
          </motion.p>

          {/* <motion.div
            variants={socialContainer}
            initial="hidden"
            animate="show"
          //   className="mt-5 flex flex-wrap items-center gap-3 md:mt-8 sm:flex-nowrap sm:overflow-x-auto"
          // >
          className="mt-5 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-nowrap sm:items-center">
            <motion.a
              variants={socialItem}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
            //   className="btn-primary w-full text-center whitespace-nowrap sm:w-auto sm:shrink-0 shadow-[0_10px_30px_rgba(34,211,238,0.18)]"
            // >
            className="btn-primary w-full text-center whitespace-nowrap sm:w-auto sm:shrink-0 shadow-[0_10px_30px_rgba(34,211,238,0.18)]">
              View Projects
            </motion.a>

            {hero?.resumeUrl ? (
              <motion.a
                variants={socialItem}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={hero.resumeUrl}
                // className="btn-primary w-full text-center whitespace-nowrap sm:w-auto sm:shrink-0"
                className="btn-primary w-full text-center whitespace-nowrap sm:w-auto sm:shrink-0"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                Download Resume
              </motion.a>
            ) : null}
          </motion.div> */}

            <motion.div
  variants={socialContainer}
  initial="hidden"
  animate="show"
className="mt-5 flex flex-row flex-nowrap items-center gap-2 overflow-x-auto sm:mt-7 md:gap-4">
  <motion.a
    variants={socialItem}
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    href="#projects"
    className="btn-primary w-full text-center whitespace-nowrap sm:w-auto sm:shrink-0"
  >
    View Projects
  </motion.a>

  {hero?.resumeUrl ? (
    <motion.a
      variants={socialItem}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      href={hero.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary w-full text-center whitespace-nowrap sm:w-auto sm:shrink-0"
    >
      Resume
    </motion.a>
  ) : null}
</motion.div>
          {socialLinks.length > 0 ? (
            <motion.div
              variants={socialContainer}
              initial="hidden"
              animate="show"
              className="mt-5 flex flex-wrap items-center gap-2.5 md:mt-6 md:gap-4"
            >
              {[...socialLinks]
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
          ) : null}
        </div>

        <motion.div
          ref={cardRef}
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
                    <h4 className="mt-2 text-base font-bold leading-snug md:text-xl">
                      {item.value}
                    </h4>
                  </motion.div>
                ))
            ) : (
              <>
                <motion.div variants={cardItem} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4">
                  <p className="text-xs text-white/50 md:text-sm">Core Focus</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">MERN Stack</h4>
                </motion.div>

                <motion.div variants={cardItem} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4">
                  <p className="text-xs text-white/50 md:text-sm">Specialty</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">Admin Panels</h4>
                </motion.div>

                <motion.div variants={cardItem} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4">
                  <p className="text-xs text-white/50 md:text-sm">Backend</p>
                  <h4 className="mt-2 text-base font-bold md:text-xl">REST APIs</h4>
                </motion.div>

                <motion.div variants={cardItem} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-3 md:p-4">
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