import React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.summarySection}>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryContent}>
          <h2 className={styles.summaryTitle}>Summary</h2>
          <p className={styles.summaryText}>
            <span className={styles.highlightText}>Solving business challenges</span> through AI integrations and Full Stack development (JavaScript,
            React, Node.js). <span className={styles.flickerText}>Creating custom AI agents</span> and optimising OpenAI API interactions.
            <br /><br />
            Transforming complex technical concepts into accessible content with 20 years of editing and
            team management experience. <span className={styles.highlightText}>European journalism programme laureate</span>. 
            <br /><br />
            Helping companies successfully implement AI and deliver <span className={styles.flickerText}>exceptional user experience</span>.
          </p>
        </div>
      </div>
    </div>
  );
}