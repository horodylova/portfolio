"use client"

import { AppBar, AppBarSection } from "@progress/kendo-react-layout"
import { Button } from "@progress/kendo-react-buttons"
import { SvgIcon } from "@progress/kendo-react-common"
import { homeIcon, userIcon, folderIcon, envelopeIcon } from "@progress/kendo-svg-icons"
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
    { text: "About", icon: userIcon },
    { text: "Projects", icon: folderIcon },
    { text: "Skills", icon: homeIcon },
    { text: "Contact", icon: envelopeIcon }
  ]
  
  const handleMenuItemClick = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <AppBar className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <AppBarSection className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <span className={styles.logo}>
              <span className={styles.firstName}>Svitlana</span>
              <span className={styles.lastName}>Horodylova</span>
            </span>
          </div>
        </AppBarSection>
 
        <AppBarSection className={styles.desktopNav}>
          <Button 
            look="outline"
            rounded="full"
            className={styles.contactButton}
          >
            <SvgIcon icon={envelopeIcon} className={styles.contactIcon} />
            Get in Touch
          </Button>
          <div className={styles.themeToggle}>
            <input 
              type="checkbox" 
              className={styles.themeSwitch} 
              checked={darkMode}
              onChange={toggleTheme}
            />
          </div>
        </AppBarSection>

        <AppBarSection className={styles.mobileMenu}>
          <div className={styles.mobileMenuControls}>
            <input 
              type="checkbox" 
              className={styles.themeSwitchMobile} 
              checked={darkMode}
              onChange={toggleTheme}
            />
            <Button 
              className={styles.hamburger}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              look="flat"
            >
              <span></span>
              <span></span>
              <span></span>
            </Button>
          </div>
        </AppBarSection>
      </AppBar>

      {isDrawerOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerLogo}>Menu</span>
            <Button 
              className={styles.closeButton}
              onClick={() => setIsDrawerOpen(false)}
              look="flat"
            >
              ×
            </Button>
          </div>
          <div className={styles.drawerContent}>
            {menuItems.map((item, index) => (
              <Button 
                key={index} 
                look="flat" 
                className={styles.drawerItem}
                onClick={handleMenuItemClick}
              >
                <SvgIcon icon={item.icon} className={styles.drawerItemIcon} />
                {item.text}
              </Button>
            ))}
            <Button 
              look="primary" 
              className={styles.drawerContactButton}
              onClick={handleMenuItemClick}
            >
              <SvgIcon icon={envelopeIcon} className={styles.drawerContactIcon} />
              <span className={styles.drawerContactText}>Get in Touch</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}