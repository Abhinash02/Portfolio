import FadeUp from "./FadeUp";

export default function About({ about }) {
  return (
    <section id="about" className="section-space relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_26%)]" />

      <div className="container-custom">
        <FadeUp>
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
              Who I Am
            </p>

            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              About <span className="text-cyan-400">Me</span>
            </h2>

            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-8 grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-start">
            <div className="glass group relative overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.35)] transition duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_24px_70px_rgba(34,211,238,0.10)] md:p-8 lg:col-span-8 xl:p-10">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-transparent to-blue-500/8 opacity-80" />
              <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/15" />

              <div className="relative">
                <p className="max-w-3xl text-justify text-base leading-8 text-white/75 md:text-[17px] md:leading-8 lg:text-lg lg:leading-9">
                  {about?.content ||
                    "MERN Stack Developer with a focus on scalable web applications, authentication systems, dashboards, and responsive interfaces."}
                </p>

                <div className="mt-8">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition duration-300 hover:bg-white/8 md:p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
                      Focus + Core + Goal
                    </p>
                    <h3 className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white sm:text-base md:text-lg md:leading-7 lg:text-xl">
                      Full Stack, MERN + Next.js, Clean Scalable UI
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:sticky lg:top-24">
              <div className="glass rounded-[1.75rem] border border-white/10 p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/6 md:p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Experience</p>
                <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">MERN Stack</h3>
                <p className="mt-2 text-justify text-sm leading-7 text-white/60">
                  Building responsive dashboards, auth flows, APIs, and production-ready features.
                </p>
              </div>

              <div className="glass rounded-[1.75rem] border border-white/10 p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/6 md:p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Approach</p>
                <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">Modern</h3>
                <p className="mt-2 text-justify text-sm leading-7 text-white/60">
                  Focused on performance, maintainable code, and polished user experience.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}