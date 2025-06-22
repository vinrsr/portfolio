import '../app/styles/landing.css';
import Balls from '@/components/balls/balls';
import { Icon } from '@iconify/react';


export default function LandingSection() {
  return (
    <section className="landing-section">
      <a href="#manifesto" className="scroll-down-button">
        <Icon icon="mdi:chevron-down" />
      </a>

      <Balls />
    </section>
  )
}