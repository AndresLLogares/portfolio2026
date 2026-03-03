import { useRef, useMemo } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WaterShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color("#0a5f7f") },
    uRippleStrength: { value: 0.25 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uRippleStrength;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Distancia del vértice al mouse
      float dist = distance(uv, uMouse);
      
      // Onda base más pronunciada
      float wave = sin(pos.x * 1.5 + uTime * 0.3) * 0.15;
      wave += sin(pos.y * 1.5 + uTime * 0.25) * 0.15;
      
      // Interacción con el mouse - amplificada por uRippleStrength
      float ripple = sin(dist * 15.0 - uTime * 3.0) * 0.35 * uRippleStrength;
      float rippleStrength = smoothstep(0.5, 0.0, dist);
      
      pos.z += wave + (ripple * rippleStrength);
      vWave = wave + (ripple * rippleStrength);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vWave;
    uniform vec3 uColor;
    uniform float uTime;
    
    void main() {
      vec2 uv = vUv;
      float wave = vWave;
      
      // Fade-out en los bordes para funda suave
      float distFromCenter = length(uv - vec2(0.5));
      float edgeFade = smoothstep(1.0, 0.3, distFromCenter);
      
      // Color base con cian profesional
      vec3 color1 = uColor;
      vec3 color2 = vec3(0.15, 0.75, 0.95);
      
      vec3 finalColor = mix(color1, color2, wave * 4.0 + 0.3);
      
      // Brillo especular en las crestas
      float specular = pow(max(0.0, wave * 12.0), 2.5);
      finalColor += specular * 0.3;
      
      // Aplica fade de bordes
      float alpha = edgeFade * (0.8 + 0.2 * sin(uTime * 0.3));

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

const handlePointerDownAction = (material: THREE.ShaderMaterial) => {
  gsap.to(material.uniforms.uRippleStrength, {
    value: 1.8,
    duration: 0.15,
    onComplete: () => {
      gsap.to(material.uniforms.uRippleStrength, { value: 0.25, duration: 0.8 });
    }
  });
};

function WaterPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Creamos el material una sola vez
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      ...WaterShaderMaterial,
    });
    mat.transparent = true;
    mat.side = THREE.DoubleSide;
    mat.depthWrite = false;
    return mat;
  }, []);

  useFrame(({ clock, mouse }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
    // Suavizamos el movimiento del mouse para que las ondas no salten
    material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(material.uniforms.uMouse.value.x, mouse.x * 0.5 + 0.5, 0.1);
    material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(material.uniforms.uMouse.value.y, mouse.y * 0.5 + 0.5, 0.1);
  });

  const handlePointerDown = () => {
    handlePointerDownAction(material);
  };

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
    >
      <planeGeometry args={[50, 50, 64, 64]} />
      <shaderMaterial
        args={[WaterShaderMaterial]}
        uniforms={material.uniforms}
        vertexShader={WaterShaderMaterial.vertexShader}
        fragmentShader={WaterShaderMaterial.fragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export const Background3D = () => {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 10, 15], fov: 55 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#020202"]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" />
        <WaterPlane />
      </Canvas>
    </div>
  );
};
