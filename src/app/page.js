"use client"

import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";

export default function Home() {
  return (
    <>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
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
