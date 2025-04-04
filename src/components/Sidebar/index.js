"use client"

import { useState } from "react"
import { SvgIcon } from "@progress/kendo-react-common"
import { Button } from "@progress/kendo-react-buttons"
import { userIcon, folderIcon, homeIcon, envelopeIcon, arrowLeftIcon, arrowRightIcon, fileIcon } from "@progress/kendo-svg-icons"
import styles from './Sidebar.module.css'

export default function Sidebar({ onToggle }) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('Summary')
  
  const menuItems = [
    { text: "Summary", icon: userIcon, id: "summary" },
    { text: "Experience", icon: folderIcon, id: "experience" },
    { text: "Projects", icon: fileIcon, id: "projects" },
    { text: "Skills", icon: homeIcon, id: "skills" },
    { text: "Сertifications", icon: fileIcon, id: "certifications" },
  ]
  
  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  }
  
  const handleNavItemClick = (item, id) => {
    setActiveItem(item)
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className={styles.sidebarWrapper}>
      <div className={`${styles.sidebar} ${collapsed ? styles.sidebarHidden : ''}`}>
         <div className={styles.sidebarContent}>
          <ul className={styles.sidebarNav}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.sidebarNavItem}>
                <a 
                  href={`#${item.id}`}
                  className={`${styles.sidebarNavLink} ${activeItem === item.text ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavItemClick(item.text, item.id);
                  }}
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
            onClick={() => handleNavItemClick('Contact', 'contact')}
          >
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
    </div>
  )
}
