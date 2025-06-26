// components/ManifestoVisual.tsx

"use client";

import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Model } from '@/components/3d-logo/Vinrsr_logo_3d';


function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 0.5, state.mouse.y * 0.5, 5),
      0.02
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent({ scale }: { scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={.5} />
      <directionalLight position={[5, 5, -5]} intensity={2} />
      <Model scale={scale} />
      <Environment preset="studio" />
      <CameraRig />
    </>
  );
}

export default function Sculpture() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isMobile = window.innerWidth < 900;
  const crystalScale = isMobile ? .5 : .8;
  
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 5] }}>
      <SceneContent scale={crystalScale} />
    </Canvas>
  );
}