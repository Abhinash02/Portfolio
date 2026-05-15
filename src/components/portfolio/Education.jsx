// import SectionTitle from "../ui/SectionTitle";

// export default function Education({ education }) {
//   return (
//     <section id="education" className="section-space">
//       <div className="container-custom">
//         <SectionTitle title="Education" subtitle="Academic Background" />
//         <div className="grid gap-6 md:grid-cols-2">
//           {education?.map((item) => (
//             <div key={item._id} className="glass rounded-3xl p-6">
//               <h3 className="text-xl font-bold">{item.degree}</h3>
//               <p className="mt-2 text-cyan-400">{item.institute}</p>
//               <p className="mt-1 text-white/60">{item.score}</p>
//               <p className="mt-1 text-white/50">{item.duration}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import FadeUp from "./FadeUp";

export default function Education({ education = [] }) {
  return (
    <section id="education" className="section-space">
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Academic Background</p>
          <h2 className="mb-10 text-4xl font-black md:text-5xl">Education</h2>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, index) => (
            <FadeUp key={item._id || item.degree} delay={index * 0.08}>
              <div className="glass rounded-[2rem] p-6">
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