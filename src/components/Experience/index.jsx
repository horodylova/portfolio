import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionItem, 
  PanelBar, 
  PanelBarItem,
  Slide
} from '@progress/kendo-react-layout';
import { Fade } from '@progress/kendo-react-animation';
import { Chip } from '@progress/kendo-react-buttons';
import { StackLayout } from '@progress/kendo-react-layout';
import { Badge } from '@progress/kendo-react-indicators';
import styles from './Experience.module.css';

import experienceData from '../../../data/experience.json';

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null);

  const experience = experienceData.experience;

  const handleSelect = (id) => {
    setSelectedExp(selectedExp === id ? null : id);
  };

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.experienceContainer}>
        <h2 className={styles.experienceTitle}>Professional Journey</h2>
        
        <div className={styles.bookshelf}>
          {experience.map((exp) => (
            <div 
              key={exp.id} 
              className={`${styles.bookSpine} ${selectedExp === exp.id ? styles.bookSpineActive : ''}`}
              onClick={() => handleSelect(exp.id)}
            >
              <div className={styles.spineContent}>
                <span className={styles.spineTitle}>{exp.title}</span>
                <span className={styles.spineCompany}>{exp.company}</span>
              </div>
              
            
              <span className={styles.spinePeriod}>
                {exp.period}
              </span>
              
              <Fade in={selectedExp === exp.id}>
                {selectedExp === exp.id && (
                  <div className={styles.bookContent}>
                    <div className={styles.bookHeader}>
                      <h3>{exp.title}</h3>
                      <Badge themeColor="info" text={exp.period} />
                    </div>
                    <div className={styles.companyName}>{exp.company}</div>
                    
            
                    <div className={styles.responsibilities}>
                      {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className={styles.responsibilityItem}>
                          {resp}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Fade>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;