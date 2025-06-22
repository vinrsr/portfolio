// components/ManifestoSection.tsx

import '../app/styles/manifesto.css';
import { motion } from 'framer-motion';
import Sculpture from './ManifestoVisual';

export default function ManifestoSection() {
  // Animation variants (these remain the same)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="manifesto" className="manifesto-split-section">
      
      <div className="manifesto-visual-content">
        <Sculpture />
      </div>

      <motion.div 
        className="manifesto-text-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={childVariants} className="manifesto-title">
          What I Build
        </motion.h2>
        
        <motion.p variants={childVariants} className="manifesto-text">
          I specialize in creating high-end,{' '}
          <span className="highlight-text">interactive web experiences</span> that go beyond static pages. I build memorable digital destinations that capture attention and distinguish brands in a crowded marketplace.
        </motion.p>
        
        <motion.p variants={childVariants} className="manifesto-text">
          My work is a unique synthesis of two disciplines: the rigorous engineering of a{' '}
          <span className="highlight-text">full-stack web developer</span> and the cinematic artistry of a 3D visual designer. I build experiences on a foundation of clean, production-grade code while leveraging game engine principles to create dynamic, visually rich worlds.
        </motion.p>

        <motion.p variants={childVariants} className="manifesto-text">
          The result is a product that is both{' '}
          <span className="highlight-text">technically robust and artistically compelling</span>, ensuring your vision is realized without compromise.
        </motion.p>

        {/* --- END OF NEW TEXT CONTENT --- */}

      </motion.div>

    </section>
  );
}