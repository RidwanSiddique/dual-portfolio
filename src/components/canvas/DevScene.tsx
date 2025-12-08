'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, Environment } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

// Props type definition
interface ProjectProps {
    position: [number, number, number]
    color: string
    label: string
    onClick: () => void
}

interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    demoUrl?: string
    repoUrl?: string
    imageUrl?: string
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
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch projects:', err)
                setLoading(false)
            })
    }, [])

    // Generate colors for projects
    const colors = ['#00f0ff', '#ff00aa', '#ffff00', '#00ff88', '#ff6600', '#aa00ff', '#ff0055', '#00aaff']

    // Calculate positions in a circular layout
    const getPosition = (index: number, total: number): [number, number, number] => {
        const radius = 8
        const angle = (index / total) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return [x, 0, z]
    }

    if (loading) {
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'white', fontSize: '1.5rem' }}>Loading projects...</p>
            </div>
        )
    }

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
            <Canvas camera={{ position: [0, 5, 20] }}>
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {projects.map((project, index) => (
                    <ProjectOrb
                        key={project.id}
                        position={getPosition(index, projects.length)}
                        color={colors[index % colors.length]}
                        label={project.title}
                        onClick={() => {
                            if (project.demoUrl) {
                                window.open(project.demoUrl, '_blank')
                            } else {
                                alert(`Project: ${project.title}\n\n${project.description}\n\nTech: ${project.techStack.join(', ')}`)
                            }
                        }}
                    />
                ))}

                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
