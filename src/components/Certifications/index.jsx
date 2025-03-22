"use client"
import React, { useState, useRef } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import styles from './Certifications.module.css';

const certifications = [
  { id: 1, name: 'Artificial Intelligence Fundamentals', path: '/certifications/Artificial Intelligence Fundamentals.png' },
  { id: 2, name: 'Deepening the capabilities of Artificial Intelligence', path: '/certifications/Deepening the capabilities of Artificial Intelligence.png' },
  { id: 3, name: 'GoIT FullStack Developer', path: '/certifications/GoIT FullStack Developer.png' },
  { id: 4, name: 'HackFrost Winter Hackathon', path: '/certifications/HackFrost Winter Hackathon.png' },
  { id: 5, name: 'Hugging face', path: '/certifications/Hugging face.png' },
  { id: 6, name: 'Kharkiv IT Cluster Certificate', path: '/certifications/Kharkiv IT Cluster Certificate.png' },
  { id: 7, name: 'Mashine Learning Tech Taster', path: '/certifications/Mashine Learning Tech Taster.png' },
  { id: 8, name: 'Microsoft Azure AI Essentials Workloads and Machine Learning on Azure', path: '/certifications/Microsoft Azure AI Essentials Workloads and Machine Learning on Azure.png' },
  { id: 9, name: 'Notrhcoders Software Development', path: '/certifications/Notrhcoders Software Development.png' },
  { id: 10, name: 'Working with text-based Artificial Intelligence', path: '/certifications/Working with text-based Artificial Intelligence.png' },
];

const CertificationItem = ({ cert }) => {
  const [showPopup, setShowPopup] = useState(false);
  const anchorRef = useRef(null);
  
  const handleClick = () => {
    window.open(cert.path, '_blank');
  };
  
  return (
    <div 
      className={styles.certItem} 
      onClick={handleClick}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
      ref={anchorRef}
    >
      <div className={styles.certCard}>
        <img 
          src={cert.path} 
          alt={cert.name} 
          className={styles.certImage} 
          loading="lazy"
        />
        <div className={styles.certOverlay}>
          <div className={styles.certZoom}>
            <span>🔍</span>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <Popup
          anchor={anchorRef.current}
          show={showPopup}
          popupClass={styles.certPopup}
          animate={true}
        >
          <div className={styles.popupContent}>
            {cert.name}
          </div>
        </Popup>
      )}
    </div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className={styles.certificationsSection}>
      <div className={styles.certificationsContainer}>
        <h2 className={styles.certificationsTitle}>My Certifications</h2>
        <div className={styles.certificationsGrid}>
          {certifications.map(cert => (
            <CertificationItem key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;