"use client";

import ManifestoSection from '@/components/manifesto';
import SkillsSection from '@/components/skills';
import ExperienceSection from '@/components/experience';
import LabSection from '@/components/lab';
import ConnectSection from '@/components/connect';
import FooterSection from '@/components/footer';

export default function Home() {
  return (
    <main>
      <ManifestoSection />
      <SkillsSection />
      <ExperienceSection />
      <LabSection />
      <ConnectSection />
      <FooterSection />
    </main>
  );
}