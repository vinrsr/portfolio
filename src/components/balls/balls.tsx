import * as THREE from 'three'
import { Suspense, useRef, useReducer, useMemo, useEffect, useState, type ReactNode } from 'react'
import { Canvas, useFrame, type CanvasProps } from '@react-three/fiber'
import { Environment, Lightformer, Image } from '@react-three/drei'
import { BallCollider, Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'

type ConnectorProps = {
  position?: [number, number, number];
  children?: React.ReactNode;
  color?: string;
  roughness?: number;
  accent?: boolean;
  opacity?: number;
}

type ModelProps = {
  children?: ReactNode;
  color?: string;
  roughness?: number;
  opacity?: number;
}

const accents = [
  '#0A0A0A',
]

const shuffle = (count = 80) => {
  return Array.from({ length: count }, () => ({
    color: accents[Math.floor(Math.random() * accents.length)],
    roughness: Math.random() > 0.5 ? 0.4 : 0.75,
    accent: true,
    opacity: 1
  }));
};

export default function Balls(props: CanvasProps) {
  const [shuffleTrigger] = useReducer((state) => state + 1, 0);
  const [ballCount, setBallCount] = useState(80);

   useEffect(() => {
    const checkMobile = window.innerWidth < 768;
    
    if (checkMobile) {
      setBallCount(4);
    }
  }, []);

  const connectors = useMemo(() => shuffle(ballCount), [shuffleTrigger, ballCount]);

  return (
    <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 40 }} {...props}>
      <color attach="background" args={['#0A0A0A']} />
      <ambientLight intensity={10} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Physics /*debug*/ gravity={[0, 0, 0]}>
        <Pointer />
        {/* The newly generated random connectors are mapped here */}
        {connectors.map((props, i) => <Connector key={i} {...props} />)}
      </Physics>

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
        {/* <Bloom intensity={0.75} luminanceThreshold={.8} mipmapBlur /> */}

        {/* {!isMobile && (
          <DepthOfField
            focusDistance={0.015}
            focalLength={0.02}
            bokehScale={0}
            height={480}
          />
        )} */}
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
    </RigidBody>
  )

}

function Model({ children, color = '#0A0A0A', roughness = 0.75, opacity=1 }: ModelProps) {
  return (
    <mesh castShadow receiveShadow scale={1}>
      <sphereGeometry args={[.1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        metalness={0}
        roughness={roughness}
        transparent={false}
        opacity={opacity}
      />
      {children}
    </mesh>
  );
}