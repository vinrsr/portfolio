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
    title: 'Folia',
    description:
      'An interactive 3D product showcase for a fictional beverage brand. Built with React Three Fiber, Rapier physics, and Next.js.',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber'],
    liveUrl: 'https://folia.vinrsr.com',
    imageSrc: '/folia.png',
    imageAlt: 'Folia Landing Page',
  },
  {
    title: 'WatchYourAPI',
    description:
      'SaaS platform for API runtime monitoring. Users register their endpoints and get email notifications the moment any API returns a non-2xx response.',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Redis', 'Drizzle', 'Turborepo'],
    liveUrl: 'https://watchyourapi.vinrsr.com',
    imageSrc: '/watchyourapi-landing-page.png',
    imageAlt: 'WatchYourAPI Landing Page',
  },
  {
    title: 'ShortKing',
    description:
      'A URL shortener with a Go backend and Next.js frontend, backed by PostgreSQL for persistence and Redis for fast lookups.',
    tags: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    liveUrl: 'https://shortking.vinrsr.com',
    imageSrc: '/shortking-landing-page.png',
    imageAlt: 'Short King Landing Page',
  },
  {
    title: 'CekHarga',
    description:
      'An agentic AI tool that verifies whether a price is fair using live web search and retrieval-augmented generation (RAG). Built solo with Go, Claude API, and Postgres/pgvector.',
    tags: ['Go', 'Claude API', 'PostgreSQL', 'pgvector', 'RAG'],
    repoUrl: 'https://github.com/vinrsr/cek-harga',
    imageSrc: '/cekharga-ss.png',
    imageAlt: 'CekHarga Screenshot',
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
          {projects.map((project, index) => {
            const overlayUrl = project.liveUrl ?? project.repoUrl;

            return (
              <motion.div
                variants={childVariants}
                className="project-card"
                key={project.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="project-card-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-image-wrapper">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {overlayUrl && (
                    <a
                      href={overlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-image-overlay"
                      aria-label={`Open ${project.title} ${project.liveUrl ? 'live site' : 'repository'}`}
                    >
                      <span className="project-image-overlay-cta">
                        <Icon icon={project.liveUrl ? 'mdi:arrow-top-right' : 'mdi:github'} />
                        {project.liveUrl ? 'View Live' : 'View Repo'}
                      </span>
                    </a>
                  )}
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">
                    {project.title}
                    <Icon icon="mdi:arrow-right" className="project-card-title-arrow" />
                  </h3>
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
                        className={`project-link-btn ${project.liveUrl ? 'project-link-secondary' : 'project-link-primary'}`}
                      >
                        <Icon icon="mdi:github" />
                        Repo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
