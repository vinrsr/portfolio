"use client";

import ManifestoSection from '@/components/manifesto';
import SummarySection from '@/components/summary';
import ExperienceSection from '@/components/experience';
import SkillsSection from '@/components/skills';
import LabSection from '@/components/lab';
import ConnectSection from '@/components/connect';
import FooterSection from '@/components/footer';

export default function Home() {
  return (
    <main>
      <ManifestoSection />
      <SummarySection />
      <ExperienceSection />
      <SkillsSection />
      <LabSection />
      <ConnectSection />
      <FooterSection />
    </main>
  );
}