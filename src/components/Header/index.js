"use client"

import { AppBar, AppBarSection, Drawer, DrawerContent } from "@progress/kendo-react-layout"
import { Button } from "@progress/kendo-react-buttons"
import { Ripple } from "@progress/kendo-react-ripple"
import { useState, useEffect } from "react"
import styles from './Header.module.css'

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { text: "About" },
    { text: "Projects" },
    { text: "Skills" },
    { text: "Contact" }
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
          {menuItems.map((item, index) => (
            <Button 
              key={index} 
              look="flat" 
              className={styles.navButton}
            >
              {item.text}
            </Button>
          ))}
          <Button 
            look="outline"
            rounded="full"
            className={styles.contactButton}
          >
            Get in Touch
          </Button>
        </AppBarSection>

        <AppBarSection className={styles.mobileMenu}>
          <Button 
            className={styles.hamburger}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            look="flat"
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
        </AppBarSection>
      </AppBar>

      {/* Мобильное меню */}
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
                {item.text}
              </Button>
            ))}
            <Button 
              look="primary" 
              className={styles.drawerContactButton}
              onClick={handleMenuItemClick}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </>
  )
}