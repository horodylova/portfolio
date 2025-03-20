"use client"
import { useEffect } from 'react'

import styles from './Hero.module.css'

export default function Hero() {
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
      }, []);
    
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroRow}>
        <div className={styles.heroTitleWrapper}>
          <div className={styles.heroTitle}>
            <span className={styles.heroOff}>AI</span>
            <span className={styles.heroFlicker2}> Solutions</span>
            <span className={styles.heroFlicker3}> Developer</span>
          </div>
        </div>
        
        <div className={styles.heroSubtitleWrapper}>
          <div className={styles.heroSubtitle}>
            <span className={styles.heroFlicker4}>Content </span>
            <span className={styles.heroOff}>Strategist</span>
            <span> Full </span>
            <span className={styles.heroFlicker1}>Stack </span>
            <span className={styles.heroFlicker3}>Engineer</span>
          </div>
        </div>
        
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles[`heroFog${i}`]} />
        ))}
      </div>
    </div>
  )
}