import '../app/styles/connect.css';
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

export default function ConnectSection() {
  return (
    <section id="contact" className="connect-section">
      <motion.div
        className="connect-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="connect-header">
          <motion.h2 variants={childVariants} className="connect-title">
            Get in touch
          </motion.h2>
          <motion.p variants={childVariants} className="connect-intro">
            Open to fullstack roles, freelance work, or just a good conversation about what you&apos;re building.
          </motion.p>

          <motion.div variants={childVariants} className="social-links">
            <a
              href="mailto:kevinramadhan244@gmail.com"
              className="social-link"
            >
              <Icon icon="mdi:email-outline" />
              kevinramadhan244@gmail.com
            </a>
            <a
              href="https://github.com/vinrsr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Icon icon="mdi:github" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kevin-ramadhan-359b24130/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Icon icon="mdi:linkedin" />
              LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div variants={childVariants} className="connect-divider" />

        <motion.form
          action="https://formspree.io/f/mldnwvln"
          method="POST"
          className="contact-form"
          variants={childVariants}
        >
          <div className="form-group">
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <textarea name="message" placeholder="Message" rows={6} required></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </motion.form>
      </motion.div>
    </section>
  );
}
