"use client"

import { useState } from "react";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
// import Hero from "@/components/Hero";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <div className="portfolio-container">
      {/* {activeSection === "hero" && <Hero />} */}
      {activeSection === "about" && <About />}
      {activeSection === "projects" && <Projects />}
      {activeSection === "skills" && <Skills />}
      {activeSection === "contact" && <Contact />}
    </div>
  );
}
