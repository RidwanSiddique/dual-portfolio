'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'


// Inline boot sequence for brevity
const BOOT_LOGS = [
    "Welcome to RidwanOS v2.0-LTS (GNU/Linux 5.15.0-76-generic x86_64)",
    "",
    " * Documentation:  https://github.com/RidwanSiddique",
    " * Management:     https://linkedin.com/in/RidwanSiddique",
    " * Support:        ridwan@example.com",
    "",
    "System functionality status:",
    " [ OK ]  Core Kernel Modules loaded.",
    " [ OK ]  React Framework initialized.",
    " [ OK ]  Next.js Runtime Environment ready.",
    " [ OK ]  Creative Engines... ONLINE.",
    "",
    "0 packages can be updated.",
    "0 updates are security updates.",
    "",
    "ridwan@portfolio:~$ "
]

interface TerminalLandingWindowProps {
    onNavigate?: () => void
}

export function TerminalLandingWindow({ onNavigate }: TerminalLandingWindowProps) {
    const router = useRouter()
    const [lines, setLines] = useState<string[]>([])
    const [showButton, setShowButton] = useState(false)
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let lineIndex = 0
        const interval = setInterval(() => {
            if (lineIndex < BOOT_LOGS.length) {
                const nextLine = BOOT_LOGS[lineIndex]
                if (nextLine !== undefined) {
                    setLines(prev => [...prev, nextLine])
                }
                lineIndex++
            } else {
                clearInterval(interval)
                setShowButton(true)
            }
        }, 150) // Typing speed for lines

        return () => clearInterval(interval)
    }, [])

    // Auto-scroll to bottom
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [lines])

    const handleEnter = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (onNavigate) {
            onNavigate()
        } else {
            router.push('/developer')
        }
    }

    return (
        <MacWindow
            title="Terminal — ridwan@portfolio: ~"
            width="42vw"
            height="70vh"
            x="4%"
            y="10%"
            // Removed default onClick to make button exclusive
            style={{ cursor: 'text', background: '#300a24', minWidth: '300px', minHeight: '300px' }} // Ubuntu terminal bg color
        >
            <div style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden'
            }}>
                {/* Blur Overlay & Button on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <button
                        onClick={handleEnter}
                        style={{
                            background: '#4e9a06', // Ubuntu green
                            color: 'white',
                            border: 'none',
                            padding: '16px 32px',
                            fontSize: '18px',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transform: 'scale(1)',
                            transition: 'transform 0.1s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        &gt;_ Enter Developer Mode
                    </button>
                </motion.div>

                <div style={{
                    padding: '10px 10px',
                    fontFamily: '"Ubuntu Mono", "Courier New", monospace',
                    color: '#fff',
                    fontSize: '16px',
                    lineHeight: 1.4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    filter: 'blur(0px)', // Placeholder if we wanted dynamic blur on content div instead
                    transition: 'filter 0.3s'
                }}>
                    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
                        {lines.map((line, i) => (
                            <div key={i} style={{ whiteSpace: 'pre-wrap', minHeight: '1.2em' }}>
                                {line && line.startsWith(" [ OK ]") ? (
                                    <span>
                                        <span style={{ color: '#00ff00' }}>[ OK ]</span>{line.substring(7)}
                                    </span>
                                ) : line === "ridwan@portfolio:~$ " ? (
                                    <span>
                                        <span style={{ color: '#00ff00', fontWeight: 'bold' }}>ridwan@portfolio</span>:<span style={{ color: '#0000ff', fontWeight: 'bold' }}>~</span>$ <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            style={{ display: 'inline-block', width: '10px', height: '1.2em', background: '#fff', verticalAlign: 'middle' }}
                                        />
                                    </span>
                                ) : (
                                    line || ''
                                )}
                            </div>
                        ))}
                        <div ref={endRef} />
                    </div>
                </div>
            </div>
        </MacWindow>
    )
}
