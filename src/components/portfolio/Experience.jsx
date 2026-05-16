// "use client";

// import { useEffect } from "react";
// import FadeUp from "./FadeUp";

// export default function Experience({ experience = [] }) {
//   useEffect(() => {
//     console.log("Experience props in browser:", experience);
//   }, [experience]);

//   return (
//     <section id="experience" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
//             Work Journey
//           </p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Experience</h2>
//         </FadeUp>

//         {experience.length === 0 ? (
//           <p className="text-white/60">No experience data found.</p>
//         ) : (
//           <div className="space-y-6">
//             {experience.map((item, index) => (
//               <FadeUp key={item._id || item.role} delay={index * 0.08}>
//                 <div className="glass rounded-[2rem] p-5 sm:p-6 md:p-8">
//                   <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
//                     <div className="w-full text-left">
//                       <h3 className="text-xl font-bold sm:text-2xl">{item.role}</h3>
//                       <p className="mt-1 text-cyan-400">{item.company}</p>
//                       <p className="mt-1 text-sm text-white/50">{item.location}</p>
//                     </div>

//                     <div className="w-full sm:ml-auto sm:w-auto sm:text-right">
//   <span className="inline-flex whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
//     {item.duration}
//   </span>
// </div>
//                   </div>

//                   <ul className="mt-5 space-y-3 text-sm text-white/70 sm:text-base">
//                     {item.points?.map((point, i) => (
//                       <li key={i} className="flex items-start gap-3">
//                         <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
//                         <span className="text-left leading-relaxed">{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </FadeUp>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FadeUp from "./FadeUp";

export default function Experience({ experience = [] }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    console.log("Experience props in browser:", experience);
  }, [experience]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, experience.length);

    const ctx = gsap.context(() => {
      if (cardRefs.current.length) {
        gsap.fromTo(
          cardRefs.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );

        gsap.to(cardRefs.current, {
          y: -6,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.15,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [experience.length]);

  return (
    <section id="experience" className="section-space" ref={sectionRef}>
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Work Journey
          </p>
          <h2 className="mb-10 text-4xl font-black md:text-5xl">Experience</h2>
        </FadeUp>

        {experience.length === 0 ? (
          <p className="text-white/60">No experience data found.</p>
        ) : (
          <div className="space-y-6">
            {experience.map((item, index) => (
              <FadeUp key={item._id || item.role} delay={index * 0.08}>
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="glass rounded-[2rem] p-5 sm:p-6 md:p-8"
                >
                  <div className="flex w-full flex-col justify-start gap-4 text-left sm:gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="w-full text-left">
                      <h3 className="text-xl font-bold sm:text-2xl">{item.role}</h3>
                      <p className="mt-1 text-cyan-400">{item.company}</p>
                      <p className="mt-1 text-sm text-white/50">{item.location}</p>
                    </div>

                   <div className="w-full text-left md:w-auto md:text-right">
                      <span className="inline-flex whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm text-white/70 sm:text-base">
                    {item.points?.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span className="text-left leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}