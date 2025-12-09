'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

// Mock Data for Projects (Rich Visuals)
const PROJECTS = [
    {
        id: '1',
        title: 'Nebula Stream',
        description: 'A high-performance real-time data streaming platform built for scalability. Handles millions of events per second with sub-millisecond latency.',
        techStack: ['Rust', 'WebAssembly', 'React', 'gRPC'],
        imageUrl: 'https://picsum.photos/seed/nebula/800/600', // Placeholder
        repoUrl: 'https://github.com/ridwan/nebula',
        demoUrl: 'https://nebula.stream',
        tags: ['Performance', 'Systems', 'Backend']
    },
    {
        id: '2',
        title: 'Quantum UI Kit',
        description: 'A React component library implementing glassmorphism and neumorphism design principles. Fully accessible and themeable.',
        techStack: ['TypeScript', 'React', 'Storybook', 'Tailwind'],
        imageUrl: 'https://picsum.photos/seed/quantum/800/600',
        repoUrl: 'https://github.com/ridwan/quantum-ui',
        demoUrl: 'https://quantum-ui.dev',
        tags: ['Frontend', 'Design System', 'Open Source']
    },
    {
        id: '3',
        title: 'Cyber Deck OS',
        description: 'A retro-futuristic web based OS simulating a cyberpunk deck. Features a working terminal, file system, and network visualizer.',
        techStack: ['Vue.js', 'Three.js', 'Node.js', 'Socket.io'],
        imageUrl: 'https://picsum.photos/seed/cyber/800/600',
        repoUrl: 'https://github.com/ridwan/cyberdeck',
        demoUrl: 'https://cyberdeck.net',
        tags: ['Creative Coding', '3D', 'Interactive']
    }
]

export default function ProjectsPage() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const lastScrollTime = useRef(0)

    // Scroll Handler
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const now = Date.now()

            // Check debounce (1.2 seconds wait) to ensure animation finishes
            if (now - lastScrollTime.current < 1200) return

            // Sensitivity Check (Ignore tiny trackpad movements)
            if (Math.abs(e.deltaY) < 30) return

            if (e.deltaY > 0) {
                // Scroll Down -> Next Project (No Loop)
                if (currentIndex < PROJECTS.length - 1) {
                    setCurrentIndex(prev => prev + 1)
                    lastScrollTime.current = now
                }
            } else {
                // Scroll Up -> Prev Project (No Loop)
                if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1)
                    lastScrollTime.current = now
                } else {
                    // Optionally: Go back to Developer Home if scrolling up from first project?
                    // User didn't explicitly ask for this, but it flows well. 
                    // Let's keep it strictly paging for now to avoid accidental exists.
                    // router.push('/developer') 
                }
            }
        }

        window.addEventListener('wheel', handleWheel)
        return () => window.removeEventListener('wheel', handleWheel)
    }, [currentIndex])

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: '#0d1117', // Github Dark Dimmed
            color: '#c9d1d9',
            fontFamily: '"JetBrains Mono", monospace',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Terminal Header */}
            <div style={{
                height: '40px',
                background: '#161b22',
                borderBottom: '1px solid #30363d',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                zIndex: 50
            }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div onClick={() => router.push('/')} style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontSize: '14px', color: '#8b949e' }}>
                    ridwan@dev-portfolio: ~/projects/{PROJECTS[currentIndex].id}
                </div>
            </div>

            {/* Main Content Area - Stacked Windows */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AnimatePresence mode="popLayout" custom={currentIndex}>
                    <motion.div
                        key={currentIndex}
                        initial={{ y: 200, opacity: 0, scale: 0.9, rotateX: -10 }}
                        animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ y: -200, opacity: 0, scale: 0.9, rotateX: 10 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        style={{
                            width: '80%',
                            maxWidth: '1000px',
                            height: '70%',
                            background: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: '12px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            position: 'absolute',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Project Window Header */}
                        <div style={{
                            padding: '16px 24px',
                            borderBottom: '1px solid #30363d',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h2 style={{ margin: 0, color: '#58a6ff', fontSize: '24px' }}>{PROJECTS[currentIndex].title}</h2>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {PROJECTS[currentIndex].tags.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '12px',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        background: '#21262d',
                                        color: '#8b949e',
                                        border: '1px solid #30363d'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Content Grid */}
                        <div style={{ flex: 1, display: 'flex', padding: '0', overflow: 'hidden' }}>
                            {/* Left: Image/Visual */}
                            <div style={{ flex: 1.5, borderRight: '1px solid #30363d', position: 'relative' }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: `url(${PROJECTS[currentIndex].imageUrl}) center/cover no-repeat`,
                                    filter: 'brightness(0.8)'
                                }} />
                                {/* Overlay Gradient */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #161b22 0%, transparent 100%)' }} />
                            </div>

                            {/* Right: Details */}
                            <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '14px', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>// Description</h3>
                                    <p style={{ lineHeight: '1.6', fontSize: '15px' }}>{PROJECTS[currentIndex].description}</p>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '14px', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>// Tech Stack</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {PROJECTS[currentIndex].techStack.map(tech => (
                                            <code key={tech} style={{
                                                color: '#7ee787',
                                                background: 'rgba(126, 231, 135, 0.1)',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '13px'
                                            }}>
                                                ${tech}
                                            </code>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', gap: '16px' }}>
                                    <a href={PROJECTS[currentIndex].demoUrl} target="_blank" rel="noopener noreferrer" style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        padding: '12px',
                                        background: '#238636',
                                        color: '#fff',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        transition: 'background 0.2s'
                                    }}>
                                        View Demo
                                    </a>
                                    <a href={PROJECTS[currentIndex].repoUrl} target="_blank" rel="noopener noreferrer" style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        padding: '12px',
                                        background: '#21262d',
                                        color: '#c9d1d9',
                                        border: '1px solid #30363d',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}>
                                        Source Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#8b949e',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                <span>Scroll to Navigate</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    ↓
                </motion.div>
                <div>{currentIndex + 1} / {PROJECTS.length}</div>
            </div>
        </div>
    )
}
