import { useEffect, useRef } from "react";
import type { BufferGeometry, Camera, Scene, ShaderMaterial, WebGLRenderer } from "three";

/**
 * designali-in / aliimam shader-lines — full-screen GLSL line field (Three.js).
 * Shaders match the 21st.dev reference bundle (resolution + time uniforms).
 */

const VERTEX_SHADER = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
#define TWO_PI 6.2831853072
#define PI 3.14159265359

precision highp float;
uniform vec2 resolution;
uniform float time;

float random(in float x) {
  return fract(sin(x) * 1e4);
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

  vec2 fMosaicScal = vec2(4.0, 2.0);
  vec2 vScreenSize = vec2(256.0, 256.0);
  uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
  uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

  float t = time * 0.06 + random(uv.x) * 0.4;
  float lineWidth = 0.0008;

  vec3 color = vec3(0.0);
  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 5; i++) {
      color[j] += lineWidth * float(i * i) / abs(
        fract(t - 0.01 * float(j) + float(i) * 0.01) * 1.0 - length(uv)
      );
    }
  }

  gl_FragColor = vec4(color[2], color[1], color[0], 1.0);
}
`;

type SceneState = {
  renderer: WebGLRenderer;
  material: ShaderMaterial;
  geometry: BufferGeometry;
  scene: Scene;
  camera: Camera;
  animationId: number;
};

export function ShaderLines({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<SceneState | null>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      container.innerHTML = "";

      const camera = new THREE.Camera();
      camera.position.z = 1;

      const scene = new THREE.Scene();
      const geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2(1, 1) },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      });

      scene.add(new THREE.Mesh(geometry, material));

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const resize = () => {
        if (!containerRef.current) return;
        const { width, height } = container.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        renderer.setSize(width, height);
        uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      };

      resize();
      window.addEventListener("resize", resize);

      const animate = () => {
        if (disposed) return;
        if (visibleRef.current && !reduceMotion) {
          uniforms.time.value += 0.05;
        }
        renderer.render(scene, camera);
        stateRef.current!.animationId = requestAnimationFrame(animate);
      };

      stateRef.current = {
        renderer,
        material,
        geometry,
        scene,
        camera,
        animationId: requestAnimationFrame(animate),
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      io.observe(container);

      return () => {
        window.removeEventListener("resize", resize);
        io.disconnect();
      };
    };

    let cleanupResize: (() => void) | undefined;

    void init().then((cleanup) => {
      cleanupResize = cleanup;
    });

    return () => {
      disposed = true;
      cleanupResize?.();
      const state = stateRef.current;
      if (state) {
        cancelAnimationFrame(state.animationId);
        state.geometry.dispose();
        state.material.dispose();
        state.renderer.dispose();
      }
      stateRef.current = null;
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}
