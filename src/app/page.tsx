"use client";

import ManifestoSection from '@/components/manifesto';
import LabSection from '@/components/lab';
import ConnectSection from '@/components/connect';
import FooterSection from '@/components/footer';

export default function Home() {
  return (
    <main>
      <ManifestoSection />
      <LabSection />
      <ConnectSection />
      <FooterSection />
    </main>
  );
}