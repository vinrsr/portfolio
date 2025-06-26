// components/LabSection.tsx

// --- 1. ADD "useState" and "useEffect" TO YOUR IMPORTS ---
"use client";
import '../app/styles/lab.css';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import ReactPlayer from 'react-player/youtube';
import Image from 'next/image';

export default function LabSection() {
  // --- 2. CREATE A STATE TO TRACK IF THE PAGE HAS MOUNTED ---
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // This effect runs only once on the client, after the initial render.
    setHasMounted(true);
  }, []);
  
  return (
    <section id="lab" className="lab-section">
      <div className="lab-content">
        <h2 className="lab-title">The Lab</h2>
        <p className="lab-intro">
          A collection of experiments, samples, prototypes, and explorations.
        </p>
        
        <div className="lab-grid">
          
          <div className="experiment-card">
            <div className='video-wrapper'>
              {/* --- 3. ONLY RENDER THE PLAYER IF hasMounted IS TRUE --- */}
              {hasMounted && (
                <ReactPlayer
                  url="https://youtu.be/_6D1-HA9XdE"
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                  className="react-player"
                />
              )}
            </div>
            <div className="card-content">
              <h3>Experiment 001: Car Commercial</h3>
              <p>Porsche 718 Cayman GT4 Car Commercial</p>
            </div>
          </div>
          
          <div className="experiment-card">
            <div className='video-wrapper'>
              {/* --- APPLY THE SAME CHECK HERE --- */}
              {hasMounted && (
                <ReactPlayer 
                  url="https://youtu.be/afq56cKsOzE"
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                  className="react-player"
                />
              )}
            </div>
            <div className="card-content">
              <h3>Experiment 002: Metahuman Cinematic</h3>
              <p>Costumizing and Animating a Metahuman</p>
            </div>
          </div>

          <div className="experiment-card">
            <div className='video-wrapper'>
              {/* --- APPLY THE SAME CHECK HERE --- */}
              {hasMounted && (
                <ReactPlayer 
                  url="https://youtu.be/QL2FUdz7Glk" 
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                  className="react-player"
                />
              )}
            </div>
            <div className="card-content">
              <h3>Experiment 003: The Forgotten Monolith</h3>
              <p>Trying out my Environment Skill</p>
            </div>
          </div>

          <div className="experiment-card">
            <div className='video-wrapper'>
              {/* --- APPLY THE SAME CHECK HERE --- */}
              {hasMounted && (
                <ReactPlayer 
                  url="https://youtu.be/uPhQBglnhKQ" 
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                  className="react-player"
                />
              )}
            </div>
            <div className="card-content">
              <h3>Experiment 004: Drink Commercial</h3>
              <p>Sample of Drink Commercial Using Unreal Engine</p>
            </div>
          </div>

          <a href="https://lemper-studio.itch.io/" target="_blank" rel="noopener noreferrer" className="experiment-card-link">
            <div className="experiment-card">
              <div className="image-wrapper">
                <Image
                  src="/lemper-logo.jpg" // <-- Path to your logo
                  alt="Lemper Studio Logo"
                  layout="fill"
                  objectFit="contain" // Use "contain" to see the whole logo
                />
              </div>
              <div className="card-content" style={{textAlign: 'center'}}>
                <h3 className="card-title-link">
                  <span>Lemper Studio</span>
                  <Icon icon="mdi:arrow-top-right" />
                </h3>
                <p>Visit my game studio on itch.io to play my latest games</p>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}