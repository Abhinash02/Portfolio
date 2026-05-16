

// "use client";

// import FadeUp from "./FadeUp";

// export default function Education({ education = [] }) {
//   return (
//     <section id="education" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Academic Background</p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Education</h2>
//         </FadeUp>

//         <div className="grid gap-6 md:grid-cols-2">
//           {education.map((item, index) => (
//             <FadeUp key={item._id || item.degree} delay={index * 0.08}>
//               <div className="glass rounded-[2rem] p-6">
//                 <h3 className="text-2xl font-bold">{item.degree}</h3>
//                 <p className="mt-2 text-cyan-400">{item.institute}</p>
//                 <p className="mt-2 text-white/65">{item.score}</p>
//                 <p className="mt-1 text-white/50">{item.duration}</p>
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
import { gsap } from "gsap";
import FadeUp from "./FadeUp";

export default function Education({ education = [] }) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, education.length);

    const ctx = gsap.context(() => {
      if (cardRefs.current.length) {
        gsap.fromTo(
          cardRefs.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.96,
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
          y: -8,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          stagger: 0.18,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [education.length]);

  return (
    <section id="education" className="section-space" ref={sectionRef}>
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Academic Background
          </p>
          <h2 className="mb-10 text-4xl font-black md:text-5xl">Education</h2>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <FadeUp key={item._id || item.degree} delay={index * 0.08}>
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="glass rounded-[2rem] p-6"
              >
                <h3 className="text-2xl font-bold">{item.degree}</h3>
                <p className="mt-2 text-cyan-400">{item.institute}</p>
                <p className="mt-2 text-white/65">{item.score}</p>
                <p className="mt-1 text-white/50">{item.duration}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}