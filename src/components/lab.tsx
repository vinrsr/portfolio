"use client";
import '../app/styles/lab.css';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageSrc: string;
  imageAlt: string;
};

const projects: Project[] = [
  {
    title: 'WatchYourAPI',
    description:
      'SaaS platform for API runtime monitoring. Users register their endpoints and get email notifications the moment any API returns a non-2xx response.',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Redis', 'Drizzle', 'Turborepo'],
    liveUrl: 'https://watchyourapi-web.vercel.app/',
    imageSrc: '/watchyourapi-landing-page.png',
    imageAlt: 'WatchYourAPI Landing Page',
  },
  {
    title: 'Folia',
    description:
      'An interactive 3D product showcase for a fictional beverage brand. Built with React Three Fiber, Rapier physics, and Next.js.',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber'],
    liveUrl: 'https://folia.vinrsr.com/',
    imageSrc: '/folia.png',
    imageAlt: 'Folia Landing Page',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LabSection() {
  return (
    <section id="projects" className="projects-section">
      <motion.div
        className="projects-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="projects-header">
          <motion.h2 variants={childVariants} className="projects-title">
            Projects
          </motion.h2>
          <motion.p variants={childVariants} className="projects-intro">
            Things I&apos;ve built: side projects and production work.
          </motion.p>
        </div>

        <motion.div variants={containerVariants} className="projects-grid">
          {projects.map((project) => (
            <motion.div variants={childVariants} className="project-card" key={project.title}>
              <div className="project-image-wrapper">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn project-link-primary"
                    >
                      <Icon icon="mdi:open-in-new" />
                      Live Site
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn project-link-secondary"
                    >
                      <Icon icon="mdi:github" />
                      Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
