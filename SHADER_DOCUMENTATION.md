# Efecto de Grafito - Documentación Técnica

## 🎨 Visión General

Este efecto simula un fondo de papel con trazos de grafito/lápiz utilizando **Three.js** y **GLSL shaders**. El efecto es completamente procedural (no usa imágenes) y se ejecuta en tiempo real en la GPU.

## 📚 Conceptos Fundamentales

### 1. Shaders GLSL

Los **shaders** son programas que se ejecutan en la GPU para calcular el color de cada píxel.

- **Vertex Shader**: Procesa las posiciones de los vértices
- **Fragment Shader**: Calcula el color de cada píxel (aquí está la magia)

```glsl
// Cada píxel ejecuta este código en paralelo
void main() {
  vec2 uv = vUv; // Coordenadas del píxel (0-1)
  vec3 color = calculateColor(uv);
  gl_FragColor = vec4(color, 1.0);
}
```

### 2. Ruido de Perlin

El **ruido de Perlin** es un algoritmo que genera valores pseudo-aleatorios con continuidad espacial.

**¿Por qué usarlo?**

- Crea patrones orgánicos y naturales
- Es determinista: misma entrada = misma salida
- Tiene continuidad (no hay saltos bruscos)

**Cómo funciona:**

1. Divide el espacio en una cuadrícula
2. Asigna gradientes aleatorios a cada esquina
3. Interpola suavemente entre gradientes

```glsl
float perlinNoise(vec2 p) {
  vec2 i = floor(p);  // Celda actual
  vec2 f = fract(p);  // Posición dentro de la celda
  
  // Interpolación suave (hermite quintic)
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  
  // Combinar gradientes de las 4 esquinas
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
```

### 3. FBM (Fractional Brownian Motion)

**FBM** combina múltiples capas (octavas) de ruido a diferentes escalas.

```glsl
float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for(int i = 0; i < octaves; i++) {
    value += amplitude * perlinNoise(p * frequency);
    frequency *= 2.0;    // Doble frecuencia = detalles más finos
    amplitude *= 0.5;    // Mitad amplitud = menos influencia
  }
  
  return value;
}
```

**Visualización:**

- Octava 1: Grandes ondulaciones (montañas)
- Octava 2: Detalles medianos (colinas)
- Octava 3: Detalles finos (rocas)
- Octava 4: Micro-detalles (textura)

### 4. Hash Function

Genera números pseudo-aleatorios desde coordenadas 2D.

```glsl
vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), 
           dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
```

**Propiedades:**

- Determinista
- Distribución uniforme
- Rango: -1 a 1

## 🎯 Componentes del Efecto

### Textura de Papel

Simula el granulado natural del papel:

```glsl
float paperTexture(vec2 uv) {
  // Grano fino (alta frecuencia)
  float grain = fbm(uv * 200.0, 4);
  
  // Fibras del papel (líneas direccionales)
  float fibers = fbm(uv * vec2(800.0, 100.0), 2);
  
  // Imperfecciones aleatorias
  float imperfections = hash21(floor(uv * 100.0)) * 0.1;
  
  return grain * 0.6 + fibers * 0.3 + imperfections;
}
```

### Trazos de Grafito

Simula trazos de lápiz en múltiples direcciones:

```glsl
float graphiteStrokes(vec2 uv, float time) {
  float strokes = 0.0;
  
  for(float i = 0.0; i < 3.0; i++) {
    // Rotación de cada capa
    float angle = (i / 3.0) * PI + time * 0.02;
    mat2 rotation = mat2(cos(angle), -sin(angle), 
                         sin(angle), cos(angle));
    
    vec2 rotatedUV = rotation * (uv - 0.5) + 0.5;
    
    // Trazos direccionales
    float stroke = fbm(rotatedUV * vec2(100.0, 30.0), 3);
    strokes += stroke;
  }
  
  return strokes / 3.0;
}
```

### Hatching (Sombreado Cruzado)

Líneas finas entrecruzadas como en dibujos técnicos:

```glsl
float hatching(vec2 uv, float time) {
  float lines = 0.0;
  float density = 80.0;
  
  // Líneas en dos direcciones perpendiculares
  for(float i = 0.0; i < 2.0; i++) {
    float angle = i * PI/2;
    vec2 dir = vec2(cos(angle), sin(angle));
    
    float line = sin(dot(uv, dir) * density + time * 0.1);
    lines += smoothstep(0.2, 0.8, line * 0.5 + 0.5);
  }
  
  return lines * 0.5;
}
```

## 🔧 Configuración Three.js

### Estructura Básica

```javascript
// 1. Crear escena
const scene = new THREE.Scene();

// 2. Crear cámara
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

// 3. Crear renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });

// 4. Crear material shader personalizado
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(width, height) }
  },
  vertexShader: vertexShaderCode,
  fragmentShader: fragmentShaderCode
});

// 5. Crear geometría y mesh
const geometry = new THREE.PlaneGeometry(10, 10);
const mesh = new THREE.Mesh(geometry, shaderMaterial);

// 6. Loop de animación
function animate(time) {
  shaderMaterial.uniforms.uTime.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

### Con React Three Fiber

```tsx
import { Canvas, useFrame } from '@react-three/fiber';

function AnimatedBackground() {
  const materialRef = useRef();
  
  useFrame((state) => {
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  
  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vs}
        fragmentShader={fs}
      />
    </mesh>
  );
}
```

## ⚡ Optimización

### 1. Limitar Octavas de FBM

```glsl
// Menos octavas = mejor rendimiento
float fbm(vec2 p) {
  // 4-6 octavas es óptimo
  for(int i = 0; i < 4; i++) { ... }
}
```

### 2. Reducir Complejidad

```glsl
// Usar smoothstep en lugar de cálculos complejos
float soft = smoothstep(0.0, 1.0, value);
```

### 3. Pre-calcular Valores

```glsl
// Calcular una vez, usar muchas veces
float time = uTime * 0.1;
float scaledUV = uv * 100.0;
```

## 🎨 Parámetros Ajustables

```glsl
uniform float uNoiseScale;        // Escala del ruido (1.0-3.0)
uniform float uNoiseSpeed;        // Velocidad animación (0.1-2.0)
uniform float uGraphiteIntensity; // Intensidad grafito (0.5-2.0)
```

## 📖 Recursos de Aprendizaje

1. **The Book of Shaders**

   - https://thebookofshaders.com/
   - Capítulo sobre ruido
   - Ejemplos interactivos

2. **Shadertoy**

   - https://www.shadertoy.com/
   - Miles de ejemplos de shaders
   - Comunidad activa

3. **Three.js Documentation**
  
   - https://threejs.org/docs/
   - ShaderMaterial
   - Uniforms y varyings

## 💡 Conceptos Clave

- **GPU Parallelism**: Cada píxel se calcula simultáneamente
- **Procedural Generation**: Sin imágenes, todo es código
- **Deterministic Noise**: Misma semilla = mismo resultado
- **Fractal Detail**: Detalles a múltiples escalas (FBM)
- **Real-time**: 60 FPS en la mayoría de dispositivos

## 🚀 Próximos Pasos

1. Experimentar con diferentes funciones de ruido (Simplex, Worley)
2. Añadir interactividad (mouse, scroll)
3. Implementar diferentes estilos (acuarela, carboncillo)
4. Optimizar para móviles
