"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '@progress/kendo-react-layout';
import styles from './Skills.module.css';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    color: 'var(--primary-color)',
    skills: [
      { name: 'React', logo: '/reactjs.webp' },
      { name: 'JavaScript', logo: '/js.webp' },
      { name: 'Next.js', logo: '/nextjs.webp' },
      { name: 'Figma', logo: '/figma.webp' },
      { name: 'Vercel', logo: '/vercel.webp' },
      { name: 'Vite', logo: '/vite.png' },
      { name: 'CSS', logo: '/css.jpeg' },
      { name: 'Webpack', logo: '/webpack.png' },
      { name: 'Babel', logo: '/babel.png' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    color: 'var(--button-color)',
    skills: [
      { name: 'Express.js', logo: '/expressjs.webp' },
      { name: 'Firebase', logo: '/firebase.webp' },
      { name: 'Supabase', logo: '/supabase.webp' },
      { name: 'Node.js', logo: '/node.png' },
      { name: 'Linux', logo: '/linux.jpeg' },
      { name: 'Docker', logo: '/docker.jpeg' },
      {name: "Kestra", logo: "/kestra.png"},
      { name: 'Jest', logo: '/jest.png' }
    ]
  },
  {
    id: 'database',
    title: 'Databases',
    color: '#6b4fbb',
    skills: [
      { name: 'MongoDB', logo: '/mongodb.webp' },
      { name: 'PostgreSQL', logo: '/postgresql.webp' },
    ]
  },
  {
    id: 'ai',
    title: 'AI & ML',
    color: '#2a9d8f',
    skills: [
      { name: 'OpenAI', logo: '/openAI.jpg' },
      { name: 'Hugging Face', logo: '/hugging_face.jpeg' },
      { name: 'Azure AI', logo: '/azure-ai-studio-logo.png' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    color: '#e05d44',
    skills: [
      { name: 'Git', logo: '/git.webp' },
      { name: 'Postman', logo: '/postman.webp' },
      { name: 'Canva', logo: '/canva.webp' },
    ]
  }
];

const SkillItem = ({ skill, color }) => {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillLogo} style={{ borderColor: color }}>
        <img 
          src={skill.logo} 
          alt={`${skill.name} logo`} 
          className={styles.logoImage}
        />
      </div>
      <span className={styles.skillName}>{skill.name}</span>
    </div>
  );
};

const SkillCategory = ({ category }) => {
  return (
    <Card className={styles.categoryCard}>
      <CardHeader className={styles.categoryHeader} style={{ backgroundColor: category.color }}>
        <CardTitle className={styles.categoryTitle}>{category.title}</CardTitle>
        <div className={styles.customChip}>
          <span>{category.skills.length}</span>
        </div>
      </CardHeader>
      <CardBody className={styles.categoryBody}>
        <div className={styles.skillsGrid}>
          {category.skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} color={category.color} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

const Skills = () => {
  return (
    <section className={styles.skillsSection}>
      <div className={styles.skillsContainer}>
        <h2 className={styles.skillsTitle}>My Skills</h2>
        <div className={styles.categoriesGrid}>
          {skillCategories.map((category) => (
            <SkillCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;