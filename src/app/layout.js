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

  // Функция для отслеживания прокрутки и определения активной секции
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Проверяем каждую секцию
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Обработчик для обновления состояния сайдбара
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header setActiveSection={setActiveSection} />
        <div className={`main-container ${sidebarCollapsed ? 'sidebar-hidden' : ''}`}>
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            onToggle={handleSidebarToggle}
          />
          <div className="vertical-scroll-line">
            <div className={`scroll-indicator ${activeSection}`}></div>
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
