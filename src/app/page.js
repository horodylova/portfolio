"use client"

import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import GitHubRepositoriesAnalysis from "@/components/GitHubRepositoriesAnalysis";

export default function Home() {
  return (
    <>
     <section id="github-analytics">
        <GitHubRepositoriesAnalysis />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="certifications">
        <Certifications />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
