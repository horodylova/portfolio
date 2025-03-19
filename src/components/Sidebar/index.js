"use client"

import { useState, useEffect } from "react"
import { Button } from "@progress/kendo-react-buttons"
import { SvgIcon } from "@progress/kendo-react-common"
import { homeIcon, userIcon, folderIcon, envelopeIcon } from "@progress/kendo-svg-icons"
import { Ripple } from "@progress/kendo-react-ripple"
import { Tooltip } from "@progress/kendo-react-tooltip"
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const menuItems = [
    { text: "About", icon: userIcon },
    { text: "Projects", icon: folderIcon },
    { text: "Skills", icon: homeIcon },
    { text: "Contact", icon: envelopeIcon }
  ]

  const socialLinks = [
    {  url: "https://github.com" },
    {  url: "https://linkedin.com" }
  ]

  const [activeItem, setActiveItem] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
    }
  }, [])

  return (
    <Ripple>
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>SH</span>
        </div>
        
        <nav className={styles.sidebarNav}>
          {menuItems.map((item, index) => (
            <Tooltip key={index} title={item.text} position="right">
              <Button 
                look={activeItem === index ? "primary" : "flat"}
                className={`${styles.sidebarItem} ${activeItem === index ? styles.active : ''}`}
                onClick={() => setActiveItem(index)}
              >
                <SvgIcon icon={item.icon} className={styles.itemIcon} />
                <span className={styles.itemText}>{item.text}</span>
              </Button>
            </Tooltip>
          ))}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <Tooltip key={index} title="Visit Profile" position="right">
                <Button 
                  look="flat"
                  className={styles.socialButton}
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <SvgIcon icon={link.icon} className={styles.socialIcon} />
                </Button>
              </Tooltip>
            ))}
          </div>
          <Button 
            look="outline"
            rounded="full"
            className={styles.contactButton}
          >
            <SvgIcon icon={envelopeIcon} className={styles.contactIcon} />
            <span>Get in Touch</span>
          </Button>
        </div>
      </div>
    </Ripple>
  )
}