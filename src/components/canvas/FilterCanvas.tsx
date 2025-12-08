'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

const FilterShader = {
    uniforms: {
        uTexture: { value: null as THREE.Texture | null },
        uBrightness: { value: 0 },
        uContrast: { value: 0 },
        uSaturate: { value: 0 },
        uSepia: { value: 0 },
        uVignette: { value: 0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uBrightness;
    uniform float uContrast;
    uniform float uSaturate;
    uniform float uSepia;
    uniform float uVignette;
    varying vec2 vUv;

    void main() {
      vec4 tex = texture2D(uTexture, vUv);
      vec3 color = tex.rgb;

      // Brightness
      color += uBrightness;

      // Contrast
      color = (color - 0.5) * (1.0 + uContrast) + 0.5;

      // Saturation
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      color = mix(vec3(gray), color, 1.0 + uSaturate);

      // Sepia
      vec3 sepiaColor = vec3(
        dot(color, vec3(0.393, 0.769, 0.189)),
        dot(color, vec3(0.349, 0.686, 0.168)),
        dot(color, vec3(0.272, 0.534, 0.131))
      );
      color = mix(color, sepiaColor, uSepia);

      // Vignette
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      color *= smoothstep(0.8, 0.8 - uVignette, dist * (1.0 + uVignette));

      gl_FragColor = vec4(color, tex.a);
    }
  `
}

function ImagePlane({ url, settings }: { url: string; settings: any }) {
    const texture = useLoader(THREE.TextureLoader, url)
    const materialRef = useRef<THREE.ShaderMaterial>(null)

    // Clone shader to avoid sharing uniforms across instances if multiple
    const shaderArgs = useMemo(() => {
        const clone = { ...FilterShader, uniforms: { ...FilterShader.uniforms } }
        clone.uniforms.uTexture = { value: texture }
        clone.uniforms.uBrightness = { value: 0 }
        clone.uniforms.uContrast = { value: 0 }
        clone.uniforms.uSaturate = { value: 0 }
        clone.uniforms.uSepia = { value: 0 }
        clone.uniforms.uVignette = { value: 0 }
        return clone
    }, [texture])

    useFrame(() => {
        if (materialRef.current) {
            const u = materialRef.current.uniforms
            u.uBrightness.value = settings.brightness
            u.uContrast.value = settings.contrast
            u.uSaturate.value = settings.saturation
            u.uSepia.value = settings.sepia
            u.uVignette.value = settings.vignette
        }
    })

    // Use viewport to fit image
    const { width, height } = texture.image
    const aspect = width / height
    // Scale down to fit in view roughly
    const scale = 5

    return (
        <mesh scale={[scale * aspect, scale, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial ref={materialRef} attach="material" args={[shaderArgs]} />
        </mesh>
    )
}

export function FilterCanvas({ url, settings }: { url: string; settings: any }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <color attach="background" args={['#111']} />
                <ambientLight />
                <ImagePlane url={url} settings={settings} />
            </Canvas>
        </div>
    )
}
