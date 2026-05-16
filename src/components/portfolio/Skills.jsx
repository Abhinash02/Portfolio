

// "use client";

// import FadeUp from "./FadeUp";

// export default function Skills({ skills = [] }) {
//   const doubledSkills = [...skills, ...skills];

//   return (
//     <section id="skills" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Tech Stack</p>
//           <h2 className="mb-8 text-4xl font-black md:text-5xl">Skills</h2>
//         </FadeUp>

//         <FadeUp delay={0.1}>
//           <div className="marquee">
//             <div className="marquee-track gap-4">
//               {doubledSkills.map((skill, index) => (
//                 <div
//                   key={`${skill._id || skill.name}-${index}`}
//                   className="glass min-w-[150px] rounded-2xl px-4 py-4 text-center sm:min-w-[170px] md:min-w-[190px]"
//                 >
//                   <h3 className="text-sm font-bold sm:text-base">{skill.name}</h3>
//                   <p className="mt-2 text-xs text-cyan-400 sm:text-sm">{skill.category}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </FadeUp>

//         <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
//           {skills.slice(0, 6).map((skill, index) => (
//             <FadeUp key={skill._id || skill.name} delay={index * 0.05}>
//               <div className="glass rounded-2xl p-4 text-center">
//                 <h3 className="text-sm font-bold sm:text-base">{skill.name}</h3>
//                 <p className="mt-1 text-xs text-cyan-400">{skill.category}</p>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import FadeUp from "./FadeUp";

export default function Skills({ skills = [] }) {
  const doubledSkills = [...skills, ...skills];
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !marqueeRef.current || !skills.length) return;

    const track = trackRef.current;

    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -totalWidth,
        duration: 22,
        ease: "none",
        repeat: -1,
      }
    );

    const handleMouseEnter = () => tween.pause();
    const handleMouseLeave = () => tween.play();

    marqueeRef.current.addEventListener("mouseenter", handleMouseEnter);
    marqueeRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      marqueeRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      marqueeRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      tween.kill();
    };
  }, [skills.length]);

  return (
    <section id="skills" className="section-space overflow-hidden">
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Tech Stack
          </p>
          <h2 className="mb-8 text-4xl font-black md:text-5xl">Skills</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div
            ref={marqueeRef}
            className="relative overflow-hidden"
          >
            <div
              ref={trackRef}
              className="flex w-max gap-4"
            >
              {doubledSkills.map((skill, index) => (
                <motion.div
                  key={`${skill._id || skill.name}-${index}`}
                  whileHover={{ y: -8, scale: 1.04 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="glass min-w-[150px] rounded-2xl px-4 py-4 text-center sm:min-w-[170px] md:min-w-[190px]"
                >
                  <h3 className="text-sm font-bold sm:text-base">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-xs text-cyan-400 sm:text-sm">
                    {skill.category}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
          </div>
        </FadeUp>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
          {skills.slice(0, 6).map((skill, index) => (
            <FadeUp key={skill._id || skill.name} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-2xl p-4 text-center"
              >
                <h3 className="text-sm font-bold sm:text-base">{skill.name}</h3>
                <p className="mt-1 text-xs text-cyan-400">{skill.category}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}