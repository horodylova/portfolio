"use client"
import React from 'react';
import { ListView } from "@progress/kendo-react-listview";
import { ScrollView } from "@progress/kendo-react-scrollview";
import { Card } from "@progress/kendo-react-layout";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Badge } from "@progress/kendo-react-indicators";
import projectsData from '../../../data/projects.json';
import styles from './Projects.module.css';

const ProjectItem = ({ dataItem }) => {
  return (
    <Card className={styles.projectCard}>
      <div className={styles.projectImageWrapper}>
        <img 
          src={dataItem.image}
          alt={dataItem.title}
          className={styles.projectImage}
        />
      </div>
      <div className={styles.projectContent}>
        <Tooltip anchorElement="target" position="top" content="Click to view project">
          <h3 className={styles.projectTitle} onClick={() => window.open(dataItem.link, '_blank')}>
            {dataItem.title}
          </h3>
        </Tooltip>
        <p className={styles.projectDescription}>{dataItem.description}</p>
        <Badge themeColor="info" className={styles.projectBadge}>Web App</Badge>
      </div>
    </Card>
  );
};

// Функция для разбиения массива на подмассивы определенного размера
const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const Projects = () => {
  const { projects } = projectsData;
  
  // Разбиваем проекты на ряды по 3 проекта в каждом (или другое число)
  const projectsPerRow = 3;
  const projectRows = chunkArray(projects, projectsPerRow);
  
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.projectsContainer}>
        <h2 className={styles.projectsTitle}>My Projects</h2>
        <ScrollView className={styles.scrollView}>
          <div className={styles.projectRows}>
            {projectRows.map((rowProjects, rowIndex) => (
              <div key={rowIndex} className={styles.projectRow}>
                <ListView
                  data={rowProjects}
                  item={ProjectItem}
                  className={styles.listView}
                />
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
};

export default Projects;