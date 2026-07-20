"use client";
import '../app/styles/experience.css';
import { Fragment, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Position = {
  title: string;
  period: string;
  bullets: string[];
};

type Experience = {
  company: string;
  location: string;
  logo: string;
  url: string;
  positions: Position[];
};

const experiences: Experience[] = [
  {
    company: 'Quickbill Indonesia',
    location: 'South Jakarta',
    logo: '/experience-logo/quickbill-logo.jpg',
    url: 'https://quickbill.id',
    positions: [
      {
        title: 'Senior Full-Stack Software Engineer',
        period: 'Dec 2025 - Jun 2026',
        bullets: [
          'Consumers stopped processing messages after a RabbitMQ broker disconnect, since the connection never reset automatically; built an auto-reconnect mechanism that restores it with zero message loss.',
          'Permissions were scattered across the platform; designed the RBAC database schema and built the middleware and interceptors enforcing it end-to-end, from proposal to production.',
          "Manual one-by-one invoicing couldn't scale; built an async bulk engine handling 500 rows/batch with real-time duplicate detection and automated collision resolution.",
          'Duplicated data models slowed cross-team deployments; introduced a centralized shared-model library, eliminating redundancy.',
          'Built notification microservices delivering async email and WhatsApp messages to users across the platform.',
        ],
      },
    ],
  },
  {
    company: 'Moladin',
    location: 'Central Jakarta',
    logo: '/experience-logo/moladin-logo.jpg',
    url: 'https://moladin.com',
    positions: [
      {
        title: 'Full-Stack Software Engineer',
        period: 'Jan 2022 - Dec 2025',
        bullets: [
          'SME property loan approvals waited on each step to finish one at a time, stretching SLA to 7 days; redesigned the flow as PIC to run independent steps in parallel, cutting average approval time to 2 days.',
          'Collaborated on building the Small and Medium Enterprise (SME) property loan application, where customers pawn property certificates to access financing, including backend APIs for both web and mobile.',
          'Built an internal rules engine that filters high-risk loan applicants through sequential checks, KYC, SLIK credit history, and cross-leasing loan checks, to catch customers unlikely to repay before approval.',
          'Built and owned the Credit Underwriting Service, the single point of integration for pre-onboarding and validation checks, including SLIK credit history and contract validation, for every loan application.',
          'Contributed to the vehicle loan application system, including backend APIs for both web and mobile, used by branch teams to validate customer documents and route applications through multi-level approval, supporting thousands of agents across manpower and cash loan workflows.',
          'Services communicating via direct API calls created tight coupling and reliability risk; collaborated on introducing Kafka to decouple event publishing and consumption across microservices, keeping data consistent even under async load.',
          'Built and owned the Calculator Service as the single source for loan calculations, handling dynamic amounts, interest, installment schedules, and fee accumulation.',
          'Mentored 3 frontend engineers transitioning into full-stack roles, covering backend, API design, and database management.',
        ],
      },
    ],
  },
  {
    company: 'vOffice Indonesia',
    location: 'South Jakarta',
    logo: '/experience-logo/voffice-logo.jpg',
    url: 'https://voffice.co.id',
    positions: [
      {
        title: 'Mid-Senior Software Developer',
        period: 'Apr 2021 - Dec 2021',
        bullets: [
          'When the team lead left and no one else stepped up, took over leading the 5-person tech team, reporting directly to the Board of Directors.',
          'Client data had no centralized visibility for leadership; built data aggregation pipelines that transformed raw client datasets into business reports for the Board of Directors.',
          'A legacy monolithic system was hard to scale and maintain; contributed to migrating it to a microservices architecture, improving modularity and fault tolerance.',
          'Inconsistent code patterns across the team caused merge conflicts and slowed new hires down; standardized repository structures and coding patterns, improving development velocity.',
        ],
      },
      {
        title: 'Full-Stack Developer',
        period: 'Dec 2019 - Apr 2021',
        bullets: [
          'Integrated the Midtrans payment gateway to generate payment links for customers to pay invoices.',
          'Branch operations, onboarding, bookings, invoicing, and financial reporting were all manual and disconnected; collaborated on building an internal ERP platform centralizing all of it across multiple branches.',
        ],
      },
    ],
  },
  {
    company: 'ISYS',
    location: 'West Jakarta',
    logo: '/experience-logo/isys-logo.jpg',
    url: 'https://www.linkedin.com/company/integrated-synergy-systems',
    positions: [
      {
        title: 'Backend Engineer',
        period: 'May 2019 - Dec 2019',
        bullets: [
          'Delivered multiple web and mobile applications for external clients in a fast-paced agency environment, juggling tight deadlines across projects and ramping up quickly on varied client requirements.',
          'Built client-facing web applications with PHP, MySQL, and JavaScript, designing RESTful APIs for cross-platform integration.',
        ],
      },
    ],
  },
  {
    company: 'Coca-Cola Amatil',
    location: 'Cibitung',
    logo: '/experience-logo/cca-logo.jpg',
    url: 'https://www.cocacolaep.com/',
    positions: [
      {
        title: 'Web Developer · Freelance',
        period: 'Oct 2018 - Jan 2019',
        bullets: [
          'Employee attendance and shift logging were tracked manually; designed and built a web-based ERP module to automate the process.',
        ],
      },
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
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.utils.toArray<HTMLElement>('.experience-card').forEach((card) => {
        const icon = card.querySelector('.experience-company-icon');
        const info = card.querySelector('.experience-company-info');
        const rows = card.querySelectorAll('.experience-position, .experience-promotion-badge');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          card,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power2.inOut' }
        )
          .fromTo(
            icon,
            { scale: 0, rotate: -20, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
            '-=0.55'
          )
          .fromTo(
            info,
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '<'
          )
          .fromTo(
            rows,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
            '-=0.25'
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-content">
        <h2 className="experience-title">Experience</h2>

        <div className="experience-list">
          {experiences.map((experience) => {
            const isMulti = experience.positions.length > 1;
            return (
              <div className="experience-card" key={experience.company}>
                <div className="experience-card-header">
                  <a
                    href={experience.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="experience-company-link"
                    aria-label={`Visit ${experience.company} website`}
                  >
                    <span className="experience-company-icon">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={40}
                        height={40}
                      />
                    </span>
                    <div className="experience-company-info">
                      <span className="experience-company">{experience.company}</span>
                      <span className="experience-location">{experience.location}</span>
                    </div>
                  </a>
                </div>

                <div className={`experience-positions${isMulti ? ' multi' : ''}`}>
                  {experience.positions.map((position, index) => (
                    <Fragment key={position.title + position.period}>
                      {index > 0 && (
                        <div className="experience-promotion-badge">
                          <Icon icon="mdi:trending-up" />
                          Promoted
                        </div>
                      )}
                      <div className="experience-position">
                        <div className="experience-position-meta">
                          <span className="experience-role">{position.title}</span>
                          <span className="experience-period">{position.period}</span>
                        </div>
                        <ul className="experience-bullets">
                          {position.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
