import { motion } from 'framer-motion'
import { useState, memo, useEffect, useRef } from 'react'
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
    initialPosition?: { x: number; y: number }
}

// Helper for typing effect
const TypewriterText = ({ text, onComplete, color = '#fff', speed = 20 }: { text: string, onComplete?: () => void, color?: string, speed?: number }) => {
    const [displayedText, setDisplayedText] = useState('')
    const onCompleteRef = useRef(onComplete)

    useEffect(() => {
        onCompleteRef.current = onComplete
    }, [onComplete])

    useEffect(() => {
        let index = 0
        setDisplayedText('')
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, index + 1))
            index++
            if (index >= text.length) {
                clearInterval(interval)
                if (onCompleteRef.current) {
                    onCompleteRef.current()
                }
            }
        }, speed)
        return () => clearInterval(interval)
    }, [text, speed])

    return <span style={{ color }}>{displayedText}</span>
}

export const TerminalWindow = memo(function TerminalWindow({ project, onClose, zIndex, onFocus, initialPosition }: TerminalWindowProps) {
    const [position, setPosition] = useState(initialPosition || { x: 100, y: 50 })
    const [isDragging, setIsDragging] = useState(false)
    const [stage, setStage] = useState(0)

    // Sequence stages:
    // 0: Start
    // 1: Project Title
    // 2: Desc Label
    // 3: Description Body
    // 4: Tech Label
    // 5: Tech Icons (Instant fade in)
    // 6: Links (Fade in)

    const nextStage = () => setStage(prev => prev + 1)

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
                willChange: 'transform',
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
                        minHeight: '300px', // Prevent resize jump
                    }}
                >

                    {/* Line 1: Project Name */}
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                        <span style={{ color: '#fff' }}>project:</span>{' '}
                        <TypewriterText text={project.title} color="#00ff88" onComplete={() => stage === 0 && nextStage()} />
                    </div>

                    {/* Line 2: Description Label */}
                    {stage >= 1 && (
                        <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                            <TypewriterText text="description:" color="#fff" onComplete={() => stage === 1 && nextStage()} />
                        </div>
                    )}

                    {/* Line 3: Description Body */}
                    {stage >= 2 && (
                        <div style={{ marginLeft: '20px', marginBottom: '15px' }}>
                            <TypewriterText text={project.description} color="#aaa" speed={10} onComplete={() => stage === 2 && nextStage()} />
                        </div>
                    )}

                    {/* Line 4: Tech Stack Label */}
                    {stage >= 3 && (
                        <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: '#00f0ff' }}>{'>'}</span>{' '}
                            <TypewriterText text="tech_stack:" color="#fff" onComplete={() => stage === 3 && nextStage()} />
                        </div>
                    )}

                    {/* Line 5: Tech Icons (Fade In) */}
                    {stage >= 4 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onAnimationComplete={() => stage === 4 && nextStage()}
                            style={{ marginLeft: '20px', marginBottom: '15px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                        >
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
                        </motion.div>
                    )}

                    {/* Line 6: Links (Fade In) */}
                    {stage >= 5 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
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
                        </motion.div>
                    )}
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
)
