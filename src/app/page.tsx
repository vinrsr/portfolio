"use client";

import { useState } from 'react'
import Instagrams from '../components/contact/instagram/Instagram';
import LandingSection from '@/components/landing';
import ManifestoSection from '@/components/manifesto';
import LabSection from '@/components/lab';
import ConnectSection from '@/components/connect';
import FooterSection from '@/components/footer';
import { FadeIn, TopLeft, LeftMiddle } from '../components/contact/instagram/layout/styles.jsx'
import '../components/contact/instagram/layout/styles.css'
import Overlay from '../components/contact/instagram/layout/Overlay'
import Image from 'next/image';

import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Float, Lightformer, Text, Html, ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { Bloom, EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing"
import { Route, Link, useLocation } from "wouter"
import { suspend } from "suspend-react"
import { easing } from "maath"

useGLTF.preload("/instagram-logo.glb")

export default function Home() {
  const [speed, set] = useState(1)
  return (
    <main>
      {/* --- SECTION 1: Your Landing Page --- */}
      <LandingSection />

      {/* --- SECTION 2: Your Contact Page --- */}
      {/* <ContactSection speed={speed} setSpeed={set} /> */}

      {/* <InstagramSection /> */}

      <ManifestoSection />

      <LabSection />

      <ConnectSection />

      <FooterSection />
    </main>
  );
}



function ContactSection({speed, setSpeed}) {
  return (
    <section id="contact" className="contact-section overlay-instagram">
      <Instagrams speed={speed} />
      {/* <Overlay /> */}

      <div className='overlay-instagram-connect'>
        <center>
          <Image src="/icons/instagram.png" width={100} height={100} alt="VINRSR Brand Logo" className="logo-image"></Image>
          <h3>Let's Connect!</h3>
        </center>
      </div>

      <div className='overlay-instagram-range'>
        <input type="range" min="0" max="10" value={speed} step="1" onChange={(e) => setSpeed(e.target.value)} />
      </div>

    </section>
  )
}

function InstagramSection() {
  return (
    <section id="contact" className="contact-section overlay-instagram">
      <Canvas eventPrefix="client" shadows camera={{ position: [0, 0, 20], fov: 50 }}>
        <color attach="background" args={["#e0e0e0"]} />
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
        <Status position={[0, 0, -10]} />
        <Float floatIntensity={2}>
          <Route path="/">
            <Knot />
          </Route>
        </Float>
        <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />
        <Environment preset="city">
          <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </Environment>
        <EffectComposer disableNormalPass>
          <N8AO aoRadius={1} intensity={2} />
          <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
          <TiltShift2 blur={0.2} />
        </EffectComposer>
        <Rig />
      </Canvas>

    </section>
  )
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
      0.2,
      delta,
    )
    state.camera.lookAt(0, 0, 0)
  })
}

function Knot(props) {
  const { nodes, materials } = useGLTF("/instagram-logo.glb")
  console.log(nodes)
  return (
    <mesh
      // scale={5}
      receiveShadow
      castShadow
      geometry={nodes.instagram_logo_mesh.geometry}
      // geometry={nodes.YoutubeLogo.geometry}
      material={materials.material}
      rotation={[45, 0, 0]}
      {...props}>
        {/* <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} /> */}
    </mesh>
  )
}

function Status(props) {
  const [loc] = useLocation()
  const text = loc === "/" ? "Instagram" : loc
  return (
    <Text fontSize={14} letterSpacing={-0.025} color="black" {...props}>
      {text}
      <Html style={{ color: "transparent", fontSize: "33.5em" }} transform>
        {text}
      </Html>
    </Text>
  )
}