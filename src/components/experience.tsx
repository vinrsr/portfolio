"use client";
import '../app/styles/experience.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Role = {
  company: string;
  location: string;
  title: string;
  period: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    company: 'Quickbill Indonesia',
    location: 'South Jakarta',
    title: 'Senior Full-Stack Software Engineer',
    period: 'Dec 2025 - Jun 2026',
    bullets: [
      'Designed a fault-tolerant RabbitMQ reconnect mechanism ensuring zero message loss during network or broker failures.',
      'Designed and owned an RBAC schema end-to-end, custom middleware and interceptors managing platform-wide permissions from proposal to production.',
      'Built an async bulk invoice processing engine with multi-row validation, real-time duplicate detection, and automated collision resolution.',
      'Proposed a centralized shared-model library pattern across microservices, eliminating data model redundancy and reducing cross-team deployment blockers.',
    ],
  },
  {
    company: 'Moladin',
    location: 'Central Jakarta',
    title: 'Full-Stack Software Engineer',
    period: 'Jan 2022 - Dec 2025',
    bullets: [
      'Built and owned a Credit Underwriting Service integrating third-party financial APIs for SLIK credit checking and contract validation.',
      'Used Kafka to orchestrate event publishing and consumption across distributed microservices, ensuring data consistency and reliable async processing.',
      'Contributed to a CRM supporting thousands of agents across manpower and cash loan workflows.',
      'Built a high-performance Calculator Service for complex financial logic, dynamic loan amounts, and interest due-date generation.',
      'Mentored frontend engineers transitioning into full-stack roles across backend concepts, API development, and database management.',
    ],
  },
  {
    company: 'vOffice Indonesia',
    location: 'South Jakarta',
    title: 'Mid-Senior Software Developer',
    period: 'Apr 2021 - Dec 2021',
    bullets: [
      'Built data aggregation pipelines to analyze large client datasets, delivering business reports to the Board of Directors.',
      'Contributed to migrating a legacy monolithic system into a microservices architecture, improving modularity and fault tolerance.',
      'Standardized repository structures and code patterns across the team, improving development velocity.',
    ],
  },
  {
    company: 'vOffice Indonesia',
    location: 'South Jakarta',
    title: 'Full-Stack Developer',
    period: 'Dec 2019 - Apr 2021',
    bullets: [
      'Built and deployed cross-platform mobile applications in React Native for iOS and Android, including the underlying RESTful APIs.',
      'Architected an internal ERP platform centralizing operations across multiple branches, client onboarding, bookings, invoicing, and financial reporting.',
    ],
  },
  {
    company: 'PT. Integrated Synergy Systems',
    location: 'West Jakarta',
    title: 'Backend Engineer',
    period: 'May 2019 - Dec 2019',
    bullets: [
      'Delivered multiple web and mobile applications for external clients in a fast-paced agency environment.',
      'Built client-facing web applications with PHP, MySQL, and JavaScript, designing RESTful APIs for cross-platform integration.',
    ],
  },
  {
    company: 'Coca-Cola Amatil',
    location: 'Cibitung',
    title: 'Web Developer · Freelance',
    period: 'Oct 2018 - Jan 2019',
    bullets: [
      'Designed and built a web-based ERP module to automate employee attendance tracking and shift logging.',
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.experience-title', {
        y: 24,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.experience-title',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>('.experience-item').forEach((item) => {
        gsap.from(item, {
          x: 60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-content">
        <h2 className="experience-title">Experience</h2>

        <div className="experience-list">
          {roles.map((role) => (
            <div className="experience-item" key={role.title + role.period}>
              <div className="experience-meta">
                <div className="experience-meta-left">
                  <span className="experience-company">{role.company}</span>
                  <span className="experience-role">{role.title}</span>
                  <span className="experience-location">{role.location}</span>
                </div>
                <span className="experience-period">{role.period}</span>
              </div>
              <ul className="experience-bullets">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
