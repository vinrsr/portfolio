"use client";
import '../app/styles/skills.css';
import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Category = {
  label: string;
  items: string[];
  color: string;
};

const categories: Category[] = [
  {
    label: 'Languages',
    items: ['Go', 'TypeScript', 'JavaScript', 'Node.js'],
    color: '#4f46e5',
  },
  {
    label: 'Frameworks',
    items: ['Gin', 'React', 'Next.js', 'Tailwind CSS'],
    color: '#0ea5e9',
  },
  {
    label: 'Architecture',
    items: ['Microservices', 'Distributed Systems', 'Event-Driven', 'Micro-Frontends'],
    color: '#8b5cf6',
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ETCD', 'Amazon S3', 'MinIO'],
    color: '#10b981',
  },
  {
    label: 'Message Brokers',
    items: ['Apache Kafka', 'RabbitMQ'],
    color: '#f59e0b',
  },
  {
    label: 'API & Security',
    items: ['gRPC', 'REST', 'WebSockets', 'JWT', 'RBAC', 'HMAC', 'RSA'],
    color: '#f43f5e',
  },
  {
    label: 'ORMs',
    items: ['Gorm', 'Prisma', 'Drizzle', 'Sequelize'],
    color: '#d946ef',
  },
  {
    label: 'Tools',
    items: ['Docker', 'Git'],
    color: '#06b6d4',
  },
  {
    label: 'AI Tools',
    items: ['Claude Code', 'Antigravity', 'OpenCode'],
    color: '#f97316',
  },
  {
    label: 'Spoken',
    items: ['Indonesian (Native)', 'English (Professional)'],
    color: '#64748b',
  },
];

function getSpan(itemCount: number) {
  if (itemCount <= 2) return 2;
  if (itemCount <= 4) return 3;
  return 4;
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];

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
        const tags = card.querySelectorAll('.skill-tag');

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
          .fromTo(
            card,
            { y: 50, opacity: 0, scale: 0.88, rotation: gsap.utils.random(-3, 3) },
            { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.6)' }
          )
          .fromTo(
            tags,
            { y: 10, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.03 },
            '-=0.3'
          );

        const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
        const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });

        const handleMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          rotateY(px * 12);
          rotateX(py * -12);
        };
        const handleLeave = () => {
          rotateY(0);
          rotateX(0);
        };

        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', handleMove);
          card.removeEventListener('mouseleave', handleLeave);
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-content">
        <h2 className="skills-title">Stack</h2>

        <div className="skills-grid">
          {categories.map((cat) => (
            <div
              className="skill-card"
              key={cat.label}
              data-span={getSpan(cat.items.length)}
              style={{ '--card-accent': cat.color } as CSSProperties}
            >
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
