export const dynamic = "force-dynamic";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import { getPortfolioData } from "@/lib/getData";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Navbar socials={data.socials} />
      <Hero hero={data.hero} />
      <About about={data.about} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Education education={data.education} />
      <Contact settings={data.settings} socials={data.socials} />
      <Footer />
    </main>
  );
}