"use client"
import { useState, useEffect } from "react"
import styles from './Header.module.css'

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }

  const menuItems = [
    { text: "Summary", icon: "user", sectionId: "summary" },
    { text: "GitHub Analytics", icon: "home", id: "github-analytics" },
    { text: "Experience", icon: "folder", sectionId: "experience" },
    { text: "Skills", icon: "home", sectionId: "skills" },
    { text: "Projects", icon: "file", sectionId: "projects" },
    { text: "Certifications", icon: "file", sectionId: "certifications" },
  ]
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsDrawerOpen(false)
  }

   const renderIcon = (iconName) => {
    switch(iconName) {
      case 'user':
        return <span className={styles.navIcon}>👤</span>
      case 'folder':
        return <span className={styles.navIcon}>📁</span>
      case 'home':
        return <span className={styles.navIcon}>🏠</span>
      case 'file':
        return <span className={styles.navIcon}>📄</span>
      case 'envelope':
        return <span className={styles.navIcon}>✉️</span>
      default:
        return null
    }
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <span className={styles.logo}>
              <span 
                className={styles.firstName}
                style={{
                  background: 'linear-gradient(90deg, var(--primary-color), var(--button-color))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Svitlana
              </span>
              <span className={styles.lastName}>Horodylova</span>
            </span>
          </div>
        </div>
 
        <nav className={styles.desktopNav}>
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className={styles.navButton}
              onClick={() => scrollToSection(item.sectionId)}
            >
              {item.text}
            </button>
          ))}
          <button 
            className={styles.contactButton}
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </button>
          <div className={styles.themeToggle}>
            <input 
              type="checkbox" 
              className={styles.themeSwitch} 
              checked={darkMode}
              onChange={toggleTheme}
            />
          </div>
        </nav>

        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuControls}>
            <input 
              type="checkbox" 
              className={styles.themeSwitchMobile} 
              checked={darkMode}
              onChange={toggleTheme}
            />
            <button 
              className={styles.hamburger}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {isDrawerOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.drawerHeader}>
            <button 
              className={styles.closeButton}
              onClick={() => setIsDrawerOpen(false)}
            >
              ×
            </button>
          </div>
          <div className={styles.drawerContent}>
            {menuItems.map((item, index) => (
              <button 
                key={index} 
                className={styles.drawerItem}
                onClick={() => scrollToSection(item.sectionId)}
              >
                {renderIcon(item.icon)}
                {item.text}
              </button>
            ))}
            <button 
              className={styles.drawerContactButton}
              onClick={() => scrollToSection('contact')}
            >
              {renderIcon('envelope')}
              <span className={styles.drawerContactText}>Get in Touch</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
