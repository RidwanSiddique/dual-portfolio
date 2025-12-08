'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { getTechIcon } from '../../utils/techIcons'

interface TerminalWindowProps {
    project: {
        id: string
        title: string
        description: string
        techStack: string[]
        demoUrl?: string
        repoUrl?: string
    }
    onClose: () => void
    zIndex: number
    onFocus: () => void
}

export function TerminalWindow({ project, onClose, zIndex, onFocus }: TerminalWindowProps) {
    const [position, setPosition] = useState({ x: 100, y: 50 })
    const [isDragging, setIsDragging] = useState(false)

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            drag
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onMouseDown={onFocus}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                zIndex,
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            <div
                style={{
                    width: '700px',
                    maxWidth: '90vw',
                    background: 'rgba(30, 30, 30, 0.75)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                {/* Window Title Bar */}
                <div
                    style={{
                        background: 'rgba(40, 40, 40, 0.95)',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'grab',
                    }}
                >
                    {/* Traffic Lights */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={onClose}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: '#ff5f57',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'filter 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                        />
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: '#febc2e',
                            }}
                        />
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: '#28c840',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: '13px',
                            color: '#fff',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                        }}
                    >
                        {project.title} — Terminal
                    </div>
                </div>

                {/* Terminal Content */}
                <div
                    style={{
                        padding: '20px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#00ff88',
                        maxHeight: '500px',
                        overflowY: 'auto',
                    }}
                >
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                        <span style={{ color: '#fff' }}>project:</span>{' '}
                        <span style={{ color: '#00ff88' }}>{project.title}</span>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                        <span style={{ color: '#fff' }}>description:</span>
                    </div>
                    <div style={{ marginLeft: '20px', marginBottom: '15px', color: '#aaa' }}>
                        {project.description}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                        <span style={{ color: '#fff' }}>tech_stack:</span>
                    </div>
                    <div style={{ marginLeft: '20px', marginBottom: '15px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {project.techStack.map((tech, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                <img
                                    src={getTechIcon(tech)}
                                    alt={tech}
                                    style={{ width: '16px', height: '16px' }}
                                />
                                <span style={{ color: '#ffff00', fontSize: '12px' }}>{tech}</span>
                            </div>
                        ))}
                    </div>

                    {project.demoUrl && (
                        <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                            <span style={{ color: '#fff' }}>demo_url:</span>{' '}
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#ff00aa',
                                    textDecoration: 'underline',
                                }}
                            >
                                {project.demoUrl}
                            </a>
                        </div>
                    )}

                    {project.repoUrl && (
                        <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                            <span style={{ color: '#fff' }}>repo_url:</span>{' '}
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#ff00aa',
                                    textDecoration: 'underline',
                                }}
                            >
                                {project.repoUrl}
                            </a>
                        </div>
                    )}

                    <div style={{ marginTop: '20px', color: '#00f0ff' }}>
                        <span>{'>'}</span> <span style={{ animation: 'blink 1s infinite' }}>_</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </motion.div>
    )
}
