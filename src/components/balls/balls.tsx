import * as THREE from 'three'
import { Suspense, useRef, useReducer, useMemo, type ReactNode } from 'react'
import { Canvas, useFrame, type CanvasProps } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Lightformer, Image } from '@react-three/drei'
import { BallCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { EffectComposer, N8AO, Bloom, DepthOfField } from '@react-three/postprocessing'
import { easing } from 'maath'

type ConnectorProps = {
  position?: [number, number, number]; // The '?' makes this prop optional
  children?: React.ReactNode;
  color?: string;
  roughness?: number;
  accent?: boolean;
  opacity?: number;
}

type ModelProps = {
  children?: ReactNode; // The '?' makes children optional
  color?: string;
  roughness?: number;
  opacity?: number;
}

const accents = [
  '#0A0A0A',
]

const shuffle = () => {
  return Array.from({ length: 99 }, () => ({
    color: accents[Math.floor(Math.random() * accents.length)],
    roughness: Math.random() > 0.5 ? 0.4 : 0.75,
    accent: true,
    opacity: 1
  }));
};

export default function Balls(props: CanvasProps) {
  // We use the reducer simply to get a function (`reshuffle`) that triggers a re-render
  const [shuffleTrigger] = useReducer((state) => state + 1, 0);

  // useMemo will now re-run the `shuffle()` function every time `shuffleTrigger` changes.
  // This generates a new random set of colors.
  const connectors = useMemo(() => shuffle(), [shuffleTrigger]);

  return (
    // Pass the `reshuffle` function to the Canvas's onClick event
    <Canvas /*onClick={reshuffle}*/ shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 40 }} {...props}>
      <color attach="background" args={['#0A0A0A']} />
      <ambientLight intensity={10} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Physics /*debug*/ gravity={[0, 0, 0]}>
        <Pointer />
        {/* The newly generated random connectors are mapped here */}
        {connectors.map((props, i) => <Connector key={i} {...props} />)}
        <Connector position={[10, 10, 5]}>
          <Model>
            <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
          </Model>
        </Connector>
      </Physics>

      {/* --- 2. ADD THE IMAGE COMPONENT HERE --- */}
      {/* This will render your logo as a 2D plane within the 3D space */}
      <Suspense fallback={null}>
        <Image
          url="/logo-white.png"   // Path to your logo in the /public folder
          scale={2}                  // Adjust the overall size of the logo
          position={[0, 0, -5]}      // Push it far into the background
          transparent                   // Enable transparency
          opacity={0.005}                // Make it a very faint, subtle watermark
        />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          </group>
        </Environment>
      </Suspense>

      <EffectComposer multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
        <Bloom intensity={0.75} luminanceThreshold={.8} mipmapBlur />
        <DepthOfField
          focusDistance={0.015} // Where the camera focuses
          focalLength={0.02}   // The strength of the blur
          bokehScale={0}     // The size of the blur effect
          height={480}
        />
      </EffectComposer>
    </Canvas>
  );
}

function Connector({ position, ...props }: ConnectorProps) {
  const r = THREE.MathUtils.randFloatSpread;
  const api = useRef<RapierRigidBody>(null)
  const pos = useMemo<[number, number, number]>(() => position || [r(10), r(10), r(10)], [])
  const vec = new THREE.Vector3()
  useFrame(() => {
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.00005), true)
  })

  return (
    <RigidBody linearDamping={1} angularDamping={1} friction={1} position={pos} ref={api} colliders={false}>
      <BallCollider args={[.1]}/> 
      <Model {...props} />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody 
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[.5]} />

      {/* This mesh will represent the collider visually */}
      {/* <mesh>
        <sphereGeometry args={[.5, 32, 32]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh> */}
    </RigidBody>
  )

}

function Model({ children, color = '#0A0A0A', roughness = 0.75, opacity=1 }: ModelProps) {
  const ref = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>>(null);

  if (ref.current) {
    // Animate the color
    easing.dampC(ref.current.material.color, color, 0.2, 0);
  }

  return (
    // Use a standard mesh with sphere geometry
    <mesh ref={ref} castShadow receiveShadow scale={1}>
      <sphereGeometry args={[.1, 32, 32]} />
      <meshStandardMaterial
        metalness={.2}
        roughness={roughness}
        transparent={true}
        opacity={opacity}
      />
      {children}
    </mesh>
  )
}