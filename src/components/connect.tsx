// components/contact/ConnectSection.tsx

import '../app/styles/connect.css'; // Make sure the path to your CSS is correct
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react'; // <-- 1. Import the Icon component

export default function ConnectSection() {
  // --- 2. Add the same animation variants from your Manifesto ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // A slightly faster stagger for a snappy feel
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
    <section id="contact" className="connect-section">
      {/* 3. Wrap your content in a motion.div to enable animations */}
      <motion.div 
        className="connect-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={childVariants} className="connect-title">
          Let's Connect
        </motion.h2>
        
        <motion.p variants={childVariants} className="connect-intro">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
        </motion.p>
        
        {/* --- 4. Replace text links with SVG Icons --- */}
        <motion.div variants={childVariants} className="social-links">
          <a href="https://www.instagram.com/vinrsr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <Icon icon="mdi:instagram" />
          </a>
          <a href="https://www.youtube.com/@vinrsr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
            <Icon icon="mdi:youtube" />
          </a>
          <a href="https://www.x.com/vinrsr_" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X/Twitter">
            <Icon icon="pajamas:twitter" />
          </a>
          <a href="https://www.tiktok.com/@vinrsr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
            <Icon icon="ic:baseline-tiktok" />
          </a>
        </motion.div>
        
        <motion.div variants={childVariants} className="contact-divider"></motion.div>
        
        {/* --- 5. Replace the email link with a functional contact form --- */}
        <motion.form 
          action="https://formspree.io/f/mldnwvln" // <-- IMPORTANT: Replace with your Formspree URL
          method="POST" 
          className="contact-form"
          variants={childVariants}
        >
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </motion.form>

      </motion.div>
    </section>
  );
}