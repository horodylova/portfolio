"use client"

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Hero from '@/components/Hero'
import About from '@/components/About'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const getIndicatorPosition = (section) => {
    switch(section) {
      case 'hero': return '10%';
      case 'summary': return '30%';
      case 'projects': return '50%';
      case 'skills': return '70%';
      case 'contact': return '90%';
      default: return '10%';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = document.querySelectorAll('section[id]');
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/portfolio-favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <Header setActiveSection={setActiveSection} />
        <div className={`main-container ${sidebarCollapsed ? 'sidebar-hidden' : ''}`}>
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            onToggle={handleSidebarToggle}
          />
          <div className="vertical-scroll-line">
            <div 
              className="scroll-indicator" 
              style={{ top: getIndicatorPosition(activeSection) }}
            ></div>
          </div>
          <main className="content">
            <section id="hero">
              <Hero />
            </section>
            <section id="summary">
              <About />
            </section>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
