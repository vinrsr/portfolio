"use client";
import '../app/styles/skills.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Category = {
  label: string;
  items: string[];
};

const categories: Category[] = [
  {
    label: 'Languages',
    items: ['Go', 'TypeScript', 'JavaScript', 'Node.js'],
  },
  {
    label: 'Frameworks',
    items: ['Gin', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'Architecture',
    items: ['Microservices', 'Distributed Systems', 'Event-Driven', 'Micro-Frontends'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ETCD', 'Amazon S3', 'MinIO'],
  },
  {
    label: 'Message Brokers',
    items: ['Apache Kafka', 'RabbitMQ'],
  },
  {
    label: 'API & Security',
    items: ['gRPC', 'REST', 'WebSockets', 'JWT', 'RBAC', 'HMAC', 'RSA'],
  },
  {
    label: 'ORMs',
    items: ['Gorm', 'Prisma', 'Drizzle', 'Sequelize'],
  },
  {
    label: 'Tools',
    items: ['Docker', 'Git'],
  },
  {
    label: 'Spoken',
    items: ['Indonesian (Native)', 'English (Professional)'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-title', {
        y: 24,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.skills-title',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 62%',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-content">
        <h2 className="skills-title">Stack</h2>

        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="skill-card" key={cat.label}>
              <span className="skill-card-label">{cat.label}</span>
              <div className="skill-card-items">
                {cat.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
