"use client";
import '../app/styles/summary.css';
import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SummarySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.summary-title', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.summary-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.summary-card', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.summary-card',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="summary" className="summary-section" ref={sectionRef}>
      <div className="summary-content">
        <h2 className="summary-title">Summary</h2>

        <div className="summary-card">
          <Icon icon="mdi:format-quote-open" className="summary-quote-icon" />
          <p className="summary-text">
            A senior engineer with 7 years of experience building high-performance backend systems and distributed
            architectures. Specialized in Go and TypeScript, with hands-on experience designing microservices, event-driven
            pipelines, and scalable database systems, taking complex features from design to production. Recently expanded
            into AI-integrated systems, building multi-step AI agents with retrieval-augmented generation (RAG) and real
            evaluation pipelines, and looking to grow further in AI-focused engineering roles.
          </p>
        </div>
      </div>
    </section>
  );
}
