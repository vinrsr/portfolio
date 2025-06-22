// components/ManifestoVisual.tsx

"use client";

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
function SceneContent() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Now it's safe to call useFrame here!
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

      <Icosahedron ref={meshRef} args={[1.5, 0]}>
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


// --- THE DEFAULT EXPORT IS NOW VERY SIMPLE ---
// Its only job is to create the Canvas and render our scene inside it.
export default function Sculpture() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 5] }}>
      <SceneContent />
    </Canvas>
  );
}