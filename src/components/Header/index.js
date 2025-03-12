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
    { text: "About", icon: "user" },
    { text: "Projects", icon: "folder" },
    { text: "Skills", icon: "gear" },
    { text: "Contact", icon: "envelope" }
  ]
  
  const handleMenuItemClick = () => {
    setIsDrawerOpen(false)
  }

  return (
    <Ripple>
      <AppBar className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <AppBarSection className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <span className={styles.logo}>Svitlana Horodylova</span>
          </div>
        </AppBarSection>

        <AppBarSection className={styles.desktopNav}>
          {menuItems.map((item, index) => (
            <Button 
              key={index} 
              look="flat" 
              className={styles.navButton}
              icon={item.icon}
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
            icon="menu"
            look="flat"
            className={styles.burgerButton}
            onClick={() => setIsDrawerOpen(true)}
          />
        </AppBarSection>
      </AppBar>

      <Drawer
        position="start"
        mode="overlay"
        expanded={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className={styles.drawer}
      >
        <DrawerContent>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerLogo}>Svitlana Horodylova</span>
            <Button 
              icon="close" 
              look="flat"
              onClick={() => setIsDrawerOpen(false)}
              className={styles.closeButton}
            />
          </div>
          <div className={styles.drawerContent}>
            {menuItems.map((item, index) => (
              <Button 
                key={index} 
                look="flat" 
                className={styles.drawerItem}
                icon={item.icon}
                onClick={handleMenuItemClick}
              >
                {item.text}
              </Button>
            ))}
            <Button 
              look="outline" 
              rounded="full" 
              className={styles.drawerContactButton}
              onClick={handleMenuItemClick}
            >
              Get in Touch
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </Ripple>
  )
}