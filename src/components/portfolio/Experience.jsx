// import SectionTitle from "../ui/SectionTitle";

// export default function Experience({ experience }) {
//   return (
//     <section id="experience" className="section-space">
//       <div className="container-custom">
//         <SectionTitle title="Experience" subtitle="Work Journey" />
//         <div className="space-y-6">
//           {experience?.map((item) => (
//             <div key={item._id} className="glass rounded-3xl p-6">
//               <div className="flex flex-col justify-between gap-3 md:flex-row">
//                 <div>
//                   <h3 className="text-xl font-bold">{item.role}</h3>
//                   <p className="text-cyan-400">{item.company}</p>
//                   <p className="text-sm text-white/50">{item.location}</p>
//                 </div>
//                 <p className="text-sm text-white/60">{item.duration}</p>
//               </div>
//               <ul className="mt-4 list-disc space-y-2 pl-5 text-white/70">
//                 {item.points?.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import FadeUp from "./FadeUp";

// export default function Experience({ experience = [] }) {
//   return (
//     <section id="experience" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Work Journey</p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Experience</h2>
//         </FadeUp>

//         <div className="space-y-6">
//           {experience.map((item, index) => (
//             <FadeUp key={item._id || item.role} delay={index * 0.08}>
//               <div className="glass rounded-[2rem] p-6 md:p-8">
//                 <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold">{item.role}</h3>
//                     <p className="mt-1 text-cyan-400">{item.company}</p>
//                     <p className="mt-1 text-sm text-white/50">{item.location}</p>
//                   </div>
//                   <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
//                     {item.duration}
//                   </span>
//                 </div>

//                 <ul className="mt-5 space-y-3 text-white/70">
//                   {item.points?.map((point, i) => (
//                     <li key={i} className="flex gap-3">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
//                       <span>{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect } from "react";
import FadeUp from "./FadeUp";

export default function Experience({ experience = [] }) {
  useEffect(() => {
    console.log("Experience props in browser:", experience);
  }, [experience]);

  return (
    <section id="experience" className="section-space">
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Work Journey</p>
          <h2 className="mb-10 text-4xl font-black md:text-5xl">Experience</h2>
        </FadeUp>

        {experience.length === 0 ? (
          <p className="text-white/60">No experience data found.</p>
        ) : (
          <div className="space-y-6">
            {experience.map((item, index) => (
              <FadeUp key={item._id || item.role} delay={index * 0.08}>
                <div className="glass rounded-[2rem] p-6 md:p-8">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{item.role}</h3>
                      <p className="mt-1 text-cyan-400">{item.company}</p>
                      <p className="mt-1 text-sm text-white/50">{item.location}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                      {item.duration}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3 text-white/70">
                    {item.points?.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                        <span>{point}</span>
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