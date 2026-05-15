
// "use client";

// import FadeUp from "./FadeUp";

// export default function Skills({ skills = [] }) {
//   return (
//     <section id="skills" className="section-space">
//       <div className="container-custom">
//         <FadeUp>
//           <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Tech Stack</p>
//           <h2 className="mb-10 text-4xl font-black md:text-5xl">Skills</h2>
//         </FadeUp>

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {skills.map((skill, index) => (
//             <FadeUp key={skill._id || skill.name} delay={index * 0.04}>
//               <div className="glass rounded-3xl p-5 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">
//                 <h3 className="text-lg font-bold">{skill.name}</h3>
//                 <p className="mt-2 text-sm text-cyan-400">{skill.category}</p>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import FadeUp from "./FadeUp";

export default function Skills({ skills = [] }) {
  const doubledSkills = [...skills, ...skills];

  return (
    <section id="skills" className="section-space">
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Tech Stack</p>
          <h2 className="mb-8 text-4xl font-black md:text-5xl">Skills</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="marquee">
            <div className="marquee-track gap-4">
              {doubledSkills.map((skill, index) => (
                <div
                  key={`${skill._id || skill.name}-${index}`}
                  className="glass min-w-[150px] rounded-2xl px-4 py-4 text-center sm:min-w-[170px] md:min-w-[190px]"
                >
                  <h3 className="text-sm font-bold sm:text-base">{skill.name}</h3>
                  <p className="mt-2 text-xs text-cyan-400 sm:text-sm">{skill.category}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
          {skills.slice(0, 6).map((skill, index) => (
            <FadeUp key={skill._id || skill.name} delay={index * 0.05}>
              <div className="glass rounded-2xl p-4 text-center">
                <h3 className="text-sm font-bold sm:text-base">{skill.name}</h3>
                <p className="mt-1 text-xs text-cyan-400">{skill.category}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}