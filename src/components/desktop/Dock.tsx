'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    demoUrl?: string
    repoUrl?: string
    imageUrl?: string
}

interface DockProps {
    projects: Project[]
    onProjectClick: (project: Project) => void
}

export function Dock({ projects, onProjectClick }: DockProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const getScale = (index: number) => {
        if (hoveredIndex === null) return 1
        const distance = Math.abs(index - hoveredIndex)
        if (distance === 0) return 1.8
        if (distance === 1) return 1.4
        if (distance === 2) return 1.2
        return 1
    }

    const colors = ['#00f0ff', '#ff00aa', '#00ff88', '#ffff00', '#ff6600', '#aa00ff', '#ff0055', '#00aaff']

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '12px 20px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-end',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
            >
                {projects.map((project, index) => {
                    const scale = getScale(index)
                    const isHovered = hoveredIndex === index

                    return (
                        <div
                            key={project.id}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {/* Tooltip */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '100%',
                                        marginBottom: '10px',
                                        background: 'rgba(0, 0, 0, 0.9)',
                                        color: '#fff',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap',
                                        fontFamily: 'monospace',
                                        border: `1px solid ${colors[index % colors.length]}`,
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                        {project.title}
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#aaa', maxWidth: '200px' }}>
                                        {project.description.substring(0, 60)}...
                                    </div>
                                </motion.div>
                            )}

                            {/* Icon */}
                            <motion.button
                                animate={{
                                    scale,
                                    y: scale > 1 ? -(scale - 1) * 20 : 0,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => onProjectClick(project)}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    background: `linear-gradient(135deg, ${colors[index % colors.length]}, ${colors[(index + 1) % colors.length]})`,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Icon content - first letter of title */}
                                <div
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: '28px',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                    }}
                                >
                                    {project.title.charAt(0)}
                                </div>

                                {/* Shine effect */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                                        pointerEvents: 'none',
                                    }}
                                />
                            </motion.button>

                            {/* Active indicator dot */}
                            <div
                                style={{
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    background: colors[index % colors.length],
                                    marginTop: '6px',
                                    opacity: 0.6,
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
