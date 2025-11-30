import { useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

// Componente para los planos plegables
function FoldingPlanes() {
  // Parámetros
  const groupCount = 8;
  const planesPerGroup = 6;
  const planeWidth = 8;
  const planeHeight = 12;
  const planeSegments = 4;

  // Genera los grupos y planos
  return (
    <>
      {Array.from({ length: groupCount }).map((_, i) => (
        <group key={i}>
          {Array.from({ length: planesPerGroup }).map((_, j) => {
            // Fases y posiciones
            const foldPhase = i + j * 0.5;
            const x = (i - 4) * 12 + Math.sin(j) * 5;
            const y = (j - 3) * 8 + Math.cos(i) * 3;
            const z = Math.sin(i + j) * 10;
            // Brillo base
            const brightness = 0.2 + (Math.sin(i + j) * 0.5 + 0.5) * 0.8;
            // Animación
            return (
              <AnimatedPlane
                key={j}
                position={[x, y, z]}
                foldPhase={foldPhase}
                brightness={brightness}
                width={planeWidth}
                height={planeHeight}
                segments={planeSegments}
              />
            );
          })}
        </group>
      ))}
    </>
  );
}

// Componente plano animado
function AnimatedPlane({ position, foldPhase, brightness, width, height, segments }: {
  position: [number, number, number];
  foldPhase: number;
  brightness: number;
  width: number;
  height: number;
  segments: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      // Animación de pliegue y rotación
      const foldAmount = Math.sin(elapsedTime * 0.5 + foldPhase) * 0.8;
      meshRef.current.rotation.x = foldAmount;
      meshRef.current.rotation.y = Math.cos(elapsedTime * 0.3 + foldPhase) * 0.6;
      meshRef.current.rotation.z = Math.sin(elapsedTime * 0.7 + foldPhase) * 0.4;
      // Posición dinámica
      meshRef.current.position.set(...position);
      meshRef.current.position.x += Math.sin(elapsedTime * 0.4 + foldPhase) * 8;
      meshRef.current.position.y += Math.cos(elapsedTime * 0.6 + foldPhase) * 6;
      meshRef.current.position.z += Math.sin(elapsedTime * 0.8 + foldPhase) * 12;
      // Brillo animado
      const brightnessModulation = Math.sin(elapsedTime * 2 + foldPhase) * 0.3 + 0.7;
      const b = brightness * brightnessModulation;
      const material = meshRef.current.material as THREE.MeshPhongMaterial;
      material.color.setRGB(b, b, b);
      material.emissive.setRGB(b * 0.3, b * 0.3, b * 0.3);
    }
  });
  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <planeGeometry args={[width, height, segments, segments]} />
      <meshPhongMaterial
        color={`rgb(${brightness * 255},${brightness * 255},${brightness * 255})`}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        shininess={100}
        emissive={`rgb(${brightness * 0.3 * 255},${brightness * 0.3 * 255},${brightness * 0.3 * 255})`}
      />
    </mesh>
  );
}

// Componente para las formas geométricas dinámicas
function DynamicShapes() {
  // TODO: Implementar animación y geometría
  return null;
}

// Componente para el sistema de partículas cinéticas
function KineticParticles() {
  // TODO: Implementar animación y geometría
  return null;
}

export const Background3D = () => {
  const isSmallScreen = useMediaQuery('(max-width:1024px)');
  if (isSmallScreen) {
    // Fondo alternativo para móviles (color plano)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
          background: "#FA6400"
        }}
      />
    );
  }
  // Desktop: fondo 3D
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", background: "#FA6400" }}
        dpr={[1, 2]}
      >
        <FoldingPlanes />
        <DynamicShapes />
        <KineticParticles />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.05} luminanceSmoothing={0.7} />
          <Noise opacity={0.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};