import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function WireShape({ position, scale, speed }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#6366f1" wireframe opacity={0.22} transparent />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <WireShape position={[-3.5,  1.5, -2]}  scale={1.1} speed={0.4} />
      <WireShape position={[ 3.2, -1.2, -1]}  scale={0.8} speed={0.6} />
      <WireShape position={[ 0,    2.5, -3]}  scale={1.4} speed={0.3} />
      <WireShape position={[-1.5, -2.2, -1]}  scale={0.6} speed={0.7} />
      <WireShape position={[ 4,    2,   -2.5]} scale={0.9} speed={0.5} />
    </>
  );
}

export default function FloatingGeometry() {
  return (
    <Canvas
      className="!absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 6], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
