import { useRef, useMemo } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

// Componente para los planos plegables INSTANCIADOS (altamente optimizado)
function InstancedFoldingPlanes() {
  const groupCount = 8;
  const planesPerGroup = 6;
  const totalInstances = groupCount * planesPerGroup;
  const planeWidth = 8;
  const planeHeight = 12;
  // Asegúrate de que planeSegments siga siendo bajo para optimización
  const planeSegments = 4;

  const meshRef = useRef<THREE.InstancedMesh>(null!);

  // Usamos useMemo para calcular las propiedades iniciales solo una vez
  const instancesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < groupCount; i++) {
      for (let j = 0; j < planesPerGroup; j++) {
        const foldPhase = i + j * 0.5;
        const brightness = 0.2 + (Math.sin(i + j) * 0.5 + 0.5) * 0.8;
        data.push({
          position: new THREE.Vector3(
            (i - 4) * 12 + Math.sin(j) * 5,
            (j - 3) * 8 + Math.cos(i) * 3,
            Math.sin(i + j) * 10
          ),
          foldPhase,
          brightness,
          matrix: new THREE.Matrix4(), // Matriz para la posición/rotación
          color: new THREE.Color(),     // Objeto Color para la animación de brillo
        });
      }
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    instancesData.forEach((item, index) => {
      // Animación de rotación (usando Euler y Quaternion para eficiencia)
      const foldAmount = Math.sin(elapsedTime * 0.5 + item.foldPhase) * 0.8;
      const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
        foldAmount, // x
        Math.cos(elapsedTime * 0.3 + item.foldPhase) * 0.6, // y
        Math.sin(elapsedTime * 0.7 + item.foldPhase) * 0.4  // z
      ));

      // Animación de posición dinámica
      const tempPosition = new THREE.Vector3(
        item.position.x + Math.sin(elapsedTime * 0.4 + item.foldPhase) * 8,
        item.position.y + Math.cos(elapsedTime * 0.6 + item.foldPhase) * 6,
        item.position.z + Math.sin(elapsedTime * 0.8 + item.foldPhase) * 12
      );

      // Combinar posición, rotación y escala en una sola matriz (escala 1,1,1)
      item.matrix.compose(
        tempPosition,
        rotation,
        new THREE.Vector3(1, 1, 1)
      );

      // Actualizar la instancia
      meshRef.current.setMatrixAt(index, item.matrix);

      // Brillo animado y color (solo si instanceColor existe)
      if (meshRef.current.instanceColor) {
        const brightnessModulation = Math.sin(elapsedTime * 2 + item.foldPhase) * 0.3 + 0.7;
        const b = item.brightness * brightnessModulation;
        item.color.setRGB(b, b, b);
        meshRef.current.setColorAt(index, item.color);
      }
    });

    // Indicar a Three.js que actualice el buffer de matrices y colores
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null!, null!, totalInstances]} // Tipo, material, y el número total de instancias
      castShadow
      receiveShadow
    >
      <planeGeometry args={[planeWidth, planeHeight, planeSegments, planeSegments]} />
      {/* meshStandardMaterial es generalmente más eficiente y moderno */}
      <meshStandardMaterial
        // Usamos un color base y el instanceColor dinámico se encargará del resto
        color={"#FFFFFF"}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        emissive={"#333333"} // Emissive base, contribuye al efecto Bloom
        roughness={0.4}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

// Componente para las formas geométricas dinámicas (Tu implementación existente)
function DynamicShapes() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.5;
      cubeRef.current.rotation.y = time * 0.5;
      cubeRef.current.position.y = Math.sin(time) * 4;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * -0.3;
      sphereRef.current.position.x = Math.cos(time * 0.8) * 15;
      sphereRef.current.position.z = Math.sin(time * 0.8) * 15;
    }
  });

  return (
    <>
      <mesh ref={cubeRef} position={[-20, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#FF5733" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={sphereRef} position={[20, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#C7FF33" metalness={0.9} roughness={0.1} />
      </mesh>
    </>
  );
}


// Componente para el sistema de partículas cinéticas (Placeholder)
function KineticParticles() {
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

  // Desktop: fondo 3D optimizado
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
        dpr={1} // <--- OPTIMIZACIÓN A: Fuerza el DPR a 1 para reducir la carga de GPU
      >
        {/* Añadimos luces necesarias para meshStandardMaterial y sombras */}
        <ambientLight intensity={0.5} />
        <spotLight position={[50, 50, 60]} angle={0.15} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* <FoldingPlanes /> <-- Eliminado y reemplazado */}
        <InstancedFoldingPlanes /> {/* <-- OPTIMIZACIÓN B: Uso de instanciado */}

        <DynamicShapes />
        <KineticParticles />

        <EffectComposer>
          {/* Parámetros de Bloom ligeramente ajustados para menor costo */}
          <Bloom intensity={0.8} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
          <Noise opacity={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
