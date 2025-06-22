"use client";

import LandingSection from '@/components/landing';
import ManifestoSection from '@/components/manifesto';
import LabSection from '@/components/lab';
import ConnectSection from '@/components/connect';
import FooterSection from '@/components/footer';
import '../components/contact/instagram/layout/styles.css'

export default function Home() {
  return (
    <main>
      {/* --- SECTION 1: Landing --- */}
      <LandingSection />

      {/* --- SECTION 2: Manifesto --- */}
      <ManifestoSection />

      {/* --- SECTION 3: Lab --- */}
      <LabSection />

      {/* --- SECTION 3: Connect --- */}
      <ConnectSection />

      {/* --- SECTION 3: Footer --- */}
      <FooterSection />
    </main>
  );
}