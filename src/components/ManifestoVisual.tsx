// components/ManifestoVisual.tsx

"use client";

import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshTransmissionMaterial, Environment } from '@react-three/drei';

// This CameraRig component is a child of Canvas, so it can use useFrame. Correct.
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

// --- NEW COMPONENT FOR ALL OUR 3D CONTENT ---
// This component is a child of Canvas, so it's safe to use hooks here.
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, -5]} intensity={2} />

      <Icosahedron ref={meshRef} args={[1.5, 0]} scale={scale}>
        <MeshTransmissionMaterial 
          transmission={1}
          thickness={0.5}
          roughness={0.1}
          color="#c0c0c0"
        />
      </Icosahedron>

      <Environment preset="city" />
      <CameraRig />
    </>
  );
}

export default function Sculpture() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // When the component mounts, this runs, setting isMounted to true.
    setIsMounted(true);
  }, []); // The empty array ensures this runs only once.

  if (!isMounted) {
    return null;
  }

  const isMobile = window.innerWidth < 900;
  const crystalScale = isMobile ? .5 : 1;
  
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 5] }}>
      <SceneContent scale={crystalScale} />
    </Canvas>
  );
}