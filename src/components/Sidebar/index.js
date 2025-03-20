"use client"

import { useState, useEffect } from "react"
import { SvgIcon } from "@progress/kendo-react-common"
import { Button } from "@progress/kendo-react-buttons"
import { homeIcon, userIcon, folderIcon, envelopeIcon, arrowLeftIcon, arrowRightIcon } from "@progress/kendo-svg-icons"
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('About')
  
  const menuItems = [
    { text: "About", icon: userIcon },
    { text: "Projects", icon: folderIcon },
    { text: "Skills", icon: homeIcon },
    { text: "Contact", icon: envelopeIcon }
  ]
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  
  const handleNavItemClick = (item) => {
    setActiveItem(item)
  }
  
  return (
    <>
      <div className={`${styles.sidebar} ${collapsed ? styles.sidebarHidden : ''}`}>
        {/* Удаляем блок с именем */}
        <div className={styles.sidebarContent}>
          <ul className={styles.sidebarNav}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.sidebarNavItem}>
                <a 
                  href={`#${item.text.toLowerCase()}`}
                  className={`${styles.sidebarNavLink} ${activeItem === item.text ? styles.active : ''}`}
                  onClick={() => handleNavItemClick(item.text)}
                >
                  <SvgIcon icon={item.icon} className={styles.sidebarNavIcon} />
                  <span className={styles.sidebarNavText}>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.sidebarFooter}>
          <Button 
            className={styles.sidebarContactButton}
            onClick={() => handleNavItemClick('Contact')}
          >
            <SvgIcon icon={envelopeIcon} className={styles.sidebarContactIcon} />
            Get in Touch
          </Button>
        </div>
      </div>
      
      <button 
        className={`${styles.sidebarToggle} ${collapsed ? styles.collapsed : ''}`}
        onClick={toggleSidebar}
      >
        <SvgIcon 
          icon={collapsed ? arrowRightIcon : arrowLeftIcon} 
          className={styles.sidebarToggleIcon} 
        />
      </button>
    </>
  )
}