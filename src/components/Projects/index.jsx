"use client"
import React from 'react';
import projectsData from '../../../data/projects.json';
import styles from './Projects.module.css';

const ProjectItem = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImageWrapper}>
        <img 
          src={project.image}
          alt={project.title}
          className={styles.projectImage}
        />
      </div>
      <div className={styles.projectContent}>
        <h3 
          className={styles.projectTitle} 
          onClick={() => window.open(project.link, '_blank')}
          title="Click to view project"
        >
          {project.title}
        </h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <span className={styles.projectBadge}>Web App</span>
      </div>
    </div>
  );
};

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const Projects = () => {
  const { projects } = projectsData;
   
  const projectsPerRow = 3;
  const projectRows = chunkArray(projects, projectsPerRow);
  
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.projectsContainer}>
        <h2 className={styles.projectsTitle}>My Projects</h2>
        <div className={styles.scrollView}>
          <div className={styles.projectRows}>
            {projectRows.map((rowProjects, rowIndex) => (
              <div key={rowIndex} className={styles.projectRow}>
                <div className={styles.listView}>
                  {rowProjects.map((project, index) => (
                    <ProjectItem key={index} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
