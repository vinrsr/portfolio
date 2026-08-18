import '../app/styles/manifesto.css';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="hero-section">
      <nav className="hero-nav">
        <span className="hero-nav-name">Kevin Ramadhan</span>
        <div className="hero-nav-links">
          <a href="#summary">Summary</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Stack</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={childVariants} className="hero-eyebrow">
          Senior Software Engineer · 7 years · BUILDING AI-INTEGRATED SYSTEMS
        </motion.p>
        <motion.h1 variants={childVariants} className="hero-name">
          Kevin Ramadhan
        </motion.h1>
        <motion.p variants={childVariants} className="hero-bio">
          I build high-performance backend systems and, more recently, agentic AI applications, systems that reason, retrieve, and act, not just respond. Specialized in Go and TypeScript: microservices, event-driven pipelines, scalable databases, RAG, and multi-step agent workflows.
        </motion.p>

        <motion.div variants={childVariants} className="hero-cta">
          <a href="#projects" className="cta-primary">View Projects</a>
          <a
            href="/kevin-ramadhan-resume.pdf"
            download
            className="cta-secondary"
          >
            <Icon icon="mdi:download" />
            Resume
          </a>
          <a
            href="https://github.com/vinrsr"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            <Icon icon="mdi:github" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-ramadhan-359b24130/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            <Icon icon="mdi:linkedin" />
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
