"use client"

import { useState } from "react"
import { Button } from "@progress/kendo-react-buttons"
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const menuItems = [
    { text: "About" },
    { text: "Projects" },
    { text: "Skills" },
    { text: "Contact" }
  ]

  const [activeItem, setActiveItem] = useState(0)

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <span>SH</span>
      </div>
      
      <nav className={styles.sidebarNav}>
        {menuItems.map((item, index) => (
          <Button 
            key={index} 
            look={activeItem === index ? "primary" : "flat"}
            className={styles.sidebarItem}
            onClick={() => setActiveItem(index)}
          >
            {item.text}
          </Button>
        ))}
      </nav>
      
      <div className={styles.sidebarFooter}>
        <Button 
          look="outline"
          rounded="full"
          className={styles.contactButton}
        >
          Get in Touch
        </Button>
      </div>
    </div>
  )
}