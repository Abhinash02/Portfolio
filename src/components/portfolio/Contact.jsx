"use client";

import FadeUp from "./FadeUp";
import ContactForm from "./ContactForm";

export default function Contact({ settings, socials = [] }) {
  const filteredSocials = (socials || []).filter((social) => {
    const platform = social?.platform?.toLowerCase();
    return platform !== "github" && platform !== "linkedin";
  });

  const quickLinks = [
    settings?.github
      ? {
          label: "GitHub",
          url: settings.github,
          icon: "GH",
        }
      : null,
    settings?.linkedin
      ? {
          label: "LinkedIn",
          url: settings.linkedin,
          icon: "IN",
        }
      : null,
    settings?.resumeUrl
      ? {
          label: "Resume",
          url: settings.resumeUrl,
          icon: "CV",
        }
      : null,
    ...filteredSocials.map((social) => ({
      label: social.platform || "Social",
      url: social.url,
      icon: social.platform?.slice(0, 2)?.toUpperCase() || "SO",
    })),
  ].filter(Boolean);

  return (
    <section id="contact" className="section-space">
      <div className="container-custom">
        <FadeUp>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Get In Touch
          </p>
          <h2 className="mb-10 text-4xl font-black md:text-5xl">Contact</h2>
        </FadeUp>

        <div className="grid gap-4 lg:grid-cols-2">
          <FadeUp delay={0.05}>
            <div className="glass rounded-[2rem] p-6 md:p-8">
              <h3 className="text-2xl font-bold">Let’s build something great</h3>
              <p className="mt-4 max-w-xl text-white/65">
                I’m open to internships, freelance work, and full-stack development opportunities.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Email</p>
                  <a
                    href={`mailto:${settings?.email || "abhinash.webdev@gmail.com"}`}
                    className="mt-2 block text-base font-medium text-white hover:text-cyan-300"
                  >
                    {settings?.email || "abhinash.webdev@gmail.com"}
                  </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Phone</p>
                  <a
                    href={`tel:${settings?.phone || "9814538354"}`}
                    className="mt-2 block text-base font-medium text-white hover:text-cyan-300"
                  >
                    {settings?.phone || "98145-38354"}
                  </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Location</p>
                  <p className="mt-2 text-base font-medium text-white">
                    {settings?.location || "Punjab, India"}
                  </p>
                </div>
              </div>

              {quickLinks.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
                    Quick Links
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                    {quickLinks.map((item, index) => (
                      <a
                        key={`${item.label}-${index}`}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-cyan-400/10 text-xs font-bold text-cyan-300">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeUp>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}