"use client"

import { AppBar, AppBarSection } from "@progress/kendo-react-layout"
import { Button } from "@progress/kendo-react-buttons"
import { SvgIcon } from "@progress/kendo-react-common"
import { menuIcon, homeIcon, userIcon, folderIcon, envelopeIcon } from "@progress/kendo-svg-icons"
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
          {menuItems.map((item, index) => (
            <Button 
              key={index} 
              look="flat" 
              className={styles.navButton}
            >
                <SvgIcon icon={item.icon} className={styles.navIcon} />
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