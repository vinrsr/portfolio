import '../app/styles/landing.css';
import Balls from '@/components/balls/balls';
import Image from 'next/image';
import { Icon } from '@iconify/react';


export default function LandingSection() {
  return (
    <section className="landing-section">
      {/* <div className="logo-container">
        <Image src="/logo-white.png" width={100} height={100} alt="VINRSR Brand Logo" className="logo-image"></Image>
      </div> */}

      {/* <div className="overlay-content">
        <Image src="/logo-title.png" width={1000} height={1000} alt="VINRSR Brand Title" className="brand-logo-title"></Image>
        <p className="brand-tagline">Becoming something...</p>
      </div> */}

      <a href="#manifesto" className="scroll-down-button">
        <Icon icon="mdi:chevron-down" />
      </a>

      <Balls />
    </section>
  )
}