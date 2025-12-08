'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, Environment } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

// Props type definition
interface ProjectProps {
    position: [number, number, number]
    color: string
    label: string
    onClick: () => void
}

function ProjectOrb({ position, color, label, onClick }: ProjectProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2
            meshRef.current.rotation.y += delta * 0.2
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={position}>
                <mesh
                    ref={meshRef}
                    onClick={onClick}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    scale={hovered ? 1.2 : 1}
                >
                    <icosahedronGeometry args={[1.5, 1]} />
                    <meshStandardMaterial
                        color={color}
                        wireframe={!hovered}
                        emissive={color}
                        emissiveIntensity={hovered ? 2 : 0.5}
                    />
                </mesh>
                <Text
                    position={[0, -2, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            </group>
        </Float>
    )
}

export function DevScene() {
    const router = useRouter()

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
            <Canvas camera={{ position: [0, 0, 15] }}>
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <ProjectOrb
                    position={[-6, 0, 0]}
                    color="#00f0ff"
                    label="E-Commerce API"
                    onClick={() => alert('View Project: E-Commerce')}
                />
                <ProjectOrb
                    position={[0, 0, 0]}
                    color="#ff00aa"
                    label="AI Chatbot"
                    onClick={() => alert('View Project: AI Chatbot')}
                />
                <ProjectOrb
                    position={[6, 0, 0]}
                    color="#ffff00"
                    label="SaaS Dashboard"
                    onClick={() => alert('View Project: SaaS')}
                />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
