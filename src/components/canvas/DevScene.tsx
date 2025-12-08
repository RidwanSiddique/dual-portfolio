'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Text, Environment, Html } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { getTechIcon } from '../../utils/techIcons'

interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    demoUrl?: string
    repoUrl?: string
    imageUrl?: string
}

// Particle system for background data flow effect
function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null)
    const particleCount = 1000

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const velocities = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50

            velocities[i * 3] = (Math.random() - 0.5) * 0.02
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
        }

        return { positions, velocities }
    }, [])

    useFrame(() => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += particles.velocities[i * 3]
                positions[i * 3 + 1] += particles.velocities[i * 3 + 1]
                positions[i * 3 + 2] += particles.velocities[i * 3 + 2]

                // Wrap around
                if (Math.abs(positions[i * 3]) > 25) positions[i * 3] *= -1
                if (Math.abs(positions[i * 3 + 1]) > 25) positions[i * 3 + 1] *= -1
                if (Math.abs(positions[i * 3 + 2]) > 25) positions[i * 3 + 2] *= -1
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3))
        return geo
    }, [particles.positions])

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={0.05}
                color="#00f0ff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

// Glowing grid floor
function GridFloor() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial
            material.uniforms.time.value = state.clock.elapsedTime
        }
    })

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color('#0a0a0a') },
                color2: { value: new THREE.Color('#00f0ff') },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;

                void main() {
                    float grid = max(
                        step(0.98, fract(vUv.x * 20.0)),
                        step(0.98, fract(vUv.y * 20.0))
                    );
                    
                    float pulse = sin(time * 2.0 + vUv.x * 10.0) * 0.5 + 0.5;
                    vec3 color = mix(color1, color2, grid * pulse * 0.3);
                    
                    gl_FragColor = vec4(color, 0.8);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        })
    }, [])

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} material={shaderMaterial}>
            <planeGeometry args={[100, 100]} />
        </mesh>
    )
}

// Floating code block
function CodeBlock({ position, code }: { position: [number, number, number]; code: string }) {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group position={position}>
                <mesh>
                    <planeGeometry args={[3, 2]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        transparent
                        opacity={0.7}
                        emissive="#00f0ff"
                        emissiveIntensity={0.2}
                    />
                </mesh>
                <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.15}
                    color="#00ff88"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2.8}
                >
                    {code}
                </Text>
            </group>
        </Float>
    )
}

// Terminal-style project card
interface TerminalCardProps {
    position: [number, number, number]
    project: Project
    color: string
    onClick: () => void
}

function TerminalCard({ position, project, color, onClick }: TerminalCardProps) {
    const groupRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
            if (hovered) {
                groupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
            } else {
                groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
            }
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
            <group ref={groupRef} position={position}>
                {/* Terminal window background */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4, 3, 0.1]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        transparent
                        opacity={0.9}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.5 : 0.2}
                    />
                </mesh>

                {/* Glowing border */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4.1, 3.1, 0.08]} />
                    <meshStandardMaterial
                        color={color}
                        transparent
                        opacity={0.3}
                        emissive={color}
                        emissiveIntensity={hovered ? 1.5 : 0.8}
                    />
                </mesh>

                {/* Terminal header bar */}
                <mesh position={[0, 1.35, 0.06]}>
                    <boxGeometry args={[4, 0.3, 0.02]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* HTML overlay for text content */}
                <Html
                    position={[0, 0, 0.1]}
                    center
                    distanceFactor={10}
                    style={{
                        width: '350px',
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    <div style={{
                        fontFamily: 'monospace',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '10px',
                    }}>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            color: '#ffffff',
                        }}>
                            {`> ${project.title}`}
                        </div>
                        <div style={{
                            fontSize: '13px',
                            color: '#00ff88',
                            marginBottom: '8px',
                            lineHeight: '1.4',
                        }}>
                            {project.description.substring(0, 100)}...
                        </div>
                        <div style={{
                            fontSize: '11px',
                            color: '#00f0ff',
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'center',
                            marginTop: '8px',
                        }}>
                            {project.techStack.slice(0, 5).map((tech) => (
                                <img
                                    key={tech}
                                    src={getTechIcon(tech)}
                                    alt={tech}
                                    style={{ width: '16px', height: '16px' }}
                                    title={tech}
                                />
                            ))}
                        </div>
                        {hovered && (
                            <div style={{
                                fontSize: '14px',
                                color: '#ffff00',
                                marginTop: '10px',
                                fontWeight: 'bold',
                            }}>
                                [ CLICK TO VIEW ]
                            </div>
                        )}
                    </div>
                </Html>

                {/* Invisible clickable area */}
                <mesh
                    position={[0, 0, 0.06]}
                    onClick={onClick}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <planeGeometry args={[4, 3]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>

                {/* Orbiting tech icons (small spheres) */}
                {project.techStack.slice(0, 3).map((tech, i) => (
                    <TechOrbit key={tech} index={i} total={3} color={color} />
                ))}
            </group>
        </Float>
    )
}

// Orbiting tech stack indicator
function TechOrbit({ index, total, color }: { index: number; total: number; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const angle = (index / total) * Math.PI * 2 + state.clock.elapsedTime
            const radius = 2.5
            meshRef.current.position.x = Math.cos(angle) * radius
            meshRef.current.position.z = Math.sin(angle) * radius
        }
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
            />
        </mesh>
    )
}

export function DevScene() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [visibleCount, setVisibleCount] = useState(4)

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

    const colors = ['#00f0ff', '#ff00aa', '#00ff88', '#ffff00', '#ff6600', '#aa00ff', '#ff0055', '#00aaff']

    // Code snippets for floating code blocks
    const codeSnippets = [
        'const dev = {\n  code: true,\n  create: true\n}',
        'function build() {\n  return magic;\n}',
        'class Project {\n  deploy() {}\n}',
        'npm run dev\n> Building...\n> Ready! ✓',
    ]

    // Calculate positions in a vertical list layout
    const getPosition = (index: number): [number, number, number] => {
        const x = 0 // Centered horizontally
        const y = 5 - (index * 4) // Stack vertically, 4 units apart
        const z = -5 // Fixed distance from camera
        return [x, y, z]
    }

    const showMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, projects.length))
    }

    const showLess = () => {
        setVisibleCount(4)
    }

    if (loading) {
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                <p style={{ color: '#00f0ff', fontSize: '1.5rem', fontFamily: 'monospace' }}>
                    {'> Loading projects...'}
                </p>
            </div>
        )
    }

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 100px)', background: '#000' }}>
            <Canvas camera={{ position: [0, 3, 15], fov: 60 }}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 10, 50]} />

                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00aa" />

                {/* Background particles */}
                <ParticleField />

                {/* Grid floor */}
                <GridFloor />

                {/* Floating code blocks */}
                {codeSnippets.map((code, i) => (
                    <CodeBlock
                        key={i}
                        position={[
                            Math.cos((i / codeSnippets.length) * Math.PI * 2) * 15,
                            Math.sin(i * 2) * 3,
                            Math.sin((i / codeSnippets.length) * Math.PI * 2) * 15,
                        ]}
                        code={code}
                    />
                ))}

                {/* Project terminal cards */}
                {projects.slice(0, visibleCount).map((project, index) => (
                    <TerminalCard
                        key={project.id}
                        position={getPosition(index)}
                        project={project}
                        color={colors[index % colors.length]}
                        onClick={() => {
                            if (project.demoUrl) {
                                window.open(project.demoUrl, '_blank')
                            } else if (project.repoUrl) {
                                window.open(project.repoUrl, '_blank')
                            } else {
                                alert(`Project: ${project.title}\n\n${project.description}\n\nTech: ${project.techStack.join(', ')}`)
                            }
                        }}
                    />
                ))}

                {/* Show More / Show Less buttons */}
                {projects.length > 4 && (
                    <Html position={[0, 5 - (visibleCount * 4) - 2, -5]} center>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {visibleCount < projects.length && (
                                <button
                                    onClick={showMore}
                                    style={{
                                        padding: '10px 20px',
                                        background: '#00f0ff',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontFamily: 'monospace',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    SHOW MORE ({projects.length - visibleCount} more)
                                </button>
                            )}
                            {visibleCount > 4 && (
                                <button
                                    onClick={showLess}
                                    style={{
                                        padding: '10px 20px',
                                        background: '#ff00aa',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontFamily: 'monospace',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    SHOW LESS
                                </button>
                            )}
                        </div>
                    </Html>
                )}

                <OrbitControls
                    enableZoom={true}
                    maxDistance={30}
                    minDistance={5}
                    maxPolarAngle={Math.PI / 2}
                    target={[0, 0, -5]}
                />
            </Canvas>
        </div>
    )
}
